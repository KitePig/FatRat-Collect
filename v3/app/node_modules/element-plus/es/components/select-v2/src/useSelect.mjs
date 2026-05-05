import { EVENT_CODE } from "../../../constants/aria.mjs";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { MINIMUM_INPUT_WIDTH } from "../../../constants/form.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isArray, isEmpty, isFunction, isNumber, isObject, isUndefined as isUndefined$1 } from "../../../utils/types.mjs";
import { escapeStringRegexp } from "../../../utils/strings.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { ValidateComponentsMap } from "../../../utils/vue/icon.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFocusController } from "../../../hooks/use-focus-controller/index.mjs";
import { useComposition } from "../../../hooks/use-composition/index.mjs";
import { useEmptyValues } from "../../../hooks/use-empty-values/index.mjs";
import { useFormDisabled, useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem, useFormItemInputId } from "../../form/src/hooks/use-form-item.mjs";
import { useProps } from "./useProps.mjs";
import { useAllowCreate } from "./useAllowCreate.mjs";
import { useDebounceFn, useResizeObserver } from "@vueuse/core";
import { findLastIndex, get, isEqual } from "lodash-unified";
import { computed, nextTick, onMounted, reactive, ref, useSlots, watch, watchEffect } from "vue";

//#region ../../packages/components/select-v2/src/useSelect.ts
const useSelect = (props, emit) => {
	const { t } = useLocale();
	const slots = useSlots();
	const nsSelect = useNamespace("select");
	const nsInput = useNamespace("input");
	const { form: elForm, formItem: elFormItem } = useFormItem();
	const { inputId } = useFormItemInputId(props, { formItemContext: elFormItem });
	const { aliasProps, getLabel, getValue, getDisabled, getOptions } = useProps(props);
	const { valueOnClear, isEmptyValue } = useEmptyValues(props);
	const states = reactive({
		inputValue: "",
		cachedOptions: [],
		createdOptions: [],
		hoveringIndex: -1,
		inputHovering: false,
		selectionWidth: 0,
		collapseItemWidth: 0,
		previousQuery: null,
		previousValue: void 0,
		selectedLabel: "",
		menuVisibleOnFocus: false,
		isBeforeHide: false
	});
	const popperSize = ref(-1);
	const debouncing = ref(false);
	const selectRef = ref();
	const selectionRef = ref();
	const tooltipRef = ref();
	const tagTooltipRef = ref();
	const inputRef = ref();
	const prefixRef = ref();
	const suffixRef = ref();
	const menuRef = ref();
	const tagMenuRef = ref();
	const collapseItemRef = ref();
	const { isComposing, handleCompositionStart, handleCompositionEnd, handleCompositionUpdate } = useComposition({ afterComposition: (e) => onInput(e) });
	const selectDisabled = useFormDisabled();
	const { wrapperRef, isFocused, handleBlur } = useFocusController(inputRef, {
		disabled: selectDisabled,
		afterFocus() {
			if (props.automaticDropdown && !expanded.value) {
				expanded.value = true;
				states.menuVisibleOnFocus = true;
			}
		},
		beforeBlur(event) {
			return tooltipRef.value?.isFocusInsideContent(event) || tagTooltipRef.value?.isFocusInsideContent(event);
		},
		afterBlur() {
			expanded.value = false;
			states.menuVisibleOnFocus = false;
			if (props.validateEvent) elFormItem?.validate?.("blur").catch((err) => debugWarn(err));
		}
	});
	const allOptions = computed(() => filterOptions(""));
	const hasOptions = computed(() => {
		if (props.loading) return false;
		return props.options.length > 0 || states.createdOptions.length > 0;
	});
	const filteredOptions = ref([]);
	const expanded = ref(false);
	const needStatusIcon = computed(() => elForm?.statusIcon ?? false);
	const popupHeight = computed(() => {
		const totalHeight = filteredOptions.value.length * props.itemHeight;
		return totalHeight > props.height ? props.height : totalHeight;
	});
	const hasModelValue = computed(() => {
		return props.multiple ? isArray(props.modelValue) && props.modelValue.length > 0 : !isEmptyValue(props.modelValue);
	});
	const showClearBtn = computed(() => {
		return props.clearable && !selectDisabled.value && hasModelValue.value && (isFocused.value || states.inputHovering);
	});
	const iconComponent = computed(() => props.remote && props.filterable && !props.remoteShowSuffix ? "" : props.suffixIcon);
	const iconReverse = computed(() => iconComponent.value && nsSelect.is("reverse", expanded.value));
	const validateState = computed(() => elFormItem?.validateState || "");
	const validateIcon = computed(() => {
		if (!validateState.value) return;
		return ValidateComponentsMap[validateState.value];
	});
	const debounce = computed(() => props.remote ? props.debounce : 0);
	const isRemoteSearchEmpty = computed(() => props.remote && !states.inputValue && !hasOptions.value);
	const emptyText = computed(() => {
		if (props.loading) return props.loadingText || t("el.select.loading");
		else {
			if (props.filterable && states.inputValue && hasOptions.value && filteredOptions.value.length === 0) return props.noMatchText || t("el.select.noMatch");
			if (!hasOptions.value) return props.noDataText || t("el.select.noData");
		}
		return null;
	});
	const isFilterMethodValid = computed(() => props.filterable && isFunction(props.filterMethod));
	const isRemoteMethodValid = computed(() => props.filterable && props.remote && isFunction(props.remoteMethod));
	const filterOptions = (query) => {
		const regexp = new RegExp(escapeStringRegexp(query), "i");
		const isValidOption = (o) => {
			if (isFilterMethodValid.value || isRemoteMethodValid.value) return true;
			return query ? regexp.test(getLabel(o) || "") : true;
		};
		if (props.loading) return [];
		return [...states.createdOptions, ...props.options].reduce((all, item) => {
			const options = getOptions(item);
			if (isArray(options)) {
				const filtered = options.filter(isValidOption);
				if (filtered.length > 0) all.push({
					label: getLabel(item),
					type: "Group"
				}, ...filtered);
			} else if (props.remote || isValidOption(item)) all.push(item);
			return all;
		}, []);
	};
	const updateOptions = () => {
		filteredOptions.value = filterOptions(states.inputValue);
	};
	const allOptionsValueMap = computed(() => {
		const valueMap = /* @__PURE__ */ new Map();
		allOptions.value.forEach((option, index) => {
			valueMap.set(getValueKey(getValue(option)), {
				option,
				index
			});
		});
		return valueMap;
	});
	const filteredOptionsValueMap = computed(() => {
		const valueMap = /* @__PURE__ */ new Map();
		filteredOptions.value.forEach((option, index) => {
			valueMap.set(getValueKey(getValue(option)), {
				option,
				index
			});
		});
		return valueMap;
	});
	const optionsAllDisabled = computed(() => filteredOptions.value.every((option) => getDisabled(option)));
	const selectSize = useFormSize();
	const collapseTagSize = computed(() => "small" === selectSize.value ? "small" : "default");
	const calculatePopperSize = () => {
		if (isNumber(props.fitInputWidth)) {
			popperSize.value = props.fitInputWidth;
			return;
		}
		const width = selectRef.value?.offsetWidth || 200;
		if (!props.fitInputWidth && hasOptions.value) nextTick(() => {
			popperSize.value = Math.max(width, calculateLabelMaxWidth());
		});
		else popperSize.value = width;
	};
	const calculateLabelMaxWidth = () => {
		const ctx = document.createElement("canvas").getContext("2d");
		const selector = nsSelect.be("dropdown", "item");
		const dropdownItemEl = (menuRef.value?.listRef?.innerRef || document).querySelector(`.${selector}`);
		if (dropdownItemEl === null || ctx === null) return 0;
		const style = getComputedStyle(dropdownItemEl);
		const padding = Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight);
		ctx.font = `bold ${style.font.replace(new RegExp(`\\b${style.fontWeight}\\b`), "")}`;
		return filteredOptions.value.reduce((max, option) => {
			const metrics = ctx.measureText(getLabel(option));
			return Math.max(metrics.width, max);
		}, 0) + padding;
	};
	const getGapWidth = () => {
		if (!selectionRef.value) return 0;
		const style = window.getComputedStyle(selectionRef.value);
		return Number.parseFloat(style.gap || "6px");
	};
	const tagStyle = computed(() => {
		const gapWidth = getGapWidth();
		const inputSlotWidth = props.filterable ? gapWidth + MINIMUM_INPUT_WIDTH : 0;
		return { maxWidth: `${collapseItemRef.value && props.maxCollapseTags === 1 ? states.selectionWidth - states.collapseItemWidth - gapWidth - inputSlotWidth : states.selectionWidth - inputSlotWidth}px` };
	});
	const collapseTagStyle = computed(() => {
		return { maxWidth: `${states.selectionWidth}px` };
	});
	const shouldShowPlaceholder = computed(() => {
		if (isArray(props.modelValue)) return props.modelValue.length === 0 && !states.inputValue;
		return props.filterable ? !states.inputValue : true;
	});
	const currentPlaceholder = computed(() => {
		const _placeholder = props.placeholder ?? t("el.select.placeholder");
		return props.multiple || !hasModelValue.value ? _placeholder : states.selectedLabel;
	});
	const popperRef = computed(() => tooltipRef.value?.popperRef?.contentRef);
	const indexRef = computed(() => {
		if (props.multiple) {
			const len = props.modelValue.length;
			if (len > 0 && filteredOptionsValueMap.value.has(props.modelValue[len - 1])) {
				const { index } = filteredOptionsValueMap.value.get(props.modelValue[len - 1]);
				return index;
			}
		} else if (!isEmptyValue(props.modelValue) && filteredOptionsValueMap.value.has(props.modelValue)) {
			const { index } = filteredOptionsValueMap.value.get(props.modelValue);
			return index;
		}
		return -1;
	});
	const dropdownMenuVisible = computed({
		get() {
			return expanded.value && (props.loading || !isRemoteSearchEmpty.value || props.remote && !!slots.empty) && (!debouncing.value || !isEmpty(states.previousQuery) || hasOptions.value);
		},
		set(val) {
			expanded.value = val;
		}
	});
	const showTagList = computed(() => {
		if (!props.multiple) return [];
		return props.collapseTags ? states.cachedOptions.slice(0, props.maxCollapseTags) : states.cachedOptions;
	});
	const collapseTagList = computed(() => {
		if (!props.multiple) return [];
		return props.collapseTags ? states.cachedOptions.slice(props.maxCollapseTags) : [];
	});
	const { createNewOption, removeNewOption, selectNewOption, clearAllNewOption } = useAllowCreate(props, states);
	const toggleMenu = (event) => {
		if (selectDisabled.value || props.filterable && expanded.value && event && !suffixRef.value?.contains(event.target)) return;
		if (states.menuVisibleOnFocus) states.menuVisibleOnFocus = false;
		else expanded.value = !expanded.value;
	};
	const onInputChange = () => {
		if (states.inputValue.length > 0 && !expanded.value) expanded.value = true;
		createNewOption(states.inputValue);
		nextTick(() => {
			handleQueryChange(states.inputValue);
		});
	};
	const debouncedOnInputChange = useDebounceFn(() => {
		onInputChange();
		debouncing.value = false;
	}, debounce);
	const handleQueryChange = (val) => {
		if (states.previousQuery === val || isComposing.value) return;
		states.previousQuery = val;
		if (props.filterable && isFunction(props.filterMethod)) props.filterMethod(val);
		else if (props.filterable && props.remote && isFunction(props.remoteMethod)) props.remoteMethod(val);
		if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptions.value.length) nextTick(checkDefaultFirstOption);
		else nextTick(updateHoveringIndex);
	};
	/**
	* find and highlight first option as default selected
	* @remark
	* - if the first option in dropdown list is user-created,
	*   it would be at the end of the optionsArray
	*   so find it and set hover.
	*   (NOTE: there must be only one user-created option in dropdown list with query)
	* - if there's no user-created option in list, just find the first one as usual
	*   (NOTE: exclude options that are disabled or in disabled-group)
	*/
	const checkDefaultFirstOption = () => {
		const optionsInDropdown = filteredOptions.value.filter((n) => !n.disabled && n.type !== "Group");
		const userCreatedOption = optionsInDropdown.find((n) => n.created);
		const firstOriginOption = optionsInDropdown[0];
		states.hoveringIndex = getValueIndex(filteredOptions.value, userCreatedOption || firstOriginOption);
	};
	const emitChange = (val) => {
		if (!isEqual(props.modelValue, val)) emit(CHANGE_EVENT, val);
	};
	const update = (val) => {
		emit(UPDATE_MODEL_EVENT, val);
		emitChange(val);
		states.previousValue = props.multiple ? String(val) : val;
		nextTick(() => {
			if (props.multiple && isArray(props.modelValue)) {
				const cachedOptions = states.cachedOptions.slice();
				const selectedOptions = props.modelValue.map((value) => getOption(value, cachedOptions));
				if (!isEqual(states.cachedOptions, selectedOptions)) states.cachedOptions = selectedOptions;
			} else initStates(true);
		});
	};
	const getValueIndex = (arr = [], value) => {
		if (!isObject(value)) return arr.indexOf(value);
		const valueKey = props.valueKey;
		let index = -1;
		arr.some((item, i) => {
			if (get(item, valueKey) === get(value, valueKey)) {
				index = i;
				return true;
			}
			return false;
		});
		return index;
	};
	const getValueKey = (item) => {
		return isObject(item) ? get(item, props.valueKey) : item;
	};
	const handleResize = () => {
		calculatePopperSize();
	};
	const resetSelectionWidth = () => {
		states.selectionWidth = Number.parseFloat(window.getComputedStyle(selectionRef.value).width);
	};
	const resetCollapseItemWidth = () => {
		states.collapseItemWidth = collapseItemRef.value.getBoundingClientRect().width;
	};
	const updateTooltip = () => {
		tooltipRef.value?.updatePopper?.();
	};
	const updateTagTooltip = () => {
		tagTooltipRef.value?.updatePopper?.();
	};
	const onSelect = (option) => {
		const optionValue = getValue(option);
		if (props.multiple) {
			let selectedOptions = props.modelValue.slice();
			const index = getValueIndex(selectedOptions, optionValue);
			if (index > -1) {
				selectedOptions = [...selectedOptions.slice(0, index), ...selectedOptions.slice(index + 1)];
				states.cachedOptions.splice(index, 1);
				removeNewOption(option);
			} else if (props.multipleLimit <= 0 || selectedOptions.length < props.multipleLimit) {
				selectedOptions = [...selectedOptions, optionValue];
				states.cachedOptions.push(option);
				selectNewOption(option);
			}
			update(selectedOptions);
			if (option.created) handleQueryChange("");
			if (props.filterable && (option.created || !props.reserveKeyword)) states.inputValue = "";
		} else {
			states.selectedLabel = getLabel(option);
			!isEqual(props.modelValue, optionValue) && update(optionValue);
			expanded.value = false;
			selectNewOption(option);
			if (!option.created) clearAllNewOption();
		}
		focus();
	};
	const deleteTag = (event, option) => {
		let selectedOptions = props.modelValue.slice();
		const index = getValueIndex(selectedOptions, getValue(option));
		if (index > -1 && !selectDisabled.value) {
			selectedOptions = [...props.modelValue.slice(0, index), ...props.modelValue.slice(index + 1)];
			states.cachedOptions.splice(index, 1);
			update(selectedOptions);
			emit("remove-tag", getValue(option));
			removeNewOption(option);
		}
		event.stopPropagation();
		focus();
	};
	const focus = () => {
		inputRef.value?.focus();
	};
	const blur = () => {
		if (expanded.value) {
			expanded.value = false;
			nextTick(() => inputRef.value?.blur());
			return;
		}
		inputRef.value?.blur();
	};
	const handleEsc = () => {
		if (states.inputValue.length > 0) states.inputValue = "";
		else expanded.value = false;
	};
	const getLastNotDisabledIndex = (value) => findLastIndex(value, (it) => !states.cachedOptions.some((option) => getValue(option) === it && getDisabled(option)));
	const handleDel = (e) => {
		const code = getEventCode(e);
		if (!props.multiple) return;
		if (code === EVENT_CODE.delete) return;
		if (states.inputValue.length === 0) {
			e.preventDefault();
			const selected = props.modelValue.slice();
			const lastNotDisabledIndex = getLastNotDisabledIndex(selected);
			if (lastNotDisabledIndex < 0) return;
			const removeTagValue = selected[lastNotDisabledIndex];
			selected.splice(lastNotDisabledIndex, 1);
			const option = states.cachedOptions[lastNotDisabledIndex];
			states.cachedOptions.splice(lastNotDisabledIndex, 1);
			removeNewOption(option);
			update(selected);
			emit("remove-tag", removeTagValue);
		}
	};
	const handleClear = () => {
		let emptyValue;
		if (isArray(props.modelValue)) emptyValue = [];
		else emptyValue = valueOnClear.value;
		states.selectedLabel = "";
		expanded.value = false;
		update(emptyValue);
		emit("clear");
		clearAllNewOption();
		focus();
	};
	const onKeyboardNavigate = (direction, hoveringIndex = void 0) => {
		const options = filteredOptions.value;
		if (!["forward", "backward"].includes(direction) || selectDisabled.value || options.length <= 0 || optionsAllDisabled.value || isComposing.value) return;
		if (!expanded.value) return toggleMenu();
		if (isUndefined$1(hoveringIndex)) hoveringIndex = states.hoveringIndex;
		let newIndex = -1;
		if (direction === "forward") {
			newIndex = hoveringIndex + 1;
			if (newIndex >= options.length) newIndex = 0;
		} else if (direction === "backward") {
			newIndex = hoveringIndex - 1;
			if (newIndex < 0 || newIndex >= options.length) newIndex = options.length - 1;
		}
		const option = options[newIndex];
		if (getDisabled(option) || option.type === "Group") return onKeyboardNavigate(direction, newIndex);
		else {
			states.hoveringIndex = newIndex;
			scrollToItem(newIndex);
		}
	};
	const onKeyboardSelect = () => {
		if (!expanded.value) return toggleMenu();
		else if (~states.hoveringIndex && filteredOptions.value[states.hoveringIndex]) onSelect(filteredOptions.value[states.hoveringIndex]);
	};
	const onHoverOption = (idx) => {
		states.hoveringIndex = idx ?? -1;
	};
	const updateHoveringIndex = () => {
		if (!props.multiple) states.hoveringIndex = filteredOptions.value.findIndex((item) => {
			return getValueKey(getValue(item)) === getValueKey(props.modelValue);
		});
		else {
			const length = props.modelValue.length;
			if (length > 0) {
				const lastValue = props.modelValue[length - 1];
				states.hoveringIndex = filteredOptions.value.findIndex((item) => getValueKey(lastValue) === getValueKey(getValue(item)));
			} else states.hoveringIndex = -1;
		}
	};
	const onInput = (event) => {
		states.inputValue = event.target.value;
		if (props.remote) {
			debouncing.value = true;
			debouncedOnInputChange();
		} else return onInputChange();
	};
	const handleClickOutside = (event) => {
		expanded.value = false;
		if (isFocused.value) handleBlur(new FocusEvent("blur", event));
	};
	const handleMenuEnter = () => {
		states.isBeforeHide = false;
		return nextTick(() => {
			if (~indexRef.value) scrollToItem(indexRef.value);
		});
	};
	const scrollToItem = (index) => {
		menuRef.value.scrollToItem(index);
	};
	const getOption = (value, cachedOptions) => {
		const selectValue = getValueKey(value);
		if (allOptionsValueMap.value.has(selectValue)) {
			const { option } = allOptionsValueMap.value.get(selectValue);
			return option;
		}
		if (cachedOptions && cachedOptions.length) {
			const option = cachedOptions.find((option) => getValueKey(getValue(option)) === selectValue);
			if (option) return option;
		}
		return {
			[aliasProps.value.value]: value,
			[aliasProps.value.label]: value
		};
	};
	const getIndex = (option) => allOptionsValueMap.value.get(getValue(option))?.index ?? -1;
	const initStates = (needUpdateSelectedLabel = false) => {
		if (props.multiple) if (props.modelValue.length > 0) {
			const cachedOptions = states.cachedOptions.slice();
			states.cachedOptions.length = 0;
			states.previousValue = props.modelValue.toString();
			for (const value of props.modelValue) {
				const option = getOption(value, cachedOptions);
				states.cachedOptions.push(option);
			}
		} else {
			states.cachedOptions = [];
			states.previousValue = void 0;
		}
		else if (hasModelValue.value) {
			states.previousValue = props.modelValue;
			const options = filteredOptions.value;
			const selectedItemIndex = options.findIndex((option) => getValueKey(getValue(option)) === getValueKey(props.modelValue));
			if (~selectedItemIndex) states.selectedLabel = getLabel(options[selectedItemIndex]);
			else if (!states.selectedLabel || needUpdateSelectedLabel) states.selectedLabel = getValueKey(props.modelValue);
		} else {
			states.selectedLabel = "";
			states.previousValue = void 0;
		}
		clearAllNewOption();
		calculatePopperSize();
	};
	watch(() => props.fitInputWidth, () => {
		calculatePopperSize();
	});
	watch(expanded, (val) => {
		if (val) {
			if (!props.persistent) calculatePopperSize();
			handleQueryChange("");
		} else {
			states.inputValue = "";
			states.previousQuery = null;
			states.isBeforeHide = true;
			states.menuVisibleOnFocus = false;
			createNewOption("");
		}
	});
	watch(() => props.modelValue, (val, oldVal) => {
		if (!val || isArray(val) && val.length === 0 || props.multiple && !isEqual(val.toString(), states.previousValue) || !props.multiple && getValueKey(val) !== getValueKey(states.previousValue)) initStates(true);
		if (!isEqual(val, oldVal) && props.validateEvent) elFormItem?.validate?.("change").catch((err) => debugWarn(err));
	}, { deep: true });
	watch(() => props.options, () => {
		const input = inputRef.value;
		if (!input || input && document.activeElement !== input) initStates();
	}, {
		deep: true,
		flush: "post"
	});
	watch(() => filteredOptions.value, () => {
		calculatePopperSize();
		return menuRef.value && nextTick(menuRef.value.resetScrollTop);
	});
	watchEffect(() => {
		if (states.isBeforeHide) return;
		updateOptions();
	});
	watchEffect(() => {
		const { valueKey, options } = props;
		const duplicateValue = /* @__PURE__ */ new Map();
		for (const item of options) {
			const optionValue = getValue(item);
			let v = optionValue;
			if (isObject(v)) v = get(optionValue, valueKey);
			if (duplicateValue.get(v)) {
				debugWarn("ElSelectV2", `The option values you provided seem to be duplicated, which may cause some problems, please check.`);
				break;
			} else duplicateValue.set(v, true);
		}
	});
	onMounted(() => {
		initStates();
	});
	useResizeObserver(selectRef, handleResize);
	useResizeObserver(selectionRef, resetSelectionWidth);
	useResizeObserver(wrapperRef, updateTooltip);
	useResizeObserver(tagMenuRef, updateTagTooltip);
	useResizeObserver(collapseItemRef, resetCollapseItemWidth);
	let stop;
	watch(() => dropdownMenuVisible.value, (newVal) => {
		if (newVal) stop = useResizeObserver(menuRef, updateTooltip).stop;
		else {
			stop?.();
			stop = void 0;
		}
		emit("visible-change", newVal);
	});
	return {
		inputId,
		collapseTagSize,
		currentPlaceholder,
		expanded,
		emptyText,
		popupHeight,
		debounce,
		allOptions,
		allOptionsValueMap,
		filteredOptions,
		iconComponent,
		iconReverse,
		tagStyle,
		collapseTagStyle,
		popperSize,
		dropdownMenuVisible,
		hasModelValue,
		shouldShowPlaceholder,
		selectDisabled,
		selectSize,
		needStatusIcon,
		showClearBtn,
		states,
		isFocused,
		nsSelect,
		nsInput,
		inputRef,
		menuRef,
		tagMenuRef,
		tooltipRef,
		tagTooltipRef,
		selectRef,
		wrapperRef,
		selectionRef,
		prefixRef,
		suffixRef,
		collapseItemRef,
		popperRef,
		validateState,
		validateIcon,
		showTagList,
		collapseTagList,
		debouncedOnInputChange,
		deleteTag,
		getLabel,
		getValue,
		getDisabled,
		getValueKey,
		getIndex,
		handleClear,
		handleClickOutside,
		handleDel,
		handleEsc,
		focus,
		blur,
		handleMenuEnter,
		handleResize,
		resetSelectionWidth,
		updateTooltip,
		updateTagTooltip,
		updateOptions,
		toggleMenu,
		scrollTo: scrollToItem,
		onInput,
		onKeyboardNavigate,
		onKeyboardSelect,
		onSelect,
		onHover: onHoverOption,
		handleCompositionStart,
		handleCompositionEnd,
		handleCompositionUpdate
	};
};

//#endregion
export { useSelect as default };
//# sourceMappingURL=useSelect.mjs.map
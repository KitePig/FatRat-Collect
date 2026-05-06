import { EVENT_CODE } from "../../../constants/aria.mjs";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { MINIMUM_INPUT_WIDTH } from "../../../constants/form.mjs";
import { isClient as isClient$1, isIOS } from "../../../utils/browser.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isArray, isEmpty, isFunction, isNumber, isObject, isPlainObject as isPlainObject$1, isUndefined as isUndefined$1 } from "../../../utils/types.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { scrollIntoView } from "../../../utils/dom/scroll.mjs";
import { ValidateComponentsMap } from "../../../utils/vue/icon.mjs";
import { ensureArray } from "../../../utils/arrays.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { useFocusController } from "../../../hooks/use-focus-controller/index.mjs";
import { useComposition } from "../../../hooks/use-composition/index.mjs";
import { useEmptyValues } from "../../../hooks/use-empty-values/index.mjs";
import { useFormDisabled, useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem, useFormItemInputId } from "../../form/src/hooks/use-form-item.mjs";
import { useDebounceFn, useResizeObserver } from "@vueuse/core";
import { clamp as clamp$1, findLastIndex, get, isEqual, isNil } from "lodash-unified";
import { computed, nextTick, onMounted, reactive, ref, useSlots, watch, watchEffect } from "vue";

//#region ../../packages/components/select/src/useSelect.ts
const useSelect = (props, emit) => {
	const { t } = useLocale();
	const slots = useSlots();
	const contentId = useId();
	const nsSelect = useNamespace("select");
	const nsInput = useNamespace("input");
	const states = reactive({
		inputValue: "",
		options: /* @__PURE__ */ new Map(),
		cachedOptions: /* @__PURE__ */ new Map(),
		optionValues: [],
		selected: [],
		selectionWidth: 0,
		collapseItemWidth: 0,
		selectedLabel: "",
		hoveringIndex: -1,
		previousQuery: null,
		inputHovering: false,
		menuVisibleOnFocus: false,
		isBeforeHide: false
	});
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
	const scrollbarRef = ref();
	const expanded = ref(false);
	const hoverOption = ref();
	const debouncing = ref(false);
	const { form, formItem } = useFormItem();
	const { inputId } = useFormItemInputId(props, { formItemContext: formItem });
	const { valueOnClear, isEmptyValue } = useEmptyValues(props);
	const { isComposing, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd } = useComposition({ afterComposition: (e) => onInput(e) });
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
			if (props.validateEvent) formItem?.validate?.("blur").catch((err) => debugWarn(err));
		}
	});
	const hasModelValue = computed(() => {
		return isArray(props.modelValue) ? props.modelValue.length > 0 : !isEmptyValue(props.modelValue);
	});
	const needStatusIcon = computed(() => form?.statusIcon ?? false);
	const showClearBtn = computed(() => {
		return props.clearable && !selectDisabled.value && hasModelValue.value && (isFocused.value || states.inputHovering);
	});
	const iconComponent = computed(() => props.remote && props.filterable && !props.remoteShowSuffix ? "" : props.suffixIcon);
	const iconReverse = computed(() => nsSelect.is("reverse", !!(iconComponent.value && expanded.value)));
	const validateState = computed(() => formItem?.validateState || "");
	const validateIcon = computed(() => validateState.value && ValidateComponentsMap[validateState.value]);
	const debounce = computed(() => props.remote ? props.debounce : 0);
	const isRemoteSearchEmpty = computed(() => props.remote && !states.inputValue && states.options.size === 0);
	const emptyText = computed(() => {
		if (props.loading) return props.loadingText || t("el.select.loading");
		else {
			if (props.filterable && states.inputValue && states.options.size > 0 && filteredOptionsCount.value === 0) return props.noMatchText || t("el.select.noMatch");
			if (states.options.size === 0) return props.noDataText || t("el.select.noData");
		}
		return null;
	});
	const filteredOptionsCount = computed(() => optionsArray.value.filter((option) => option.visible).length);
	const optionsArray = computed(() => {
		const list = Array.from(states.options.values());
		const newList = [];
		states.optionValues.forEach((item) => {
			const index = list.findIndex((i) => i.value === item);
			if (index > -1) newList.push(list[index]);
		});
		return newList.length >= list.length ? newList : list;
	});
	const cachedOptionsArray = computed(() => Array.from(states.cachedOptions.values()));
	const showNewOption = computed(() => {
		const hasExistingOption = optionsArray.value.filter((option) => {
			return !option.created;
		}).some((option) => {
			return option.currentLabel === states.inputValue;
		});
		return props.filterable && props.allowCreate && states.inputValue !== "" && !hasExistingOption;
	});
	const updateOptions = () => {
		if (props.filterable && isFunction(props.filterMethod)) return;
		if (props.filterable && props.remote && isFunction(props.remoteMethod)) return;
		optionsArray.value.forEach((option) => {
			option.updateOption?.(states.inputValue);
		});
	};
	const selectSize = useFormSize();
	const collapseTagSize = computed(() => ["small"].includes(selectSize.value) ? "small" : "default");
	const dropdownMenuVisible = computed({
		get() {
			return expanded.value && (props.loading || !isRemoteSearchEmpty.value || props.remote && !!slots.empty) && (!debouncing.value || !isEmpty(states.previousQuery) || states.options.size > 0);
		},
		set(val) {
			expanded.value = val;
		}
	});
	const shouldShowPlaceholder = computed(() => {
		if (props.multiple && !isUndefined$1(props.modelValue)) return ensureArray(props.modelValue).length === 0 && !states.inputValue;
		const value = isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
		return props.filterable || isUndefined$1(value) ? !states.inputValue : true;
	});
	const currentPlaceholder = computed(() => {
		const _placeholder = props.placeholder ?? t("el.select.placeholder");
		return props.multiple || !hasModelValue.value ? _placeholder : states.selectedLabel;
	});
	const mouseEnterEventName = computed(() => isIOS ? null : "mouseenter");
	watch(() => props.modelValue, (val, oldVal) => {
		if (props.multiple) {
			if (props.filterable && !props.reserveKeyword) {
				states.inputValue = "";
				handleQueryChange("");
			}
		}
		setSelected();
		if (!isEqual(val, oldVal) && props.validateEvent) formItem?.validate("change").catch((err) => debugWarn(err));
	}, {
		flush: "post",
		deep: true
	});
	watch(() => expanded.value, (val) => {
		if (val) handleQueryChange(states.inputValue);
		else {
			states.inputValue = "";
			states.previousQuery = null;
			states.isBeforeHide = true;
			states.menuVisibleOnFocus = false;
		}
	});
	watch(() => states.options.entries(), () => {
		if (!isClient$1) return;
		setSelected();
		if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) checkDefaultFirstOption();
	}, { flush: "post" });
	watch([() => states.hoveringIndex, optionsArray], ([val]) => {
		if (isNumber(val) && val > -1) hoverOption.value = optionsArray.value[val] || {};
		else hoverOption.value = {};
		optionsArray.value.forEach((option) => {
			option.hover = hoverOption.value === option;
		});
	});
	watchEffect(() => {
		if (states.isBeforeHide) return;
		updateOptions();
	});
	const handleQueryChange = (val) => {
		if (states.previousQuery === val || isComposing.value) return;
		states.previousQuery = val;
		if (props.filterable && isFunction(props.filterMethod)) props.filterMethod(val);
		else if (props.filterable && props.remote && isFunction(props.remoteMethod)) props.remoteMethod(val);
		if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) nextTick(checkDefaultFirstOption);
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
		const optionsInDropdown = optionsArray.value.filter((n) => n.visible && !n.disabled && !n.states.groupDisabled);
		const userCreatedOption = optionsInDropdown.find((n) => n.created);
		const firstOriginOption = optionsInDropdown[0];
		states.hoveringIndex = getValueIndex(optionsArray.value.map((item) => item.value), userCreatedOption || firstOriginOption);
	};
	const setSelected = () => {
		if (!props.multiple) {
			const option = getOption(isArray(props.modelValue) ? props.modelValue[0] : props.modelValue);
			states.selectedLabel = option.currentLabel;
			states.selected = [option];
			return;
		} else states.selectedLabel = "";
		const result = [];
		if (!isUndefined$1(props.modelValue)) ensureArray(props.modelValue).forEach((value) => {
			result.push(getOption(value));
		});
		states.selected = result;
	};
	const getOption = (value) => {
		let option;
		const isObjectValue = isPlainObject$1(value);
		for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
			const cachedOption = cachedOptionsArray.value[i];
			if (isObjectValue ? get(cachedOption.value, props.valueKey) === get(value, props.valueKey) : cachedOption.value === value) {
				option = {
					index: optionsArray.value.filter((opt) => !opt.created).indexOf(cachedOption),
					value,
					currentLabel: cachedOption.currentLabel,
					get isDisabled() {
						return cachedOption.isDisabled;
					}
				};
				break;
			}
		}
		if (option) return option;
		return {
			index: -1,
			value,
			currentLabel: isObjectValue ? value.label : value ?? ""
		};
	};
	const updateHoveringIndex = () => {
		const length = states.selected.length;
		if (length > 0) {
			const lastOption = states.selected[length - 1];
			states.hoveringIndex = optionsArray.value.findIndex((item) => getValueKey(lastOption) === getValueKey(item));
		} else states.hoveringIndex = -1;
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
	const onInputChange = () => {
		if (states.inputValue.length > 0 && !expanded.value) expanded.value = true;
		handleQueryChange(states.inputValue);
	};
	const onInput = (event) => {
		states.inputValue = event.target.value;
		if (props.remote) {
			debouncing.value = true;
			debouncedOnInputChange();
		} else return onInputChange();
	};
	const debouncedOnInputChange = useDebounceFn(() => {
		onInputChange();
		debouncing.value = false;
	}, debounce);
	const emitChange = (val) => {
		if (!isEqual(props.modelValue, val)) emit(CHANGE_EVENT, val);
	};
	const getLastNotDisabledIndex = (value) => findLastIndex(value, (it) => {
		const option = states.cachedOptions.get(it);
		return !option?.disabled && !option?.states.groupDisabled;
	});
	const deletePrevTag = (e) => {
		const code = getEventCode(e);
		if (!props.multiple) return;
		if (code === EVENT_CODE.delete) return;
		if (e.target.value.length <= 0) {
			const value = ensureArray(props.modelValue).slice();
			const lastNotDisabledIndex = getLastNotDisabledIndex(value);
			if (lastNotDisabledIndex < 0) return;
			const removeTagValue = value[lastNotDisabledIndex];
			value.splice(lastNotDisabledIndex, 1);
			emit(UPDATE_MODEL_EVENT, value);
			emitChange(value);
			emit("remove-tag", removeTagValue);
		}
	};
	const deleteTag = (event, tag) => {
		const index = states.selected.indexOf(tag);
		if (index > -1 && !selectDisabled.value) {
			const value = ensureArray(props.modelValue).slice();
			value.splice(index, 1);
			emit(UPDATE_MODEL_EVENT, value);
			emitChange(value);
			emit("remove-tag", tag.value);
		}
		event.stopPropagation();
		focus();
	};
	const deleteSelected = (event) => {
		event.stopPropagation();
		const value = props.multiple ? [] : valueOnClear.value;
		if (props.multiple) {
			for (const item of states.selected) if (item.isDisabled) value.push(item.value);
		}
		emit(UPDATE_MODEL_EVENT, value);
		emitChange(value);
		states.hoveringIndex = -1;
		expanded.value = false;
		emit("clear");
		focus();
	};
	const handleOptionSelect = (option) => {
		if (props.multiple) {
			const value = ensureArray(props.modelValue ?? []).slice();
			const optionIndex = getValueIndex(value, option);
			if (optionIndex > -1) value.splice(optionIndex, 1);
			else if (props.multipleLimit <= 0 || value.length < props.multipleLimit) value.push(option.value);
			emit(UPDATE_MODEL_EVENT, value);
			emitChange(value);
			if (option.created) handleQueryChange("");
			if (props.filterable && (option.created || !props.reserveKeyword)) states.inputValue = "";
		} else {
			!isEqual(props.modelValue, option.value) && emit(UPDATE_MODEL_EVENT, option.value);
			emitChange(option.value);
			expanded.value = false;
		}
		focus();
		if (expanded.value) return;
		nextTick(() => {
			scrollToOption(option);
		});
	};
	const getValueIndex = (arr, option) => {
		if (isUndefined$1(option)) return -1;
		if (!isObject(option.value)) return arr.indexOf(option.value);
		return arr.findIndex((item) => {
			return isEqual(get(item, props.valueKey), getValueKey(option));
		});
	};
	const scrollToOption = (option) => {
		const targetOption = isArray(option) ? option[option.length - 1] : option;
		let target = null;
		if (!isNil(targetOption?.value)) {
			const options = optionsArray.value.filter((item) => item.value === targetOption.value);
			if (options.length > 0) target = options[0].$el;
		}
		if (tooltipRef.value && target) {
			const menu = tooltipRef.value?.popperRef?.contentRef?.querySelector?.(`.${nsSelect.be("dropdown", "wrap")}`);
			if (menu) scrollIntoView(menu, target);
		}
		scrollbarRef.value?.handleScroll();
	};
	const onOptionCreate = (vm) => {
		states.options.set(vm.value, vm);
		states.cachedOptions.set(vm.value, vm);
	};
	const onOptionDestroy = (key, vm) => {
		if (states.options.get(key) === vm) states.options.delete(key);
	};
	const popperRef = computed(() => {
		return tooltipRef.value?.popperRef?.contentRef;
	});
	const handleMenuEnter = () => {
		states.isBeforeHide = false;
		nextTick(() => {
			scrollbarRef.value?.update();
			scrollToOption(states.selected);
		});
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
	const handleClearClick = (event) => {
		deleteSelected(event);
	};
	const handleClickOutside = (event) => {
		expanded.value = false;
		if (isFocused.value) {
			const _event = new FocusEvent("blur", event);
			nextTick(() => handleBlur(_event));
		}
	};
	const handleEsc = () => {
		if (states.inputValue.length > 0) states.inputValue = "";
		else expanded.value = false;
	};
	const toggleMenu = (event) => {
		if (selectDisabled.value || props.filterable && expanded.value && event && !suffixRef.value?.contains(event.target)) return;
		if (isIOS) states.inputHovering = true;
		if (states.menuVisibleOnFocus) states.menuVisibleOnFocus = false;
		else expanded.value = !expanded.value;
	};
	const selectOption = () => {
		if (!expanded.value) toggleMenu();
		else {
			const option = optionsArray.value[states.hoveringIndex];
			if (option && !option.isDisabled) handleOptionSelect(option);
		}
	};
	const getValueKey = (item) => {
		return isObject(item.value) ? get(item.value, props.valueKey) : item.value;
	};
	const optionsAllDisabled = computed(() => optionsArray.value.filter((option) => option.visible).every((option) => option.isDisabled));
	const showTagList = computed(() => {
		if (!props.multiple) return [];
		return props.collapseTags ? states.selected.slice(0, props.maxCollapseTags) : states.selected;
	});
	const collapseTagList = computed(() => {
		if (!props.multiple) return [];
		return props.collapseTags ? states.selected.slice(props.maxCollapseTags) : [];
	});
	const navigateOptions = (direction) => {
		if (!expanded.value) {
			expanded.value = true;
			return;
		}
		if (states.options.size === 0 || filteredOptionsCount.value === 0 || isComposing.value) return;
		if (!optionsAllDisabled.value) {
			if (direction === "next") {
				states.hoveringIndex++;
				if (states.hoveringIndex === states.options.size) states.hoveringIndex = 0;
			} else if (direction === "prev") {
				states.hoveringIndex--;
				if (states.hoveringIndex < 0) states.hoveringIndex = states.options.size - 1;
			}
			const option = optionsArray.value[states.hoveringIndex];
			if (option.isDisabled || !option.visible) navigateOptions(direction);
			nextTick(() => scrollToOption(hoverOption.value));
		}
	};
	const findFocusableIndex = (arr, start, step, len) => {
		for (let i = start; i >= 0 && i < len; i += step) {
			const obj = arr[i];
			if (!obj?.isDisabled && obj?.visible) return i;
		}
		return null;
	};
	const focusOption = (targetIndex, mode) => {
		const len = states.options.size;
		if (len === 0) return;
		const start = clamp$1(targetIndex, 0, len - 1);
		const options = optionsArray.value;
		const direction = mode === "up" ? -1 : 1;
		const newIndex = findFocusableIndex(options, start, direction, len) ?? findFocusableIndex(options, start - direction, -direction, len);
		if (newIndex != null) {
			states.hoveringIndex = newIndex;
			nextTick(() => scrollToOption(hoverOption.value));
		}
	};
	const handleKeydown = (e) => {
		const code = getEventCode(e);
		let isPreventDefault = true;
		switch (code) {
			case EVENT_CODE.up:
				navigateOptions("prev");
				break;
			case EVENT_CODE.down:
				navigateOptions("next");
				break;
			case EVENT_CODE.enter:
			case EVENT_CODE.numpadEnter:
				if (!isComposing.value) selectOption();
				break;
			case EVENT_CODE.esc:
				handleEsc();
				break;
			case EVENT_CODE.backspace:
				isPreventDefault = false;
				deletePrevTag(e);
				return;
			case EVENT_CODE.home:
				if (!expanded.value) return;
				focusOption(0, "down");
				break;
			case EVENT_CODE.end:
				if (!expanded.value) return;
				focusOption(states.options.size - 1, "up");
				break;
			case EVENT_CODE.pageUp:
				if (!expanded.value) return;
				focusOption(states.hoveringIndex - 10, "up");
				break;
			case EVENT_CODE.pageDown:
				if (!expanded.value) return;
				focusOption(states.hoveringIndex + 10, "down");
				break;
			default:
				isPreventDefault = false;
				break;
		}
		if (isPreventDefault) {
			e.preventDefault();
			e.stopPropagation();
		}
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
	const popupScroll = (data) => {
		emit("popup-scroll", data);
	};
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
	onMounted(() => {
		setSelected();
	});
	return {
		inputId,
		contentId,
		nsSelect,
		nsInput,
		states,
		isFocused,
		expanded,
		optionsArray,
		hoverOption,
		selectSize,
		filteredOptionsCount,
		updateTooltip,
		updateTagTooltip,
		debouncedOnInputChange,
		onInput,
		deletePrevTag,
		deleteTag,
		deleteSelected,
		handleOptionSelect,
		scrollToOption,
		hasModelValue,
		shouldShowPlaceholder,
		currentPlaceholder,
		mouseEnterEventName,
		needStatusIcon,
		showClearBtn,
		iconComponent,
		iconReverse,
		validateState,
		validateIcon,
		showNewOption,
		updateOptions,
		collapseTagSize,
		setSelected,
		selectDisabled,
		emptyText,
		handleCompositionStart,
		handleCompositionUpdate,
		handleCompositionEnd,
		handleKeydown,
		onOptionCreate,
		onOptionDestroy,
		handleMenuEnter,
		focus,
		blur,
		handleClearClick,
		handleClickOutside,
		handleEsc,
		toggleMenu,
		selectOption,
		getValueKey,
		navigateOptions,
		dropdownMenuVisible,
		showTagList,
		collapseTagList,
		popupScroll,
		getOption,
		tagStyle,
		collapseTagStyle,
		popperRef,
		inputRef,
		tooltipRef,
		tagTooltipRef,
		prefixRef,
		suffixRef,
		selectRef,
		wrapperRef,
		selectionRef,
		scrollbarRef,
		menuRef,
		tagMenuRef,
		collapseItemRef
	};
};

//#endregion
export { useSelect };
//# sourceMappingURL=useSelect.mjs.map
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_form = require('../../../constants/form.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_types = require('../../../utils/types.js');
const require_strings = require('../../../utils/strings.js');
const require_error = require('../../../utils/error.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../hooks/use-focus-controller/index.js');
const require_index$3 = require('../../../hooks/use-composition/index.js');
const require_index$4 = require('../../../hooks/use-empty-values/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_useProps = require('./useProps.js');
const require_useAllowCreate = require('./useAllowCreate.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/select-v2/src/useSelect.ts
const useSelect = (props, emit) => {
	const { t } = require_index.useLocale();
	const slots = (0, vue.useSlots)();
	const nsSelect = require_index$1.useNamespace("select");
	const nsInput = require_index$1.useNamespace("input");
	const { form: elForm, formItem: elFormItem } = require_use_form_item.useFormItem();
	const { inputId } = require_use_form_item.useFormItemInputId(props, { formItemContext: elFormItem });
	const { aliasProps, getLabel, getValue, getDisabled, getOptions } = require_useProps.useProps(props);
	const { valueOnClear, isEmptyValue } = require_index$4.useEmptyValues(props);
	const states = (0, vue.reactive)({
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
	const popperSize = (0, vue.ref)(-1);
	const debouncing = (0, vue.ref)(false);
	const selectRef = (0, vue.ref)();
	const selectionRef = (0, vue.ref)();
	const tooltipRef = (0, vue.ref)();
	const tagTooltipRef = (0, vue.ref)();
	const inputRef = (0, vue.ref)();
	const prefixRef = (0, vue.ref)();
	const suffixRef = (0, vue.ref)();
	const menuRef = (0, vue.ref)();
	const tagMenuRef = (0, vue.ref)();
	const collapseItemRef = (0, vue.ref)();
	const { isComposing, handleCompositionStart, handleCompositionEnd, handleCompositionUpdate } = require_index$3.useComposition({ afterComposition: (e) => onInput(e) });
	const selectDisabled = require_use_form_common_props.useFormDisabled();
	const { wrapperRef, isFocused, handleBlur } = require_index$2.useFocusController(inputRef, {
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
			if (props.validateEvent) elFormItem?.validate?.("blur").catch((err) => require_error.debugWarn(err));
		}
	});
	const allOptions = (0, vue.computed)(() => filterOptions(""));
	const hasOptions = (0, vue.computed)(() => {
		if (props.loading) return false;
		return props.options.length > 0 || states.createdOptions.length > 0;
	});
	const filteredOptions = (0, vue.ref)([]);
	const expanded = (0, vue.ref)(false);
	const needStatusIcon = (0, vue.computed)(() => elForm?.statusIcon ?? false);
	const popupHeight = (0, vue.computed)(() => {
		const totalHeight = filteredOptions.value.length * props.itemHeight;
		return totalHeight > props.height ? props.height : totalHeight;
	});
	const hasModelValue = (0, vue.computed)(() => {
		return props.multiple ? (0, _vue_shared.isArray)(props.modelValue) && props.modelValue.length > 0 : !isEmptyValue(props.modelValue);
	});
	const showClearBtn = (0, vue.computed)(() => {
		return props.clearable && !selectDisabled.value && hasModelValue.value && (isFocused.value || states.inputHovering);
	});
	const iconComponent = (0, vue.computed)(() => props.remote && props.filterable && !props.remoteShowSuffix ? "" : props.suffixIcon);
	const iconReverse = (0, vue.computed)(() => iconComponent.value && nsSelect.is("reverse", expanded.value));
	const validateState = (0, vue.computed)(() => elFormItem?.validateState || "");
	const validateIcon = (0, vue.computed)(() => {
		if (!validateState.value) return;
		return require_icon.ValidateComponentsMap[validateState.value];
	});
	const debounce = (0, vue.computed)(() => props.remote ? props.debounce : 0);
	const isRemoteSearchEmpty = (0, vue.computed)(() => props.remote && !states.inputValue && !hasOptions.value);
	const emptyText = (0, vue.computed)(() => {
		if (props.loading) return props.loadingText || t("el.select.loading");
		else {
			if (props.filterable && states.inputValue && hasOptions.value && filteredOptions.value.length === 0) return props.noMatchText || t("el.select.noMatch");
			if (!hasOptions.value) return props.noDataText || t("el.select.noData");
		}
		return null;
	});
	const isFilterMethodValid = (0, vue.computed)(() => props.filterable && (0, _vue_shared.isFunction)(props.filterMethod));
	const isRemoteMethodValid = (0, vue.computed)(() => props.filterable && props.remote && (0, _vue_shared.isFunction)(props.remoteMethod));
	const filterOptions = (query) => {
		const regexp = new RegExp(require_strings.escapeStringRegexp(query), "i");
		const isValidOption = (o) => {
			if (isFilterMethodValid.value || isRemoteMethodValid.value) return true;
			return query ? regexp.test(getLabel(o) || "") : true;
		};
		if (props.loading) return [];
		return [...states.createdOptions, ...props.options].reduce((all, item) => {
			const options = getOptions(item);
			if ((0, _vue_shared.isArray)(options)) {
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
	const allOptionsValueMap = (0, vue.computed)(() => {
		const valueMap = /* @__PURE__ */ new Map();
		allOptions.value.forEach((option, index) => {
			valueMap.set(getValueKey(getValue(option)), {
				option,
				index
			});
		});
		return valueMap;
	});
	const filteredOptionsValueMap = (0, vue.computed)(() => {
		const valueMap = /* @__PURE__ */ new Map();
		filteredOptions.value.forEach((option, index) => {
			valueMap.set(getValueKey(getValue(option)), {
				option,
				index
			});
		});
		return valueMap;
	});
	const optionsAllDisabled = (0, vue.computed)(() => filteredOptions.value.every((option) => getDisabled(option)));
	const selectSize = require_use_form_common_props.useFormSize();
	const collapseTagSize = (0, vue.computed)(() => "small" === selectSize.value ? "small" : "default");
	const calculatePopperSize = () => {
		if (require_types.isNumber(props.fitInputWidth)) {
			popperSize.value = props.fitInputWidth;
			return;
		}
		const width = selectRef.value?.offsetWidth || 200;
		if (!props.fitInputWidth && hasOptions.value) (0, vue.nextTick)(() => {
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
	const tagStyle = (0, vue.computed)(() => {
		const gapWidth = getGapWidth();
		const inputSlotWidth = props.filterable ? gapWidth + require_form.MINIMUM_INPUT_WIDTH : 0;
		return { maxWidth: `${collapseItemRef.value && props.maxCollapseTags === 1 ? states.selectionWidth - states.collapseItemWidth - gapWidth - inputSlotWidth : states.selectionWidth - inputSlotWidth}px` };
	});
	const collapseTagStyle = (0, vue.computed)(() => {
		return { maxWidth: `${states.selectionWidth}px` };
	});
	const shouldShowPlaceholder = (0, vue.computed)(() => {
		if ((0, _vue_shared.isArray)(props.modelValue)) return props.modelValue.length === 0 && !states.inputValue;
		return props.filterable ? !states.inputValue : true;
	});
	const currentPlaceholder = (0, vue.computed)(() => {
		const _placeholder = props.placeholder ?? t("el.select.placeholder");
		return props.multiple || !hasModelValue.value ? _placeholder : states.selectedLabel;
	});
	const popperRef = (0, vue.computed)(() => tooltipRef.value?.popperRef?.contentRef);
	const indexRef = (0, vue.computed)(() => {
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
	const dropdownMenuVisible = (0, vue.computed)({
		get() {
			return expanded.value && (props.loading || !isRemoteSearchEmpty.value || props.remote && !!slots.empty) && (!debouncing.value || !require_types.isEmpty(states.previousQuery) || hasOptions.value);
		},
		set(val) {
			expanded.value = val;
		}
	});
	const showTagList = (0, vue.computed)(() => {
		if (!props.multiple) return [];
		return props.collapseTags ? states.cachedOptions.slice(0, props.maxCollapseTags) : states.cachedOptions;
	});
	const collapseTagList = (0, vue.computed)(() => {
		if (!props.multiple) return [];
		return props.collapseTags ? states.cachedOptions.slice(props.maxCollapseTags) : [];
	});
	const { createNewOption, removeNewOption, selectNewOption, clearAllNewOption } = require_useAllowCreate.useAllowCreate(props, states);
	const toggleMenu = (event) => {
		if (selectDisabled.value || props.filterable && expanded.value && event && !suffixRef.value?.contains(event.target)) return;
		if (states.menuVisibleOnFocus) states.menuVisibleOnFocus = false;
		else expanded.value = !expanded.value;
	};
	const onInputChange = () => {
		if (states.inputValue.length > 0 && !expanded.value) expanded.value = true;
		createNewOption(states.inputValue);
		(0, vue.nextTick)(() => {
			handleQueryChange(states.inputValue);
		});
	};
	const debouncedOnInputChange = (0, _vueuse_core.useDebounceFn)(() => {
		onInputChange();
		debouncing.value = false;
	}, debounce);
	const handleQueryChange = (val) => {
		if (states.previousQuery === val || isComposing.value) return;
		states.previousQuery = val;
		if (props.filterable && (0, _vue_shared.isFunction)(props.filterMethod)) props.filterMethod(val);
		else if (props.filterable && props.remote && (0, _vue_shared.isFunction)(props.remoteMethod)) props.remoteMethod(val);
		if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptions.value.length) (0, vue.nextTick)(checkDefaultFirstOption);
		else (0, vue.nextTick)(updateHoveringIndex);
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
		if (!(0, lodash_unified.isEqual)(props.modelValue, val)) emit(require_event.CHANGE_EVENT, val);
	};
	const update = (val) => {
		emit(require_event.UPDATE_MODEL_EVENT, val);
		emitChange(val);
		states.previousValue = props.multiple ? String(val) : val;
		(0, vue.nextTick)(() => {
			if (props.multiple && (0, _vue_shared.isArray)(props.modelValue)) {
				const cachedOptions = states.cachedOptions.slice();
				const selectedOptions = props.modelValue.map((value) => getOption(value, cachedOptions));
				if (!(0, lodash_unified.isEqual)(states.cachedOptions, selectedOptions)) states.cachedOptions = selectedOptions;
			} else initStates(true);
		});
	};
	const getValueIndex = (arr = [], value) => {
		if (!(0, _vue_shared.isObject)(value)) return arr.indexOf(value);
		const valueKey = props.valueKey;
		let index = -1;
		arr.some((item, i) => {
			if ((0, lodash_unified.get)(item, valueKey) === (0, lodash_unified.get)(value, valueKey)) {
				index = i;
				return true;
			}
			return false;
		});
		return index;
	};
	const getValueKey = (item) => {
		return (0, _vue_shared.isObject)(item) ? (0, lodash_unified.get)(item, props.valueKey) : item;
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
			!(0, lodash_unified.isEqual)(props.modelValue, optionValue) && update(optionValue);
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
			(0, vue.nextTick)(() => inputRef.value?.blur());
			return;
		}
		inputRef.value?.blur();
	};
	const handleEsc = () => {
		if (states.inputValue.length > 0) states.inputValue = "";
		else expanded.value = false;
	};
	const getLastNotDisabledIndex = (value) => (0, lodash_unified.findLastIndex)(value, (it) => !states.cachedOptions.some((option) => getValue(option) === it && getDisabled(option)));
	const handleDel = (e) => {
		const code = require_event$1.getEventCode(e);
		if (!props.multiple) return;
		if (code === require_aria.EVENT_CODE.delete) return;
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
		if ((0, _vue_shared.isArray)(props.modelValue)) emptyValue = [];
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
		if (require_types.isUndefined(hoveringIndex)) hoveringIndex = states.hoveringIndex;
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
		return (0, vue.nextTick)(() => {
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
	(0, vue.watch)(() => props.fitInputWidth, () => {
		calculatePopperSize();
	});
	(0, vue.watch)(expanded, (val) => {
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
	(0, vue.watch)(() => props.modelValue, (val, oldVal) => {
		if (!val || (0, _vue_shared.isArray)(val) && val.length === 0 || props.multiple && !(0, lodash_unified.isEqual)(val.toString(), states.previousValue) || !props.multiple && getValueKey(val) !== getValueKey(states.previousValue)) initStates(true);
		if (!(0, lodash_unified.isEqual)(val, oldVal) && props.validateEvent) elFormItem?.validate?.("change").catch((err) => require_error.debugWarn(err));
	}, { deep: true });
	(0, vue.watch)(() => props.options, () => {
		const input = inputRef.value;
		if (!input || input && document.activeElement !== input) initStates();
	}, {
		deep: true,
		flush: "post"
	});
	(0, vue.watch)(() => filteredOptions.value, () => {
		calculatePopperSize();
		return menuRef.value && (0, vue.nextTick)(menuRef.value.resetScrollTop);
	});
	(0, vue.watchEffect)(() => {
		if (states.isBeforeHide) return;
		updateOptions();
	});
	(0, vue.watchEffect)(() => {
		const { valueKey, options } = props;
		const duplicateValue = /* @__PURE__ */ new Map();
		for (const item of options) {
			const optionValue = getValue(item);
			let v = optionValue;
			if ((0, _vue_shared.isObject)(v)) v = (0, lodash_unified.get)(optionValue, valueKey);
			if (duplicateValue.get(v)) {
				require_error.debugWarn("ElSelectV2", `The option values you provided seem to be duplicated, which may cause some problems, please check.`);
				break;
			} else duplicateValue.set(v, true);
		}
	});
	(0, vue.onMounted)(() => {
		initStates();
	});
	(0, _vueuse_core.useResizeObserver)(selectRef, handleResize);
	(0, _vueuse_core.useResizeObserver)(selectionRef, resetSelectionWidth);
	(0, _vueuse_core.useResizeObserver)(wrapperRef, updateTooltip);
	(0, _vueuse_core.useResizeObserver)(tagMenuRef, updateTagTooltip);
	(0, _vueuse_core.useResizeObserver)(collapseItemRef, resetCollapseItemWidth);
	let stop;
	(0, vue.watch)(() => dropdownMenuVisible.value, (newVal) => {
		if (newVal) stop = (0, _vueuse_core.useResizeObserver)(menuRef, updateTooltip).stop;
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
exports.default = useSelect;
//# sourceMappingURL=useSelect.js.map
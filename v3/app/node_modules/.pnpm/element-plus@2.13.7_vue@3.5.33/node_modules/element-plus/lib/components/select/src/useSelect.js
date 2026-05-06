Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_form = require('../../../constants/form.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_scroll = require('../../../utils/dom/scroll.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../hooks/use-id/index.js');
const require_index$3 = require('../../../hooks/use-focus-controller/index.js');
const require_index$4 = require('../../../hooks/use-composition/index.js');
const require_index$5 = require('../../../hooks/use-empty-values/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/select/src/useSelect.ts
const useSelect = (props, emit) => {
	const { t } = require_index.useLocale();
	const slots = (0, vue.useSlots)();
	const contentId = require_index$2.useId();
	const nsSelect = require_index$1.useNamespace("select");
	const nsInput = require_index$1.useNamespace("input");
	const states = (0, vue.reactive)({
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
	const scrollbarRef = (0, vue.ref)();
	const expanded = (0, vue.ref)(false);
	const hoverOption = (0, vue.ref)();
	const debouncing = (0, vue.ref)(false);
	const { form, formItem } = require_use_form_item.useFormItem();
	const { inputId } = require_use_form_item.useFormItemInputId(props, { formItemContext: formItem });
	const { valueOnClear, isEmptyValue } = require_index$5.useEmptyValues(props);
	const { isComposing, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd } = require_index$4.useComposition({ afterComposition: (e) => onInput(e) });
	const selectDisabled = require_use_form_common_props.useFormDisabled();
	const { wrapperRef, isFocused, handleBlur } = require_index$3.useFocusController(inputRef, {
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
			if (props.validateEvent) formItem?.validate?.("blur").catch((err) => require_error.debugWarn(err));
		}
	});
	const hasModelValue = (0, vue.computed)(() => {
		return (0, _vue_shared.isArray)(props.modelValue) ? props.modelValue.length > 0 : !isEmptyValue(props.modelValue);
	});
	const needStatusIcon = (0, vue.computed)(() => form?.statusIcon ?? false);
	const showClearBtn = (0, vue.computed)(() => {
		return props.clearable && !selectDisabled.value && hasModelValue.value && (isFocused.value || states.inputHovering);
	});
	const iconComponent = (0, vue.computed)(() => props.remote && props.filterable && !props.remoteShowSuffix ? "" : props.suffixIcon);
	const iconReverse = (0, vue.computed)(() => nsSelect.is("reverse", !!(iconComponent.value && expanded.value)));
	const validateState = (0, vue.computed)(() => formItem?.validateState || "");
	const validateIcon = (0, vue.computed)(() => validateState.value && require_icon.ValidateComponentsMap[validateState.value]);
	const debounce = (0, vue.computed)(() => props.remote ? props.debounce : 0);
	const isRemoteSearchEmpty = (0, vue.computed)(() => props.remote && !states.inputValue && states.options.size === 0);
	const emptyText = (0, vue.computed)(() => {
		if (props.loading) return props.loadingText || t("el.select.loading");
		else {
			if (props.filterable && states.inputValue && states.options.size > 0 && filteredOptionsCount.value === 0) return props.noMatchText || t("el.select.noMatch");
			if (states.options.size === 0) return props.noDataText || t("el.select.noData");
		}
		return null;
	});
	const filteredOptionsCount = (0, vue.computed)(() => optionsArray.value.filter((option) => option.visible).length);
	const optionsArray = (0, vue.computed)(() => {
		const list = Array.from(states.options.values());
		const newList = [];
		states.optionValues.forEach((item) => {
			const index = list.findIndex((i) => i.value === item);
			if (index > -1) newList.push(list[index]);
		});
		return newList.length >= list.length ? newList : list;
	});
	const cachedOptionsArray = (0, vue.computed)(() => Array.from(states.cachedOptions.values()));
	const showNewOption = (0, vue.computed)(() => {
		const hasExistingOption = optionsArray.value.filter((option) => {
			return !option.created;
		}).some((option) => {
			return option.currentLabel === states.inputValue;
		});
		return props.filterable && props.allowCreate && states.inputValue !== "" && !hasExistingOption;
	});
	const updateOptions = () => {
		if (props.filterable && (0, _vue_shared.isFunction)(props.filterMethod)) return;
		if (props.filterable && props.remote && (0, _vue_shared.isFunction)(props.remoteMethod)) return;
		optionsArray.value.forEach((option) => {
			option.updateOption?.(states.inputValue);
		});
	};
	const selectSize = require_use_form_common_props.useFormSize();
	const collapseTagSize = (0, vue.computed)(() => ["small"].includes(selectSize.value) ? "small" : "default");
	const dropdownMenuVisible = (0, vue.computed)({
		get() {
			return expanded.value && (props.loading || !isRemoteSearchEmpty.value || props.remote && !!slots.empty) && (!debouncing.value || !require_types.isEmpty(states.previousQuery) || states.options.size > 0);
		},
		set(val) {
			expanded.value = val;
		}
	});
	const shouldShowPlaceholder = (0, vue.computed)(() => {
		if (props.multiple && !require_types.isUndefined(props.modelValue)) return (0, lodash_unified.castArray)(props.modelValue).length === 0 && !states.inputValue;
		const value = (0, _vue_shared.isArray)(props.modelValue) ? props.modelValue[0] : props.modelValue;
		return props.filterable || require_types.isUndefined(value) ? !states.inputValue : true;
	});
	const currentPlaceholder = (0, vue.computed)(() => {
		const _placeholder = props.placeholder ?? t("el.select.placeholder");
		return props.multiple || !hasModelValue.value ? _placeholder : states.selectedLabel;
	});
	const mouseEnterEventName = (0, vue.computed)(() => _vueuse_core.isIOS ? null : "mouseenter");
	(0, vue.watch)(() => props.modelValue, (val, oldVal) => {
		if (props.multiple) {
			if (props.filterable && !props.reserveKeyword) {
				states.inputValue = "";
				handleQueryChange("");
			}
		}
		setSelected();
		if (!(0, lodash_unified.isEqual)(val, oldVal) && props.validateEvent) formItem?.validate("change").catch((err) => require_error.debugWarn(err));
	}, {
		flush: "post",
		deep: true
	});
	(0, vue.watch)(() => expanded.value, (val) => {
		if (val) handleQueryChange(states.inputValue);
		else {
			states.inputValue = "";
			states.previousQuery = null;
			states.isBeforeHide = true;
			states.menuVisibleOnFocus = false;
		}
	});
	(0, vue.watch)(() => states.options.entries(), () => {
		if (!_vueuse_core.isClient) return;
		setSelected();
		if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) checkDefaultFirstOption();
	}, { flush: "post" });
	(0, vue.watch)([() => states.hoveringIndex, optionsArray], ([val]) => {
		if (require_types.isNumber(val) && val > -1) hoverOption.value = optionsArray.value[val] || {};
		else hoverOption.value = {};
		optionsArray.value.forEach((option) => {
			option.hover = hoverOption.value === option;
		});
	});
	(0, vue.watchEffect)(() => {
		if (states.isBeforeHide) return;
		updateOptions();
	});
	const handleQueryChange = (val) => {
		if (states.previousQuery === val || isComposing.value) return;
		states.previousQuery = val;
		if (props.filterable && (0, _vue_shared.isFunction)(props.filterMethod)) props.filterMethod(val);
		else if (props.filterable && props.remote && (0, _vue_shared.isFunction)(props.remoteMethod)) props.remoteMethod(val);
		if (props.defaultFirstOption && (props.filterable || props.remote) && filteredOptionsCount.value) (0, vue.nextTick)(checkDefaultFirstOption);
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
		const optionsInDropdown = optionsArray.value.filter((n) => n.visible && !n.disabled && !n.states.groupDisabled);
		const userCreatedOption = optionsInDropdown.find((n) => n.created);
		const firstOriginOption = optionsInDropdown[0];
		states.hoveringIndex = getValueIndex(optionsArray.value.map((item) => item.value), userCreatedOption || firstOriginOption);
	};
	const setSelected = () => {
		if (!props.multiple) {
			const option = getOption((0, _vue_shared.isArray)(props.modelValue) ? props.modelValue[0] : props.modelValue);
			states.selectedLabel = option.currentLabel;
			states.selected = [option];
			return;
		} else states.selectedLabel = "";
		const result = [];
		if (!require_types.isUndefined(props.modelValue)) (0, lodash_unified.castArray)(props.modelValue).forEach((value) => {
			result.push(getOption(value));
		});
		states.selected = result;
	};
	const getOption = (value) => {
		let option;
		const isObjectValue = (0, _vue_shared.isPlainObject)(value);
		for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
			const cachedOption = cachedOptionsArray.value[i];
			if (isObjectValue ? (0, lodash_unified.get)(cachedOption.value, props.valueKey) === (0, lodash_unified.get)(value, props.valueKey) : cachedOption.value === value) {
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
	const debouncedOnInputChange = (0, _vueuse_core.useDebounceFn)(() => {
		onInputChange();
		debouncing.value = false;
	}, debounce);
	const emitChange = (val) => {
		if (!(0, lodash_unified.isEqual)(props.modelValue, val)) emit(require_event.CHANGE_EVENT, val);
	};
	const getLastNotDisabledIndex = (value) => (0, lodash_unified.findLastIndex)(value, (it) => {
		const option = states.cachedOptions.get(it);
		return !option?.disabled && !option?.states.groupDisabled;
	});
	const deletePrevTag = (e) => {
		const code = require_event$1.getEventCode(e);
		if (!props.multiple) return;
		if (code === require_aria.EVENT_CODE.delete) return;
		if (e.target.value.length <= 0) {
			const value = (0, lodash_unified.castArray)(props.modelValue).slice();
			const lastNotDisabledIndex = getLastNotDisabledIndex(value);
			if (lastNotDisabledIndex < 0) return;
			const removeTagValue = value[lastNotDisabledIndex];
			value.splice(lastNotDisabledIndex, 1);
			emit(require_event.UPDATE_MODEL_EVENT, value);
			emitChange(value);
			emit("remove-tag", removeTagValue);
		}
	};
	const deleteTag = (event, tag) => {
		const index = states.selected.indexOf(tag);
		if (index > -1 && !selectDisabled.value) {
			const value = (0, lodash_unified.castArray)(props.modelValue).slice();
			value.splice(index, 1);
			emit(require_event.UPDATE_MODEL_EVENT, value);
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
		emit(require_event.UPDATE_MODEL_EVENT, value);
		emitChange(value);
		states.hoveringIndex = -1;
		expanded.value = false;
		emit("clear");
		focus();
	};
	const handleOptionSelect = (option) => {
		if (props.multiple) {
			const value = (0, lodash_unified.castArray)(props.modelValue ?? []).slice();
			const optionIndex = getValueIndex(value, option);
			if (optionIndex > -1) value.splice(optionIndex, 1);
			else if (props.multipleLimit <= 0 || value.length < props.multipleLimit) value.push(option.value);
			emit(require_event.UPDATE_MODEL_EVENT, value);
			emitChange(value);
			if (option.created) handleQueryChange("");
			if (props.filterable && (option.created || !props.reserveKeyword)) states.inputValue = "";
		} else {
			!(0, lodash_unified.isEqual)(props.modelValue, option.value) && emit(require_event.UPDATE_MODEL_EVENT, option.value);
			emitChange(option.value);
			expanded.value = false;
		}
		focus();
		if (expanded.value) return;
		(0, vue.nextTick)(() => {
			scrollToOption(option);
		});
	};
	const getValueIndex = (arr, option) => {
		if (require_types.isUndefined(option)) return -1;
		if (!(0, _vue_shared.isObject)(option.value)) return arr.indexOf(option.value);
		return arr.findIndex((item) => {
			return (0, lodash_unified.isEqual)((0, lodash_unified.get)(item, props.valueKey), getValueKey(option));
		});
	};
	const scrollToOption = (option) => {
		const targetOption = (0, _vue_shared.isArray)(option) ? option[option.length - 1] : option;
		let target = null;
		if (!(0, lodash_unified.isNil)(targetOption?.value)) {
			const options = optionsArray.value.filter((item) => item.value === targetOption.value);
			if (options.length > 0) target = options[0].$el;
		}
		if (tooltipRef.value && target) {
			const menu = tooltipRef.value?.popperRef?.contentRef?.querySelector?.(`.${nsSelect.be("dropdown", "wrap")}`);
			if (menu) require_scroll.scrollIntoView(menu, target);
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
	const popperRef = (0, vue.computed)(() => {
		return tooltipRef.value?.popperRef?.contentRef;
	});
	const handleMenuEnter = () => {
		states.isBeforeHide = false;
		(0, vue.nextTick)(() => {
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
			(0, vue.nextTick)(() => inputRef.value?.blur());
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
			(0, vue.nextTick)(() => handleBlur(_event));
		}
	};
	const handleEsc = () => {
		if (states.inputValue.length > 0) states.inputValue = "";
		else expanded.value = false;
	};
	const toggleMenu = (event) => {
		if (selectDisabled.value || props.filterable && expanded.value && event && !suffixRef.value?.contains(event.target)) return;
		if (_vueuse_core.isIOS) states.inputHovering = true;
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
		return (0, _vue_shared.isObject)(item.value) ? (0, lodash_unified.get)(item.value, props.valueKey) : item.value;
	};
	const optionsAllDisabled = (0, vue.computed)(() => optionsArray.value.filter((option) => option.visible).every((option) => option.isDisabled));
	const showTagList = (0, vue.computed)(() => {
		if (!props.multiple) return [];
		return props.collapseTags ? states.selected.slice(0, props.maxCollapseTags) : states.selected;
	});
	const collapseTagList = (0, vue.computed)(() => {
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
			(0, vue.nextTick)(() => scrollToOption(hoverOption.value));
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
		const start = (0, lodash_unified.clamp)(targetIndex, 0, len - 1);
		const options = optionsArray.value;
		const direction = mode === "up" ? -1 : 1;
		const newIndex = findFocusableIndex(options, start, direction, len) ?? findFocusableIndex(options, start - direction, -direction, len);
		if (newIndex != null) {
			states.hoveringIndex = newIndex;
			(0, vue.nextTick)(() => scrollToOption(hoverOption.value));
		}
	};
	const handleKeydown = (e) => {
		const code = require_event$1.getEventCode(e);
		let isPreventDefault = true;
		switch (code) {
			case require_aria.EVENT_CODE.up:
				navigateOptions("prev");
				break;
			case require_aria.EVENT_CODE.down:
				navigateOptions("next");
				break;
			case require_aria.EVENT_CODE.enter:
			case require_aria.EVENT_CODE.numpadEnter:
				if (!isComposing.value) selectOption();
				break;
			case require_aria.EVENT_CODE.esc:
				handleEsc();
				break;
			case require_aria.EVENT_CODE.backspace:
				isPreventDefault = false;
				deletePrevTag(e);
				return;
			case require_aria.EVENT_CODE.home:
				if (!expanded.value) return;
				focusOption(0, "down");
				break;
			case require_aria.EVENT_CODE.end:
				if (!expanded.value) return;
				focusOption(states.options.size - 1, "up");
				break;
			case require_aria.EVENT_CODE.pageUp:
				if (!expanded.value) return;
				focusOption(states.hoveringIndex - 10, "up");
				break;
			case require_aria.EVENT_CODE.pageDown:
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
	const tagStyle = (0, vue.computed)(() => {
		const gapWidth = getGapWidth();
		const inputSlotWidth = props.filterable ? gapWidth + require_form.MINIMUM_INPUT_WIDTH : 0;
		return { maxWidth: `${collapseItemRef.value && props.maxCollapseTags === 1 ? states.selectionWidth - states.collapseItemWidth - gapWidth - inputSlotWidth : states.selectionWidth - inputSlotWidth}px` };
	});
	const collapseTagStyle = (0, vue.computed)(() => {
		return { maxWidth: `${states.selectionWidth}px` };
	});
	const popupScroll = (data) => {
		emit("popup-scroll", data);
	};
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
	(0, vue.onMounted)(() => {
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
exports.useSelect = useSelect;
//# sourceMappingURL=useSelect.js.map
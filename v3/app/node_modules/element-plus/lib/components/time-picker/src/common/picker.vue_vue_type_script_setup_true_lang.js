const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../../constants/aria.js');
const require_event = require('../../../../constants/event.js');
const require_event$1 = require('../../../../utils/dom/event.js');
const require_error = require('../../../../utils/error.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../../hooks/use-focus-controller/index.js');
const require_index$2 = require('../../../../hooks/use-empty-values/index.js');
const require_index$3 = require('../../../icon/index.js');
const require_use_form_common_props = require('../../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../../form/src/hooks/use-form-item.js');
const require_index$4 = require('../../../tooltip/index.js');
const require_index$5 = require('../../../input/index.js');
const require_constants = require('../constants.js');
const require_utils = require('../utils.js');
const require_use_common_picker = require('../composables/use-common-picker.js');
const require_props = require('./props.js');
const require_picker_range_trigger = require('./picker-range-trigger.js');
let _vueuse_core = require("@vueuse/core");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/time-picker/src/common/picker.vue?vue&type=script&setup=true&lang.ts
var picker_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "Picker",
	__name: "picker",
	props: require_props.timePickerDefaultProps,
	emits: [
		require_event.UPDATE_MODEL_EVENT,
		require_event.CHANGE_EVENT,
		"focus",
		"blur",
		"clear",
		"calendar-change",
		"panel-change",
		"visible-change",
		"keydown"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const attrs = (0, vue.useAttrs)();
		const nsDate = require_index.useNamespace("date");
		const nsInput = require_index.useNamespace("input");
		const nsRange = require_index.useNamespace("range");
		const { formItem } = require_use_form_item.useFormItem();
		const elPopperOptions = (0, vue.inject)(require_constants.PICKER_POPPER_OPTIONS_INJECTION_KEY, {});
		const emptyValues = require_index$2.useEmptyValues(props, null);
		const refPopper = (0, vue.ref)();
		const inputRef = (0, vue.ref)();
		const valueOnOpen = (0, vue.ref)(null);
		let hasJustTabExitedInput = false;
		const pickerDisabled = require_use_form_common_props.useFormDisabled();
		const commonPicker = require_use_common_picker.useCommonPicker(props, emit);
		const { parsedValue, pickerActualVisible, userInput, pickerVisible, pickerOptions, valueIsEmpty, emitInput, onPick, onSetPickerOption, onCalendarChange, onPanelChange } = commonPicker;
		const { isFocused, handleFocus, handleBlur } = require_index$1.useFocusController(inputRef, {
			disabled: pickerDisabled,
			beforeFocus() {
				return props.readonly;
			},
			afterFocus() {
				if (!props.automaticDropdown) return;
				pickerVisible.value = true;
			},
			beforeBlur(event) {
				return !hasJustTabExitedInput && refPopper.value?.isFocusInsideContent(event);
			},
			afterBlur() {
				if (isTimePicker.value && !props.saveOnBlur) {
					if (!valueIsEmpty.value) pickerOptions.value.handleCancel?.();
				} else handleChange();
				pickerVisible.value = false;
				hasJustTabExitedInput = false;
				props.validateEvent && formItem?.validate("blur").catch((err) => require_error.debugWarn(err));
			}
		});
		const hovering = (0, vue.ref)(false);
		const rangeInputKls = (0, vue.computed)(() => [
			nsDate.b("editor"),
			nsDate.bm("editor", props.type),
			nsInput.e("wrapper"),
			nsDate.is("disabled", pickerDisabled.value),
			nsDate.is("active", pickerVisible.value),
			nsRange.b("editor"),
			pickerSize ? nsRange.bm("editor", pickerSize.value) : "",
			attrs.class
		]);
		const clearIconKls = (0, vue.computed)(() => [
			nsInput.e("icon"),
			nsRange.e("close-icon"),
			!showClearBtn.value ? nsRange.em("close-icon", "hidden") : ""
		]);
		(0, vue.watch)(pickerVisible, (val) => {
			if (!val) {
				userInput.value = null;
				(0, vue.nextTick)(() => {
					emitChange(props.modelValue);
				});
			} else (0, vue.nextTick)(() => {
				if (val) valueOnOpen.value = props.modelValue;
			});
		});
		const emitChange = (val, isClear) => {
			if (isClear || !require_utils.valueEquals(val, valueOnOpen.value)) {
				emit(require_event.CHANGE_EVENT, val);
				isClear && (valueOnOpen.value = val);
				props.validateEvent && formItem?.validate("change").catch((err) => require_error.debugWarn(err));
			}
		};
		const emitKeydown = (e) => {
			emit("keydown", e);
		};
		const refInput = (0, vue.computed)(() => {
			if (inputRef.value) return Array.from(inputRef.value.$el.querySelectorAll("input"));
			return [];
		});
		const setSelectionRange = (start, end, pos) => {
			const _inputs = refInput.value;
			if (!_inputs.length) return;
			if (!pos || pos === "min") {
				_inputs[0].setSelectionRange(start, end);
				_inputs[0].focus();
			} else if (pos === "max") {
				_inputs[1].setSelectionRange(start, end);
				_inputs[1].focus();
			}
		};
		const onBeforeShow = () => {
			pickerActualVisible.value = true;
		};
		const onShow = () => {
			emit("visible-change", true);
		};
		const onHide = () => {
			pickerActualVisible.value = false;
			pickerVisible.value = false;
			emit("visible-change", false);
		};
		const handleOpen = () => {
			pickerVisible.value = true;
		};
		const handleClose = () => {
			pickerVisible.value = false;
		};
		const displayValue = (0, vue.computed)(() => {
			const formattedValue = formatToString(parsedValue.value);
			if ((0, _vue_shared.isArray)(userInput.value)) return [userInput.value[0] ?? (formattedValue && formattedValue[0]) ?? "", userInput.value[1] ?? (formattedValue && formattedValue[1]) ?? ""];
			else if (userInput.value !== null) return userInput.value;
			if (isTimePicker.value && valueIsEmpty.value && !props.saveOnBlur) return "";
			if (!isTimePicker.value && valueIsEmpty.value) return "";
			if (!pickerVisible.value && valueIsEmpty.value) return "";
			if (formattedValue) return isDatesPicker.value || isMonthsPicker.value || isYearsPicker.value ? formattedValue.join(", ") : formattedValue;
			return "";
		});
		const isTimeLikePicker = (0, vue.computed)(() => props.type.includes("time"));
		const isTimePicker = (0, vue.computed)(() => props.type.startsWith("time"));
		const isDatesPicker = (0, vue.computed)(() => props.type === "dates");
		const isMonthsPicker = (0, vue.computed)(() => props.type === "months");
		const isYearsPicker = (0, vue.computed)(() => props.type === "years");
		const triggerIcon = (0, vue.computed)(() => props.prefixIcon || (isTimeLikePicker.value ? _element_plus_icons_vue.Clock : _element_plus_icons_vue.Calendar));
		const showClearBtn = (0, vue.computed)(() => props.clearable && !pickerDisabled.value && !props.readonly && !valueIsEmpty.value && (hovering.value || isFocused.value));
		const onClear = (event) => {
			if (props.readonly || pickerDisabled.value) return;
			if (showClearBtn.value) {
				event?.stopPropagation();
				if (pickerOptions.value.handleClear) pickerOptions.value.handleClear();
				else emitInput(emptyValues.valueOnClear.value);
				emitChange(emptyValues.valueOnClear.value, true);
				onHide();
			}
			emit("clear");
		};
		const onMouseDownInput = async (event) => {
			if (props.readonly || pickerDisabled.value) return;
			if (event.target?.tagName !== "INPUT" || isFocused.value || !props.automaticDropdown) pickerVisible.value = true;
		};
		const onMouseEnter = () => {
			if (props.readonly || pickerDisabled.value) return;
			if (!valueIsEmpty.value && props.clearable) hovering.value = true;
		};
		const onMouseLeave = () => {
			hovering.value = false;
		};
		const onTouchStartInput = (event) => {
			if (props.readonly || pickerDisabled.value) return;
			if (event.touches[0].target?.tagName !== "INPUT" || isFocused.value || !props.automaticDropdown) pickerVisible.value = true;
		};
		const isRangeInput = (0, vue.computed)(() => {
			return props.type.includes("range");
		});
		const pickerSize = require_use_form_common_props.useFormSize();
		const popperEl = (0, vue.computed)(() => (0, vue.unref)(refPopper)?.popperRef?.contentRef);
		const stophandle = (0, _vueuse_core.onClickOutside)(inputRef, (e) => {
			const unrefedPopperEl = (0, vue.unref)(popperEl);
			const inputEl = (0, _vueuse_core.unrefElement)(inputRef);
			if (unrefedPopperEl && (e.target === unrefedPopperEl || e.composedPath().includes(unrefedPopperEl)) || e.target === inputEl || inputEl && e.composedPath().includes(inputEl)) return;
			pickerVisible.value = false;
		});
		(0, vue.onBeforeUnmount)(() => {
			stophandle?.();
		});
		const handleChange = () => {
			if (isTimePicker.value && !props.saveOnBlur) return;
			const isRangeEmpty = (0, _vue_shared.isArray)(userInput.value) && userInput.value.every((v) => v === "");
			if (userInput.value && !isRangeEmpty) {
				const value = parseUserInputToDayjs(displayValue.value);
				if (value) {
					if (isValidValue(value)) emitInput(require_utils.dayOrDaysToDate(value));
					userInput.value = null;
				}
			}
			if (userInput.value === "" || isRangeEmpty) {
				emitInput(emptyValues.valueOnClear.value);
				emitChange(emptyValues.valueOnClear.value, true);
				userInput.value = null;
			}
		};
		const parseUserInputToDayjs = (value) => {
			if (!value) return null;
			return pickerOptions.value.parseUserInput(value);
		};
		const formatToString = (value) => {
			if (!value) return null;
			return (0, _vue_shared.isArray)(value) ? value.map((_) => _.format(props.format)) : value.format(props.format);
		};
		const isValidValue = (value) => {
			return pickerOptions.value.isValidValue(value);
		};
		const handleKeydownInput = async (event) => {
			if (props.readonly || pickerDisabled.value) return;
			const code = require_event$1.getEventCode(event);
			emitKeydown(event);
			if (code === require_aria.EVENT_CODE.esc) {
				if (pickerVisible.value === true) {
					pickerVisible.value = false;
					event.preventDefault();
					event.stopPropagation();
				}
				return;
			}
			if (code === require_aria.EVENT_CODE.down) {
				if (pickerOptions.value.handleFocusPicker) {
					event.preventDefault();
					event.stopPropagation();
				}
				if (pickerVisible.value === false) {
					pickerVisible.value = true;
					await (0, vue.nextTick)();
				}
				if (pickerOptions.value.handleFocusPicker) {
					pickerOptions.value.handleFocusPicker();
					return;
				}
			}
			if (code === require_aria.EVENT_CODE.tab) {
				hasJustTabExitedInput = true;
				return;
			}
			if (code === require_aria.EVENT_CODE.enter || code === require_aria.EVENT_CODE.numpadEnter) {
				if (!pickerVisible.value) pickerVisible.value = true;
				else if (userInput.value === null || userInput.value === "" || isValidValue(parseUserInputToDayjs(displayValue.value))) {
					handleChange();
					pickerVisible.value = false;
				}
				event.preventDefault();
				event.stopPropagation();
				return;
			}
			if (userInput.value) {
				event.stopPropagation();
				return;
			}
			if (pickerOptions.value.handleKeydownInput) pickerOptions.value.handleKeydownInput(event);
		};
		const onUserInput = (e) => {
			userInput.value = e;
			if (!pickerVisible.value) pickerVisible.value = true;
		};
		const handleStartInput = (event) => {
			const target = event.target;
			if (userInput.value) userInput.value = [target.value, userInput.value[1]];
			else userInput.value = [target.value, null];
		};
		const handleEndInput = (event) => {
			const target = event.target;
			if (userInput.value) userInput.value = [userInput.value[0], target.value];
			else userInput.value = [null, target.value];
		};
		const handleStartChange = () => {
			const values = userInput.value;
			const value = parseUserInputToDayjs(values && values[0]);
			const parsedVal = (0, vue.unref)(parsedValue);
			if (value && value.isValid()) {
				userInput.value = [formatToString(value), displayValue.value?.[1] || null];
				const newValue = [value, parsedVal && (parsedVal[1] || null)];
				if (isValidValue(newValue)) {
					emitInput(require_utils.dayOrDaysToDate(newValue));
					userInput.value = null;
				}
			}
		};
		const handleEndChange = () => {
			const values = (0, vue.unref)(userInput);
			const value = parseUserInputToDayjs(values && values[1]);
			const parsedVal = (0, vue.unref)(parsedValue);
			if (value && value.isValid()) {
				userInput.value = [(0, vue.unref)(displayValue)?.[0] || null, formatToString(value)];
				const newValue = [parsedVal && parsedVal[0], value];
				if (isValidValue(newValue)) {
					emitInput(require_utils.dayOrDaysToDate(newValue));
					userInput.value = null;
				}
			}
		};
		const focus = () => {
			inputRef.value?.focus();
		};
		const blur = () => {
			inputRef.value?.blur();
		};
		(0, vue.provide)(require_constants.PICKER_BASE_INJECTION_KEY, {
			props,
			emptyValues
		});
		(0, vue.provide)(require_constants.ROOT_COMMON_PICKER_INJECTION_KEY, commonPicker);
		__expose({
			focus,
			blur,
			handleOpen,
			handleClose,
			onPick
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$4.ElTooltip), (0, vue.mergeProps)({
				ref_key: "refPopper",
				ref: refPopper,
				visible: (0, vue.unref)(pickerVisible),
				effect: "light",
				pure: "",
				trigger: "click"
			}, _ctx.$attrs, {
				role: "dialog",
				teleported: "",
				transition: `${(0, vue.unref)(nsDate).namespace.value}-zoom-in-top`,
				"popper-class": [`${(0, vue.unref)(nsDate).namespace.value}-picker__popper`, _ctx.popperClass],
				"popper-style": _ctx.popperStyle,
				"popper-options": (0, vue.unref)(elPopperOptions),
				"fallback-placements": _ctx.fallbackPlacements,
				"gpu-acceleration": false,
				placement: _ctx.placement,
				"stop-popper-mouse-event": false,
				"hide-after": 0,
				persistent: "",
				onBeforeShow,
				onShow,
				onHide
			}), {
				default: (0, vue.withCtx)(() => [!isRangeInput.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$5.ElInput), {
					key: 0,
					id: _ctx.id,
					ref_key: "inputRef",
					ref: inputRef,
					"container-role": "combobox",
					"model-value": displayValue.value,
					name: _ctx.name,
					size: (0, vue.unref)(pickerSize),
					disabled: (0, vue.unref)(pickerDisabled),
					placeholder: _ctx.placeholder,
					class: (0, vue.normalizeClass)([
						(0, vue.unref)(nsDate).b("editor"),
						(0, vue.unref)(nsDate).bm("editor", _ctx.type),
						(0, vue.unref)(nsDate).is("focus", (0, vue.unref)(pickerVisible)),
						_ctx.$attrs.class
					]),
					style: (0, vue.normalizeStyle)(_ctx.$attrs.style),
					readonly: !_ctx.editable || _ctx.readonly || isDatesPicker.value || isMonthsPicker.value || isYearsPicker.value || _ctx.type === "week",
					"aria-label": _ctx.ariaLabel,
					tabindex: _ctx.tabindex,
					"validate-event": false,
					onInput: onUserInput,
					onFocus: (0, vue.unref)(handleFocus),
					onBlur: (0, vue.unref)(handleBlur),
					onKeydown: handleKeydownInput,
					onChange: handleChange,
					onMousedown: onMouseDownInput,
					onMouseenter: onMouseEnter,
					onMouseleave: onMouseLeave,
					onTouchstartPassive: onTouchStartInput,
					onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["stop"]))
				}, {
					prefix: (0, vue.withCtx)(() => [triggerIcon.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElIcon), {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).e("icon")),
						onMousedown: (0, vue.withModifiers)(onMouseDownInput, ["prevent"]),
						onTouchstartPassive: onTouchStartInput
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(triggerIcon.value)))]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)]),
					suffix: (0, vue.withCtx)(() => [showClearBtn.value && _ctx.clearIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElIcon), {
						key: 0,
						class: (0, vue.normalizeClass)(`${(0, vue.unref)(nsInput).e("icon")} clear-icon`),
						onMousedown: (0, vue.withModifiers)((0, vue.unref)(_vue_shared.NOOP), ["prevent"]),
						onClick: onClear
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.clearIcon)))]),
						_: 1
					}, 8, ["class", "onMousedown"])) : (0, vue.createCommentVNode)("v-if", true)]),
					_: 1
				}, 8, [
					"id",
					"model-value",
					"name",
					"size",
					"disabled",
					"placeholder",
					"class",
					"style",
					"readonly",
					"aria-label",
					"tabindex",
					"onFocus",
					"onBlur"
				])) : ((0, vue.openBlock)(), (0, vue.createBlock)(require_picker_range_trigger.default, {
					key: 1,
					id: _ctx.id,
					ref_key: "inputRef",
					ref: inputRef,
					"model-value": displayValue.value,
					name: _ctx.name,
					disabled: (0, vue.unref)(pickerDisabled),
					readonly: !_ctx.editable || _ctx.readonly,
					"start-placeholder": _ctx.startPlaceholder,
					"end-placeholder": _ctx.endPlaceholder,
					class: (0, vue.normalizeClass)(rangeInputKls.value),
					style: (0, vue.normalizeStyle)(_ctx.$attrs.style),
					"aria-label": _ctx.ariaLabel,
					tabindex: _ctx.tabindex,
					autocomplete: "off",
					role: "combobox",
					onClick: onMouseDownInput,
					onFocus: (0, vue.unref)(handleFocus),
					onBlur: (0, vue.unref)(handleBlur),
					onStartInput: handleStartInput,
					onStartChange: handleStartChange,
					onEndInput: handleEndInput,
					onEndChange: handleEndChange,
					onMousedown: onMouseDownInput,
					onMouseenter: onMouseEnter,
					onMouseleave: onMouseLeave,
					onTouchstartPassive: onTouchStartInput,
					onKeydown: handleKeydownInput
				}, {
					prefix: (0, vue.withCtx)(() => [triggerIcon.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElIcon), {
						key: 0,
						class: (0, vue.normalizeClass)([(0, vue.unref)(nsInput).e("icon"), (0, vue.unref)(nsRange).e("icon")])
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(triggerIcon.value)))]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)]),
					"range-separator": (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "range-separator", {}, () => [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(nsRange).b("separator")) }, (0, vue.toDisplayString)(_ctx.rangeSeparator), 3)])]),
					suffix: (0, vue.withCtx)(() => [_ctx.clearIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElIcon), {
						key: 0,
						class: (0, vue.normalizeClass)(clearIconKls.value),
						onMousedown: (0, vue.withModifiers)((0, vue.unref)(_vue_shared.NOOP), ["prevent"]),
						onClick: onClear
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.clearIcon)))]),
						_: 1
					}, 8, ["class", "onMousedown"])) : (0, vue.createCommentVNode)("v-if", true)]),
					_: 3
				}, 8, [
					"id",
					"model-value",
					"name",
					"disabled",
					"readonly",
					"start-placeholder",
					"end-placeholder",
					"class",
					"style",
					"aria-label",
					"tabindex",
					"onFocus",
					"onBlur"
				]))]),
				content: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default", {
					visible: (0, vue.unref)(pickerVisible),
					actualVisible: (0, vue.unref)(pickerActualVisible),
					parsedValue: (0, vue.unref)(parsedValue),
					format: _ctx.format,
					dateFormat: _ctx.dateFormat,
					timeFormat: _ctx.timeFormat,
					unlinkPanels: _ctx.unlinkPanels,
					type: _ctx.type,
					defaultValue: _ctx.defaultValue,
					showNow: _ctx.showNow,
					showConfirm: _ctx.showConfirm,
					showFooter: _ctx.showFooter,
					showWeekNumber: _ctx.showWeekNumber,
					onPick: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(onPick) && (0, vue.unref)(onPick)(...args)),
					onSelectRange: setSelectionRange,
					onSetPickerOption: _cache[2] || (_cache[2] = (...args) => (0, vue.unref)(onSetPickerOption) && (0, vue.unref)(onSetPickerOption)(...args)),
					onCalendarChange: _cache[3] || (_cache[3] = (...args) => (0, vue.unref)(onCalendarChange) && (0, vue.unref)(onCalendarChange)(...args)),
					onClear,
					onPanelChange: _cache[4] || (_cache[4] = (...args) => (0, vue.unref)(onPanelChange) && (0, vue.unref)(onPanelChange)(...args)),
					onMousedown: _cache[5] || (_cache[5] = (0, vue.withModifiers)(() => {}, ["stop"]))
				})]),
				_: 3
			}, 16, [
				"visible",
				"transition",
				"popper-class",
				"popper-style",
				"popper-options",
				"fallback-placements",
				"placement"
			]);
		};
	}
});

//#endregion
exports.default = picker_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=picker.vue_vue_type_script_setup_true_lang.js.map
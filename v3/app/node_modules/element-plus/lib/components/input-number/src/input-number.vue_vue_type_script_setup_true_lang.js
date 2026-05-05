const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../directives/repeat-click/index.js');
const require_index$1 = require('../../../hooks/use-locale/index.js');
const require_index$2 = require('../../../hooks/use-namespace/index.js');
const require_index$3 = require('../../icon/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_index$4 = require('../../input/index.js');
const require_input_number = require('./input-number.js');
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/input-number/src/input-number.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
var input_number_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElInputNumber",
	__name: "input-number",
	props: require_input_number.inputNumberProps,
	emits: require_input_number.inputNumberEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = require_index$1.useLocale();
		const ns = require_index$2.useNamespace("input-number");
		const input = (0, vue.ref)();
		const data = (0, vue.reactive)({
			currentValue: props.modelValue,
			userInput: null
		});
		const { formItem } = require_use_form_item.useFormItem();
		const minDisabled = (0, vue.computed)(() => require_types.isNumber(props.modelValue) && props.modelValue <= props.min);
		const maxDisabled = (0, vue.computed)(() => require_types.isNumber(props.modelValue) && props.modelValue >= props.max);
		const numPrecision = (0, vue.computed)(() => {
			const stepPrecision = getPrecision(props.step);
			if (!require_types.isUndefined(props.precision)) {
				if (stepPrecision > props.precision) require_error.debugWarn("InputNumber", "precision should not be less than the decimal places of step");
				return props.precision;
			} else return Math.max(getPrecision(props.modelValue), stepPrecision);
		});
		const controlsAtRight = (0, vue.computed)(() => {
			return props.controls && props.controlsPosition === "right";
		});
		const inputNumberSize = require_use_form_common_props.useFormSize();
		const inputNumberDisabled = require_use_form_common_props.useFormDisabled();
		const displayValue = (0, vue.computed)(() => {
			if (data.userInput !== null) return data.userInput;
			let currentValue = data.currentValue;
			if ((0, lodash_unified.isNil)(currentValue)) return "";
			if (require_types.isNumber(currentValue)) {
				if (Number.isNaN(currentValue)) return "";
				if (!require_types.isUndefined(props.precision)) currentValue = currentValue.toFixed(props.precision);
			}
			return currentValue;
		});
		const toPrecision = (num, pre) => {
			if (require_types.isUndefined(pre)) pre = numPrecision.value;
			if (pre === 0) return Math.round(num);
			let snum = String(num);
			const pointPos = snum.indexOf(".");
			if (pointPos === -1) return num;
			if (!snum.replace(".", "").split("")[pointPos + pre]) return num;
			const length = snum.length;
			if (snum.charAt(length - 1) === "5") snum = `${snum.slice(0, Math.max(0, length - 1))}6`;
			return Number.parseFloat(Number(snum).toFixed(pre));
		};
		const getPrecision = (value) => {
			if ((0, lodash_unified.isNil)(value)) return 0;
			const valueString = value.toString();
			const dotPosition = valueString.indexOf(".");
			let precision = 0;
			if (dotPosition !== -1) precision = valueString.length - dotPosition - 1;
			return precision;
		};
		const ensurePrecision = (val, coefficient = 1) => {
			if (!require_types.isNumber(val)) return data.currentValue;
			if (val >= Number.MAX_SAFE_INTEGER && coefficient === 1) {
				require_error.debugWarn("InputNumber", "The value has reached the maximum safe integer limit.");
				return val;
			} else if (val <= Number.MIN_SAFE_INTEGER && coefficient === -1) {
				require_error.debugWarn("InputNumber", "The value has reached the minimum safe integer limit.");
				return val;
			}
			return toPrecision(val + props.step * coefficient);
		};
		const handleKeydown = (event) => {
			const code = require_event$1.getEventCode(event);
			const key = require_event$1.getEventKey(event);
			if (props.disabledScientific && ["e", "E"].includes(key)) {
				event.preventDefault();
				return;
			}
			switch (code) {
				case require_aria.EVENT_CODE.up:
					event.preventDefault();
					increase();
					break;
				case require_aria.EVENT_CODE.down:
					event.preventDefault();
					decrease();
					break;
			}
		};
		const increase = () => {
			if (props.readonly || inputNumberDisabled.value || maxDisabled.value) return;
			setCurrentValue(ensurePrecision(Number(displayValue.value) || 0));
			emit(require_event.INPUT_EVENT, data.currentValue);
			setCurrentValueToModelValue();
		};
		const decrease = () => {
			if (props.readonly || inputNumberDisabled.value || minDisabled.value) return;
			setCurrentValue(ensurePrecision(Number(displayValue.value) || 0, -1));
			emit(require_event.INPUT_EVENT, data.currentValue);
			setCurrentValueToModelValue();
		};
		const verifyValue = (value, update) => {
			const { max, min, step, precision, stepStrictly, valueOnClear } = props;
			if (max < min) require_error.throwError("InputNumber", "min should not be greater than max.");
			let newVal = Number(value);
			if ((0, lodash_unified.isNil)(value) || Number.isNaN(newVal)) return null;
			if (value === "") {
				if (valueOnClear === null) return null;
				newVal = (0, _vue_shared.isString)(valueOnClear) ? {
					min,
					max
				}[valueOnClear] : valueOnClear;
			}
			if (stepStrictly) {
				newVal = toPrecision(Math.round(toPrecision(newVal / step)) * step, precision);
				if (newVal !== value) update && emit(require_event.UPDATE_MODEL_EVENT, newVal);
			}
			if (!require_types.isUndefined(precision)) newVal = toPrecision(newVal, precision);
			if (newVal > max || newVal < min) {
				newVal = newVal > max ? max : min;
				update && emit(require_event.UPDATE_MODEL_EVENT, newVal);
			}
			return newVal;
		};
		const setCurrentValue = (value, emitChange = true) => {
			const oldVal = data.currentValue;
			const newVal = verifyValue(value);
			if (!emitChange) {
				emit(require_event.UPDATE_MODEL_EVENT, newVal);
				return;
			}
			data.userInput = null;
			if (oldVal === newVal && value) return;
			emit(require_event.UPDATE_MODEL_EVENT, newVal);
			if (oldVal !== newVal) emit(require_event.CHANGE_EVENT, newVal, oldVal);
			if (props.validateEvent) formItem?.validate?.("change").catch((err) => require_error.debugWarn(err));
			data.currentValue = newVal;
		};
		const handleInput = (value) => {
			data.userInput = value;
			const newVal = value === "" ? null : Number(value);
			emit(require_event.INPUT_EVENT, newVal);
			setCurrentValue(newVal, false);
		};
		const handleInputChange = (value) => {
			const newVal = value !== "" ? Number(value) : "";
			if (require_types.isNumber(newVal) && !Number.isNaN(newVal) || value === "") setCurrentValue(newVal);
			setCurrentValueToModelValue();
			data.userInput = null;
		};
		const focus = () => {
			input.value?.focus?.();
		};
		const blur = () => {
			input.value?.blur?.();
		};
		const handleFocus = (event) => {
			emit("focus", event);
		};
		const handleBlur = (event) => {
			data.userInput = null;
			if (data.currentValue === null && input.value?.input) input.value.input.value = "";
			emit("blur", event);
			if (props.validateEvent) formItem?.validate?.("blur").catch((err) => require_error.debugWarn(err));
		};
		const setCurrentValueToModelValue = () => {
			if (data.currentValue !== props.modelValue) data.currentValue = props.modelValue;
		};
		const handleWheel = (e) => {
			if (document.activeElement === e.target) e.preventDefault();
		};
		(0, vue.watch)(() => props.modelValue, (value, oldValue) => {
			const newValue = verifyValue(value, true);
			if (data.userInput === null && newValue !== oldValue) data.currentValue = newValue;
		}, { immediate: true });
		(0, vue.watch)(() => props.precision, () => {
			data.currentValue = verifyValue(props.modelValue);
		});
		(0, vue.onMounted)(() => {
			const { min, max, modelValue } = props;
			const innerInput = input.value?.input;
			innerInput.setAttribute("role", "spinbutton");
			if (Number.isFinite(max)) innerInput.setAttribute("aria-valuemax", String(max));
			else innerInput.removeAttribute("aria-valuemax");
			if (Number.isFinite(min)) innerInput.setAttribute("aria-valuemin", String(min));
			else innerInput.removeAttribute("aria-valuemin");
			innerInput.setAttribute("aria-valuenow", data.currentValue || data.currentValue === 0 ? String(data.currentValue) : "");
			innerInput.setAttribute("aria-disabled", String(inputNumberDisabled.value));
			if (!require_types.isNumber(modelValue) && modelValue != null) {
				let val = Number(modelValue);
				if (Number.isNaN(val)) val = null;
				emit(require_event.UPDATE_MODEL_EVENT, val);
			}
			innerInput.addEventListener("wheel", handleWheel, { passive: false });
		});
		(0, vue.onUpdated)(() => {
			(input.value?.input)?.setAttribute("aria-valuenow", `${data.currentValue ?? ""}`);
		});
		__expose({
			focus,
			blur
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(ns).b(),
					(0, vue.unref)(ns).m((0, vue.unref)(inputNumberSize)),
					(0, vue.unref)(ns).is("disabled", (0, vue.unref)(inputNumberDisabled)),
					(0, vue.unref)(ns).is("without-controls", !__props.controls),
					(0, vue.unref)(ns).is("controls-right", controlsAtRight.value),
					(0, vue.unref)(ns).is(__props.align, !!__props.align)
				]),
				onDragstart: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["prevent"]))
			}, [
				__props.controls ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 0,
					role: "button",
					"aria-label": (0, vue.unref)(t)("el.inputNumber.decrease"),
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("decrease"), (0, vue.unref)(ns).is("disabled", minDisabled.value)]),
					onKeydown: (0, vue.withKeys)(decrease, ["enter"])
				}, [(0, vue.renderSlot)(_ctx.$slots, "decrease-icon", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElIcon), null, {
					default: (0, vue.withCtx)(() => [controlsAtRight.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(_element_plus_icons_vue.ArrowDown), { key: 0 })) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(_element_plus_icons_vue.Minus), { key: 1 }))]),
					_: 1
				})])], 42, _hoisted_1)), [[(0, vue.unref)(require_index.vRepeatClick), decrease]]) : (0, vue.createCommentVNode)("v-if", true),
				__props.controls ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 1,
					role: "button",
					"aria-label": (0, vue.unref)(t)("el.inputNumber.increase"),
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("increase"), (0, vue.unref)(ns).is("disabled", maxDisabled.value)]),
					onKeydown: (0, vue.withKeys)(increase, ["enter"])
				}, [(0, vue.renderSlot)(_ctx.$slots, "increase-icon", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElIcon), null, {
					default: (0, vue.withCtx)(() => [controlsAtRight.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(_element_plus_icons_vue.ArrowUp), { key: 0 })) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(_element_plus_icons_vue.Plus), { key: 1 }))]),
					_: 1
				})])], 42, _hoisted_2)), [[(0, vue.unref)(require_index.vRepeatClick), increase]]) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createVNode)((0, vue.unref)(require_index$4.ElInput), {
					id: __props.id,
					ref_key: "input",
					ref: input,
					type: "number",
					step: __props.step,
					"model-value": displayValue.value,
					placeholder: __props.placeholder,
					readonly: __props.readonly,
					disabled: (0, vue.unref)(inputNumberDisabled),
					size: (0, vue.unref)(inputNumberSize),
					max: __props.max,
					min: __props.min,
					name: __props.name,
					"aria-label": __props.ariaLabel,
					"validate-event": false,
					inputmode: __props.inputmode,
					onKeydown: handleKeydown,
					onBlur: handleBlur,
					onFocus: handleFocus,
					onInput: handleInput,
					onChange: handleInputChange
				}, (0, vue.createSlots)({ _: 2 }, [_ctx.$slots.prefix ? {
					name: "prefix",
					fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "prefix")]),
					key: "0"
				} : void 0, _ctx.$slots.suffix ? {
					name: "suffix",
					fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "suffix")]),
					key: "1"
				} : void 0]), 1032, [
					"id",
					"step",
					"model-value",
					"placeholder",
					"readonly",
					"disabled",
					"size",
					"max",
					"min",
					"name",
					"aria-label",
					"inputmode"
				])
			], 34);
		};
	}
});

//#endregion
exports.default = input_number_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=input-number.vue_vue_type_script_setup_true_lang.js.map
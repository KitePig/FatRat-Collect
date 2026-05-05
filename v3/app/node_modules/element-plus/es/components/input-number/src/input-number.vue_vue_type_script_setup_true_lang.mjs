import { EVENT_CODE } from "../../../constants/aria.mjs";
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { getEventCode, getEventKey } from "../../../utils/dom/event.mjs";
import { isNumber, isString, isUndefined as isUndefined$1 } from "../../../utils/types.mjs";
import { debugWarn, throwError } from "../../../utils/error.mjs";
import { vRepeatClick } from "../../../directives/repeat-click/index.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useFormDisabled, useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem } from "../../form/src/hooks/use-form-item.mjs";
import { ElInput } from "../../input/index.mjs";
import { inputNumberEmits, inputNumberProps } from "./input-number.mjs";
import { isNil } from "lodash-unified";
import { ArrowDown, ArrowUp, Minus, Plus } from "@element-plus/icons-vue";
import { computed, createBlock, createCommentVNode, createElementBlock, createSlots, createVNode, defineComponent, normalizeClass, onMounted, onUpdated, openBlock, reactive, ref, renderSlot, unref, watch, withCtx, withDirectives, withKeys, withModifiers } from "vue";

//#region ../../packages/components/input-number/src/input-number.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
var input_number_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElInputNumber",
	__name: "input-number",
	props: inputNumberProps,
	emits: inputNumberEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = useLocale();
		const ns = useNamespace("input-number");
		const input = ref();
		const data = reactive({
			currentValue: props.modelValue,
			userInput: null
		});
		const { formItem } = useFormItem();
		const minDisabled = computed(() => isNumber(props.modelValue) && props.modelValue <= props.min);
		const maxDisabled = computed(() => isNumber(props.modelValue) && props.modelValue >= props.max);
		const numPrecision = computed(() => {
			const stepPrecision = getPrecision(props.step);
			if (!isUndefined$1(props.precision)) {
				if (stepPrecision > props.precision) debugWarn("InputNumber", "precision should not be less than the decimal places of step");
				return props.precision;
			} else return Math.max(getPrecision(props.modelValue), stepPrecision);
		});
		const controlsAtRight = computed(() => {
			return props.controls && props.controlsPosition === "right";
		});
		const inputNumberSize = useFormSize();
		const inputNumberDisabled = useFormDisabled();
		const displayValue = computed(() => {
			if (data.userInput !== null) return data.userInput;
			let currentValue = data.currentValue;
			if (isNil(currentValue)) return "";
			if (isNumber(currentValue)) {
				if (Number.isNaN(currentValue)) return "";
				if (!isUndefined$1(props.precision)) currentValue = currentValue.toFixed(props.precision);
			}
			return currentValue;
		});
		const toPrecision = (num, pre) => {
			if (isUndefined$1(pre)) pre = numPrecision.value;
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
			if (isNil(value)) return 0;
			const valueString = value.toString();
			const dotPosition = valueString.indexOf(".");
			let precision = 0;
			if (dotPosition !== -1) precision = valueString.length - dotPosition - 1;
			return precision;
		};
		const ensurePrecision = (val, coefficient = 1) => {
			if (!isNumber(val)) return data.currentValue;
			if (val >= Number.MAX_SAFE_INTEGER && coefficient === 1) {
				debugWarn("InputNumber", "The value has reached the maximum safe integer limit.");
				return val;
			} else if (val <= Number.MIN_SAFE_INTEGER && coefficient === -1) {
				debugWarn("InputNumber", "The value has reached the minimum safe integer limit.");
				return val;
			}
			return toPrecision(val + props.step * coefficient);
		};
		const handleKeydown = (event) => {
			const code = getEventCode(event);
			const key = getEventKey(event);
			if (props.disabledScientific && ["e", "E"].includes(key)) {
				event.preventDefault();
				return;
			}
			switch (code) {
				case EVENT_CODE.up:
					event.preventDefault();
					increase();
					break;
				case EVENT_CODE.down:
					event.preventDefault();
					decrease();
					break;
			}
		};
		const increase = () => {
			if (props.readonly || inputNumberDisabled.value || maxDisabled.value) return;
			setCurrentValue(ensurePrecision(Number(displayValue.value) || 0));
			emit(INPUT_EVENT, data.currentValue);
			setCurrentValueToModelValue();
		};
		const decrease = () => {
			if (props.readonly || inputNumberDisabled.value || minDisabled.value) return;
			setCurrentValue(ensurePrecision(Number(displayValue.value) || 0, -1));
			emit(INPUT_EVENT, data.currentValue);
			setCurrentValueToModelValue();
		};
		const verifyValue = (value, update) => {
			const { max, min, step, precision, stepStrictly, valueOnClear } = props;
			if (max < min) throwError("InputNumber", "min should not be greater than max.");
			let newVal = Number(value);
			if (isNil(value) || Number.isNaN(newVal)) return null;
			if (value === "") {
				if (valueOnClear === null) return null;
				newVal = isString(valueOnClear) ? {
					min,
					max
				}[valueOnClear] : valueOnClear;
			}
			if (stepStrictly) {
				newVal = toPrecision(Math.round(toPrecision(newVal / step)) * step, precision);
				if (newVal !== value) update && emit(UPDATE_MODEL_EVENT, newVal);
			}
			if (!isUndefined$1(precision)) newVal = toPrecision(newVal, precision);
			if (newVal > max || newVal < min) {
				newVal = newVal > max ? max : min;
				update && emit(UPDATE_MODEL_EVENT, newVal);
			}
			return newVal;
		};
		const setCurrentValue = (value, emitChange = true) => {
			const oldVal = data.currentValue;
			const newVal = verifyValue(value);
			if (!emitChange) {
				emit(UPDATE_MODEL_EVENT, newVal);
				return;
			}
			data.userInput = null;
			if (oldVal === newVal && value) return;
			emit(UPDATE_MODEL_EVENT, newVal);
			if (oldVal !== newVal) emit(CHANGE_EVENT, newVal, oldVal);
			if (props.validateEvent) formItem?.validate?.("change").catch((err) => debugWarn(err));
			data.currentValue = newVal;
		};
		const handleInput = (value) => {
			data.userInput = value;
			const newVal = value === "" ? null : Number(value);
			emit(INPUT_EVENT, newVal);
			setCurrentValue(newVal, false);
		};
		const handleInputChange = (value) => {
			const newVal = value !== "" ? Number(value) : "";
			if (isNumber(newVal) && !Number.isNaN(newVal) || value === "") setCurrentValue(newVal);
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
			if (props.validateEvent) formItem?.validate?.("blur").catch((err) => debugWarn(err));
		};
		const setCurrentValueToModelValue = () => {
			if (data.currentValue !== props.modelValue) data.currentValue = props.modelValue;
		};
		const handleWheel = (e) => {
			if (document.activeElement === e.target) e.preventDefault();
		};
		watch(() => props.modelValue, (value, oldValue) => {
			const newValue = verifyValue(value, true);
			if (data.userInput === null && newValue !== oldValue) data.currentValue = newValue;
		}, { immediate: true });
		watch(() => props.precision, () => {
			data.currentValue = verifyValue(props.modelValue);
		});
		onMounted(() => {
			const { min, max, modelValue } = props;
			const innerInput = input.value?.input;
			innerInput.setAttribute("role", "spinbutton");
			if (Number.isFinite(max)) innerInput.setAttribute("aria-valuemax", String(max));
			else innerInput.removeAttribute("aria-valuemax");
			if (Number.isFinite(min)) innerInput.setAttribute("aria-valuemin", String(min));
			else innerInput.removeAttribute("aria-valuemin");
			innerInput.setAttribute("aria-valuenow", data.currentValue || data.currentValue === 0 ? String(data.currentValue) : "");
			innerInput.setAttribute("aria-disabled", String(inputNumberDisabled.value));
			if (!isNumber(modelValue) && modelValue != null) {
				let val = Number(modelValue);
				if (Number.isNaN(val)) val = null;
				emit(UPDATE_MODEL_EVENT, val);
			}
			innerInput.addEventListener("wheel", handleWheel, { passive: false });
		});
		onUpdated(() => {
			(input.value?.input)?.setAttribute("aria-valuenow", `${data.currentValue ?? ""}`);
		});
		__expose({
			focus,
			blur
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass([
					unref(ns).b(),
					unref(ns).m(unref(inputNumberSize)),
					unref(ns).is("disabled", unref(inputNumberDisabled)),
					unref(ns).is("without-controls", !__props.controls),
					unref(ns).is("controls-right", controlsAtRight.value),
					unref(ns).is(__props.align, !!__props.align)
				]),
				onDragstart: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"]))
			}, [
				__props.controls ? withDirectives((openBlock(), createElementBlock("span", {
					key: 0,
					role: "button",
					"aria-label": unref(t)("el.inputNumber.decrease"),
					class: normalizeClass([unref(ns).e("decrease"), unref(ns).is("disabled", minDisabled.value)]),
					onKeydown: withKeys(decrease, ["enter"])
				}, [renderSlot(_ctx.$slots, "decrease-icon", {}, () => [createVNode(unref(ElIcon), null, {
					default: withCtx(() => [controlsAtRight.value ? (openBlock(), createBlock(unref(ArrowDown), { key: 0 })) : (openBlock(), createBlock(unref(Minus), { key: 1 }))]),
					_: 1
				})])], 42, _hoisted_1)), [[unref(vRepeatClick), decrease]]) : createCommentVNode("v-if", true),
				__props.controls ? withDirectives((openBlock(), createElementBlock("span", {
					key: 1,
					role: "button",
					"aria-label": unref(t)("el.inputNumber.increase"),
					class: normalizeClass([unref(ns).e("increase"), unref(ns).is("disabled", maxDisabled.value)]),
					onKeydown: withKeys(increase, ["enter"])
				}, [renderSlot(_ctx.$slots, "increase-icon", {}, () => [createVNode(unref(ElIcon), null, {
					default: withCtx(() => [controlsAtRight.value ? (openBlock(), createBlock(unref(ArrowUp), { key: 0 })) : (openBlock(), createBlock(unref(Plus), { key: 1 }))]),
					_: 1
				})])], 42, _hoisted_2)), [[unref(vRepeatClick), increase]]) : createCommentVNode("v-if", true),
				createVNode(unref(ElInput), {
					id: __props.id,
					ref_key: "input",
					ref: input,
					type: "number",
					step: __props.step,
					"model-value": displayValue.value,
					placeholder: __props.placeholder,
					readonly: __props.readonly,
					disabled: unref(inputNumberDisabled),
					size: unref(inputNumberSize),
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
				}, createSlots({ _: 2 }, [_ctx.$slots.prefix ? {
					name: "prefix",
					fn: withCtx(() => [renderSlot(_ctx.$slots, "prefix")]),
					key: "0"
				} : void 0, _ctx.$slots.suffix ? {
					name: "suffix",
					fn: withCtx(() => [renderSlot(_ctx.$slots, "suffix")]),
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
export { input_number_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=input-number.vue_vue_type_script_setup_true_lang.mjs.map
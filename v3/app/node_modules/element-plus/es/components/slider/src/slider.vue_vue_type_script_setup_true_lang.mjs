import { isNumber } from "../../../utils/types.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItemInputId } from "../../form/src/hooks/use-form-item.mjs";
import { ElInputNumber } from "../../input-number/index.mjs";
import { sliderContextKey } from "./constants.mjs";
import { sliderEmits, sliderProps } from "./slider.mjs";
import { useLifecycle } from "./composables/use-lifecycle.mjs";
import { useMarks } from "./composables/use-marks.mjs";
import { useSlide } from "./composables/use-slide.mjs";
import { useStops } from "./composables/use-stops.mjs";
import { useWatch } from "./composables/use-watch.mjs";
import button_default from "./button2.mjs";
import marker_default from "./marker.mjs";
import { useEventListener } from "@vueuse/core";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, provide, reactive, renderList, toRefs, unref, withModifiers } from "vue";

//#region ../../packages/components/slider/src/slider.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"role",
	"aria-label",
	"aria-labelledby"
];
const _hoisted_2 = { key: 1 };
var slider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElSlider",
	__name: "slider",
	props: sliderProps,
	emits: sliderEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("slider");
		const { t } = useLocale();
		const initData = reactive({
			firstValue: 0,
			secondValue: 0,
			oldValue: 0,
			dragging: false,
			sliderSize: 1
		});
		const { elFormItem, slider, firstButton, secondButton, sliderDisabled, minValue, maxValue, runwayStyle, barStyle, resetSize, emitChange, onSliderWrapperPrevent, onSliderClick, onSliderDown, onSliderMarkerDown, setFirstValue, setSecondValue } = useSlide(props, initData, emit);
		const { stops, getStopStyle } = useStops(props, initData, minValue, maxValue);
		const { inputId, isLabeledByFormItem } = useFormItemInputId(props, { formItemContext: elFormItem });
		const sliderWrapperSize = useFormSize();
		const sliderInputSize = computed(() => props.inputSize || sliderWrapperSize.value);
		const renderInput = computed(() => {
			return props.showInput && !props.range && props.step !== "mark";
		});
		const groupLabel = computed(() => {
			return props.ariaLabel || t("el.slider.defaultLabel", {
				min: props.min,
				max: props.max
			});
		});
		const firstButtonLabel = computed(() => {
			if (props.range) return props.rangeStartLabel || t("el.slider.defaultRangeStartLabel");
			else return groupLabel.value;
		});
		const firstValueText = computed(() => {
			return props.formatValueText ? props.formatValueText(firstValue.value) : `${firstValue.value}`;
		});
		const secondButtonLabel = computed(() => {
			return props.rangeEndLabel || t("el.slider.defaultRangeEndLabel");
		});
		const secondValueText = computed(() => {
			return props.formatValueText ? props.formatValueText(secondValue.value) : `${secondValue.value}`;
		});
		const sliderKls = computed(() => [
			ns.b(),
			ns.m(sliderWrapperSize.value),
			ns.is("vertical", props.vertical),
			{ [ns.m("with-input")]: renderInput.value }
		]);
		const markList = useMarks(props);
		useWatch(props, initData, minValue, maxValue, emit, elFormItem);
		const sliderInputStep = computed(() => {
			return isNumber(props.step) ? props.step : 1;
		});
		const precision = computed(() => {
			const stepValue = isNumber(props.step) ? props.step : 1;
			const precisions = [
				props.min,
				props.max,
				stepValue
			].map((item) => {
				const decimal = `${item}`.split(".")[1];
				return decimal ? decimal.length : 0;
			});
			return Math.max.apply(null, precisions);
		});
		const { sliderWrapper } = useLifecycle(props, initData, resetSize);
		const { firstValue, secondValue, sliderSize } = toRefs(initData);
		const updateDragging = (val) => {
			initData.dragging = val;
		};
		useEventListener(sliderWrapper, "touchstart", onSliderWrapperPrevent, { passive: false });
		useEventListener(sliderWrapper, "touchmove", onSliderWrapperPrevent, { passive: false });
		provide(sliderContextKey, {
			...toRefs(props),
			sliderSize,
			disabled: sliderDisabled,
			precision,
			markList,
			emitChange,
			resetSize,
			updateDragging
		});
		__expose({ onSliderClick });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				id: _ctx.range ? unref(inputId) : void 0,
				ref_key: "sliderWrapper",
				ref: sliderWrapper,
				class: normalizeClass(sliderKls.value),
				role: _ctx.range ? "group" : void 0,
				"aria-label": _ctx.range && !unref(isLabeledByFormItem) ? groupLabel.value : void 0,
				"aria-labelledby": _ctx.range && unref(isLabeledByFormItem) ? unref(elFormItem)?.labelId : void 0
			}, [createElementVNode("div", {
				ref_key: "slider",
				ref: slider,
				class: normalizeClass([
					unref(ns).e("runway"),
					{ "show-input": renderInput.value },
					unref(ns).is("disabled", unref(sliderDisabled))
				]),
				style: normalizeStyle(unref(runwayStyle)),
				onMousedown: _cache[0] || (_cache[0] = (...args) => unref(onSliderDown) && unref(onSliderDown)(...args)),
				onTouchstartPassive: _cache[1] || (_cache[1] = (...args) => unref(onSliderDown) && unref(onSliderDown)(...args))
			}, [
				createElementVNode("div", {
					class: normalizeClass(unref(ns).e("bar")),
					style: normalizeStyle(unref(barStyle))
				}, null, 6),
				createVNode(button_default, {
					id: !_ctx.range ? unref(inputId) : void 0,
					ref_key: "firstButton",
					ref: firstButton,
					"model-value": unref(firstValue),
					vertical: _ctx.vertical,
					"tooltip-class": _ctx.tooltipClass,
					placement: _ctx.placement,
					role: "slider",
					"aria-label": _ctx.range || !unref(isLabeledByFormItem) ? firstButtonLabel.value : void 0,
					"aria-labelledby": !_ctx.range && unref(isLabeledByFormItem) ? unref(elFormItem)?.labelId : void 0,
					"aria-valuemin": _ctx.min,
					"aria-valuemax": _ctx.range ? unref(secondValue) : _ctx.max,
					"aria-valuenow": unref(firstValue),
					"aria-valuetext": firstValueText.value,
					"aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
					"aria-disabled": unref(sliderDisabled),
					"onUpdate:modelValue": unref(setFirstValue)
				}, null, 8, [
					"id",
					"model-value",
					"vertical",
					"tooltip-class",
					"placement",
					"aria-label",
					"aria-labelledby",
					"aria-valuemin",
					"aria-valuemax",
					"aria-valuenow",
					"aria-valuetext",
					"aria-orientation",
					"aria-disabled",
					"onUpdate:modelValue"
				]),
				_ctx.range ? (openBlock(), createBlock(button_default, {
					key: 0,
					ref_key: "secondButton",
					ref: secondButton,
					"model-value": unref(secondValue),
					vertical: _ctx.vertical,
					"tooltip-class": _ctx.tooltipClass,
					placement: _ctx.placement,
					role: "slider",
					"aria-label": secondButtonLabel.value,
					"aria-valuemin": unref(firstValue),
					"aria-valuemax": _ctx.max,
					"aria-valuenow": unref(secondValue),
					"aria-valuetext": secondValueText.value,
					"aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
					"aria-disabled": unref(sliderDisabled),
					"onUpdate:modelValue": unref(setSecondValue)
				}, null, 8, [
					"model-value",
					"vertical",
					"tooltip-class",
					"placement",
					"aria-label",
					"aria-valuemin",
					"aria-valuemax",
					"aria-valuenow",
					"aria-valuetext",
					"aria-orientation",
					"aria-disabled",
					"onUpdate:modelValue"
				])) : createCommentVNode("v-if", true),
				_ctx.showStops ? (openBlock(), createElementBlock("div", _hoisted_2, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(stops), (item, key) => {
					return openBlock(), createElementBlock("div", {
						key,
						class: normalizeClass(unref(ns).e("stop")),
						style: normalizeStyle(unref(getStopStyle)(item))
					}, null, 6);
				}), 128))])) : createCommentVNode("v-if", true),
				unref(markList).length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [createElementVNode("div", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(markList), (item, key) => {
					return openBlock(), createElementBlock("div", {
						key,
						style: normalizeStyle(unref(getStopStyle)(item.position)),
						class: normalizeClass([unref(ns).e("stop"), unref(ns).e("marks-stop")])
					}, null, 6);
				}), 128))]), createElementVNode("div", { class: normalizeClass(unref(ns).e("marks")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(markList), (item, key) => {
					return openBlock(), createBlock(unref(marker_default), {
						key,
						mark: item.mark,
						style: normalizeStyle(unref(getStopStyle)(item.position)),
						onMousedown: withModifiers(($event) => unref(onSliderMarkerDown)(item.position), ["stop"])
					}, null, 8, [
						"mark",
						"style",
						"onMousedown"
					]);
				}), 128))], 2)], 64)) : createCommentVNode("v-if", true)
			], 38), renderInput.value ? (openBlock(), createBlock(unref(ElInputNumber), {
				key: 0,
				ref: "input",
				"model-value": unref(firstValue),
				class: normalizeClass(unref(ns).e("input")),
				step: sliderInputStep.value,
				disabled: unref(sliderDisabled),
				controls: _ctx.showInputControls,
				min: _ctx.min,
				max: _ctx.max,
				precision: precision.value,
				size: sliderInputSize.value,
				"onUpdate:modelValue": unref(setFirstValue),
				onChange: unref(emitChange)
			}, null, 8, [
				"model-value",
				"class",
				"step",
				"disabled",
				"controls",
				"min",
				"max",
				"precision",
				"size",
				"onUpdate:modelValue",
				"onChange"
			])) : createCommentVNode("v-if", true)], 10, _hoisted_1);
		};
	}
});

//#endregion
export { slider_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=slider.vue_vue_type_script_setup_true_lang.mjs.map
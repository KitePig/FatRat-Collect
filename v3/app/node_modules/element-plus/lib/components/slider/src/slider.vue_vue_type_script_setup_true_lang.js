const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_index$2 = require('../../input-number/index.js');
const require_constants = require('./constants.js');
const require_slider = require('./slider.js');
const require_use_lifecycle = require('./composables/use-lifecycle.js');
const require_use_marks = require('./composables/use-marks.js');
const require_use_slide = require('./composables/use-slide.js');
const require_use_stops = require('./composables/use-stops.js');
const require_use_watch = require('./composables/use-watch.js');
const require_button = require('./button2.js');
const require_marker = require('./marker.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/slider/src/slider.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"role",
	"aria-label",
	"aria-labelledby"
];
const _hoisted_2 = { key: 1 };
var slider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSlider",
	__name: "slider",
	props: require_slider.sliderProps,
	emits: require_slider.sliderEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index$1.useNamespace("slider");
		const { t } = require_index.useLocale();
		const initData = (0, vue.reactive)({
			firstValue: 0,
			secondValue: 0,
			oldValue: 0,
			dragging: false,
			sliderSize: 1
		});
		const { elFormItem, slider, firstButton, secondButton, sliderDisabled, minValue, maxValue, runwayStyle, barStyle, resetSize, emitChange, onSliderWrapperPrevent, onSliderClick, onSliderDown, onSliderMarkerDown, setFirstValue, setSecondValue } = require_use_slide.useSlide(props, initData, emit);
		const { stops, getStopStyle } = require_use_stops.useStops(props, initData, minValue, maxValue);
		const { inputId, isLabeledByFormItem } = require_use_form_item.useFormItemInputId(props, { formItemContext: elFormItem });
		const sliderWrapperSize = require_use_form_common_props.useFormSize();
		const sliderInputSize = (0, vue.computed)(() => props.inputSize || sliderWrapperSize.value);
		const renderInput = (0, vue.computed)(() => {
			return props.showInput && !props.range && props.step !== "mark";
		});
		const groupLabel = (0, vue.computed)(() => {
			return props.ariaLabel || t("el.slider.defaultLabel", {
				min: props.min,
				max: props.max
			});
		});
		const firstButtonLabel = (0, vue.computed)(() => {
			if (props.range) return props.rangeStartLabel || t("el.slider.defaultRangeStartLabel");
			else return groupLabel.value;
		});
		const firstValueText = (0, vue.computed)(() => {
			return props.formatValueText ? props.formatValueText(firstValue.value) : `${firstValue.value}`;
		});
		const secondButtonLabel = (0, vue.computed)(() => {
			return props.rangeEndLabel || t("el.slider.defaultRangeEndLabel");
		});
		const secondValueText = (0, vue.computed)(() => {
			return props.formatValueText ? props.formatValueText(secondValue.value) : `${secondValue.value}`;
		});
		const sliderKls = (0, vue.computed)(() => [
			ns.b(),
			ns.m(sliderWrapperSize.value),
			ns.is("vertical", props.vertical),
			{ [ns.m("with-input")]: renderInput.value }
		]);
		const markList = require_use_marks.useMarks(props);
		require_use_watch.useWatch(props, initData, minValue, maxValue, emit, elFormItem);
		const sliderInputStep = (0, vue.computed)(() => {
			return require_types.isNumber(props.step) ? props.step : 1;
		});
		const precision = (0, vue.computed)(() => {
			const stepValue = require_types.isNumber(props.step) ? props.step : 1;
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
		const { sliderWrapper } = require_use_lifecycle.useLifecycle(props, initData, resetSize);
		const { firstValue, secondValue, sliderSize } = (0, vue.toRefs)(initData);
		const updateDragging = (val) => {
			initData.dragging = val;
		};
		(0, _vueuse_core.useEventListener)(sliderWrapper, "touchstart", onSliderWrapperPrevent, { passive: false });
		(0, _vueuse_core.useEventListener)(sliderWrapper, "touchmove", onSliderWrapperPrevent, { passive: false });
		(0, vue.provide)(require_constants.sliderContextKey, {
			...(0, vue.toRefs)(props),
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				id: _ctx.range ? (0, vue.unref)(inputId) : void 0,
				ref_key: "sliderWrapper",
				ref: sliderWrapper,
				class: (0, vue.normalizeClass)(sliderKls.value),
				role: _ctx.range ? "group" : void 0,
				"aria-label": _ctx.range && !(0, vue.unref)(isLabeledByFormItem) ? groupLabel.value : void 0,
				"aria-labelledby": _ctx.range && (0, vue.unref)(isLabeledByFormItem) ? (0, vue.unref)(elFormItem)?.labelId : void 0
			}, [(0, vue.createElementVNode)("div", {
				ref_key: "slider",
				ref: slider,
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(ns).e("runway"),
					{ "show-input": renderInput.value },
					(0, vue.unref)(ns).is("disabled", (0, vue.unref)(sliderDisabled))
				]),
				style: (0, vue.normalizeStyle)((0, vue.unref)(runwayStyle)),
				onMousedown: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(onSliderDown) && (0, vue.unref)(onSliderDown)(...args)),
				onTouchstartPassive: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(onSliderDown) && (0, vue.unref)(onSliderDown)(...args))
			}, [
				(0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("bar")),
					style: (0, vue.normalizeStyle)((0, vue.unref)(barStyle))
				}, null, 6),
				(0, vue.createVNode)(require_button.default, {
					id: !_ctx.range ? (0, vue.unref)(inputId) : void 0,
					ref_key: "firstButton",
					ref: firstButton,
					"model-value": (0, vue.unref)(firstValue),
					vertical: _ctx.vertical,
					"tooltip-class": _ctx.tooltipClass,
					placement: _ctx.placement,
					role: "slider",
					"aria-label": _ctx.range || !(0, vue.unref)(isLabeledByFormItem) ? firstButtonLabel.value : void 0,
					"aria-labelledby": !_ctx.range && (0, vue.unref)(isLabeledByFormItem) ? (0, vue.unref)(elFormItem)?.labelId : void 0,
					"aria-valuemin": _ctx.min,
					"aria-valuemax": _ctx.range ? (0, vue.unref)(secondValue) : _ctx.max,
					"aria-valuenow": (0, vue.unref)(firstValue),
					"aria-valuetext": firstValueText.value,
					"aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
					"aria-disabled": (0, vue.unref)(sliderDisabled),
					"onUpdate:modelValue": (0, vue.unref)(setFirstValue)
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
				_ctx.range ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_button.default, {
					key: 0,
					ref_key: "secondButton",
					ref: secondButton,
					"model-value": (0, vue.unref)(secondValue),
					vertical: _ctx.vertical,
					"tooltip-class": _ctx.tooltipClass,
					placement: _ctx.placement,
					role: "slider",
					"aria-label": secondButtonLabel.value,
					"aria-valuemin": (0, vue.unref)(firstValue),
					"aria-valuemax": _ctx.max,
					"aria-valuenow": (0, vue.unref)(secondValue),
					"aria-valuetext": secondValueText.value,
					"aria-orientation": _ctx.vertical ? "vertical" : "horizontal",
					"aria-disabled": (0, vue.unref)(sliderDisabled),
					"onUpdate:modelValue": (0, vue.unref)(setSecondValue)
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
				])) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.showStops ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_2, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(stops), (item, key) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("stop")),
						style: (0, vue.normalizeStyle)((0, vue.unref)(getStopStyle)(item))
					}, null, 6);
				}), 128))])) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.unref)(markList).length > 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 2 }, [(0, vue.createElementVNode)("div", null, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(markList), (item, key) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key,
						style: (0, vue.normalizeStyle)((0, vue.unref)(getStopStyle)(item.position)),
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("stop"), (0, vue.unref)(ns).e("marks-stop")])
					}, null, 6);
				}), 128))]), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("marks")) }, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(markList), (item, key) => {
					return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_marker.default), {
						key,
						mark: item.mark,
						style: (0, vue.normalizeStyle)((0, vue.unref)(getStopStyle)(item.position)),
						onMousedown: (0, vue.withModifiers)(($event) => (0, vue.unref)(onSliderMarkerDown)(item.position), ["stop"])
					}, null, 8, [
						"mark",
						"style",
						"onMousedown"
					]);
				}), 128))], 2)], 64)) : (0, vue.createCommentVNode)("v-if", true)
			], 38), renderInput.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElInputNumber), {
				key: 0,
				ref: "input",
				"model-value": (0, vue.unref)(firstValue),
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("input")),
				step: sliderInputStep.value,
				disabled: (0, vue.unref)(sliderDisabled),
				controls: _ctx.showInputControls,
				min: _ctx.min,
				max: _ctx.max,
				precision: precision.value,
				size: sliderInputSize.value,
				"onUpdate:modelValue": (0, vue.unref)(setFirstValue),
				onChange: (0, vue.unref)(emitChange)
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
			])) : (0, vue.createCommentVNode)("v-if", true)], 10, _hoisted_1);
		};
	}
});

//#endregion
exports.default = slider_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=slider.vue_vue_type_script_setup_true_lang.js.map
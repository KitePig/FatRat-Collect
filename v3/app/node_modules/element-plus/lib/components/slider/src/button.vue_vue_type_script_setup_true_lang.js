const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../tooltip/index.js');
const require_use_slider_button = require('./composables/use-slider-button.js');
const require_button = require('./button.js');
let vue = require("vue");

//#region ../../packages/components/slider/src/button.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["tabindex"];
var button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSliderButton",
	__name: "button",
	props: require_button.sliderButtonProps,
	emits: require_button.sliderButtonEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("slider");
		const initData = (0, vue.reactive)({
			hovering: false,
			dragging: false,
			isClick: false,
			startX: 0,
			currentX: 0,
			startY: 0,
			currentY: 0,
			startPosition: 0,
			newPosition: 0,
			oldValue: props.modelValue
		});
		const tooltipPersistent = (0, vue.computed)(() => !showTooltip.value ? false : persistent.value);
		const { disabled, button, tooltip, showTooltip, persistent, tooltipVisible, wrapperStyle, formatValue, handleMouseEnter, handleMouseLeave, onButtonDown, onKeyDown, setPosition } = require_use_slider_button.useSliderButton(props, initData, emit);
		const { hovering, dragging } = (0, vue.toRefs)(initData);
		__expose({
			onButtonDown,
			onKeyDown,
			setPosition,
			hovering,
			dragging
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "button",
				ref: button,
				class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("button-wrapper"), {
					hover: (0, vue.unref)(hovering),
					dragging: (0, vue.unref)(dragging)
				}]),
				style: (0, vue.normalizeStyle)((0, vue.unref)(wrapperStyle)),
				tabindex: (0, vue.unref)(disabled) ? void 0 : 0,
				onMouseenter: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleMouseEnter) && (0, vue.unref)(handleMouseEnter)(...args)),
				onMouseleave: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handleMouseLeave) && (0, vue.unref)(handleMouseLeave)(...args)),
				onMousedown: _cache[2] || (_cache[2] = (...args) => (0, vue.unref)(onButtonDown) && (0, vue.unref)(onButtonDown)(...args)),
				onFocus: _cache[3] || (_cache[3] = (...args) => (0, vue.unref)(handleMouseEnter) && (0, vue.unref)(handleMouseEnter)(...args)),
				onBlur: _cache[4] || (_cache[4] = (...args) => (0, vue.unref)(handleMouseLeave) && (0, vue.unref)(handleMouseLeave)(...args)),
				onKeydown: _cache[5] || (_cache[5] = (...args) => (0, vue.unref)(onKeyDown) && (0, vue.unref)(onKeyDown)(...args))
			}, [(0, vue.createVNode)((0, vue.unref)(require_index$1.ElTooltip), {
				ref_key: "tooltip",
				ref: tooltip,
				visible: (0, vue.unref)(tooltipVisible),
				placement: _ctx.placement,
				"fallback-placements": [
					"top",
					"bottom",
					"right",
					"left"
				],
				"stop-popper-mouse-event": false,
				"popper-class": _ctx.tooltipClass,
				disabled: !(0, vue.unref)(showTooltip),
				persistent: tooltipPersistent.value
			}, {
				content: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)((0, vue.unref)(formatValue)), 1)]),
				default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("button"), {
					hover: (0, vue.unref)(hovering),
					dragging: (0, vue.unref)(dragging)
				}]) }, null, 2)]),
				_: 1
			}, 8, [
				"visible",
				"placement",
				"popper-class",
				"disabled",
				"persistent"
			])], 46, _hoisted_1);
		};
	}
});

//#endregion
exports.default = button_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=button.vue_vue_type_script_setup_true_lang.js.map
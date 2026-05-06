import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { useSliderButton } from "./composables/use-slider-button.mjs";
import { sliderButtonEmits, sliderButtonProps } from "./button.mjs";
import { computed, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, reactive, toDisplayString, toRefs, unref, withCtx } from "vue";

//#region ../../packages/components/slider/src/button.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["tabindex"];
var button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElSliderButton",
	__name: "button",
	props: sliderButtonProps,
	emits: sliderButtonEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("slider");
		const initData = reactive({
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
		const tooltipPersistent = computed(() => !showTooltip.value ? false : persistent.value);
		const { disabled, button, tooltip, showTooltip, persistent, tooltipVisible, wrapperStyle, formatValue, handleMouseEnter, handleMouseLeave, onButtonDown, onKeyDown, setPosition } = useSliderButton(props, initData, emit);
		const { hovering, dragging } = toRefs(initData);
		__expose({
			onButtonDown,
			onKeyDown,
			setPosition,
			hovering,
			dragging
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "button",
				ref: button,
				class: normalizeClass([unref(ns).e("button-wrapper"), {
					hover: unref(hovering),
					dragging: unref(dragging)
				}]),
				style: normalizeStyle(unref(wrapperStyle)),
				tabindex: unref(disabled) ? void 0 : 0,
				onMouseenter: _cache[0] || (_cache[0] = (...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args)),
				onMouseleave: _cache[1] || (_cache[1] = (...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args)),
				onMousedown: _cache[2] || (_cache[2] = (...args) => unref(onButtonDown) && unref(onButtonDown)(...args)),
				onFocus: _cache[3] || (_cache[3] = (...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args)),
				onBlur: _cache[4] || (_cache[4] = (...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args)),
				onKeydown: _cache[5] || (_cache[5] = (...args) => unref(onKeyDown) && unref(onKeyDown)(...args))
			}, [createVNode(unref(ElTooltip), {
				ref_key: "tooltip",
				ref: tooltip,
				visible: unref(tooltipVisible),
				placement: _ctx.placement,
				"fallback-placements": [
					"top",
					"bottom",
					"right",
					"left"
				],
				"stop-popper-mouse-event": false,
				"popper-class": _ctx.tooltipClass,
				disabled: !unref(showTooltip),
				persistent: tooltipPersistent.value
			}, {
				content: withCtx(() => [createElementVNode("span", null, toDisplayString(unref(formatValue)), 1)]),
				default: withCtx(() => [createElementVNode("div", { class: normalizeClass([unref(ns).e("button"), {
					hover: unref(hovering),
					dragging: unref(dragging)
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
export { button_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=button.vue_vue_type_script_setup_true_lang.mjs.map
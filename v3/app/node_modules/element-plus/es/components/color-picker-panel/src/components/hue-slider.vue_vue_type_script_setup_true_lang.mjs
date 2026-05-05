import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { hueSliderProps } from "../props/slider.mjs";
import { useSlider, useSliderDOM } from "../composables/use-slider.mjs";
import { computed, createElementBlock, createElementVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, unref } from "vue";

//#region ../../packages/components/color-picker-panel/src/components/hue-slider.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"aria-label",
	"aria-valuenow",
	"aria-valuetext",
	"aria-orientation",
	"tabindex",
	"aria-disabled"
];
const minValue = 0;
const maxValue = 360;
var hue_slider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElColorHueSlider",
	__name: "hue-slider",
	props: hueSliderProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider(props, {
			key: "hue",
			minValue,
			maxValue
		});
		const { rootKls, barKls, thumbKls, thumbStyle, thumbTop, update } = useSliderDOM(props, {
			namespace: "color-hue-slider",
			maxValue,
			currentValue,
			bar,
			thumb,
			handleDrag
		});
		const { t } = useLocale();
		const ariaLabel = computed(() => t("el.colorpicker.hueLabel"));
		const ariaValuetext = computed(() => {
			return t("el.colorpicker.hueDescription", {
				hue: currentValue.value,
				color: props.color.value
			});
		});
		__expose({
			bar,
			thumb,
			thumbTop,
			update
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(rootKls)) }, [createElementVNode("div", {
				ref_key: "bar",
				ref: bar,
				class: normalizeClass(unref(barKls)),
				onClick: _cache[0] || (_cache[0] = (...args) => unref(handleClick) && unref(handleClick)(...args))
			}, null, 2), createElementVNode("div", {
				ref_key: "thumb",
				ref: thumb,
				class: normalizeClass(unref(thumbKls)),
				style: normalizeStyle(unref(thumbStyle)),
				"aria-label": ariaLabel.value,
				"aria-valuenow": unref(currentValue),
				"aria-valuetext": ariaValuetext.value,
				"aria-orientation": __props.vertical ? "vertical" : "horizontal",
				"aria-valuemin": minValue,
				"aria-valuemax": maxValue,
				role: "slider",
				tabindex: __props.disabled ? void 0 : 0,
				"aria-disabled": __props.disabled,
				onKeydown: _cache[1] || (_cache[1] = (...args) => unref(handleKeydown) && unref(handleKeydown)(...args))
			}, null, 46, _hoisted_1)], 2);
		};
	}
});

//#endregion
export { hue_slider_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=hue-slider.vue_vue_type_script_setup_true_lang.mjs.map
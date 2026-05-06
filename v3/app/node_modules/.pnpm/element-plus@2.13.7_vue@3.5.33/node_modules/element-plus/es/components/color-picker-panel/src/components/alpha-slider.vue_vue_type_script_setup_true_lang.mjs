import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { alphaSliderProps } from "../props/slider.mjs";
import { useSlider, useSliderDOM } from "../composables/use-slider.mjs";
import { computed, createElementBlock, createElementVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, unref } from "vue";

//#region ../../packages/components/color-picker-panel/src/components/alpha-slider.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"aria-label",
	"aria-valuenow",
	"aria-valuetext",
	"aria-orientation",
	"tabindex",
	"aria-disabled"
];
const minValue = 0;
const maxValue = 100;
var alpha_slider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElColorAlphaSlider",
	__name: "alpha-slider",
	props: alphaSliderProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = useSlider(props, {
			key: "alpha",
			minValue,
			maxValue
		});
		const { rootKls, barKls, barStyle, thumbKls, thumbStyle, update } = useSliderDOM(props, {
			namespace: "color-alpha-slider",
			maxValue,
			currentValue,
			bar,
			thumb,
			handleDrag,
			getBackground
		});
		const { t } = useLocale();
		const ariaLabel = computed(() => t("el.colorpicker.alphaLabel"));
		const ariaValuetext = computed(() => {
			return t("el.colorpicker.alphaDescription", {
				alpha: currentValue.value,
				color: props.color.value
			});
		});
		function getBackground() {
			if (props.color && props.color.value) {
				const { r, g, b } = props.color.toRgb();
				return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`;
			}
			return "";
		}
		__expose({
			update,
			bar,
			thumb
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(rootKls)) }, [createElementVNode("div", {
				ref_key: "bar",
				ref: bar,
				class: normalizeClass(unref(barKls)),
				style: normalizeStyle(unref(barStyle)),
				onClick: _cache[0] || (_cache[0] = (...args) => unref(handleClick) && unref(handleClick)(...args))
			}, null, 6), createElementVNode("div", {
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
export { alpha_slider_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=alpha-slider.vue_vue_type_script_setup_true_lang.mjs.map
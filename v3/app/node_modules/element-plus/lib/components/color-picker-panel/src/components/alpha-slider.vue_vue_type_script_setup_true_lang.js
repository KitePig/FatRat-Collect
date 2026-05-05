const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_slider = require('../props/slider.js');
const require_use_slider = require('../composables/use-slider.js');
let vue = require("vue");

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
var alpha_slider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElColorAlphaSlider",
	__name: "alpha-slider",
	props: require_slider.alphaSliderProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = require_use_slider.useSlider(props, {
			key: "alpha",
			minValue,
			maxValue
		});
		const { rootKls, barKls, barStyle, thumbKls, thumbStyle, update } = require_use_slider.useSliderDOM(props, {
			namespace: "color-alpha-slider",
			maxValue,
			currentValue,
			bar,
			thumb,
			handleDrag,
			getBackground
		});
		const { t } = require_index.useLocale();
		const ariaLabel = (0, vue.computed)(() => t("el.colorpicker.alphaLabel"));
		const ariaValuetext = (0, vue.computed)(() => {
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(rootKls)) }, [(0, vue.createElementVNode)("div", {
				ref_key: "bar",
				ref: bar,
				class: (0, vue.normalizeClass)((0, vue.unref)(barKls)),
				style: (0, vue.normalizeStyle)((0, vue.unref)(barStyle)),
				onClick: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleClick) && (0, vue.unref)(handleClick)(...args))
			}, null, 6), (0, vue.createElementVNode)("div", {
				ref_key: "thumb",
				ref: thumb,
				class: (0, vue.normalizeClass)((0, vue.unref)(thumbKls)),
				style: (0, vue.normalizeStyle)((0, vue.unref)(thumbStyle)),
				"aria-label": ariaLabel.value,
				"aria-valuenow": (0, vue.unref)(currentValue),
				"aria-valuetext": ariaValuetext.value,
				"aria-orientation": __props.vertical ? "vertical" : "horizontal",
				"aria-valuemin": minValue,
				"aria-valuemax": maxValue,
				role: "slider",
				tabindex: __props.disabled ? void 0 : 0,
				"aria-disabled": __props.disabled,
				onKeydown: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handleKeydown) && (0, vue.unref)(handleKeydown)(...args))
			}, null, 46, _hoisted_1)], 2);
		};
	}
});

//#endregion
exports.default = alpha_slider_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=alpha-slider.vue_vue_type_script_setup_true_lang.js.map
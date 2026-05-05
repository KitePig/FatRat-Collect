const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_slider = require('../props/slider.js');
const require_use_slider = require('../composables/use-slider.js');
let vue = require("vue");

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
var hue_slider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElColorHueSlider",
	__name: "hue-slider",
	props: require_slider.hueSliderProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { currentValue, bar, thumb, handleDrag, handleClick, handleKeydown } = require_use_slider.useSlider(props, {
			key: "hue",
			minValue,
			maxValue
		});
		const { rootKls, barKls, thumbKls, thumbStyle, thumbTop, update } = require_use_slider.useSliderDOM(props, {
			namespace: "color-hue-slider",
			maxValue,
			currentValue,
			bar,
			thumb,
			handleDrag
		});
		const { t } = require_index.useLocale();
		const ariaLabel = (0, vue.computed)(() => t("el.colorpicker.hueLabel"));
		const ariaValuetext = (0, vue.computed)(() => {
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(rootKls)) }, [(0, vue.createElementVNode)("div", {
				ref_key: "bar",
				ref: bar,
				class: (0, vue.normalizeClass)((0, vue.unref)(barKls)),
				onClick: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleClick) && (0, vue.unref)(handleClick)(...args))
			}, null, 2), (0, vue.createElementVNode)("div", {
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
exports.default = hue_slider_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=hue-slider.vue_vue_type_script_setup_true_lang.js.map
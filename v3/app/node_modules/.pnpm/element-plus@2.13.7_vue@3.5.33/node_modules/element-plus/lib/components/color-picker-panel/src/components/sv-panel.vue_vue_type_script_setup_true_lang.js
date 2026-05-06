const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_sv_panel = require('../props/sv-panel.js');
const require_use_sv_panel = require('../composables/use-sv-panel.js');
let vue = require("vue");

//#region ../../packages/components/color-picker-panel/src/components/sv-panel.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"tabindex",
	"aria-disabled",
	"aria-label",
	"aria-valuenow",
	"aria-valuetext"
];
var sv_panel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSvPanel",
	__name: "sv-panel",
	props: require_sv_panel.svPanelProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { cursorRef, cursorTop, cursorLeft, background, saturation, brightness, handleClick, handleDrag, handleKeydown } = require_use_sv_panel.useSvPanel(props);
		const { rootKls, cursorKls, rootStyle, cursorStyle, update } = require_use_sv_panel.useSvPanelDOM(props, {
			cursorTop,
			cursorLeft,
			background,
			handleDrag
		});
		const { t } = require_index.useLocale();
		const ariaLabel = (0, vue.computed)(() => t("el.colorpicker.svLabel"));
		const ariaValuetext = (0, vue.computed)(() => {
			return t("el.colorpicker.svDescription", {
				saturation: saturation.value,
				brightness: brightness.value,
				color: props.color.value
			});
		});
		__expose({ update });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)((0, vue.unref)(rootKls)),
				style: (0, vue.normalizeStyle)((0, vue.unref)(rootStyle)),
				onClick: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handleClick) && (0, vue.unref)(handleClick)(...args))
			}, [(0, vue.createElementVNode)("div", {
				ref_key: "cursorRef",
				ref: cursorRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(cursorKls)),
				style: (0, vue.normalizeStyle)((0, vue.unref)(cursorStyle)),
				tabindex: __props.disabled ? void 0 : 0,
				"aria-disabled": __props.disabled,
				role: "slider",
				"aria-valuemin": "0,0",
				"aria-valuemax": "100,100",
				"aria-label": ariaLabel.value,
				"aria-valuenow": `${(0, vue.unref)(saturation)},${(0, vue.unref)(brightness)}`,
				"aria-valuetext": ariaValuetext.value,
				onKeydown: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleKeydown) && (0, vue.unref)(handleKeydown)(...args))
			}, null, 46, _hoisted_1)], 6);
		};
	}
});

//#endregion
exports.default = sv_panel_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=sv-panel.vue_vue_type_script_setup_true_lang.js.map
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_predefine = require('../props/predefine.js');
const require_use_predefine = require('../composables/use-predefine.js');
let vue = require("vue");

//#region ../../packages/components/color-picker-panel/src/components/predefine.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"disabled",
	"aria-label",
	"onClick"
];
var predefine_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElColorPredefine",
	__name: "predefine",
	props: require_predefine.predefineProps,
	setup(__props) {
		const props = __props;
		const { rgbaColors, handleSelect } = require_use_predefine.usePredefine(props);
		const { rootKls, colorsKls, colorSelectorKls } = require_use_predefine.usePredefineDOM(props);
		const { t } = require_index.useLocale();
		const ariaLabel = (value) => {
			return t("el.colorpicker.predefineDescription", { value });
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(rootKls)) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(colorsKls)) }, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(rgbaColors), (item, index) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
					key: __props.colors[index],
					type: "button",
					disabled: __props.disabled,
					"aria-label": ariaLabel(item.value),
					class: (0, vue.normalizeClass)((0, vue.unref)(colorSelectorKls)(item)),
					onClick: ($event) => (0, vue.unref)(handleSelect)(index)
				}, [(0, vue.createElementVNode)("div", { style: (0, vue.normalizeStyle)({ backgroundColor: item.value }) }, null, 4)], 10, _hoisted_1);
			}), 128))], 2)], 2);
		};
	}
});

//#endregion
exports.default = predefine_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=predefine.vue_vue_type_script_setup_true_lang.js.map
import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import option_vue_vue_type_script_lang_default from "./option.vue_vue_type_script_lang.mjs";
import { createElementBlock, createElementVNode, normalizeClass, openBlock, renderSlot, toDisplayString, vShow, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/select/src/option.vue
const _hoisted_1 = [
	"id",
	"aria-disabled",
	"aria-selected"
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return withDirectives((openBlock(), createElementBlock("li", {
		id: _ctx.id,
		class: normalizeClass(_ctx.containerKls),
		role: "option",
		"aria-disabled": _ctx.isDisabled || void 0,
		"aria-selected": _ctx.itemSelected,
		onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
		onMousedown: _cache[1] || (_cache[1] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
		onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
	}, [renderSlot(_ctx.$slots, "default", {}, () => [createElementVNode("span", null, toDisplayString(_ctx.currentLabel), 1)])], 42, _hoisted_1)), [[vShow, _ctx.visible]]);
}
var option_default = /* @__PURE__ */ _plugin_vue_export_helper_default(option_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { option_default as default };
//# sourceMappingURL=option2.mjs.map
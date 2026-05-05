import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import option_group_vue_vue_type_script_lang_default from "./option-group.vue_vue_type_script_lang.mjs";
import { createElementBlock, createElementVNode, normalizeClass, openBlock, renderSlot, toDisplayString, vShow, withDirectives } from "vue";

//#region ../../packages/components/select/src/option-group.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return withDirectives((openBlock(), createElementBlock("ul", {
		ref: "groupRef",
		class: normalizeClass(_ctx.ns.be("group", "wrap"))
	}, [createElementVNode("li", { class: normalizeClass(_ctx.ns.be("group", "title")) }, toDisplayString(_ctx.label), 3), createElementVNode("li", null, [createElementVNode("ul", { class: normalizeClass(_ctx.ns.b("group")) }, [renderSlot(_ctx.$slots, "default")], 2)])], 2)), [[vShow, _ctx.visible]]);
}
var option_group_default = /* @__PURE__ */ _plugin_vue_export_helper_default(option_group_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { option_group_default as default };
//# sourceMappingURL=option-group.mjs.map
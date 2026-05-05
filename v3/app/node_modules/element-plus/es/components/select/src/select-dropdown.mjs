import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import select_dropdown_vue_vue_type_script_lang_default from "./select-dropdown.vue_vue_type_script_lang.mjs";
import { createCommentVNode, createElementBlock, normalizeClass, normalizeStyle, openBlock, renderSlot } from "vue";

//#region ../../packages/components/select/src/select-dropdown.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", {
		class: normalizeClass([
			_ctx.ns.b("dropdown"),
			_ctx.ns.is("multiple", _ctx.isMultiple),
			_ctx.popperClass
		]),
		style: normalizeStyle({ [_ctx.isFitInputWidth ? "width" : "minWidth"]: _ctx.minWidth })
	}, [
		_ctx.$slots.header ? (openBlock(), createElementBlock("div", {
			key: 0,
			class: normalizeClass(_ctx.ns.be("dropdown", "header"))
		}, [renderSlot(_ctx.$slots, "header")], 2)) : createCommentVNode("v-if", true),
		renderSlot(_ctx.$slots, "default"),
		_ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
			key: 1,
			class: normalizeClass(_ctx.ns.be("dropdown", "footer"))
		}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("v-if", true)
	], 6);
}
var select_dropdown_default = /* @__PURE__ */ _plugin_vue_export_helper_default(select_dropdown_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { select_dropdown_default as default };
//# sourceMappingURL=select-dropdown.mjs.map
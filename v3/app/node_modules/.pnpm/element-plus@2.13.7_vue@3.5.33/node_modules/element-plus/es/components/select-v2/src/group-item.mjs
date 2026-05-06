import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import group_item_vue_vue_type_script_lang_default from "./group-item.vue_vue_type_script_lang.mjs";
import { createElementBlock, normalizeClass, normalizeStyle, openBlock, toDisplayString } from "vue";

//#region ../../packages/components/select-v2/src/group-item.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", {
		class: normalizeClass(_ctx.ns.be("group", "title")),
		style: normalizeStyle({
			..._ctx.style,
			lineHeight: `${_ctx.height}px`
		})
	}, toDisplayString(_ctx.item.label), 7);
}
var group_item_default = /* @__PURE__ */ _plugin_vue_export_helper_default(group_item_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { group_item_default as default };
//# sourceMappingURL=group-item.mjs.map
import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import roving_focus_item_vue_vue_type_script_lang_default from "./roving-focus-item.vue_vue_type_script_lang.mjs";
import { createBlock, openBlock, renderSlot, resolveComponent, withCtx } from "vue";

//#region ../../packages/components/roving-focus-group/src/roving-focus-item.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_roving_focus_collection_item = resolveComponent("el-roving-focus-collection-item");
	return openBlock(), createBlock(_component_el_roving_focus_collection_item, {
		id: _ctx.id,
		focusable: _ctx.focusable,
		active: _ctx.active
	}, {
		default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
		_: 3
	}, 8, [
		"id",
		"focusable",
		"active"
	]);
}
var roving_focus_item_default = /* @__PURE__ */ _plugin_vue_export_helper_default(roving_focus_item_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { roving_focus_item_default as default };
//# sourceMappingURL=roving-focus-item.mjs.map
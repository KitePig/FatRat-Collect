import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import roving_focus_group_vue_vue_type_script_lang_default from "./roving-focus-group.vue_vue_type_script_lang.mjs";
import { createBlock, createVNode, guardReactiveProps, normalizeProps, openBlock, renderSlot, resolveComponent, withCtx } from "vue";

//#region ../../packages/components/roving-focus-group/src/roving-focus-group.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_roving_focus_group_impl = resolveComponent("el-roving-focus-group-impl");
	const _component_el_focus_group_collection = resolveComponent("el-focus-group-collection");
	return openBlock(), createBlock(_component_el_focus_group_collection, null, {
		default: withCtx(() => [createVNode(_component_el_roving_focus_group_impl, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
			default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
			_: 3
		}, 16)]),
		_: 3
	});
}
var roving_focus_group_default = /* @__PURE__ */ _plugin_vue_export_helper_default(roving_focus_group_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { roving_focus_group_default as default };
//# sourceMappingURL=roving-focus-group2.mjs.map
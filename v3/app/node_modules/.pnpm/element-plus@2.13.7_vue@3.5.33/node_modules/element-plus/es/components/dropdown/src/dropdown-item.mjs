import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import dropdown_item_vue_vue_type_script_lang_default from "./dropdown-item.vue_vue_type_script_lang.mjs";
import { createBlock, createSlots, createVNode, mergeProps, openBlock, renderSlot, resolveComponent, withCtx } from "vue";

//#region ../../packages/components/dropdown/src/dropdown-item.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_dropdown_item_impl = resolveComponent("el-dropdown-item-impl");
	const _component_el_roving_focus_item = resolveComponent("el-roving-focus-item");
	return openBlock(), createBlock(_component_el_roving_focus_item, { focusable: !_ctx.disabled }, {
		default: withCtx(() => [createVNode(_component_el_dropdown_item_impl, mergeProps(_ctx.propsAndAttrs, {
			onPointerleave: _ctx.handlePointerLeave,
			onPointermove: _ctx.handlePointerMove,
			onClickimpl: _ctx.handleClick
		}), createSlots({
			default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
			_: 2
		}, [_ctx.$slots.icon ? {
			name: "icon",
			fn: withCtx(() => [renderSlot(_ctx.$slots, "icon")]),
			key: "0"
		} : void 0]), 1040, [
			"onPointerleave",
			"onPointermove",
			"onClickimpl"
		])]),
		_: 3
	}, 8, ["focusable"]);
}
var dropdown_item_default = /* @__PURE__ */ _plugin_vue_export_helper_default(dropdown_item_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { dropdown_item_default as default };
//# sourceMappingURL=dropdown-item.mjs.map
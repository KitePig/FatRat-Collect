import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import option_item_vue_vue_type_script_lang_default from "./option-item.vue_vue_type_script_lang.mjs";
import { createElementBlock, createElementVNode, normalizeClass, normalizeStyle, openBlock, renderSlot, toDisplayString, withModifiers } from "vue";

//#region ../../packages/components/select-v2/src/option-item.vue
const _hoisted_1 = [
	"id",
	"aria-selected",
	"aria-disabled"
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("li", {
		id: `${_ctx.contentId}-${_ctx.index}`,
		role: "option",
		"aria-selected": _ctx.selected,
		"aria-disabled": _ctx.disabled || void 0,
		style: normalizeStyle(_ctx.style),
		class: normalizeClass([
			_ctx.ns.be("dropdown", "item"),
			_ctx.ns.is("selected", _ctx.selected),
			_ctx.ns.is("disabled", _ctx.disabled),
			_ctx.ns.is("created", _ctx.created),
			_ctx.ns.is("hovering", _ctx.hovering)
		]),
		onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
		onMousedown: _cache[1] || (_cache[1] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
		onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
	}, [renderSlot(_ctx.$slots, "default", {
		item: _ctx.item,
		index: _ctx.index,
		disabled: _ctx.disabled
	}, () => [createElementVNode("span", null, toDisplayString(_ctx.getLabel(_ctx.item)), 1)])], 46, _hoisted_1);
}
var option_item_default = /* @__PURE__ */ _plugin_vue_export_helper_default(option_item_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { option_item_default as default };
//# sourceMappingURL=option-item.mjs.map
import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import dropdown_menu_vue_vue_type_script_lang_default from "./dropdown-menu.vue_vue_type_script_lang.mjs";
import { createElementBlock, normalizeClass, normalizeStyle, openBlock, renderSlot, withModifiers } from "vue";

//#region ../../packages/components/dropdown/src/dropdown-menu.vue
const _hoisted_1 = ["role", "aria-labelledby"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("ul", {
		ref: _ctx.dropdownListWrapperRef,
		class: normalizeClass(_ctx.dropdownKls),
		style: normalizeStyle(_ctx.rovingFocusGroupRootStyle),
		tabindex: -1,
		role: _ctx.role,
		"aria-labelledby": _ctx.triggerId,
		onFocusin: _cache[0] || (_cache[0] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
		onFocusout: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
		onKeydown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
		onMousedown: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.onMousedown && _ctx.onMousedown(...args), ["self"]))
	}, [renderSlot(_ctx.$slots, "default")], 46, _hoisted_1);
}
var dropdown_menu_default = /* @__PURE__ */ _plugin_vue_export_helper_default(dropdown_menu_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { dropdown_menu_default as default };
//# sourceMappingURL=dropdown-menu.mjs.map
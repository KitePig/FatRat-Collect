Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_dropdown_menu_vue_vue_type_script_lang = require('./dropdown-menu.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/dropdown/src/dropdown-menu.vue
const _hoisted_1 = ["role", "aria-labelledby"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return (0, vue.openBlock)(), (0, vue.createElementBlock)("ul", {
		ref: _ctx.dropdownListWrapperRef,
		class: (0, vue.normalizeClass)(_ctx.dropdownKls),
		style: (0, vue.normalizeStyle)(_ctx.rovingFocusGroupRootStyle),
		tabindex: -1,
		role: _ctx.role,
		"aria-labelledby": _ctx.triggerId,
		onFocusin: _cache[0] || (_cache[0] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
		onFocusout: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
		onKeydown: _cache[2] || (_cache[2] = (0, vue.withModifiers)((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
		onMousedown: _cache[3] || (_cache[3] = (0, vue.withModifiers)((...args) => _ctx.onMousedown && _ctx.onMousedown(...args), ["self"]))
	}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 46, _hoisted_1);
}
var dropdown_menu_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_dropdown_menu_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = dropdown_menu_default;
//# sourceMappingURL=dropdown-menu.js.map
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_option_vue_vue_type_script_lang = require('./option.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/select/src/option.vue
const _hoisted_1 = [
	"id",
	"aria-disabled",
	"aria-selected"
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
		id: _ctx.id,
		class: (0, vue.normalizeClass)(_ctx.containerKls),
		role: "option",
		"aria-disabled": _ctx.isDisabled || void 0,
		"aria-selected": _ctx.itemSelected,
		onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
		onMousedown: _cache[1] || (_cache[1] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
		onClick: _cache[2] || (_cache[2] = (0, vue.withModifiers)((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
	}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(_ctx.currentLabel), 1)])], 42, _hoisted_1)), [[vue.vShow, _ctx.visible]]);
}
var option_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_option_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = option_default;
//# sourceMappingURL=option2.js.map
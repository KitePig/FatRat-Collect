Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_option_item_vue_vue_type_script_lang = require('./option-item.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/select-v2/src/option-item.vue
const _hoisted_1 = [
	"id",
	"aria-selected",
	"aria-disabled"
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
		id: `${_ctx.contentId}-${_ctx.index}`,
		role: "option",
		"aria-selected": _ctx.selected,
		"aria-disabled": _ctx.disabled || void 0,
		style: (0, vue.normalizeStyle)(_ctx.style),
		class: (0, vue.normalizeClass)([
			_ctx.ns.be("dropdown", "item"),
			_ctx.ns.is("selected", _ctx.selected),
			_ctx.ns.is("disabled", _ctx.disabled),
			_ctx.ns.is("created", _ctx.created),
			_ctx.ns.is("hovering", _ctx.hovering)
		]),
		onMousemove: _cache[0] || (_cache[0] = (...args) => _ctx.hoverItem && _ctx.hoverItem(...args)),
		onMousedown: _cache[1] || (_cache[1] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
		onClick: _cache[2] || (_cache[2] = (0, vue.withModifiers)((...args) => _ctx.selectOptionClick && _ctx.selectOptionClick(...args), ["stop"]))
	}, [(0, vue.renderSlot)(_ctx.$slots, "default", {
		item: _ctx.item,
		index: _ctx.index,
		disabled: _ctx.disabled
	}, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(_ctx.getLabel(_ctx.item)), 1)])], 46, _hoisted_1);
}
var option_item_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_option_item_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = option_item_default;
//# sourceMappingURL=option-item.js.map
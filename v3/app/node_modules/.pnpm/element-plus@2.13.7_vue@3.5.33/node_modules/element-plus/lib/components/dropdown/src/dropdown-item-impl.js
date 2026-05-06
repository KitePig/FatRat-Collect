Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_dropdown_item_impl_vue_vue_type_script_lang = require('./dropdown-item-impl.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/dropdown/src/dropdown-item-impl.vue
const _hoisted_1 = [
	"aria-disabled",
	"tabindex",
	"role"
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_icon = (0, vue.resolveComponent)("el-icon");
	return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [_ctx.divided ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
		key: 0,
		role: "separator",
		class: (0, vue.normalizeClass)(_ctx.ns.bem("menu", "item", "divided"))
	}, null, 2)) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("li", (0, vue.mergeProps)({ ref: _ctx.itemRef }, {
		..._ctx.dataset,
		..._ctx.$attrs
	}, {
		"aria-disabled": _ctx.disabled,
		class: [_ctx.ns.be("menu", "item"), _ctx.ns.is("disabled", _ctx.disabled)],
		tabindex: _ctx.tabIndex,
		role: _ctx.role,
		onClick: _cache[0] || (_cache[0] = (e) => _ctx.$emit("clickimpl", e)),
		onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
		onKeydown: _cache[2] || (_cache[2] = (0, vue.withModifiers)((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
		onMousedown: _cache[3] || (_cache[3] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
		onPointermove: _cache[4] || (_cache[4] = (e) => _ctx.$emit("pointermove", e)),
		onPointerleave: _cache[5] || (_cache[5] = (e) => _ctx.$emit("pointerleave", e))
	}), [_ctx.icon || _ctx.$slots.icon ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_icon, { key: 0 }, {
		default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "icon", {}, () => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.icon)))])]),
		_: 3
	})) : (0, vue.createCommentVNode)("v-if", true), (0, vue.renderSlot)(_ctx.$slots, "default")], 16, _hoisted_1)], 64);
}
var dropdown_item_impl_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_dropdown_item_impl_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = dropdown_item_impl_default;
//# sourceMappingURL=dropdown-item-impl.js.map
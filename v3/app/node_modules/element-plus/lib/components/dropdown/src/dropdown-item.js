Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_dropdown_item_vue_vue_type_script_lang = require('./dropdown-item.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/dropdown/src/dropdown-item.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_dropdown_item_impl = (0, vue.resolveComponent)("el-dropdown-item-impl");
	const _component_el_roving_focus_item = (0, vue.resolveComponent)("el-roving-focus-item");
	return (0, vue.openBlock)(), (0, vue.createBlock)(_component_el_roving_focus_item, { focusable: !_ctx.disabled }, {
		default: (0, vue.withCtx)(() => [(0, vue.createVNode)(_component_el_dropdown_item_impl, (0, vue.mergeProps)(_ctx.propsAndAttrs, {
			onPointerleave: _ctx.handlePointerLeave,
			onPointermove: _ctx.handlePointerMove,
			onClickimpl: _ctx.handleClick
		}), (0, vue.createSlots)({
			default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
			_: 2
		}, [_ctx.$slots.icon ? {
			name: "icon",
			fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "icon")]),
			key: "0"
		} : void 0]), 1040, [
			"onPointerleave",
			"onPointermove",
			"onClickimpl"
		])]),
		_: 3
	}, 8, ["focusable"]);
}
var dropdown_item_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_dropdown_item_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = dropdown_item_default;
//# sourceMappingURL=dropdown-item.js.map
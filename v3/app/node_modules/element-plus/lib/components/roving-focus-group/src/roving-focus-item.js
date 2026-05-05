Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_roving_focus_item_vue_vue_type_script_lang = require('./roving-focus-item.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/roving-focus-group/src/roving-focus-item.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_roving_focus_collection_item = (0, vue.resolveComponent)("el-roving-focus-collection-item");
	return (0, vue.openBlock)(), (0, vue.createBlock)(_component_el_roving_focus_collection_item, {
		id: _ctx.id,
		focusable: _ctx.focusable,
		active: _ctx.active
	}, {
		default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
		_: 3
	}, 8, [
		"id",
		"focusable",
		"active"
	]);
}
var roving_focus_item_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_roving_focus_item_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = roving_focus_item_default;
//# sourceMappingURL=roving-focus-item.js.map
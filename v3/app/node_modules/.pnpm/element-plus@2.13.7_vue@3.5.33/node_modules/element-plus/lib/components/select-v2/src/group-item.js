Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_group_item_vue_vue_type_script_lang = require('./group-item.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/select-v2/src/group-item.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
		class: (0, vue.normalizeClass)(_ctx.ns.be("group", "title")),
		style: (0, vue.normalizeStyle)({
			..._ctx.style,
			lineHeight: `${_ctx.height}px`
		})
	}, (0, vue.toDisplayString)(_ctx.item.label), 7);
}
var group_item_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_group_item_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = group_item_default;
//# sourceMappingURL=group-item.js.map
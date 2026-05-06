Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_select_dropdown_vue_vue_type_script_lang = require('./select-dropdown.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/select/src/select-dropdown.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
		class: (0, vue.normalizeClass)([
			_ctx.ns.b("dropdown"),
			_ctx.ns.is("multiple", _ctx.isMultiple),
			_ctx.popperClass
		]),
		style: (0, vue.normalizeStyle)({ [_ctx.isFitInputWidth ? "width" : "minWidth"]: _ctx.minWidth })
	}, [
		_ctx.$slots.header ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
			key: 0,
			class: (0, vue.normalizeClass)(_ctx.ns.be("dropdown", "header"))
		}, [(0, vue.renderSlot)(_ctx.$slots, "header")], 2)) : (0, vue.createCommentVNode)("v-if", true),
		(0, vue.renderSlot)(_ctx.$slots, "default"),
		_ctx.$slots.footer ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
			key: 1,
			class: (0, vue.normalizeClass)(_ctx.ns.be("dropdown", "footer"))
		}, [(0, vue.renderSlot)(_ctx.$slots, "footer")], 2)) : (0, vue.createCommentVNode)("v-if", true)
	], 6);
}
var select_dropdown_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_select_dropdown_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = select_dropdown_default;
//# sourceMappingURL=select-dropdown.js.map
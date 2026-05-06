Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_option_group_vue_vue_type_script_lang = require('./option-group.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/select/src/option-group.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("ul", {
		ref: "groupRef",
		class: (0, vue.normalizeClass)(_ctx.ns.be("group", "wrap"))
	}, [(0, vue.createElementVNode)("li", { class: (0, vue.normalizeClass)(_ctx.ns.be("group", "title")) }, (0, vue.toDisplayString)(_ctx.label), 3), (0, vue.createElementVNode)("li", null, [(0, vue.createElementVNode)("ul", { class: (0, vue.normalizeClass)(_ctx.ns.b("group")) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)])], 2)), [[vue.vShow, _ctx.visible]]);
}
var option_group_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_option_group_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = option_group_default;
//# sourceMappingURL=option-group.js.map
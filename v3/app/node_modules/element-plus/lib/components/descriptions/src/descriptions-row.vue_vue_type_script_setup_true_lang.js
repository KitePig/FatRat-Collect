const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_descriptions_row = require('./descriptions-row.js');
const require_token = require('./token.js');
const require_descriptions_cell = require('./descriptions-cell.js');
let vue = require("vue");

//#region ../../packages/components/descriptions/src/descriptions-row.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = { key: 1 };
var descriptions_row_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElDescriptionsRow",
	__name: "descriptions-row",
	props: require_descriptions_row.descriptionsRowProps,
	setup(__props) {
		const descriptions = (0, vue.inject)(require_token.descriptionsKey, {});
		return (_ctx, _cache) => {
			return (0, vue.unref)(descriptions).direction === "vertical" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createElementVNode)("tr", null, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.row, (cell, _index) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_descriptions_cell.default), {
					key: `tr1-${_index}`,
					cell,
					tag: "th",
					type: "label"
				}, null, 8, ["cell"]);
			}), 128))]), (0, vue.createElementVNode)("tr", null, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.row, (cell, _index) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_descriptions_cell.default), {
					key: `tr2-${_index}`,
					cell,
					tag: "td",
					type: "content"
				}, null, 8, ["cell"]);
			}), 128))])], 64)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("tr", _hoisted_1, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.row, (cell, _index) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: `tr3-${_index}` }, [(0, vue.unref)(descriptions).border ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createVNode)((0, vue.unref)(require_descriptions_cell.default), {
					cell,
					tag: "td",
					type: "label"
				}, null, 8, ["cell"]), (0, vue.createVNode)((0, vue.unref)(require_descriptions_cell.default), {
					cell,
					tag: "td",
					type: "content"
				}, null, 8, ["cell"])], 64)) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_descriptions_cell.default), {
					key: 1,
					cell,
					tag: "td",
					type: "both"
				}, null, 8, ["cell"]))], 64);
			}), 128))]));
		};
	}
});

//#endregion
exports.default = descriptions_row_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=descriptions-row.vue_vue_type_script_setup_true_lang.js.map
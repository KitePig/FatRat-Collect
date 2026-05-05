const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_vnode = require('../../../utils/vue/vnode.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_description = require('./description.js');
const require_token = require('./token.js');
const require_descriptions_row = require('./descriptions-row2.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/descriptions/src/description.vue?vue&type=script&setup=true&lang.ts
var description_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElDescriptions",
	__name: "description",
	props: require_description.descriptionProps,
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("descriptions");
		const descriptionsSize = require_use_form_common_props.useFormSize();
		const slots = (0, vue.useSlots)();
		(0, vue.provide)(require_token.descriptionsKey, props);
		const descriptionKls = (0, vue.computed)(() => [ns.b(), ns.m(descriptionsSize.value)]);
		const filledNode = (node, span, count, isLast = false) => {
			if (!node.props) node.props = {};
			if (span > count) node.props.span = count;
			if (isLast) node.props.span = span;
			return node;
		};
		const getRows = () => {
			if (!slots.default) return [];
			const children = require_vnode.flattedChildren(slots.default()).filter((node) => node?.type?.name === require_constants.COMPONENT_NAME);
			const rows = [];
			let temp = [];
			let count = props.column;
			let totalSpan = 0;
			const rowspanTemp = [];
			children.forEach((node, index) => {
				const span = node.props?.span || 1;
				const rowspan = node.props?.rowspan || 1;
				const rowNo = rows.length;
				rowspanTemp[rowNo] ||= 0;
				if (rowspan > 1) for (let i = 1; i < rowspan; i++) {
					rowspanTemp[rowNo + i] ||= 0;
					rowspanTemp[rowNo + i]++;
					totalSpan++;
				}
				if (rowspanTemp[rowNo] > 0) {
					count -= rowspanTemp[rowNo];
					rowspanTemp[rowNo] = 0;
				}
				if (index < children.length - 1) totalSpan += span > count ? count : span;
				if (index === children.length - 1) {
					const lastSpan = props.column - totalSpan % props.column;
					temp.push(filledNode(node, lastSpan, count, true));
					rows.push(temp);
					return;
				}
				if (span < count) {
					count -= span;
					temp.push(node);
				} else {
					temp.push(filledNode(node, span, count));
					rows.push(temp);
					count = props.column;
					temp = [];
				}
			});
			return rows;
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)(descriptionKls.value) }, [__props.title || __props.extra || _ctx.$slots.title || _ctx.$slots.extra ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("header"))
			}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title")) }, [(0, vue.renderSlot)(_ctx.$slots, "title", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.title), 1)])], 2), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("extra")) }, [(0, vue.renderSlot)(_ctx.$slots, "extra", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.extra), 1)])], 2)], 2)) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("body")) }, [(0, vue.createElementVNode)("table", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("table"), (0, vue.unref)(ns).is("bordered", __props.border)]) }, [(0, vue.createElementVNode)("tbody", null, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(getRows(), (row, _index) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)(require_descriptions_row.default, {
					key: _index,
					row
				}, null, 8, ["row"]);
			}), 128))])], 2)], 2)], 2);
		};
	}
});

//#endregion
exports.default = description_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=description.vue_vue_type_script_setup_true_lang.js.map
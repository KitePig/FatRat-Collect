import { flattedChildren } from "../../../utils/vue/vnode.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { descriptionProps } from "./description.mjs";
import { descriptionsKey } from "./token.mjs";
import descriptions_row_default from "./descriptions-row2.mjs";
import { COMPONENT_NAME } from "./constants.mjs";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, defineComponent, normalizeClass, openBlock, provide, renderList, renderSlot, toDisplayString, unref, useSlots } from "vue";

//#region ../../packages/components/descriptions/src/description.vue?vue&type=script&setup=true&lang.ts
var description_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElDescriptions",
	__name: "description",
	props: descriptionProps,
	setup(__props) {
		const props = __props;
		const ns = useNamespace("descriptions");
		const descriptionsSize = useFormSize();
		const slots = useSlots();
		provide(descriptionsKey, props);
		const descriptionKls = computed(() => [ns.b(), ns.m(descriptionsSize.value)]);
		const filledNode = (node, span, count, isLast = false) => {
			if (!node.props) node.props = {};
			if (span > count) node.props.span = count;
			if (isLast) node.props.span = span;
			return node;
		};
		const getRows = () => {
			if (!slots.default) return [];
			const children = flattedChildren(slots.default()).filter((node) => node?.type?.name === COMPONENT_NAME);
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
			return openBlock(), createElementBlock("div", { class: normalizeClass(descriptionKls.value) }, [__props.title || __props.extra || _ctx.$slots.title || _ctx.$slots.extra ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(ns).e("header"))
			}, [createElementVNode("div", { class: normalizeClass(unref(ns).e("title")) }, [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])], 2), createElementVNode("div", { class: normalizeClass(unref(ns).e("extra")) }, [renderSlot(_ctx.$slots, "extra", {}, () => [createTextVNode(toDisplayString(__props.extra), 1)])], 2)], 2)) : createCommentVNode("v-if", true), createElementVNode("div", { class: normalizeClass(unref(ns).e("body")) }, [createElementVNode("table", { class: normalizeClass([unref(ns).e("table"), unref(ns).is("bordered", __props.border)]) }, [createElementVNode("tbody", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(getRows(), (row, _index) => {
				return openBlock(), createBlock(descriptions_row_default, {
					key: _index,
					row
				}, null, 8, ["row"]);
			}), 128))])], 2)], 2)], 2);
		};
	}
});

//#endregion
export { description_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=description.vue_vue_type_script_setup_true_lang.mjs.map
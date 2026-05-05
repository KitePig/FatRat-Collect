import { descriptionsRowProps } from "./descriptions-row.mjs";
import { descriptionsKey } from "./token.mjs";
import descriptions_cell_default from "./descriptions-cell.mjs";
import { Fragment, createBlock, createElementBlock, createElementVNode, createVNode, defineComponent, inject, openBlock, renderList, unref } from "vue";

//#region ../../packages/components/descriptions/src/descriptions-row.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = { key: 1 };
var descriptions_row_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElDescriptionsRow",
	__name: "descriptions-row",
	props: descriptionsRowProps,
	setup(__props) {
		const descriptions = inject(descriptionsKey, {});
		return (_ctx, _cache) => {
			return unref(descriptions).direction === "vertical" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createElementVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.row, (cell, _index) => {
				return openBlock(), createBlock(unref(descriptions_cell_default), {
					key: `tr1-${_index}`,
					cell,
					tag: "th",
					type: "label"
				}, null, 8, ["cell"]);
			}), 128))]), createElementVNode("tr", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.row, (cell, _index) => {
				return openBlock(), createBlock(unref(descriptions_cell_default), {
					key: `tr2-${_index}`,
					cell,
					tag: "td",
					type: "content"
				}, null, 8, ["cell"]);
			}), 128))])], 64)) : (openBlock(), createElementBlock("tr", _hoisted_1, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.row, (cell, _index) => {
				return openBlock(), createElementBlock(Fragment, { key: `tr3-${_index}` }, [unref(descriptions).border ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(unref(descriptions_cell_default), {
					cell,
					tag: "td",
					type: "label"
				}, null, 8, ["cell"]), createVNode(unref(descriptions_cell_default), {
					cell,
					tag: "td",
					type: "content"
				}, null, 8, ["cell"])], 64)) : (openBlock(), createBlock(unref(descriptions_cell_default), {
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
export { descriptions_row_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=descriptions-row.vue_vue_type_script_setup_true_lang.mjs.map
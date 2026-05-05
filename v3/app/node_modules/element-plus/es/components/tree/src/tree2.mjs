import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import tree_vue_vue_type_script_lang_default from "./tree.vue_vue_type_script_lang.mjs";
import { Fragment, createBlock, createCommentVNode, createElementBlock, createElementVNode, normalizeClass, openBlock, renderList, renderSlot, resolveComponent, toDisplayString, vShow, withDirectives } from "vue";

//#region ../../packages/components/tree/src/tree.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_tree_node = resolveComponent("el-tree-node");
	return openBlock(), createElementBlock("div", {
		ref: "el$",
		class: normalizeClass([
			_ctx.ns.b(),
			_ctx.ns.is("dragging", !!_ctx.dragState.draggingNode),
			_ctx.ns.is("drop-not-allow", !_ctx.dragState.allowDrop),
			_ctx.ns.is("drop-inner", _ctx.dragState.dropType === "inner"),
			{ [_ctx.ns.m("highlight-current")]: _ctx.highlightCurrent }
		]),
		role: "tree"
	}, [
		(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.root.childNodes, (child) => {
			return openBlock(), createBlock(_component_el_tree_node, {
				key: _ctx.getNodeKey(child),
				node: child,
				props: _ctx.props,
				accordion: _ctx.accordion,
				"render-after-expand": _ctx.renderAfterExpand,
				"show-checkbox": _ctx.showCheckbox,
				"render-content": _ctx.renderContent,
				onNodeExpand: _ctx.handleNodeExpand
			}, null, 8, [
				"node",
				"props",
				"accordion",
				"render-after-expand",
				"show-checkbox",
				"render-content",
				"onNodeExpand"
			]);
		}), 128)),
		_ctx.isEmpty ? (openBlock(), createElementBlock("div", {
			key: 0,
			class: normalizeClass(_ctx.ns.e("empty-block"))
		}, [renderSlot(_ctx.$slots, "empty", {}, () => [createElementVNode("span", { class: normalizeClass(_ctx.ns.e("empty-text")) }, toDisplayString(_ctx.emptyText ?? _ctx.t("el.tree.emptyText")), 3)])], 2)) : createCommentVNode("v-if", true),
		withDirectives(createElementVNode("div", {
			ref: "dropIndicator$",
			class: normalizeClass(_ctx.ns.e("drop-indicator"))
		}, null, 2), [[vShow, _ctx.dragState.showDropIndicator]])
	], 2);
}
var tree_default = /* @__PURE__ */ _plugin_vue_export_helper_default(tree_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { tree_default as default };
//# sourceMappingURL=tree2.mjs.map
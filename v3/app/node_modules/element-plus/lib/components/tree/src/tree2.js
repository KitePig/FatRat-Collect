Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_tree_vue_vue_type_script_lang = require('./tree.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/tree/src/tree.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_tree_node = (0, vue.resolveComponent)("el-tree-node");
	return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
		ref: "el$",
		class: (0, vue.normalizeClass)([
			_ctx.ns.b(),
			_ctx.ns.is("dragging", !!_ctx.dragState.draggingNode),
			_ctx.ns.is("drop-not-allow", !_ctx.dragState.allowDrop),
			_ctx.ns.is("drop-inner", _ctx.dragState.dropType === "inner"),
			{ [_ctx.ns.m("highlight-current")]: _ctx.highlightCurrent }
		]),
		role: "tree"
	}, [
		((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(_ctx.root.childNodes, (child) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(_component_el_tree_node, {
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
		_ctx.isEmpty ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
			key: 0,
			class: (0, vue.normalizeClass)(_ctx.ns.e("empty-block"))
		}, [(0, vue.renderSlot)(_ctx.$slots, "empty", {}, () => [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)(_ctx.ns.e("empty-text")) }, (0, vue.toDisplayString)(_ctx.emptyText ?? _ctx.t("el.tree.emptyText")), 3)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
		(0, vue.withDirectives)((0, vue.createElementVNode)("div", {
			ref: "dropIndicator$",
			class: (0, vue.normalizeClass)(_ctx.ns.e("drop-indicator"))
		}, null, 2), [[vue.vShow, _ctx.dragState.showDropIndicator]])
	], 2);
}
var tree_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_tree_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = tree_default;
//# sourceMappingURL=tree2.js.map
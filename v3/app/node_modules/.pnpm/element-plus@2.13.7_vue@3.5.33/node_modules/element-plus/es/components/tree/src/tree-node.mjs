import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import tree_node_vue_vue_type_script_lang_default from "./tree-node.vue_vue_type_script_lang.mjs";
import { Fragment, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, normalizeClass, normalizeStyle, openBlock, renderList, resolveComponent, resolveDynamicComponent, vShow, withCtx, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/tree/src/tree-node.vue
const _hoisted_1 = [
	"aria-expanded",
	"aria-disabled",
	"aria-checked",
	"draggable",
	"data-key"
];
const _hoisted_2 = ["aria-expanded"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_icon = resolveComponent("el-icon");
	const _component_el_checkbox = resolveComponent("el-checkbox");
	const _component_loading = resolveComponent("loading");
	const _component_node_content = resolveComponent("node-content");
	const _component_el_tree_node = resolveComponent("el-tree-node");
	const _component_el_collapse_transition = resolveComponent("el-collapse-transition");
	return withDirectives((openBlock(), createElementBlock("div", {
		ref: "node$",
		class: normalizeClass([
			_ctx.ns.b("node"),
			_ctx.ns.is("expanded", _ctx.expanded),
			_ctx.ns.is("current", _ctx.node.isCurrent),
			_ctx.ns.is("hidden", !_ctx.node.visible),
			_ctx.ns.is("focusable", !_ctx.node.disabled),
			_ctx.ns.is("checked", !_ctx.node.disabled && _ctx.node.checked),
			_ctx.getNodeClass(_ctx.node)
		]),
		role: "treeitem",
		tabindex: "-1",
		"aria-expanded": _ctx.expanded,
		"aria-disabled": _ctx.node.disabled,
		"aria-checked": _ctx.node.checked,
		draggable: _ctx.tree.props.draggable,
		"data-key": _ctx.getNodeKey(_ctx.node),
		onClick: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.handleClick && _ctx.handleClick(...args), ["stop"])),
		onContextmenu: _cache[3] || (_cache[3] = (...args) => _ctx.handleContextMenu && _ctx.handleContextMenu(...args)),
		onDragstart: _cache[4] || (_cache[4] = withModifiers((...args) => _ctx.handleDragStart && _ctx.handleDragStart(...args), ["stop"])),
		onDragover: _cache[5] || (_cache[5] = withModifiers((...args) => _ctx.handleDragOver && _ctx.handleDragOver(...args), ["stop"])),
		onDragend: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.handleDragEnd && _ctx.handleDragEnd(...args), ["stop"])),
		onDrop: _cache[7] || (_cache[7] = withModifiers((...args) => _ctx.handleDrop && _ctx.handleDrop(...args), ["stop"]))
	}, [createElementVNode("div", {
		class: normalizeClass(_ctx.ns.be("node", "content")),
		style: normalizeStyle({ paddingLeft: (_ctx.node.level - 1) * _ctx.tree.props.indent + "px" })
	}, [
		_ctx.tree.props.icon || _ctx.CaretRight ? (openBlock(), createBlock(_component_el_icon, {
			key: 0,
			class: normalizeClass([
				_ctx.ns.be("node", "expand-icon"),
				_ctx.ns.is("leaf", _ctx.node.isLeaf),
				{ expanded: !_ctx.node.isLeaf && _ctx.expanded }
			]),
			onClick: withModifiers(_ctx.handleExpandIconClick, ["stop"])
		}, {
			default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.tree.props.icon || _ctx.CaretRight)))]),
			_: 1
		}, 8, ["class", "onClick"])) : createCommentVNode("v-if", true),
		_ctx.showCheckbox ? (openBlock(), createBlock(_component_el_checkbox, {
			key: 1,
			"model-value": _ctx.node.checked,
			indeterminate: _ctx.node.indeterminate,
			disabled: !!_ctx.node.disabled,
			onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
			onChange: _ctx.handleCheckChange
		}, null, 8, [
			"model-value",
			"indeterminate",
			"disabled",
			"onChange"
		])) : createCommentVNode("v-if", true),
		_ctx.node.loading ? (openBlock(), createBlock(_component_el_icon, {
			key: 2,
			class: normalizeClass([_ctx.ns.be("node", "loading-icon"), _ctx.ns.is("loading")])
		}, {
			default: withCtx(() => [createVNode(_component_loading)]),
			_: 1
		}, 8, ["class"])) : createCommentVNode("v-if", true),
		createVNode(_component_node_content, {
			node: _ctx.node,
			"render-content": _ctx.renderContent
		}, null, 8, ["node", "render-content"])
	], 6), createVNode(_component_el_collapse_transition, null, {
		default: withCtx(() => [!_ctx.renderAfterExpand || _ctx.childNodeRendered ? withDirectives((openBlock(), createElementBlock("div", {
			key: 0,
			class: normalizeClass(_ctx.ns.be("node", "children")),
			role: "group",
			"aria-expanded": _ctx.expanded,
			onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"]))
		}, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.node.childNodes, (child) => {
			return openBlock(), createBlock(_component_el_tree_node, {
				key: _ctx.getNodeKey(child),
				"render-content": _ctx.renderContent,
				"render-after-expand": _ctx.renderAfterExpand,
				"show-checkbox": _ctx.showCheckbox,
				node: child,
				accordion: _ctx.accordion,
				props: _ctx.props,
				onNodeExpand: _ctx.handleChildNodeExpand
			}, null, 8, [
				"render-content",
				"render-after-expand",
				"show-checkbox",
				"node",
				"accordion",
				"props",
				"onNodeExpand"
			]);
		}), 128))], 10, _hoisted_2)), [[vShow, _ctx.expanded]]) : createCommentVNode("v-if", true)]),
		_: 1
	})], 42, _hoisted_1)), [[vShow, _ctx.node.visible]]);
}
var tree_node_default = /* @__PURE__ */ _plugin_vue_export_helper_default(tree_node_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { tree_node_default as default };
//# sourceMappingURL=tree-node.mjs.map
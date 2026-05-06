Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_tree_node_vue_vue_type_script_lang = require('./tree-node.vue_vue_type_script_lang.js');
let vue = require("vue");

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
	const _component_el_icon = (0, vue.resolveComponent)("el-icon");
	const _component_el_checkbox = (0, vue.resolveComponent)("el-checkbox");
	const _component_loading = (0, vue.resolveComponent)("loading");
	const _component_node_content = (0, vue.resolveComponent)("node-content");
	const _component_el_tree_node = (0, vue.resolveComponent)("el-tree-node");
	const _component_el_collapse_transition = (0, vue.resolveComponent)("el-collapse-transition");
	return (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
		ref: "node$",
		class: (0, vue.normalizeClass)([
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
		onClick: _cache[2] || (_cache[2] = (0, vue.withModifiers)((...args) => _ctx.handleClick && _ctx.handleClick(...args), ["stop"])),
		onContextmenu: _cache[3] || (_cache[3] = (...args) => _ctx.handleContextMenu && _ctx.handleContextMenu(...args)),
		onDragstart: _cache[4] || (_cache[4] = (0, vue.withModifiers)((...args) => _ctx.handleDragStart && _ctx.handleDragStart(...args), ["stop"])),
		onDragover: _cache[5] || (_cache[5] = (0, vue.withModifiers)((...args) => _ctx.handleDragOver && _ctx.handleDragOver(...args), ["stop"])),
		onDragend: _cache[6] || (_cache[6] = (0, vue.withModifiers)((...args) => _ctx.handleDragEnd && _ctx.handleDragEnd(...args), ["stop"])),
		onDrop: _cache[7] || (_cache[7] = (0, vue.withModifiers)((...args) => _ctx.handleDrop && _ctx.handleDrop(...args), ["stop"]))
	}, [(0, vue.createElementVNode)("div", {
		class: (0, vue.normalizeClass)(_ctx.ns.be("node", "content")),
		style: (0, vue.normalizeStyle)({ paddingLeft: (_ctx.node.level - 1) * _ctx.tree.props.indent + "px" })
	}, [
		_ctx.tree.props.icon || _ctx.CaretRight ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_icon, {
			key: 0,
			class: (0, vue.normalizeClass)([
				_ctx.ns.be("node", "expand-icon"),
				_ctx.ns.is("leaf", _ctx.node.isLeaf),
				{ expanded: !_ctx.node.isLeaf && _ctx.expanded }
			]),
			onClick: (0, vue.withModifiers)(_ctx.handleExpandIconClick, ["stop"])
		}, {
			default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.tree.props.icon || _ctx.CaretRight)))]),
			_: 1
		}, 8, ["class", "onClick"])) : (0, vue.createCommentVNode)("v-if", true),
		_ctx.showCheckbox ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_checkbox, {
			key: 1,
			"model-value": _ctx.node.checked,
			indeterminate: _ctx.node.indeterminate,
			disabled: !!_ctx.node.disabled,
			onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["stop"])),
			onChange: _ctx.handleCheckChange
		}, null, 8, [
			"model-value",
			"indeterminate",
			"disabled",
			"onChange"
		])) : (0, vue.createCommentVNode)("v-if", true),
		_ctx.node.loading ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_icon, {
			key: 2,
			class: (0, vue.normalizeClass)([_ctx.ns.be("node", "loading-icon"), _ctx.ns.is("loading")])
		}, {
			default: (0, vue.withCtx)(() => [(0, vue.createVNode)(_component_loading)]),
			_: 1
		}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true),
		(0, vue.createVNode)(_component_node_content, {
			node: _ctx.node,
			"render-content": _ctx.renderContent
		}, null, 8, ["node", "render-content"])
	], 6), (0, vue.createVNode)(_component_el_collapse_transition, null, {
		default: (0, vue.withCtx)(() => [!_ctx.renderAfterExpand || _ctx.childNodeRendered ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
			key: 0,
			class: (0, vue.normalizeClass)(_ctx.ns.be("node", "children")),
			role: "group",
			"aria-expanded": _ctx.expanded,
			onClick: _cache[1] || (_cache[1] = (0, vue.withModifiers)(() => {}, ["stop"]))
		}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(_ctx.node.childNodes, (child) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(_component_el_tree_node, {
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
		}), 128))], 10, _hoisted_2)), [[vue.vShow, _ctx.expanded]]) : (0, vue.createCommentVNode)("v-if", true)]),
		_: 1
	})], 42, _hoisted_1)), [[vue.vShow, _ctx.node.visible]]);
}
var tree_node_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_tree_node_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = tree_node_default;
//# sourceMappingURL=tree-node.js.map
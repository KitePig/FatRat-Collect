const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_index$2 = require('../../checkbox/index.js');
const require_virtual_tree = require('./virtual-tree.js');
const require_tree_node_content = require('./tree-node-content.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/tree-v2/src/tree-node.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"aria-expanded",
	"aria-disabled",
	"aria-checked",
	"data-key"
];
var tree_node_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTreeNode",
	__name: "tree-node",
	props: require_virtual_tree.treeNodeProps,
	emits: require_virtual_tree.treeNodeEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const tree = (0, vue.inject)(require_virtual_tree.ROOT_TREE_INJECTION_KEY);
		const ns = require_index.useNamespace("tree");
		const indent = (0, vue.computed)(() => tree?.props.indent ?? 16);
		const icon = (0, vue.computed)(() => tree?.props.icon ?? _element_plus_icons_vue.CaretRight);
		const getNodeClass = (node) => {
			const nodeClassFunc = tree?.props.props?.class;
			if (!nodeClassFunc) return {};
			let className;
			if ((0, _vue_shared.isFunction)(nodeClassFunc)) {
				const { data } = node;
				className = nodeClassFunc(data, node);
			} else className = nodeClassFunc;
			return (0, _vue_shared.isString)(className) ? { [className]: true } : className;
		};
		const handleClick = (e) => {
			emit("click", props.node, e);
		};
		const handleDrop = (e) => {
			emit("drop", props.node, e);
		};
		const handleExpandIconClick = () => {
			emit("toggle", props.node);
		};
		const handleCheckChange = (value) => {
			emit("check", props.node, value);
		};
		const handleContextMenu = (event) => {
			if (tree?.instance?.vnode?.props?.["onNodeContextmenu"]) {
				event.stopPropagation();
				event.preventDefault();
			}
			tree?.ctx.emit(require_virtual_tree.NODE_CONTEXTMENU, event, props.node?.data, props.node);
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref: "node$",
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(ns).b("node"),
					(0, vue.unref)(ns).is("expanded", __props.expanded),
					(0, vue.unref)(ns).is("current", __props.current),
					(0, vue.unref)(ns).is("focusable", !__props.disabled),
					(0, vue.unref)(ns).is("checked", !__props.disabled && __props.checked),
					getNodeClass(__props.node)
				]),
				role: "treeitem",
				tabindex: "-1",
				"aria-expanded": __props.expanded,
				"aria-disabled": __props.disabled,
				"aria-checked": __props.checked,
				"data-key": __props.node?.key,
				onClick: (0, vue.withModifiers)(handleClick, ["stop"]),
				onContextmenu: handleContextMenu,
				onDragover: _cache[1] || (_cache[1] = (0, vue.withModifiers)(() => {}, ["prevent"])),
				onDragenter: _cache[2] || (_cache[2] = (0, vue.withModifiers)(() => {}, ["prevent"])),
				onDrop: (0, vue.withModifiers)(handleDrop, ["stop"])
			}, [(0, vue.createElementVNode)("div", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("node", "content")),
				style: (0, vue.normalizeStyle)({
					paddingLeft: `${(__props.node.level - 1) * indent.value}px`,
					height: __props.itemSize + "px"
				})
			}, [
				icon.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)([
						(0, vue.unref)(ns).is("leaf", !!__props.node?.isLeaf),
						(0, vue.unref)(ns).is("hidden", __props.hiddenExpandIcon),
						{ expanded: !__props.node?.isLeaf && __props.expanded },
						(0, vue.unref)(ns).be("node", "expand-icon")
					]),
					onClick: (0, vue.withModifiers)(handleExpandIconClick, ["stop"])
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(icon.value)))]),
					_: 1
				}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true),
				__props.showCheckbox ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElCheckbox), {
					key: 1,
					"model-value": __props.checked,
					indeterminate: __props.indeterminate,
					disabled: __props.disabled,
					onChange: handleCheckChange,
					onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["stop"]))
				}, null, 8, [
					"model-value",
					"indeterminate",
					"disabled"
				])) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createVNode)((0, vue.unref)(require_tree_node_content.default), { node: {
					...__props.node,
					expanded: __props.expanded
				} }, null, 8, ["node"])
			], 6)], 42, _hoisted_1);
		};
	}
});

//#endregion
exports.default = tree_node_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=tree-node.vue_vue_type_script_setup_true_lang.js.map
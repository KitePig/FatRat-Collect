import { isFunction, isString } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElCheckbox } from "../../checkbox/index.mjs";
import { NODE_CONTEXTMENU, ROOT_TREE_INJECTION_KEY, treeNodeEmits, treeNodeProps } from "./virtual-tree.mjs";
import tree_node_content_default from "./tree-node-content.mjs";
import { CaretRight } from "@element-plus/icons-vue";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, inject, normalizeClass, normalizeStyle, openBlock, resolveDynamicComponent, unref, withCtx, withModifiers } from "vue";

//#region ../../packages/components/tree-v2/src/tree-node.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"aria-expanded",
	"aria-disabled",
	"aria-checked",
	"data-key"
];
var tree_node_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTreeNode",
	__name: "tree-node",
	props: treeNodeProps,
	emits: treeNodeEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const tree = inject(ROOT_TREE_INJECTION_KEY);
		const ns = useNamespace("tree");
		const indent = computed(() => tree?.props.indent ?? 16);
		const icon = computed(() => tree?.props.icon ?? CaretRight);
		const getNodeClass = (node) => {
			const nodeClassFunc = tree?.props.props?.class;
			if (!nodeClassFunc) return {};
			let className;
			if (isFunction(nodeClassFunc)) {
				const { data } = node;
				className = nodeClassFunc(data, node);
			} else className = nodeClassFunc;
			return isString(className) ? { [className]: true } : className;
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
			tree?.ctx.emit(NODE_CONTEXTMENU, event, props.node?.data, props.node);
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref: "node$",
				class: normalizeClass([
					unref(ns).b("node"),
					unref(ns).is("expanded", __props.expanded),
					unref(ns).is("current", __props.current),
					unref(ns).is("focusable", !__props.disabled),
					unref(ns).is("checked", !__props.disabled && __props.checked),
					getNodeClass(__props.node)
				]),
				role: "treeitem",
				tabindex: "-1",
				"aria-expanded": __props.expanded,
				"aria-disabled": __props.disabled,
				"aria-checked": __props.checked,
				"data-key": __props.node?.key,
				onClick: withModifiers(handleClick, ["stop"]),
				onContextmenu: handleContextMenu,
				onDragover: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"])),
				onDragenter: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"])),
				onDrop: withModifiers(handleDrop, ["stop"])
			}, [createElementVNode("div", {
				class: normalizeClass(unref(ns).be("node", "content")),
				style: normalizeStyle({
					paddingLeft: `${(__props.node.level - 1) * indent.value}px`,
					height: __props.itemSize + "px"
				})
			}, [
				icon.value ? (openBlock(), createBlock(unref(ElIcon), {
					key: 0,
					class: normalizeClass([
						unref(ns).is("leaf", !!__props.node?.isLeaf),
						unref(ns).is("hidden", __props.hiddenExpandIcon),
						{ expanded: !__props.node?.isLeaf && __props.expanded },
						unref(ns).be("node", "expand-icon")
					]),
					onClick: withModifiers(handleExpandIconClick, ["stop"])
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(icon.value)))]),
					_: 1
				}, 8, ["class"])) : createCommentVNode("v-if", true),
				__props.showCheckbox ? (openBlock(), createBlock(unref(ElCheckbox), {
					key: 1,
					"model-value": __props.checked,
					indeterminate: __props.indeterminate,
					disabled: __props.disabled,
					onChange: handleCheckChange,
					onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
				}, null, 8, [
					"model-value",
					"indeterminate",
					"disabled"
				])) : createCommentVNode("v-if", true),
				createVNode(unref(tree_node_content_default), { node: {
					...__props.node,
					expanded: __props.expanded
				} }, null, 8, ["node"])
			], 6)], 42, _hoisted_1);
		};
	}
});

//#endregion
export { tree_node_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=tree-node.vue_vue_type_script_setup_true_lang.mjs.map
import { isFunction, isString } from "../../../utils/types.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElCheckbox } from "../../checkbox/index.mjs";
import { ElCollapseTransition } from "../../collapse-transition/index.mjs";
import { getNodeKey, handleCurrentChange } from "./model/util.mjs";
import Node from "./model/node.mjs";
import { NODE_INSTANCE_INJECTION_KEY, ROOT_TREE_INJECTION_KEY } from "./tokens.mjs";
import tree_node_content_default from "./tree-node-content.mjs";
import { useNodeExpandEventBroadcast } from "./model/useNodeExpandEventBroadcast.mjs";
import { dragEventsKey } from "./model/useDragNode.mjs";
import { CaretRight, Loading } from "@element-plus/icons-vue";
import { defineComponent, getCurrentInstance, inject, nextTick, provide, ref, watch } from "vue";

//#region ../../packages/components/tree/src/tree-node.vue?vue&type=script&lang.ts
var tree_node_vue_vue_type_script_lang_default = defineComponent({
	name: "ElTreeNode",
	components: {
		ElCollapseTransition,
		ElCheckbox,
		NodeContent: tree_node_content_default,
		ElIcon,
		Loading
	},
	props: {
		node: {
			type: Node,
			default: () => ({})
		},
		props: {
			type: Object,
			default: () => ({})
		},
		accordion: Boolean,
		renderContent: Function,
		renderAfterExpand: Boolean,
		showCheckbox: Boolean
	},
	emits: ["node-expand"],
	setup(props, ctx) {
		const ns = useNamespace("tree");
		const { broadcastExpanded } = useNodeExpandEventBroadcast(props);
		const tree = inject(ROOT_TREE_INJECTION_KEY);
		const expanded = ref(false);
		const childNodeRendered = ref(false);
		const oldChecked = ref();
		const oldIndeterminate = ref();
		const node$ = ref();
		const dragEvents = inject(dragEventsKey);
		const instance = getCurrentInstance();
		provide(NODE_INSTANCE_INJECTION_KEY, instance);
		if (!tree) debugWarn("Tree", "Can not find node's tree.");
		if (props.node.expanded) {
			expanded.value = true;
			childNodeRendered.value = true;
		}
		const childrenKey = tree.props.props["children"] || "children";
		watch(() => {
			const children = props.node.data?.[childrenKey];
			return children && [...children];
		}, () => {
			props.node.updateChildren();
		});
		watch(() => props.node.indeterminate, (val) => {
			handleSelectChange(props.node.checked, val);
		});
		watch(() => props.node.checked, (val) => {
			handleSelectChange(val, props.node.indeterminate);
		});
		watch(() => props.node.childNodes.length, () => props.node.reInitChecked());
		watch(() => props.node.expanded, (val) => {
			nextTick(() => expanded.value = val);
			if (val) childNodeRendered.value = true;
		});
		const getNodeKey$1 = (node) => {
			return tree.props.nodeKey ? getNodeKey(tree.props.nodeKey, node.data) : node.id;
		};
		const getNodeClass = (node) => {
			const nodeClassFunc = props.props.class;
			if (!nodeClassFunc) return {};
			let className;
			if (isFunction(nodeClassFunc)) {
				const { data } = node;
				className = nodeClassFunc(data, node);
			} else className = nodeClassFunc;
			if (isString(className)) return { [className]: true };
			else return className;
		};
		const handleSelectChange = (checked, indeterminate) => {
			if (oldChecked.value !== checked || oldIndeterminate.value !== indeterminate) tree.ctx.emit("check-change", props.node.data, checked, indeterminate);
			oldChecked.value = checked;
			oldIndeterminate.value = indeterminate;
		};
		const handleClick = (e) => {
			handleCurrentChange(tree.store, tree.ctx.emit, () => {
				if (tree?.props?.nodeKey) {
					const curNodeKey = getNodeKey$1(props.node);
					tree.store.value.setCurrentNodeKey(curNodeKey);
				} else tree.store.value.setCurrentNode(props.node);
			});
			tree.currentNode.value = props.node;
			if (tree.props.expandOnClickNode) handleExpandIconClick();
			if ((tree.props.checkOnClickNode || props.node.isLeaf && tree.props.checkOnClickLeaf && props.showCheckbox) && !props.node.disabled) handleCheckChange(!props.node.checked);
			tree.ctx.emit("node-click", props.node.data, props.node, instance, e);
		};
		const handleContextMenu = (event) => {
			if (tree.instance.vnode.props?.["onNodeContextmenu"]) {
				event.stopPropagation();
				event.preventDefault();
			}
			tree.ctx.emit("node-contextmenu", event, props.node.data, props.node, instance);
		};
		const handleExpandIconClick = () => {
			if (props.node.isLeaf) return;
			if (expanded.value) {
				tree.ctx.emit("node-collapse", props.node.data, props.node, instance);
				props.node.collapse();
			} else props.node.expand(() => {
				ctx.emit("node-expand", props.node.data, props.node, instance);
			});
		};
		const handleCheckChange = (value) => {
			const checkStrictly = tree?.props.checkStrictly;
			const childNodes = props.node.childNodes;
			if (!checkStrictly && childNodes.length) value = childNodes.some((node) => !node.isEffectivelyChecked);
			props.node.setChecked(value, !checkStrictly);
			nextTick(() => {
				const store = tree.store.value;
				tree.ctx.emit("check", props.node.data, {
					checkedNodes: store.getCheckedNodes(),
					checkedKeys: store.getCheckedKeys(),
					halfCheckedNodes: store.getHalfCheckedNodes(),
					halfCheckedKeys: store.getHalfCheckedKeys()
				});
			});
		};
		const handleChildNodeExpand = (nodeData, node, instance) => {
			broadcastExpanded(node);
			tree.ctx.emit("node-expand", nodeData, node, instance);
		};
		const handleDragStart = (event) => {
			if (!tree.props.draggable) return;
			dragEvents.treeNodeDragStart({
				event,
				treeNode: props
			});
		};
		const handleDragOver = (event) => {
			event.preventDefault();
			if (!tree.props.draggable) return;
			dragEvents.treeNodeDragOver({
				event,
				treeNode: {
					$el: node$.value,
					node: props.node
				}
			});
		};
		const handleDrop = (event) => {
			event.preventDefault();
		};
		const handleDragEnd = (event) => {
			if (!tree.props.draggable) return;
			dragEvents.treeNodeDragEnd(event);
		};
		return {
			ns,
			node$,
			tree,
			expanded,
			childNodeRendered,
			oldChecked,
			oldIndeterminate,
			getNodeKey: getNodeKey$1,
			getNodeClass,
			handleSelectChange,
			handleClick,
			handleContextMenu,
			handleExpandIconClick,
			handleCheckChange,
			handleChildNodeExpand,
			handleDragStart,
			handleDragOver,
			handleDrop,
			handleDragEnd,
			CaretRight
		};
	}
});

//#endregion
export { tree_node_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=tree-node.vue_vue_type_script_lang.mjs.map
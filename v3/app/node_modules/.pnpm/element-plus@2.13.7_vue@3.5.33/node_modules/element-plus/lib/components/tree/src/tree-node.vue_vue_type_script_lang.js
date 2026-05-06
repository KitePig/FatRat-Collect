const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_index$2 = require('../../checkbox/index.js');
const require_index$3 = require('../../collapse-transition/index.js');
const require_util = require('./model/util.js');
const require_node = require('./model/node.js');
const require_tokens = require('./tokens.js');
const require_tree_node_content = require('./tree-node-content.js');
const require_useNodeExpandEventBroadcast = require('./model/useNodeExpandEventBroadcast.js');
const require_useDragNode = require('./model/useDragNode.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/tree/src/tree-node.vue?vue&type=script&lang.ts
var tree_node_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElTreeNode",
	components: {
		ElCollapseTransition: require_index$3.ElCollapseTransition,
		ElCheckbox: require_index$2.ElCheckbox,
		NodeContent: require_tree_node_content.default,
		ElIcon: require_index$1.ElIcon,
		Loading: _element_plus_icons_vue.Loading
	},
	props: {
		node: {
			type: require_node.default,
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
		const ns = require_index.useNamespace("tree");
		const { broadcastExpanded } = require_useNodeExpandEventBroadcast.useNodeExpandEventBroadcast(props);
		const tree = (0, vue.inject)(require_tokens.ROOT_TREE_INJECTION_KEY);
		const expanded = (0, vue.ref)(false);
		const childNodeRendered = (0, vue.ref)(false);
		const oldChecked = (0, vue.ref)();
		const oldIndeterminate = (0, vue.ref)();
		const node$ = (0, vue.ref)();
		const dragEvents = (0, vue.inject)(require_useDragNode.dragEventsKey);
		const instance = (0, vue.getCurrentInstance)();
		(0, vue.provide)(require_tokens.NODE_INSTANCE_INJECTION_KEY, instance);
		if (!tree) require_error.debugWarn("Tree", "Can not find node's tree.");
		if (props.node.expanded) {
			expanded.value = true;
			childNodeRendered.value = true;
		}
		const childrenKey = tree.props.props["children"] || "children";
		(0, vue.watch)(() => {
			const children = props.node.data?.[childrenKey];
			return children && [...children];
		}, () => {
			props.node.updateChildren();
		});
		(0, vue.watch)(() => props.node.indeterminate, (val) => {
			handleSelectChange(props.node.checked, val);
		});
		(0, vue.watch)(() => props.node.checked, (val) => {
			handleSelectChange(val, props.node.indeterminate);
		});
		(0, vue.watch)(() => props.node.childNodes.length, () => props.node.reInitChecked());
		(0, vue.watch)(() => props.node.expanded, (val) => {
			(0, vue.nextTick)(() => expanded.value = val);
			if (val) childNodeRendered.value = true;
		});
		const getNodeKey$1 = (node) => {
			return tree.props.nodeKey ? require_util.getNodeKey(tree.props.nodeKey, node.data) : node.id;
		};
		const getNodeClass = (node) => {
			const nodeClassFunc = props.props.class;
			if (!nodeClassFunc) return {};
			let className;
			if ((0, _vue_shared.isFunction)(nodeClassFunc)) {
				const { data } = node;
				className = nodeClassFunc(data, node);
			} else className = nodeClassFunc;
			if ((0, _vue_shared.isString)(className)) return { [className]: true };
			else return className;
		};
		const handleSelectChange = (checked, indeterminate) => {
			if (oldChecked.value !== checked || oldIndeterminate.value !== indeterminate) tree.ctx.emit("check-change", props.node.data, checked, indeterminate);
			oldChecked.value = checked;
			oldIndeterminate.value = indeterminate;
		};
		const handleClick = (e) => {
			require_util.handleCurrentChange(tree.store, tree.ctx.emit, () => {
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
			(0, vue.nextTick)(() => {
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
			CaretRight: _element_plus_icons_vue.CaretRight
		};
	}
});

//#endregion
exports.default = tree_node_vue_vue_type_script_lang_default;
//# sourceMappingURL=tree-node.vue_vue_type_script_lang.js.map
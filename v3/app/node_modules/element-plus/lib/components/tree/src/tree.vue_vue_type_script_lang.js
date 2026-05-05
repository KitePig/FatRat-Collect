const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_constants = require('../../form/src/constants.js');
const require_util = require('./model/util.js');
const require_tree_store = require('./model/tree-store.js');
const require_tokens = require('./tokens.js');
const require_useNodeExpandEventBroadcast = require('./model/useNodeExpandEventBroadcast.js');
const require_useDragNode = require('./model/useDragNode.js');
const require_tree_node = require('./tree-node.js');
const require_useKeydown = require('./model/useKeydown.js');
const require_tree = require('./tree.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/tree/src/tree.vue?vue&type=script&lang.ts
var tree_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElTree",
	components: { ElTreeNode: require_tree_node.default },
	props: require_tree.treeProps,
	emits: require_tree.treeEmits,
	setup(props, ctx) {
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("tree");
		const store = (0, vue.ref)(new require_tree_store.default({
			key: props.nodeKey,
			data: props.data,
			lazy: props.lazy,
			props: props.props,
			load: props.load,
			currentNodeKey: props.currentNodeKey,
			checkStrictly: props.checkStrictly,
			checkDescendants: props.checkDescendants,
			defaultCheckedKeys: props.defaultCheckedKeys,
			defaultExpandedKeys: props.defaultExpandedKeys,
			autoExpandParent: props.autoExpandParent,
			defaultExpandAll: props.defaultExpandAll,
			filterNodeMethod: props.filterNodeMethod
		}));
		store.value.initialize();
		const root = (0, vue.ref)(store.value.root);
		const currentNode = (0, vue.ref)(null);
		const el$ = (0, vue.ref)(null);
		const dropIndicator$ = (0, vue.ref)(null);
		const { broadcastExpanded } = require_useNodeExpandEventBroadcast.useNodeExpandEventBroadcast(props);
		const { dragState } = require_useDragNode.useDragNodeHandler({
			props,
			ctx,
			el$,
			dropIndicator$,
			store
		});
		require_useKeydown.useKeydown({ el$ }, store);
		const instance = (0, vue.getCurrentInstance)();
		const isSelectTree = (0, vue.computed)(() => {
			let parent = instance?.parent;
			while (parent) {
				if (parent.type.name === "ElTreeSelect") return true;
				parent = parent.parent;
			}
			return false;
		});
		const isEmpty = (0, vue.computed)(() => {
			const { childNodes } = root.value;
			return (!childNodes || childNodes.length === 0 || childNodes.every(({ visible }) => !visible)) && !isSelectTree.value;
		});
		(0, vue.watch)(() => props.currentNodeKey, (newVal) => {
			store.value.setCurrentNodeKey(newVal ?? null);
		});
		(0, vue.watch)(() => props.defaultCheckedKeys, (newVal, oldVal) => {
			if ((0, lodash_unified.isEqual)(newVal, oldVal)) return;
			store.value.setDefaultCheckedKey(newVal ?? []);
		});
		(0, vue.watch)(() => props.defaultExpandedKeys, (newVal) => {
			store.value.setDefaultExpandedKeys(newVal ?? []);
		});
		(0, vue.watch)(() => props.data, (newVal) => {
			store.value.setData(newVal);
		}, { deep: true });
		(0, vue.watch)(() => props.checkStrictly, (newVal) => {
			store.value.checkStrictly = newVal;
		});
		const filter = (value) => {
			if (!props.filterNodeMethod) throw new Error("[Tree] filterNodeMethod is required when filter");
			store.value.filter(value);
		};
		const getNodeKey$1 = (node) => {
			return props.nodeKey ? require_util.getNodeKey(props.nodeKey, node.data) : node.id;
		};
		const requireNodeKey = (methodName) => {
			if (!props.nodeKey) throw new Error(`[Tree] nodeKey is required in ${methodName}`);
		};
		const getNodePath = (data) => {
			requireNodeKey("getNodePath");
			const node = store.value.getNode(data);
			if (!node) return [];
			const path = [node.data];
			let parent = node.parent;
			while (parent && parent !== root.value) {
				path.push(parent.data);
				parent = parent.parent;
			}
			return path.reverse();
		};
		const getCheckedNodes = (leafOnly, includeHalfChecked) => {
			return store.value.getCheckedNodes(leafOnly, includeHalfChecked);
		};
		const getCheckedKeys = (leafOnly) => {
			return store.value.getCheckedKeys(leafOnly);
		};
		const getCurrentNode = () => {
			const currentNode = store.value.getCurrentNode();
			return currentNode ? currentNode.data : null;
		};
		const getCurrentKey = () => {
			requireNodeKey("getCurrentKey");
			const currentNode = getCurrentNode();
			return currentNode ? currentNode[props.nodeKey] : null;
		};
		const setCheckedNodes = (nodes, leafOnly) => {
			requireNodeKey("setCheckedNodes");
			store.value.setCheckedNodes(nodes, leafOnly);
		};
		const setCheckedKeys = (keys, leafOnly) => {
			requireNodeKey("setCheckedKeys");
			store.value.setCheckedKeys(keys, leafOnly);
		};
		const setChecked = (data, checked, deep) => {
			store.value.setChecked(data, checked, deep);
		};
		const getHalfCheckedNodes = () => {
			return store.value.getHalfCheckedNodes();
		};
		const getHalfCheckedKeys = () => {
			return store.value.getHalfCheckedKeys();
		};
		const setCurrentNode = (node, shouldAutoExpandParent = true) => {
			requireNodeKey("setCurrentNode");
			require_util.handleCurrentChange(store, ctx.emit, () => {
				broadcastExpanded(node);
				store.value.setUserCurrentNode(node, shouldAutoExpandParent);
			});
		};
		const setCurrentKey = (key = null, shouldAutoExpandParent = true) => {
			requireNodeKey("setCurrentKey");
			require_util.handleCurrentChange(store, ctx.emit, () => {
				broadcastExpanded();
				store.value.setCurrentNodeKey(key, shouldAutoExpandParent);
			});
		};
		const getNode = (data) => {
			return store.value.getNode(data);
		};
		const remove = (data) => {
			store.value.remove(data);
		};
		const append = (data, parentNode) => {
			store.value.append(data, parentNode);
		};
		const insertBefore = (data, refNode) => {
			store.value.insertBefore(data, refNode);
		};
		const insertAfter = (data, refNode) => {
			store.value.insertAfter(data, refNode);
		};
		const handleNodeExpand = (nodeData, node, instance) => {
			broadcastExpanded(node);
			ctx.emit("node-expand", nodeData, node, instance);
		};
		const updateKeyChildren = (key, data) => {
			requireNodeKey("updateKeyChildren");
			store.value.updateChildren(key, data);
		};
		(0, vue.provide)(require_tokens.ROOT_TREE_INJECTION_KEY, {
			ctx,
			props,
			store,
			root,
			currentNode,
			instance
		});
		(0, vue.provide)(require_constants.formItemContextKey, void 0);
		return {
			ns,
			store,
			root,
			currentNode,
			dragState,
			el$,
			dropIndicator$,
			isEmpty,
			filter,
			getNodeKey: getNodeKey$1,
			getNodePath,
			getCheckedNodes,
			getCheckedKeys,
			getCurrentNode,
			getCurrentKey,
			setCheckedNodes,
			setCheckedKeys,
			setChecked,
			getHalfCheckedNodes,
			getHalfCheckedKeys,
			setCurrentNode,
			setCurrentKey,
			t,
			getNode,
			remove,
			append,
			insertBefore,
			insertAfter,
			handleNodeExpand,
			updateKeyChildren
		};
	}
});

//#endregion
exports.default = tree_vue_vue_type_script_lang_default;
//# sourceMappingURL=tree.vue_vue_type_script_lang.js.map
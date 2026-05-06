import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { formItemContextKey } from "../../form/src/constants.mjs";
import { getNodeKey, handleCurrentChange } from "./model/util.mjs";
import TreeStore from "./model/tree-store.mjs";
import { ROOT_TREE_INJECTION_KEY } from "./tokens.mjs";
import { useNodeExpandEventBroadcast } from "./model/useNodeExpandEventBroadcast.mjs";
import { useDragNodeHandler } from "./model/useDragNode.mjs";
import tree_node_default from "./tree-node.mjs";
import { useKeydown } from "./model/useKeydown.mjs";
import { treeEmits, treeProps } from "./tree.mjs";
import { isEqual } from "lodash-unified";
import { computed, defineComponent, getCurrentInstance, provide, ref, watch } from "vue";

//#region ../../packages/components/tree/src/tree.vue?vue&type=script&lang.ts
var tree_vue_vue_type_script_lang_default = defineComponent({
	name: "ElTree",
	components: { ElTreeNode: tree_node_default },
	props: treeProps,
	emits: treeEmits,
	setup(props, ctx) {
		const { t } = useLocale();
		const ns = useNamespace("tree");
		const store = ref(new TreeStore({
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
		const root = ref(store.value.root);
		const currentNode = ref(null);
		const el$ = ref(null);
		const dropIndicator$ = ref(null);
		const { broadcastExpanded } = useNodeExpandEventBroadcast(props);
		const { dragState } = useDragNodeHandler({
			props,
			ctx,
			el$,
			dropIndicator$,
			store
		});
		useKeydown({ el$ }, store);
		const instance = getCurrentInstance();
		const isSelectTree = computed(() => {
			let parent = instance?.parent;
			while (parent) {
				if (parent.type.name === "ElTreeSelect") return true;
				parent = parent.parent;
			}
			return false;
		});
		const isEmpty = computed(() => {
			const { childNodes } = root.value;
			return (!childNodes || childNodes.length === 0 || childNodes.every(({ visible }) => !visible)) && !isSelectTree.value;
		});
		watch(() => props.currentNodeKey, (newVal) => {
			store.value.setCurrentNodeKey(newVal ?? null);
		});
		watch(() => props.defaultCheckedKeys, (newVal, oldVal) => {
			if (isEqual(newVal, oldVal)) return;
			store.value.setDefaultCheckedKey(newVal ?? []);
		});
		watch(() => props.defaultExpandedKeys, (newVal) => {
			store.value.setDefaultExpandedKeys(newVal ?? []);
		});
		watch(() => props.data, (newVal) => {
			store.value.setData(newVal);
		}, { deep: true });
		watch(() => props.checkStrictly, (newVal) => {
			store.value.checkStrictly = newVal;
		});
		const filter = (value) => {
			if (!props.filterNodeMethod) throw new Error("[Tree] filterNodeMethod is required when filter");
			store.value.filter(value);
		};
		const getNodeKey$1 = (node) => {
			return props.nodeKey ? getNodeKey(props.nodeKey, node.data) : node.id;
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
			handleCurrentChange(store, ctx.emit, () => {
				broadcastExpanded(node);
				store.value.setUserCurrentNode(node, shouldAutoExpandParent);
			});
		};
		const setCurrentKey = (key = null, shouldAutoExpandParent = true) => {
			requireNodeKey("setCurrentKey");
			handleCurrentChange(store, ctx.emit, () => {
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
		provide(ROOT_TREE_INJECTION_KEY, {
			ctx,
			props,
			store,
			root,
			currentNode,
			instance
		});
		provide(formItemContextKey, void 0);
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
export { tree_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=tree.vue_vue_type_script_lang.mjs.map
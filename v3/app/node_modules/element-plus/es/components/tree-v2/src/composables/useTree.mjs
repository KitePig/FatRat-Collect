import { isObject } from "../../../../utils/types.mjs";
import { CURRENT_CHANGE, NODE_CLICK, NODE_COLLAPSE, NODE_DROP, NODE_EXPAND, TreeOptionsEnum } from "../virtual-tree.mjs";
import { useCheck } from "./useCheck.mjs";
import { useFilter } from "./useFilter.mjs";
import { computed, ref, shallowRef, watch } from "vue";

//#region ../../packages/components/tree-v2/src/composables/useTree.ts
function useTree(props, emit) {
	const expandedKeySet = ref(/* @__PURE__ */ new Set());
	const currentKey = ref();
	const tree = shallowRef();
	const listRef = ref();
	const { isIndeterminate, isChecked, toggleCheckbox, getCheckedKeys, getCheckedNodes, getHalfCheckedKeys, getHalfCheckedNodes, setChecked, setCheckedKeys } = useCheck(props, tree);
	const { doFilter, hiddenNodeKeySet, isForceHiddenExpandIcon } = useFilter(props, tree);
	const valueKey = computed(() => {
		return props.props?.value || TreeOptionsEnum.KEY;
	});
	const childrenKey = computed(() => {
		return props.props?.children || TreeOptionsEnum.CHILDREN;
	});
	const disabledKey = computed(() => {
		return props.props?.disabled || TreeOptionsEnum.DISABLED;
	});
	const labelKey = computed(() => {
		return props.props?.label || TreeOptionsEnum.LABEL;
	});
	const flattenTree = computed(() => {
		const expandedKeys = expandedKeySet.value;
		const hiddenKeys = hiddenNodeKeySet.value;
		const flattenNodes = [];
		const nodes = tree.value?.treeNodes || [];
		const stack = [];
		for (let i = nodes.length - 1; i >= 0; --i) stack.push(nodes[i]);
		while (stack.length) {
			const node = stack.pop();
			if (hiddenKeys.has(node.key)) continue;
			flattenNodes.push(node);
			if (node.children && expandedKeys.has(node.key)) for (let i = node.children.length - 1; i >= 0; --i) stack.push(node.children[i]);
		}
		return flattenNodes;
	});
	const isNotEmpty = computed(() => {
		return flattenTree.value.length > 0;
	});
	function createTree(data) {
		const treeNodeMap = /* @__PURE__ */ new Map();
		const levelTreeNodeMap = /* @__PURE__ */ new Map();
		let maxLevel = 1;
		function traverse(nodes, level = 1, parent = void 0) {
			const siblings = [];
			for (const rawNode of nodes) {
				const value = getKey(rawNode);
				const node = {
					level,
					key: value,
					data: rawNode
				};
				node.label = getLabel(rawNode);
				node.parent = parent;
				const children = getChildren(rawNode);
				node.disabled = getDisabled(rawNode);
				node.isLeaf = !children || children.length === 0;
				node.expanded = expandedKeySet.value.has(value);
				if (children && children.length) node.children = traverse(children, level + 1, node);
				siblings.push(node);
				treeNodeMap.set(value, node);
				if (!levelTreeNodeMap.has(level)) levelTreeNodeMap.set(level, []);
				levelTreeNodeMap.get(level)?.push(node);
			}
			if (level > maxLevel) maxLevel = level;
			return siblings;
		}
		const treeNodes = traverse(data);
		return {
			treeNodeMap,
			levelTreeNodeMap,
			maxLevel,
			treeNodes
		};
	}
	function filter(query) {
		const keys = doFilter(query);
		if (keys) expandedKeySet.value = keys;
	}
	function getChildren(node) {
		return node[childrenKey.value];
	}
	function getKey(node) {
		if (!node) return "";
		return node[valueKey.value];
	}
	function getDisabled(node) {
		return node[disabledKey.value];
	}
	function getLabel(node) {
		return node[labelKey.value];
	}
	function toggleExpand(node) {
		if (expandedKeySet.value.has(node.key)) collapseNode(node);
		else expandNode(node);
	}
	function setExpandedKeys(keys) {
		const expandedKeys = /* @__PURE__ */ new Set();
		const nodeMap = tree.value.treeNodeMap;
		expandedKeySet.value.forEach((key) => {
			const node = nodeMap.get(key);
			if (node) node.expanded = false;
		});
		keys.forEach((k) => {
			let node = nodeMap.get(k);
			while (node && !expandedKeys.has(node.key)) {
				expandedKeys.add(node.key);
				node.expanded = true;
				node = node.parent;
			}
		});
		expandedKeySet.value = expandedKeys;
	}
	function handleNodeClick(node, e) {
		emit(NODE_CLICK, node.data, node, e);
		handleCurrentChange(node);
		if (props.expandOnClickNode) toggleExpand(node);
		if (props.showCheckbox && (props.checkOnClickNode || node.isLeaf && props.checkOnClickLeaf) && !node.disabled) toggleCheckbox(node, !isChecked(node), true);
	}
	function handleNodeDrop(node, e) {
		emit(NODE_DROP, node.data, node, e);
	}
	function handleCurrentChange(node) {
		if (!isCurrent(node)) {
			currentKey.value = node.key;
			emit(CURRENT_CHANGE, node.data, node);
		}
	}
	function handleNodeCheck(node, checked) {
		toggleCheckbox(node, checked);
	}
	function expandNode(node) {
		const keySet = expandedKeySet.value;
		if (tree.value && props.accordion) {
			const { treeNodeMap } = tree.value;
			keySet.forEach((key) => {
				const treeNode = treeNodeMap.get(key);
				if (node && node.level === treeNode?.level) {
					keySet.delete(key);
					treeNode.expanded = false;
				}
			});
		}
		keySet.add(node.key);
		const _node = getNode(node.key);
		if (_node) {
			_node.expanded = true;
			emit(NODE_EXPAND, _node.data, _node);
		}
	}
	function collapseNode(node) {
		expandedKeySet.value.delete(node.key);
		const _node = getNode(node.key);
		if (_node) {
			_node.expanded = false;
			emit(NODE_COLLAPSE, _node.data, _node);
		}
	}
	function isDisabled(node) {
		return !!node.disabled;
	}
	function isCurrent(node) {
		const current = currentKey.value;
		return current !== void 0 && current === node.key;
	}
	function getCurrentNode() {
		if (!currentKey.value) return void 0;
		return tree.value?.treeNodeMap.get(currentKey.value)?.data;
	}
	function getCurrentKey() {
		return currentKey.value;
	}
	function setCurrentKey(key) {
		currentKey.value = key;
	}
	function setData(data) {
		tree.value = createTree(data);
	}
	function getNode(data) {
		const key = isObject(data) ? getKey(data) : data;
		return tree.value?.treeNodeMap.get(key);
	}
	function scrollToNode(key, strategy = "auto") {
		const node = getNode(key);
		if (node && listRef.value) listRef.value.scrollToItem(flattenTree.value.indexOf(node), strategy);
	}
	function scrollTo(offset) {
		listRef.value?.scrollTo(offset);
	}
	watch(() => props.currentNodeKey, (key) => {
		currentKey.value = key;
	}, { immediate: true });
	watch(() => props.defaultExpandedKeys, (keys) => {
		setExpandedKeys(keys || []);
	});
	watch(() => props.data, (data) => {
		setData(data);
		setExpandedKeys(props.defaultExpandedKeys || []);
	}, { immediate: true });
	return {
		tree,
		flattenTree,
		isNotEmpty,
		listRef,
		getKey,
		getChildren,
		toggleExpand,
		toggleCheckbox,
		isChecked,
		isIndeterminate,
		isDisabled,
		isCurrent,
		isForceHiddenExpandIcon,
		handleNodeClick,
		handleNodeDrop,
		handleNodeCheck,
		getCurrentNode,
		getCurrentKey,
		setCurrentKey,
		getCheckedKeys,
		getCheckedNodes,
		getHalfCheckedKeys,
		getHalfCheckedNodes,
		setChecked,
		setCheckedKeys,
		filter,
		setData,
		getNode,
		expandNode,
		collapseNode,
		setExpandedKeys,
		scrollToNode,
		scrollTo
	};
}

//#endregion
export { useTree };
//# sourceMappingURL=useTree.mjs.map
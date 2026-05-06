Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_virtual_tree = require('../virtual-tree.js');
const require_useCheck = require('./useCheck.js');
const require_useFilter = require('./useFilter.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/tree-v2/src/composables/useTree.ts
function useTree(props, emit) {
	const expandedKeySet = (0, vue.ref)(/* @__PURE__ */ new Set());
	const currentKey = (0, vue.ref)();
	const tree = (0, vue.shallowRef)();
	const listRef = (0, vue.ref)();
	const { isIndeterminate, isChecked, toggleCheckbox, getCheckedKeys, getCheckedNodes, getHalfCheckedKeys, getHalfCheckedNodes, setChecked, setCheckedKeys } = require_useCheck.useCheck(props, tree);
	const { doFilter, hiddenNodeKeySet, isForceHiddenExpandIcon } = require_useFilter.useFilter(props, tree);
	const valueKey = (0, vue.computed)(() => {
		return props.props?.value || require_virtual_tree.TreeOptionsEnum.KEY;
	});
	const childrenKey = (0, vue.computed)(() => {
		return props.props?.children || require_virtual_tree.TreeOptionsEnum.CHILDREN;
	});
	const disabledKey = (0, vue.computed)(() => {
		return props.props?.disabled || require_virtual_tree.TreeOptionsEnum.DISABLED;
	});
	const labelKey = (0, vue.computed)(() => {
		return props.props?.label || require_virtual_tree.TreeOptionsEnum.LABEL;
	});
	const flattenTree = (0, vue.computed)(() => {
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
	const isNotEmpty = (0, vue.computed)(() => {
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
		emit(require_virtual_tree.NODE_CLICK, node.data, node, e);
		handleCurrentChange(node);
		if (props.expandOnClickNode) toggleExpand(node);
		if (props.showCheckbox && (props.checkOnClickNode || node.isLeaf && props.checkOnClickLeaf) && !node.disabled) toggleCheckbox(node, !isChecked(node), true);
	}
	function handleNodeDrop(node, e) {
		emit(require_virtual_tree.NODE_DROP, node.data, node, e);
	}
	function handleCurrentChange(node) {
		if (!isCurrent(node)) {
			currentKey.value = node.key;
			emit(require_virtual_tree.CURRENT_CHANGE, node.data, node);
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
			emit(require_virtual_tree.NODE_EXPAND, _node.data, _node);
		}
	}
	function collapseNode(node) {
		expandedKeySet.value.delete(node.key);
		const _node = getNode(node.key);
		if (_node) {
			_node.expanded = false;
			emit(require_virtual_tree.NODE_COLLAPSE, _node.data, _node);
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
		const key = (0, _vue_shared.isObject)(data) ? getKey(data) : data;
		return tree.value?.treeNodeMap.get(key);
	}
	function scrollToNode(key, strategy = "auto") {
		const node = getNode(key);
		if (node && listRef.value) listRef.value.scrollToItem(flattenTree.value.indexOf(node), strategy);
	}
	function scrollTo(offset) {
		listRef.value?.scrollTo(offset);
	}
	(0, vue.watch)(() => props.currentNodeKey, (key) => {
		currentKey.value = key;
	}, { immediate: true });
	(0, vue.watch)(() => props.defaultExpandedKeys, (keys) => {
		setExpandedKeys(keys || []);
	});
	(0, vue.watch)(() => props.data, (data) => {
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
exports.useTree = useTree;
//# sourceMappingURL=useTree.js.map
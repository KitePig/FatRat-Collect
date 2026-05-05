Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_virtual_tree = require('../virtual-tree.js');
let vue = require("vue");

//#region ../../packages/components/tree-v2/src/composables/useCheck.ts
function useCheck(props, tree) {
	const checkedKeys = (0, vue.ref)(/* @__PURE__ */ new Set());
	const indeterminateKeys = (0, vue.ref)(/* @__PURE__ */ new Set());
	const { emit } = (0, vue.getCurrentInstance)();
	(0, vue.watch)([() => tree.value, () => props.defaultCheckedKeys], () => {
		return (0, vue.nextTick)(() => {
			_setCheckedKeys(props.defaultCheckedKeys);
		});
	}, { immediate: true });
	const updateCheckedKeys = () => {
		if (!tree.value || !props.showCheckbox || props.checkStrictly) return;
		const { levelTreeNodeMap, maxLevel } = tree.value;
		const checkedKeySet = checkedKeys.value;
		const indeterminateKeySet = /* @__PURE__ */ new Set();
		for (let level = maxLevel; level >= 1; --level) {
			const nodes = levelTreeNodeMap.get(level);
			if (!nodes) continue;
			nodes.forEach((node) => {
				const children = node.children;
				let isEffectivelyChecked = !node.isLeaf || node.disabled || checkedKeySet.has(node.key);
				if (children) {
					let allChecked = true;
					let hasChecked = false;
					for (const childNode of children) {
						const key = childNode.key;
						if (!childNode.isEffectivelyChecked) isEffectivelyChecked = false;
						if (checkedKeySet.has(key)) hasChecked = true;
						else if (indeterminateKeySet.has(key)) {
							allChecked = false;
							hasChecked = true;
							break;
						} else allChecked = false;
					}
					if (allChecked) checkedKeySet.add(node.key);
					else if (hasChecked) {
						indeterminateKeySet.add(node.key);
						checkedKeySet.delete(node.key);
					} else {
						checkedKeySet.delete(node.key);
						indeterminateKeySet.delete(node.key);
					}
				}
				node.isEffectivelyChecked = isEffectivelyChecked;
			});
		}
		indeterminateKeys.value = indeterminateKeySet;
	};
	const isChecked = (node) => checkedKeys.value.has(node.key);
	const isIndeterminate = (node) => indeterminateKeys.value.has(node.key);
	const toggleCheckbox = (node, isChecked, nodeClick = true, immediateUpdate = true) => {
		const checkedKeySet = checkedKeys.value;
		const children = node.children;
		if (!props.checkStrictly && nodeClick && children?.length) isChecked = children.some((node) => !node.isEffectivelyChecked);
		const toggle = (node, checked) => {
			checkedKeySet[checked ? require_virtual_tree.SetOperationEnum.ADD : require_virtual_tree.SetOperationEnum.DELETE](node.key);
			const children = node.children;
			if (!props.checkStrictly && children) children.forEach((childNode) => {
				if (!childNode.disabled || childNode.children) toggle(childNode, checked);
			});
		};
		toggle(node, isChecked);
		if (immediateUpdate) updateCheckedKeys();
		if (nodeClick) afterNodeCheck(node, isChecked);
	};
	const afterNodeCheck = (node, checked) => {
		const { checkedNodes, checkedKeys } = getChecked();
		const { halfCheckedNodes, halfCheckedKeys } = getHalfChecked();
		emit(require_virtual_tree.NODE_CHECK, node.data, {
			checkedKeys,
			checkedNodes,
			halfCheckedKeys,
			halfCheckedNodes
		});
		emit(require_virtual_tree.NODE_CHECK_CHANGE, node.data, checked);
	};
	function getCheckedKeys(leafOnly = false) {
		return getChecked(leafOnly).checkedKeys;
	}
	function getCheckedNodes(leafOnly = false) {
		return getChecked(leafOnly).checkedNodes;
	}
	function getHalfCheckedKeys() {
		return getHalfChecked().halfCheckedKeys;
	}
	function getHalfCheckedNodes() {
		return getHalfChecked().halfCheckedNodes;
	}
	function getChecked(leafOnly = false) {
		const checkedNodes = [];
		const keys = [];
		if (tree?.value && props.showCheckbox) {
			const { treeNodeMap } = tree.value;
			checkedKeys.value.forEach((key) => {
				const node = treeNodeMap.get(key);
				if (node && (!leafOnly || leafOnly && node.isLeaf)) {
					keys.push(key);
					checkedNodes.push(node.data);
				}
			});
		}
		return {
			checkedKeys: keys,
			checkedNodes
		};
	}
	function getHalfChecked() {
		const halfCheckedNodes = [];
		const halfCheckedKeys = [];
		if (tree?.value && props.showCheckbox) {
			const { treeNodeMap } = tree.value;
			indeterminateKeys.value.forEach((key) => {
				const node = treeNodeMap.get(key);
				if (node) {
					halfCheckedKeys.push(key);
					halfCheckedNodes.push(node.data);
				}
			});
		}
		return {
			halfCheckedNodes,
			halfCheckedKeys
		};
	}
	function setCheckedKeys(keys) {
		checkedKeys.value.clear();
		indeterminateKeys.value.clear();
		(0, vue.nextTick)(() => {
			_setCheckedKeys(keys);
		});
	}
	function setChecked(key, isChecked) {
		if (tree?.value && props.showCheckbox) {
			const node = tree.value.treeNodeMap.get(key);
			if (node) toggleCheckbox(node, isChecked, false);
		}
	}
	function _setCheckedKeys(keys) {
		if (tree?.value) {
			const { treeNodeMap } = tree.value;
			if (props.showCheckbox && treeNodeMap && keys?.length > 0) {
				for (const key of keys) {
					const node = treeNodeMap.get(key);
					if (node && !isChecked(node)) toggleCheckbox(node, true, false, false);
				}
				updateCheckedKeys();
			}
		}
	}
	return {
		updateCheckedKeys,
		toggleCheckbox,
		isChecked,
		isIndeterminate,
		getCheckedKeys,
		getCheckedNodes,
		getHalfCheckedKeys,
		getHalfCheckedNodes,
		setChecked,
		setCheckedKeys
	};
}

//#endregion
exports.useCheck = useCheck;
//# sourceMappingURL=useCheck.js.map
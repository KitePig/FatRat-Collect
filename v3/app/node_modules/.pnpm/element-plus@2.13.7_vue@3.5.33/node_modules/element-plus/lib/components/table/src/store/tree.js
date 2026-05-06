Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_util = require('../util.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table/src/store/tree.ts
function useTree(watcherData) {
	const expandRowKeys = (0, vue.ref)([]);
	const treeData = (0, vue.ref)({});
	const indent = (0, vue.ref)(16);
	const lazy = (0, vue.ref)(false);
	const lazyTreeNodeMap = (0, vue.ref)({});
	const lazyColumnIdentifier = (0, vue.ref)("hasChildren");
	const childrenColumnName = (0, vue.ref)("children");
	const checkStrictly = (0, vue.ref)(false);
	const instance = (0, vue.getCurrentInstance)();
	const normalizedData = (0, vue.computed)(() => {
		if (!watcherData.rowKey.value) return {};
		return normalize(watcherData.data.value || []);
	});
	const normalizedLazyNode = (0, vue.computed)(() => {
		const rowKey = watcherData.rowKey.value;
		const keys = Object.keys(lazyTreeNodeMap.value);
		const res = {};
		if (!keys.length) return res;
		keys.forEach((key) => {
			if (lazyTreeNodeMap.value[key].length) {
				const item = { children: [] };
				lazyTreeNodeMap.value[key].forEach((row) => {
					const currentRowKey = require_util.getRowIdentity(row, rowKey);
					item.children.push(currentRowKey);
					if (row[lazyColumnIdentifier.value] && !res[currentRowKey]) res[currentRowKey] = { children: [] };
				});
				res[key] = item;
			}
		});
		return res;
	});
	const normalize = (data) => {
		const rowKey = watcherData.rowKey.value;
		const res = {};
		require_util.walkTreeNode(data, (parent, children, level) => {
			const parentId = require_util.getRowIdentity(parent, rowKey);
			if ((0, _vue_shared.isArray)(children)) res[parentId] = {
				children: children.map((row) => require_util.getRowIdentity(row, rowKey)),
				level
			};
			else if (lazy.value) res[parentId] = {
				children: [],
				lazy: true,
				level
			};
		}, childrenColumnName.value, lazyColumnIdentifier.value, lazy.value);
		return res;
	};
	const updateTreeData = (ifChangeExpandRowKeys = false, ifExpandAll) => {
		ifExpandAll ||= instance.store?.states.defaultExpandAll.value;
		const nested = normalizedData.value;
		const normalizedLazyNode_ = normalizedLazyNode.value;
		const keys = Object.keys(nested);
		const newTreeData = {};
		if (keys.length) {
			const oldTreeData = (0, vue.unref)(treeData);
			const rootLazyRowKeys = [];
			const getExpanded = (oldValue, key) => {
				if (ifChangeExpandRowKeys) if (expandRowKeys.value) return ifExpandAll || expandRowKeys.value.includes(key);
				else return !!(ifExpandAll || oldValue?.expanded);
				else {
					const included = ifExpandAll || expandRowKeys.value && expandRowKeys.value.includes(key);
					return !!(oldValue?.expanded || included);
				}
			};
			keys.forEach((key) => {
				const oldValue = oldTreeData[key];
				const newValue = { ...nested[key] };
				newValue.expanded = getExpanded(oldValue, key);
				if (newValue.lazy) {
					const { loaded = false, loading = false } = oldValue || {};
					newValue.loaded = !!loaded;
					newValue.loading = !!loading;
					rootLazyRowKeys.push(key);
				}
				newTreeData[key] = newValue;
			});
			const lazyKeys = Object.keys(normalizedLazyNode_);
			if (lazy.value && lazyKeys.length && rootLazyRowKeys.length) lazyKeys.forEach((key) => {
				const oldValue = oldTreeData[key];
				const lazyNodeChildren = normalizedLazyNode_[key].children;
				if (rootLazyRowKeys.includes(key)) {
					if (newTreeData[key].children?.length !== 0) throw new Error("[ElTable]children must be an empty array.");
					newTreeData[key].children = lazyNodeChildren;
				} else {
					const { loaded = false, loading = false } = oldValue || {};
					newTreeData[key] = {
						lazy: true,
						loaded: !!loaded,
						loading: !!loading,
						expanded: getExpanded(oldValue, key),
						children: lazyNodeChildren,
						level: void 0
					};
				}
			});
		}
		treeData.value = newTreeData;
		instance.store?.updateTableScrollY();
	};
	(0, vue.watch)(() => expandRowKeys.value, () => {
		updateTreeData(true);
	}, { deep: true });
	(0, vue.watch)(() => normalizedData.value, () => {
		updateTreeData();
	});
	(0, vue.watch)(() => normalizedLazyNode.value, () => {
		updateTreeData();
	});
	const updateTreeExpandKeys = (value) => {
		expandRowKeys.value = value;
		updateTreeData();
	};
	const isUseLazy = (data) => {
		return lazy.value && data && "loaded" in data && !data.loaded;
	};
	const toggleTreeExpansion = (row, expanded) => {
		instance.store.assertRowKey();
		const rowKey = watcherData.rowKey.value;
		const id = require_util.getRowIdentity(row, rowKey);
		const data = id && treeData.value[id];
		if (id && data && "expanded" in data) {
			const oldExpanded = data.expanded;
			expanded = require_types.isUndefined(expanded) ? !data.expanded : expanded;
			treeData.value[id].expanded = expanded;
			if (oldExpanded !== expanded) instance.emit("expand-change", row, expanded);
			expanded && isUseLazy(data) && loadData(row, id, data);
			instance.store.updateTableScrollY();
		}
	};
	const loadOrToggle = (row) => {
		instance.store.assertRowKey();
		const rowKey = watcherData.rowKey.value;
		const id = require_util.getRowIdentity(row, rowKey);
		const data = treeData.value[id];
		if (isUseLazy(data)) loadData(row, id, data);
		else toggleTreeExpansion(row, void 0);
	};
	const loadData = (row, key, treeNode) => {
		const { load } = instance.props;
		if (load && !treeData.value[key].loaded) {
			treeData.value[key].loading = true;
			load(row, treeNode, (data) => {
				if (!(0, _vue_shared.isArray)(data)) throw new TypeError("[ElTable] data must be an array");
				treeData.value[key].loading = false;
				treeData.value[key].loaded = true;
				treeData.value[key].expanded = true;
				if (data.length) lazyTreeNodeMap.value[key] = data;
				instance.emit("expand-change", row, true);
			});
		}
	};
	const updateKeyChildren = (key, data) => {
		const { lazy, rowKey } = instance.props;
		if (!lazy) return;
		if (!rowKey) throw new Error("[Table] rowKey is required in updateKeyChild");
		if (lazyTreeNodeMap.value[key]) lazyTreeNodeMap.value[key] = data;
	};
	return {
		loadData,
		loadOrToggle,
		toggleTreeExpansion,
		updateTreeExpandKeys,
		updateTreeData,
		updateKeyChildren,
		normalize,
		states: {
			expandRowKeys,
			treeData,
			indent,
			lazy,
			lazyTreeNodeMap,
			lazyColumnIdentifier,
			childrenColumnName,
			checkStrictly
		}
	};
}

//#endregion
exports.default = useTree;
//# sourceMappingURL=tree.js.map
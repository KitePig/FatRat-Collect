Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_strings = require('../../../utils/strings.js');
const require_index = require('../../tree/index.js');
const require_tree_select_option = require('./tree-select-option.js');
const require_utils = require('./utils.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/tree-select/src/tree.ts
const useTree = (props, { attrs, slots, emit }, { select, tree, key }) => {
	(0, vue.watch)([() => props.modelValue, tree], () => {
		if (props.showCheckbox) (0, vue.nextTick)(() => {
			const treeInstance = tree.value;
			if (treeInstance && !(0, lodash_unified.isEqual)(treeInstance.getCheckedKeys(), require_utils.toValidArray(props.modelValue))) treeInstance.setCheckedKeys(require_utils.toValidArray(props.modelValue));
		});
	}, {
		immediate: true,
		deep: true
	});
	const propsMap = (0, vue.computed)(() => ({
		value: key.value,
		label: "label",
		children: "children",
		disabled: "disabled",
		isLeaf: "isLeaf",
		...props.props
	}));
	const getNodeValByProp = (prop, data) => {
		const propVal = propsMap.value[prop];
		if ((0, _vue_shared.isFunction)(propVal)) return propVal(data, tree.value?.getNode(getNodeValByProp("value", data)));
		else return data[propVal];
	};
	const defaultExpandedParentKeys = require_utils.toValidArray(props.modelValue).map((value) => {
		return require_utils.treeFind(props.data || [], (data) => getNodeValByProp("value", data) === value, (data) => getNodeValByProp("children", data), (data, index, array, parent) => parent && getNodeValByProp("value", parent));
	}).filter((item) => require_utils.isValidValue(item));
	const cacheOptions = (0, vue.computed)(() => {
		if (!props.renderAfterExpand && !props.lazy) return [];
		const options = [];
		require_utils.treeEach(props.data.concat(props.cacheData), (node) => {
			const value = getNodeValByProp("value", node);
			options.push({
				value,
				currentLabel: getNodeValByProp("label", node),
				isDisabled: getNodeValByProp("disabled", node)
			});
		}, (data) => getNodeValByProp("children", data));
		return options;
	});
	const getChildCheckedKeys = () => {
		return tree.value?.getCheckedKeys().filter((checkedKey) => {
			const node = tree.value?.getNode(checkedKey);
			return !(0, lodash_unified.isNil)(node) && require_types.isEmpty(node.childNodes);
		});
	};
	const emitChange = (val) => {
		if (!(0, lodash_unified.isEqual)(props.modelValue, val)) emit(require_event.CHANGE_EVENT, val);
	};
	function update(val) {
		emit(require_event.UPDATE_MODEL_EVENT, val);
		emitChange(val);
	}
	return {
		...(0, lodash_unified.pick)((0, vue.toRefs)(props), Object.keys(require_index.ElTree.props)),
		...attrs,
		nodeKey: key,
		expandOnClickNode: (0, vue.computed)(() => {
			return !props.checkStrictly && props.expandOnClickNode;
		}),
		defaultExpandedKeys: (0, vue.computed)(() => {
			return props.defaultExpandedKeys ? props.defaultExpandedKeys.concat(defaultExpandedParentKeys) : defaultExpandedParentKeys;
		}),
		renderContent: (h, { node, data, store }) => {
			return h(require_tree_select_option.default, {
				value: getNodeValByProp("value", data),
				label: getNodeValByProp("label", data),
				disabled: getNodeValByProp("disabled", data),
				visible: node.visible
			}, props.renderContent ? () => props.renderContent(h, {
				node,
				data,
				store
			}) : slots.default ? () => slots.default({
				node,
				data,
				store
			}) : void 0);
		},
		filterNodeMethod: (value, data, node) => {
			if (props.filterNodeMethod) return props.filterNodeMethod(value, data, node);
			if (!value) return true;
			return new RegExp(require_strings.escapeStringRegexp(value), "i").test(getNodeValByProp("label", data) || "");
		},
		onNodeClick: (data, node, e) => {
			attrs.onNodeClick?.(data, node, e);
			if (props.showCheckbox && props.checkOnClickNode) return;
			if (!props.showCheckbox && (props.checkStrictly || node.isLeaf)) {
				if (!getNodeValByProp("disabled", data)) {
					const option = select.value?.states.options.get(getNodeValByProp("value", data));
					select.value?.handleOptionSelect(option);
				}
			} else if (props.expandOnClickNode) e.proxy.handleExpandIconClick();
		},
		onCheck: (data, params) => {
			if (!props.showCheckbox) return;
			const dataValue = getNodeValByProp("value", data);
			const dataMap = {};
			require_utils.treeEach([tree.value.store.root], (node) => dataMap[node.key] = node, (node) => node.childNodes);
			const uncachedCheckedKeys = params.checkedKeys;
			const cachedKeys = props.multiple ? require_utils.toValidArray(props.modelValue).filter((item) => !(item in dataMap) && !uncachedCheckedKeys.includes(item)) : [];
			const checkedKeys = cachedKeys.concat(uncachedCheckedKeys);
			if (props.checkStrictly) update(props.multiple ? checkedKeys : checkedKeys.includes(dataValue) ? dataValue : void 0);
			else if (props.multiple) {
				const childKeys = getChildCheckedKeys();
				update(cachedKeys.concat(childKeys));
			} else {
				const firstLeaf = require_utils.treeFind([data], (data) => !require_utils.isValidArray(getNodeValByProp("children", data)) && !getNodeValByProp("disabled", data), (data) => getNodeValByProp("children", data));
				const firstLeafKey = firstLeaf ? getNodeValByProp("value", firstLeaf) : void 0;
				const hasCheckedChild = require_utils.isValidValue(props.modelValue) && !!require_utils.treeFind([data], (data) => getNodeValByProp("value", data) === props.modelValue, (data) => getNodeValByProp("children", data));
				update(firstLeafKey === props.modelValue || hasCheckedChild ? void 0 : firstLeafKey);
			}
			(0, vue.nextTick)(() => {
				const checkedKeys = require_utils.toValidArray(props.modelValue);
				tree.value.setCheckedKeys(checkedKeys);
				attrs.onCheck?.(data, {
					checkedKeys: tree.value.getCheckedKeys(),
					checkedNodes: tree.value.getCheckedNodes(),
					halfCheckedKeys: tree.value.getHalfCheckedKeys(),
					halfCheckedNodes: tree.value.getHalfCheckedNodes()
				});
			});
			select.value?.focus();
		},
		onNodeExpand: (data, node, e) => {
			attrs.onNodeExpand?.(data, node, e);
			(0, vue.nextTick)(() => {
				if (!props.checkStrictly && props.lazy && props.multiple && node.checked) {
					const dataMap = {};
					const uncachedCheckedKeys = tree.value.getCheckedKeys();
					require_utils.treeEach([tree.value.store.root], (node) => dataMap[node.key] = node, (node) => node.childNodes);
					const cachedKeys = require_utils.toValidArray(props.modelValue).filter((item) => !(item in dataMap) && !uncachedCheckedKeys.includes(item));
					const childKeys = getChildCheckedKeys();
					update(cachedKeys.concat(childKeys));
				}
			});
		},
		cacheOptions
	};
};

//#endregion
exports.useTree = useTree;
//# sourceMappingURL=tree.js.map
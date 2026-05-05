import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isEmpty, isFunction } from "../../../utils/types.mjs";
import { escapeStringRegexp } from "../../../utils/strings.mjs";
import { ElTree } from "../../tree/index.mjs";
import component from "./tree-select-option.mjs";
import { isValidArray, isValidValue, toValidArray, treeEach, treeFind } from "./utils.mjs";
import { isEqual, isNil, pick } from "lodash-unified";
import { computed, nextTick, toRefs, watch } from "vue";

//#region ../../packages/components/tree-select/src/tree.ts
const useTree = (props, { attrs, slots, emit }, { select, tree, key }) => {
	watch([() => props.modelValue, tree], () => {
		if (props.showCheckbox) nextTick(() => {
			const treeInstance = tree.value;
			if (treeInstance && !isEqual(treeInstance.getCheckedKeys(), toValidArray(props.modelValue))) treeInstance.setCheckedKeys(toValidArray(props.modelValue));
		});
	}, {
		immediate: true,
		deep: true
	});
	const propsMap = computed(() => ({
		value: key.value,
		label: "label",
		children: "children",
		disabled: "disabled",
		isLeaf: "isLeaf",
		...props.props
	}));
	const getNodeValByProp = (prop, data) => {
		const propVal = propsMap.value[prop];
		if (isFunction(propVal)) return propVal(data, tree.value?.getNode(getNodeValByProp("value", data)));
		else return data[propVal];
	};
	const defaultExpandedParentKeys = toValidArray(props.modelValue).map((value) => {
		return treeFind(props.data || [], (data) => getNodeValByProp("value", data) === value, (data) => getNodeValByProp("children", data), (data, index, array, parent) => parent && getNodeValByProp("value", parent));
	}).filter((item) => isValidValue(item));
	const cacheOptions = computed(() => {
		if (!props.renderAfterExpand && !props.lazy) return [];
		const options = [];
		treeEach(props.data.concat(props.cacheData), (node) => {
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
			return !isNil(node) && isEmpty(node.childNodes);
		});
	};
	const emitChange = (val) => {
		if (!isEqual(props.modelValue, val)) emit(CHANGE_EVENT, val);
	};
	function update(val) {
		emit(UPDATE_MODEL_EVENT, val);
		emitChange(val);
	}
	return {
		...pick(toRefs(props), Object.keys(ElTree.props)),
		...attrs,
		nodeKey: key,
		expandOnClickNode: computed(() => {
			return !props.checkStrictly && props.expandOnClickNode;
		}),
		defaultExpandedKeys: computed(() => {
			return props.defaultExpandedKeys ? props.defaultExpandedKeys.concat(defaultExpandedParentKeys) : defaultExpandedParentKeys;
		}),
		renderContent: (h, { node, data, store }) => {
			return h(component, {
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
			return new RegExp(escapeStringRegexp(value), "i").test(getNodeValByProp("label", data) || "");
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
			treeEach([tree.value.store.root], (node) => dataMap[node.key] = node, (node) => node.childNodes);
			const uncachedCheckedKeys = params.checkedKeys;
			const cachedKeys = props.multiple ? toValidArray(props.modelValue).filter((item) => !(item in dataMap) && !uncachedCheckedKeys.includes(item)) : [];
			const checkedKeys = cachedKeys.concat(uncachedCheckedKeys);
			if (props.checkStrictly) update(props.multiple ? checkedKeys : checkedKeys.includes(dataValue) ? dataValue : void 0);
			else if (props.multiple) {
				const childKeys = getChildCheckedKeys();
				update(cachedKeys.concat(childKeys));
			} else {
				const firstLeaf = treeFind([data], (data) => !isValidArray(getNodeValByProp("children", data)) && !getNodeValByProp("disabled", data), (data) => getNodeValByProp("children", data));
				const firstLeafKey = firstLeaf ? getNodeValByProp("value", firstLeaf) : void 0;
				const hasCheckedChild = isValidValue(props.modelValue) && !!treeFind([data], (data) => getNodeValByProp("value", data) === props.modelValue, (data) => getNodeValByProp("children", data));
				update(firstLeafKey === props.modelValue || hasCheckedChild ? void 0 : firstLeafKey);
			}
			nextTick(() => {
				const checkedKeys = toValidArray(props.modelValue);
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
			nextTick(() => {
				if (!props.checkStrictly && props.lazy && props.multiple && node.checked) {
					const dataMap = {};
					const uncachedCheckedKeys = tree.value.getCheckedKeys();
					treeEach([tree.value.store.root], (node) => dataMap[node.key] = node, (node) => node.childNodes);
					const cachedKeys = toValidArray(props.modelValue).filter((item) => !(item in dataMap) && !uncachedCheckedKeys.includes(item));
					const childKeys = getChildCheckedKeys();
					update(cachedKeys.concat(childKeys));
				}
			});
		},
		cacheOptions
	};
};

//#endregion
export { useTree };
//# sourceMappingURL=tree.mjs.map
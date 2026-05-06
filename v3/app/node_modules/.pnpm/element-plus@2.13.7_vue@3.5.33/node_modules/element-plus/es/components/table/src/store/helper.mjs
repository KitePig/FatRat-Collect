import { isObject } from "../../../../utils/types.mjs";
import useStore from "./index.mjs";
import { debounce } from "lodash-unified";
import { watch } from "vue";

//#region ../../packages/components/table/src/store/helper.ts
const InitialStateMap = {
	rowKey: "rowKey",
	defaultExpandAll: "defaultExpandAll",
	rowExpandable: "rowExpandable",
	selectOnIndeterminate: "selectOnIndeterminate",
	indent: "indent",
	lazy: "lazy",
	["treeProps.hasChildren"]: {
		key: "lazyColumnIdentifier",
		default: "hasChildren"
	},
	["treeProps.children"]: {
		key: "childrenColumnName",
		default: "children"
	},
	["treeProps.checkStrictly"]: {
		key: "checkStrictly",
		default: false
	}
};
function createStore(table, props) {
	if (!table) throw new Error("Table is required.");
	const store = useStore();
	store.toggleAllSelection = debounce(store._toggleAllSelection, 10);
	Object.keys(InitialStateMap).forEach((key) => {
		handleValue(getArrKeysValue(props, key), key, store);
	});
	proxyTableProps(store, props);
	return store;
}
function proxyTableProps(store, props) {
	Object.keys(InitialStateMap).forEach((key) => {
		watch(() => getArrKeysValue(props, key), (value) => {
			handleValue(value, key, store);
		});
	});
}
function handleValue(value, propsKey, store) {
	let newVal = value;
	let storeKey = InitialStateMap[propsKey];
	if (isObject(storeKey)) {
		newVal = newVal || storeKey.default;
		storeKey = storeKey.key;
	}
	store.states[storeKey].value = newVal;
}
function getArrKeysValue(props, key) {
	if (key.includes(".")) {
		const keyList = key.split(".");
		let value = props;
		keyList.forEach((k) => {
			value = value[k];
		});
		return value;
	} else return props[key];
}

//#endregion
export { createStore };
//# sourceMappingURL=helper.mjs.map
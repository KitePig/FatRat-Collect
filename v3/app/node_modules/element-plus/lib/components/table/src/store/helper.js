Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('./index.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

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
	const store = require_index.default();
	store.toggleAllSelection = (0, lodash_unified.debounce)(store._toggleAllSelection, 10);
	Object.keys(InitialStateMap).forEach((key) => {
		handleValue(getArrKeysValue(props, key), key, store);
	});
	proxyTableProps(store, props);
	return store;
}
function proxyTableProps(store, props) {
	Object.keys(InitialStateMap).forEach((key) => {
		(0, vue.watch)(() => getArrKeysValue(props, key), (value) => {
			handleValue(value, key, store);
		});
	});
}
function handleValue(value, propsKey, store) {
	let newVal = value;
	let storeKey = InitialStateMap[propsKey];
	if ((0, _vue_shared.isObject)(storeKey)) {
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
exports.createStore = createStore;
//# sourceMappingURL=helper.js.map
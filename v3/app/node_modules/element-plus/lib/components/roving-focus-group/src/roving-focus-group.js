Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_collection = require('../../collection/src/collection.js');

//#region ../../packages/components/roving-focus-group/src/roving-focus-group.ts
const rovingFocusGroupProps = require_runtime.buildProps({
	style: { type: require_runtime.definePropType([
		String,
		Array,
		Object
	]) },
	currentTabId: { type: require_runtime.definePropType(String) },
	defaultCurrentTabId: String,
	loop: Boolean,
	dir: {
		type: String,
		values: ["ltr", "rtl"],
		default: "ltr"
	},
	orientation: { type: require_runtime.definePropType(String) },
	onBlur: Function,
	onFocus: Function,
	onMousedown: Function
});
const { ElCollection, ElCollectionItem, COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY } = require_collection.createCollectionWithScope("RovingFocusGroup");

//#endregion
exports.ElCollection = ElCollection;
exports.ElCollectionItem = ElCollectionItem;
exports.ROVING_FOCUS_COLLECTION_INJECTION_KEY = COLLECTION_INJECTION_KEY;
exports.ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY = COLLECTION_ITEM_INJECTION_KEY;
exports.rovingFocusGroupProps = rovingFocusGroupProps;
//# sourceMappingURL=roving-focus-group.js.map
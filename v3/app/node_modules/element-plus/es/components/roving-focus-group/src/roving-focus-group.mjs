import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { createCollectionWithScope } from "../../collection/src/collection.mjs";

//#region ../../packages/components/roving-focus-group/src/roving-focus-group.ts
const rovingFocusGroupProps = buildProps({
	style: { type: definePropType([
		String,
		Array,
		Object
	]) },
	currentTabId: { type: definePropType(String) },
	defaultCurrentTabId: String,
	loop: Boolean,
	dir: {
		type: String,
		values: ["ltr", "rtl"],
		default: "ltr"
	},
	orientation: { type: definePropType(String) },
	onBlur: Function,
	onFocus: Function,
	onMousedown: Function
});
const { ElCollection, ElCollectionItem, COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY } = createCollectionWithScope("RovingFocusGroup");

//#endregion
export { ElCollection, ElCollectionItem, COLLECTION_INJECTION_KEY as ROVING_FOCUS_COLLECTION_INJECTION_KEY, COLLECTION_ITEM_INJECTION_KEY as ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY, rovingFocusGroupProps };
//# sourceMappingURL=roving-focus-group.mjs.map
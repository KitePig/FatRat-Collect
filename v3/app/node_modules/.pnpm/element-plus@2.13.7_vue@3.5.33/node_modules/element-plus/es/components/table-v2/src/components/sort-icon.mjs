import { ElIcon } from "../../../icon/index.mjs";
import { SortOrder } from "../constants.mjs";
import { SortDown, SortUp } from "@element-plus/icons-vue";
import { createVNode } from "vue";

//#region ../../packages/components/table-v2/src/components/sort-icon.tsx
const SortIcon = (props) => {
	const { sortOrder } = props;
	return createVNode("button", {
		"type": "button",
		"aria-label": props.ariaLabel,
		"class": props.class
	}, [createVNode(ElIcon, { "size": 14 }, { default: () => [sortOrder === SortOrder.ASC ? createVNode(SortUp, null, null) : createVNode(SortDown, null, null)] })]);
};

//#endregion
export { SortIcon as default };
//# sourceMappingURL=sort-icon.mjs.map
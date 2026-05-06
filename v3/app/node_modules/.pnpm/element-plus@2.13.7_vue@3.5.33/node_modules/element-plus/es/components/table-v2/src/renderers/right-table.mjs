import TableGrid from "../table-grid.mjs";
import { createVNode, isVNode, mergeProps } from "vue";

//#region ../../packages/components/table-v2/src/renderers/right-table.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const RightTable = (props, { slots }) => {
	if (!props.columns.length) return;
	const { rightTableRef, ...rest } = props;
	return createVNode(TableGrid, mergeProps({ "ref": rightTableRef }, rest), _isSlot(slots) ? slots : { default: () => [slots] });
};

//#endregion
export { RightTable as default };
//# sourceMappingURL=right-table.mjs.map
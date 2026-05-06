import TableGrid from "../table-grid.mjs";
import { createVNode, isVNode, mergeProps } from "vue";

//#region ../../packages/components/table-v2/src/renderers/left-table.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const LeftTable = (props, { slots }) => {
	if (!props.columns.length) return;
	const { leftTableRef, ...rest } = props;
	return createVNode(TableGrid, mergeProps({ "ref": leftTableRef }, rest), _isSlot(slots) ? slots : { default: () => [slots] });
};

//#endregion
export { LeftTable as default };
//# sourceMappingURL=left-table.mjs.map
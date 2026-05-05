import TableGrid from "../table-grid.mjs";
import { createVNode, isVNode, mergeProps } from "vue";

//#region ../../packages/components/table-v2/src/renderers/main-table.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const MainTable = (props, { slots }) => {
	const { mainTableRef, ...rest } = props;
	return createVNode(TableGrid, mergeProps({ "ref": mainTableRef }, rest), _isSlot(slots) ? slots : { default: () => [slots] });
};

//#endregion
export { MainTable as default };
//# sourceMappingURL=main-table.mjs.map
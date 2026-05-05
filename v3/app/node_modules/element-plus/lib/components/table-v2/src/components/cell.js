const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/components/cell.tsx
const TableV2Cell = (props, { slots }) => {
	const { cellData, style } = props;
	const displayText = cellData?.toString?.() || "";
	const defaultSlot = (0, vue.renderSlot)(slots, "default", props, () => [displayText]);
	return (0, vue.createVNode)("div", {
		"class": props.class,
		"title": displayText,
		"style": style
	}, [defaultSlot]);
};
TableV2Cell.displayName = "ElTableV2Cell";
TableV2Cell.inheritAttrs = false;

//#endregion
exports.default = TableV2Cell;
//# sourceMappingURL=cell.js.map
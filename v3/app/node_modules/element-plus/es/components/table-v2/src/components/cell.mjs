import { createVNode, renderSlot } from "vue";

//#region ../../packages/components/table-v2/src/components/cell.tsx
const TableV2Cell = (props, { slots }) => {
	const { cellData, style } = props;
	const displayText = cellData?.toString?.() || "";
	const defaultSlot = renderSlot(slots, "default", props, () => [displayText]);
	return createVNode("div", {
		"class": props.class,
		"title": displayText,
		"style": style
	}, [defaultSlot]);
};
TableV2Cell.displayName = "ElTableV2Cell";
TableV2Cell.inheritAttrs = false;

//#endregion
export { TableV2Cell as default };
//# sourceMappingURL=cell.mjs.map
import { createVNode, renderSlot } from "vue";

//#region ../../packages/components/table-v2/src/components/header-cell.tsx
const HeaderCell = (props, { slots }) => renderSlot(slots, "default", props, () => [createVNode("div", {
	"class": props.class,
	"title": props.column?.title
}, [props.column?.title])]);
HeaderCell.displayName = "ElTableV2HeaderCell";
HeaderCell.inheritAttrs = false;

//#endregion
export { HeaderCell as default };
//# sourceMappingURL=header-cell.mjs.map
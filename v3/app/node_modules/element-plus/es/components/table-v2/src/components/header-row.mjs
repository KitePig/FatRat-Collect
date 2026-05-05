import { isArray } from "../../../../utils/types.mjs";
import { tableV2HeaderRowProps } from "../header-row.mjs";
import { createVNode, defineComponent } from "vue";

//#region ../../packages/components/table-v2/src/components/header-row.tsx
const TableV2HeaderRow = /* @__PURE__ */ defineComponent({
	name: "ElTableV2HeaderRow",
	props: tableV2HeaderRowProps,
	setup(props, { slots }) {
		return () => {
			const { columns, columnsStyles, headerIndex, style } = props;
			let Cells = columns.map((column, columnIndex) => {
				return slots.cell({
					columns,
					column,
					columnIndex,
					headerIndex,
					style: columnsStyles[column.key]
				});
			});
			if (slots.header) Cells = slots.header({
				cells: Cells.map((node) => {
					if (isArray(node) && node.length === 1) return node[0];
					return node;
				}),
				columns,
				headerIndex
			});
			return createVNode("div", {
				"class": props.class,
				"style": style,
				"role": "row"
			}, [Cells]);
		};
	}
});

//#endregion
export { TableV2HeaderRow as default };
//# sourceMappingURL=header-row.mjs.map
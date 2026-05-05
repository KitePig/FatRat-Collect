const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_header_row = require('../header-row.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table-v2/src/components/header-row.tsx
const TableV2HeaderRow = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTableV2HeaderRow",
	props: require_header_row.tableV2HeaderRowProps,
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
					if ((0, _vue_shared.isArray)(node) && node.length === 1) return node[0];
					return node;
				}),
				columns,
				headerIndex
			});
			return (0, vue.createVNode)("div", {
				"class": props.class,
				"style": style,
				"role": "row"
			}, [Cells]);
		};
	}
});

//#endregion
exports.default = TableV2HeaderRow;
//# sourceMappingURL=header-row.js.map
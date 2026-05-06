import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/row/src/row.ts
const RowJustify = [
	"start",
	"center",
	"end",
	"space-around",
	"space-between",
	"space-evenly"
];
const RowAlign = [
	"top",
	"middle",
	"bottom"
];
/**
* @deprecated Removed after 3.0.0, Use `RowProps` instead.
*/
const rowProps = buildProps({
	tag: {
		type: String,
		default: "div"
	},
	gutter: {
		type: Number,
		default: 0
	},
	justify: {
		type: String,
		values: RowJustify,
		default: "start"
	},
	align: {
		type: String,
		values: RowAlign
	}
});

//#endregion
export { RowAlign, RowJustify, rowProps };
//# sourceMappingURL=row.mjs.map
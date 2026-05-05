Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

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
const rowProps = require_runtime.buildProps({
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
exports.RowAlign = RowAlign;
exports.RowJustify = RowJustify;
exports.rowProps = rowProps;
//# sourceMappingURL=row.js.map
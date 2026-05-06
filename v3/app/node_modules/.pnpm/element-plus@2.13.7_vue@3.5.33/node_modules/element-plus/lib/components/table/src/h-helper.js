Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
let vue = require("vue");

//#region ../../packages/components/table/src/h-helper.ts
function hColgroup(props) {
	const isAuto = props.tableLayout === "auto";
	let columns = props.columns || [];
	if (isAuto) {
		if (columns.every(({ width }) => require_types.isUndefined(width))) columns = [];
	}
	const getPropsData = (column) => {
		const propsData = {
			key: `${props.tableLayout}_${column.id}`,
			style: {},
			name: void 0
		};
		if (isAuto) propsData.style = { width: `${column.width}px` };
		else propsData.name = column.id;
		return propsData;
	};
	return (0, vue.h)("colgroup", {}, columns.map((column) => (0, vue.h)("col", getPropsData(column))));
}
hColgroup.props = ["columns", "tableLayout"];

//#endregion
exports.hColgroup = hColgroup;
//# sourceMappingURL=h-helper.js.map
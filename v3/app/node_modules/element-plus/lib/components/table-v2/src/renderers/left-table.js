const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_table_grid = require('../table-grid.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/renderers/left-table.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
const LeftTable = (props, { slots }) => {
	if (!props.columns.length) return;
	const { leftTableRef, ...rest } = props;
	return (0, vue.createVNode)(require_table_grid.default, (0, vue.mergeProps)({ "ref": leftTableRef }, rest), _isSlot(slots) ? slots : { default: () => [slots] });
};

//#endregion
exports.default = LeftTable;
//# sourceMappingURL=left-table.js.map
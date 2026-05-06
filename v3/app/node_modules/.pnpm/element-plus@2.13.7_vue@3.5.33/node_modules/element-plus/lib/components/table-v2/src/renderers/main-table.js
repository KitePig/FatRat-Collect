const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_table_grid = require('../table-grid.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/renderers/main-table.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
const MainTable = (props, { slots }) => {
	const { mainTableRef, ...rest } = props;
	return (0, vue.createVNode)(require_table_grid.default, (0, vue.mergeProps)({ "ref": mainTableRef }, rest), _isSlot(slots) ? slots : { default: () => [slots] });
};

//#endregion
exports.default = MainTable;
//# sourceMappingURL=main-table.js.map
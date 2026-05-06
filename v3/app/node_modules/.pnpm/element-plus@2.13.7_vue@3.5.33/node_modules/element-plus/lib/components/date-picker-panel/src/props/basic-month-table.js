Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('./shared.js');

//#region ../../packages/components/date-picker-panel/src/props/basic-month-table.ts
const basicMonthTableProps = require_runtime.buildProps({
	...require_shared.datePickerSharedProps,
	selectionMode: require_shared.selectionModeWithDefault("month")
});

//#endregion
exports.basicMonthTableProps = basicMonthTableProps;
//# sourceMappingURL=basic-month-table.js.map
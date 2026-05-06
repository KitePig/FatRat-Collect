Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('./shared.js');

//#region ../../packages/components/date-picker-panel/src/props/basic-year-table.ts
const basicYearTableProps = require_runtime.buildProps({
	...require_shared.datePickerSharedProps,
	selectionMode: require_shared.selectionModeWithDefault("year")
});

//#endregion
exports.basicYearTableProps = basicYearTableProps;
//# sourceMappingURL=basic-year-table.js.map
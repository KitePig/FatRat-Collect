Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('./shared.js');

//#region ../../packages/components/date-picker-panel/src/props/basic-date-table.ts
const basicDateTableProps = require_runtime.buildProps({
	...require_shared.datePickerSharedProps,
	showWeekNumber: Boolean,
	selectionMode: require_shared.selectionModeWithDefault("date")
});
const basicDateTableEmits = [
	"changerange",
	"pick",
	"select"
];

//#endregion
exports.basicDateTableEmits = basicDateTableEmits;
exports.basicDateTableProps = basicDateTableProps;
//# sourceMappingURL=basic-date-table.js.map
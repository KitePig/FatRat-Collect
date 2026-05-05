Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('./shared.js');

//#region ../../packages/components/date-picker-panel/src/props/panel-month-range.ts
const panelMonthRangeProps = require_runtime.buildProps({ ...require_shared.panelRangeSharedProps });
const panelMonthRangeEmits = [
	"pick",
	"set-picker-option",
	"calendar-change"
];

//#endregion
exports.panelMonthRangeEmits = panelMonthRangeEmits;
exports.panelMonthRangeProps = panelMonthRangeProps;
//# sourceMappingURL=panel-month-range.js.map
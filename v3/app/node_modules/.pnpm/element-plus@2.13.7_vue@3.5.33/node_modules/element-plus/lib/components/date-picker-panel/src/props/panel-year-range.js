Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('./shared.js');

//#region ../../packages/components/date-picker-panel/src/props/panel-year-range.ts
const panelYearRangeProps = require_runtime.buildProps({ ...require_shared.panelRangeSharedProps });
const panelYearRangeEmits = [
	"pick",
	"set-picker-option",
	"calendar-change"
];

//#endregion
exports.panelYearRangeEmits = panelYearRangeEmits;
exports.panelYearRangeProps = panelYearRangeProps;
//# sourceMappingURL=panel-year-range.js.map
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_panel_date_pick = require('./date-picker-com/panel-date-pick.js');
const require_panel_date_range = require('./date-picker-com/panel-date-range.js');
const require_panel_month_range = require('./date-picker-com/panel-month-range.js');
const require_panel_year_range = require('./date-picker-com/panel-year-range.js');

//#region ../../packages/components/date-picker-panel/src/panel-utils.ts
const getPanel = function(type) {
	switch (type) {
		case "daterange":
		case "datetimerange": return require_panel_date_range.default;
		case "monthrange": return require_panel_month_range.default;
		case "yearrange": return require_panel_year_range.default;
		default: return require_panel_date_pick.default;
	}
};

//#endregion
exports.getPanel = getPanel;
//# sourceMappingURL=panel-utils.js.map
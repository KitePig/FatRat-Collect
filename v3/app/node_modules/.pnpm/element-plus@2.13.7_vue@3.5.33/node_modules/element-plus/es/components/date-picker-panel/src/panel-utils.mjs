import panel_date_pick_default from "./date-picker-com/panel-date-pick.mjs";
import panel_date_range_default from "./date-picker-com/panel-date-range.mjs";
import panel_month_range_default from "./date-picker-com/panel-month-range.mjs";
import panel_year_range_default from "./date-picker-com/panel-year-range.mjs";

//#region ../../packages/components/date-picker-panel/src/panel-utils.ts
const getPanel = function(type) {
	switch (type) {
		case "daterange":
		case "datetimerange": return panel_date_range_default;
		case "monthrange": return panel_month_range_default;
		case "yearrange": return panel_year_range_default;
		default: return panel_date_pick_default;
	}
};

//#endregion
export { getPanel };
//# sourceMappingURL=panel-utils.mjs.map
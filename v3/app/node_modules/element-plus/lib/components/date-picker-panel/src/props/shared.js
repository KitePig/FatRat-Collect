Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_date = require('../../../../constants/date.js');
const require_runtime$1 = require('../../../../utils/vue/props/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/date-picker-panel/src/props/shared.ts
const selectionModes = [
	"date",
	"dates",
	"year",
	"years",
	"month",
	"months",
	"week",
	"range"
];
const datePickerSharedProps = require_runtime$1.buildProps({
	cellClassName: { type: require_runtime$1.definePropType(Function) },
	disabledDate: { type: require_runtime$1.definePropType(Function) },
	date: {
		type: require_runtime$1.definePropType(Object),
		required: true
	},
	minDate: { type: require_runtime$1.definePropType(Object) },
	maxDate: { type: require_runtime$1.definePropType(Object) },
	parsedValue: { type: require_runtime$1.definePropType([Object, Array]) },
	rangeState: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({
			endDate: null,
			selecting: false
		})
	},
	disabled: Boolean
});
const panelSharedProps = require_runtime$1.buildProps({
	type: {
		type: require_runtime$1.definePropType(String),
		required: true,
		values: require_date.datePickTypes
	},
	dateFormat: String,
	timeFormat: String,
	showNow: {
		type: Boolean,
		default: true
	},
	showConfirm: Boolean,
	showFooter: {
		type: Boolean,
		default: true
	},
	showWeekNumber: Boolean,
	border: Boolean,
	disabled: Boolean,
	editable: {
		type: Boolean,
		default: true
	}
});
const panelRangeSharedProps = require_runtime$1.buildProps({
	unlinkPanels: Boolean,
	visible: {
		type: Boolean,
		default: true
	},
	showConfirm: Boolean,
	showFooter: {
		type: Boolean,
		default: true
	},
	border: Boolean,
	disabled: Boolean,
	parsedValue: { type: require_runtime$1.definePropType(Array) }
});
const selectionModeWithDefault = (mode) => {
	return {
		type: String,
		values: selectionModes,
		default: mode
	};
};
const rangePickerSharedEmits = { pick: (range) => (0, _vue_shared.isArray)(range) };

//#endregion
exports.datePickerSharedProps = datePickerSharedProps;
exports.panelRangeSharedProps = panelRangeSharedProps;
exports.panelSharedProps = panelSharedProps;
exports.rangePickerSharedEmits = rangePickerSharedEmits;
exports.selectionModeWithDefault = selectionModeWithDefault;
//# sourceMappingURL=shared.js.map
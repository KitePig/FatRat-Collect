Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('../../../time-picker/src/props/shared.js');

//#region ../../packages/components/date-picker-panel/src/props/date-picker-panel.ts
const datePickerPanelProps = require_runtime.buildProps({
	valueFormat: String,
	dateFormat: String,
	timeFormat: String,
	disabled: {
		type: Boolean,
		default: void 0
	},
	modelValue: {
		type: require_runtime.definePropType([
			Date,
			Array,
			String,
			Number
		]),
		default: ""
	},
	defaultValue: { type: require_runtime.definePropType([Date, Array]) },
	defaultTime: { type: require_runtime.definePropType([Date, Array]) },
	isRange: Boolean,
	...require_shared.disabledTimeListsProps,
	disabledDate: { type: Function },
	cellClassName: { type: Function },
	shortcuts: {
		type: Array,
		default: () => []
	},
	arrowControl: Boolean,
	unlinkPanels: Boolean,
	showNow: {
		type: Boolean,
		default: true
	},
	showConfirm: Boolean,
	showFooter: Boolean,
	showWeekNumber: Boolean,
	type: {
		type: require_runtime.definePropType(String),
		default: "date"
	},
	clearable: {
		type: Boolean,
		default: true
	},
	border: {
		type: Boolean,
		default: true
	},
	editable: {
		type: Boolean,
		default: true
	}
});

//#endregion
exports.datePickerPanelProps = datePickerPanelProps;
//# sourceMappingURL=date-picker-panel.js.map
import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";
import { disabledTimeListsProps } from "../../../time-picker/src/props/shared.mjs";

//#region ../../packages/components/date-picker-panel/src/props/date-picker-panel.ts
const datePickerPanelProps = buildProps({
	valueFormat: String,
	dateFormat: String,
	timeFormat: String,
	disabled: {
		type: Boolean,
		default: void 0
	},
	modelValue: {
		type: definePropType([
			Date,
			Array,
			String,
			Number
		]),
		default: ""
	},
	defaultValue: { type: definePropType([Date, Array]) },
	defaultTime: { type: definePropType([Date, Array]) },
	isRange: Boolean,
	...disabledTimeListsProps,
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
		type: definePropType(String),
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
export { datePickerPanelProps };
//# sourceMappingURL=date-picker-panel.mjs.map
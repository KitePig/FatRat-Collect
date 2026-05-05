import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";
import { disabledTimeListsProps } from "./shared.mjs";

//#region ../../packages/components/time-picker/src/props/basic-time-spinner.ts
const basicTimeSpinnerProps = buildProps({
	role: {
		type: String,
		required: true
	},
	spinnerDate: {
		type: definePropType(Object),
		required: true
	},
	showSeconds: {
		type: Boolean,
		default: true
	},
	arrowControl: Boolean,
	amPmMode: {
		type: definePropType(String),
		default: ""
	},
	...disabledTimeListsProps
});

//#endregion
export { basicTimeSpinnerProps };
//# sourceMappingURL=basic-time-spinner.mjs.map
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { timePickerDefaultProps } from "../../time-picker/src/common/props.mjs";

//#region ../../packages/components/date-picker/src/props.ts
const datePickerProps = buildProps({
	...timePickerDefaultProps,
	type: {
		type: definePropType(String),
		default: "date"
	}
});

//#endregion
export { datePickerProps };
//# sourceMappingURL=props.mjs.map
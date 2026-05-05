import { definePropType } from "./props/runtime.mjs";
import { CircleCheck, CircleClose, CircleCloseFilled, Close, InfoFilled, Loading, SuccessFilled, WarningFilled } from "@element-plus/icons-vue";

//#region ../../packages/utils/vue/icon.ts
const iconPropType = definePropType([
	String,
	Object,
	Function
]);
const CloseComponents = { Close };
const TypeComponents = {
	Close,
	SuccessFilled,
	InfoFilled,
	WarningFilled,
	CircleCloseFilled
};
const TypeComponentsMap = {
	primary: InfoFilled,
	success: SuccessFilled,
	warning: WarningFilled,
	error: CircleCloseFilled,
	info: InfoFilled
};
const ValidateComponentsMap = {
	validating: Loading,
	success: CircleCheck,
	error: CircleClose
};

//#endregion
export { CloseComponents, TypeComponents, TypeComponentsMap, ValidateComponentsMap, iconPropType };
//# sourceMappingURL=icon.mjs.map
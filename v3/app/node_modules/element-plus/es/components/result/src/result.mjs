import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { CircleCheckFilled, CircleCloseFilled, InfoFilled, WarningFilled } from "@element-plus/icons-vue";

//#region ../../packages/components/result/src/result.ts
const IconMap = {
	primary: "icon-primary",
	success: "icon-success",
	warning: "icon-warning",
	error: "icon-error",
	info: "icon-info"
};
const IconComponentMap = {
	[IconMap.primary]: InfoFilled,
	[IconMap.success]: CircleCheckFilled,
	[IconMap.warning]: WarningFilled,
	[IconMap.error]: CircleCloseFilled,
	[IconMap.info]: InfoFilled
};
/**
* @deprecated Removed after 3.0.0, Use `ResultProps` instead.
*/
const resultProps = buildProps({
	title: {
		type: String,
		default: ""
	},
	subTitle: {
		type: String,
		default: ""
	},
	icon: {
		type: String,
		values: [
			"primary",
			"success",
			"warning",
			"info",
			"error"
		],
		default: "info"
	}
});

//#endregion
export { IconComponentMap, IconMap, resultProps };
//# sourceMappingURL=result.mjs.map
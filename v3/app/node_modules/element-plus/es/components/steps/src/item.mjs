import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";

//#region ../../packages/components/steps/src/item.ts
/**
* @deprecated Removed after 3.0.0, Use `StepProps` instead.
*/
const stepProps = buildProps({
	title: {
		type: String,
		default: ""
	},
	icon: { type: iconPropType },
	description: {
		type: String,
		default: ""
	},
	status: {
		type: String,
		values: [
			"",
			"wait",
			"process",
			"finish",
			"error",
			"success"
		],
		default: ""
	}
});

//#endregion
export { stepProps };
//# sourceMappingURL=item.mjs.map
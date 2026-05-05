import { CHANGE_EVENT } from "../../../constants/event.mjs";
import { isBoolean } from "../../../utils/types.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/check-tag/src/check-tag.ts
/**
* @deprecated Removed after 3.0.0, Use `CheckTagProps` instead.
*/
const checkTagProps = buildProps({
	checked: Boolean,
	disabled: Boolean,
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"info",
			"warning",
			"danger"
		],
		default: "primary"
	}
});
const checkTagEmits = {
	"update:checked": (value) => isBoolean(value),
	[CHANGE_EVENT]: (value) => isBoolean(value)
};

//#endregion
export { checkTagEmits, checkTagProps };
//# sourceMappingURL=check-tag.mjs.map
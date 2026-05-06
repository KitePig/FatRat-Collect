import { componentSizes } from "../../../constants/size.mjs";
import { isArray, isBoolean, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/form/src/form.ts
/**
* @deprecated Removed after 3.0.0, Use `FormMetaProps` instead.
*/
const formMetaProps = buildProps({
	size: {
		type: String,
		values: componentSizes
	},
	disabled: Boolean
});
/**
* @deprecated Removed after 3.0.0, Use `FormProps` instead.
*/
const formProps = buildProps({
	...formMetaProps,
	model: Object,
	rules: { type: definePropType(Object) },
	labelPosition: {
		type: String,
		values: [
			"left",
			"right",
			"top"
		],
		default: "right"
	},
	requireAsteriskPosition: {
		type: String,
		values: ["left", "right"],
		default: "left"
	},
	labelWidth: {
		type: [String, Number],
		default: ""
	},
	labelSuffix: {
		type: String,
		default: ""
	},
	inline: Boolean,
	inlineMessage: Boolean,
	statusIcon: Boolean,
	showMessage: {
		type: Boolean,
		default: true
	},
	validateOnRuleChange: {
		type: Boolean,
		default: true
	},
	hideRequiredAsterisk: Boolean,
	scrollToError: Boolean,
	scrollIntoViewOptions: {
		type: definePropType([Object, Boolean]),
		default: true
	}
});
const formEmits = { validate: (prop, isValid, message) => (isArray(prop) || isString(prop)) && isBoolean(isValid) && isString(message) };

//#endregion
export { formEmits, formMetaProps, formProps };
//# sourceMappingURL=form.mjs.map
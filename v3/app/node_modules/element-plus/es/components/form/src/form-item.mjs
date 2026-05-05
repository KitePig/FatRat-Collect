import { componentSizes } from "../../../constants/size.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/form/src/form-item.ts
const formItemValidateStates = [
	"",
	"error",
	"validating",
	"success"
];
/**
* @deprecated Removed after 3.0.0, Use `FormItemProps` instead.
*/
const formItemProps = buildProps({
	label: String,
	labelWidth: { type: [String, Number] },
	labelPosition: {
		type: String,
		values: [
			"left",
			"right",
			"top",
			""
		],
		default: ""
	},
	prop: { type: definePropType([String, Array]) },
	required: {
		type: Boolean,
		default: void 0
	},
	rules: { type: definePropType([Object, Array]) },
	error: String,
	validateStatus: {
		type: String,
		values: formItemValidateStates
	},
	for: String,
	inlineMessage: {
		type: Boolean,
		default: void 0
	},
	showMessage: {
		type: Boolean,
		default: true
	},
	size: {
		type: String,
		values: componentSizes
	}
});

//#endregion
export { formItemProps, formItemValidateStates };
//# sourceMappingURL=form-item.mjs.map
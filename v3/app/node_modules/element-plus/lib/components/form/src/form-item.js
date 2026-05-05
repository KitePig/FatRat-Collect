Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_size = require('../../../constants/size.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');

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
const formItemProps = require_runtime.buildProps({
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
	prop: { type: require_runtime.definePropType([String, Array]) },
	required: {
		type: Boolean,
		default: void 0
	},
	rules: { type: require_runtime.definePropType([Object, Array]) },
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
		values: require_size.componentSizes
	}
});

//#endregion
exports.formItemProps = formItemProps;
exports.formItemValidateStates = formItemValidateStates;
//# sourceMappingURL=form-item.js.map
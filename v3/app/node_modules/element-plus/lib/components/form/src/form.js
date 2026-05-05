Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_size = require('../../../constants/size.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/form/src/form.ts
/**
* @deprecated Removed after 3.0.0, Use `FormMetaProps` instead.
*/
const formMetaProps = require_runtime$1.buildProps({
	size: {
		type: String,
		values: require_size.componentSizes
	},
	disabled: Boolean
});
/**
* @deprecated Removed after 3.0.0, Use `FormProps` instead.
*/
const formProps = require_runtime$1.buildProps({
	...formMetaProps,
	model: Object,
	rules: { type: require_runtime$1.definePropType(Object) },
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
		type: require_runtime$1.definePropType([Object, Boolean]),
		default: true
	}
});
const formEmits = { validate: (prop, isValid, message) => ((0, _vue_shared.isArray)(prop) || (0, _vue_shared.isString)(prop)) && require_types.isBoolean(isValid) && (0, _vue_shared.isString)(message) };

//#endregion
exports.formEmits = formEmits;
exports.formMetaProps = formMetaProps;
exports.formProps = formProps;
//# sourceMappingURL=form.js.map
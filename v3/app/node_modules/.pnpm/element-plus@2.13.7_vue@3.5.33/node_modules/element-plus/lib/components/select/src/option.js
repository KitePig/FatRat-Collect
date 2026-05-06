Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/select/src/option.ts
const COMPONENT_NAME = "ElOption";
const optionProps = require_runtime.buildProps({
	value: {
		type: [
			String,
			Number,
			Boolean,
			Object
		],
		required: true
	},
	label: { type: [String, Number] },
	created: Boolean,
	disabled: Boolean
});

//#endregion
exports.COMPONENT_NAME = COMPONENT_NAME;
exports.optionProps = optionProps;
//# sourceMappingURL=option.js.map
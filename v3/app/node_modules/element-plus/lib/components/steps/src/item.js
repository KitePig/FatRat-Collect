Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');

//#region ../../packages/components/steps/src/item.ts
/**
* @deprecated Removed after 3.0.0, Use `StepProps` instead.
*/
const stepProps = require_runtime.buildProps({
	title: {
		type: String,
		default: ""
	},
	icon: { type: require_icon.iconPropType },
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
exports.stepProps = stepProps;
//# sourceMappingURL=item.js.map
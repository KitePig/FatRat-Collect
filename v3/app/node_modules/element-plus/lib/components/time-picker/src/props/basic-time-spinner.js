Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('./shared.js');

//#region ../../packages/components/time-picker/src/props/basic-time-spinner.ts
const basicTimeSpinnerProps = require_runtime.buildProps({
	role: {
		type: String,
		required: true
	},
	spinnerDate: {
		type: require_runtime.definePropType(Object),
		required: true
	},
	showSeconds: {
		type: Boolean,
		default: true
	},
	arrowControl: Boolean,
	amPmMode: {
		type: require_runtime.definePropType(String),
		default: ""
	},
	...require_shared.disabledTimeListsProps
});

//#endregion
exports.basicTimeSpinnerProps = basicTimeSpinnerProps;
//# sourceMappingURL=basic-time-spinner.js.map
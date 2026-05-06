Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_props = require('../../time-picker/src/common/props.js');

//#region ../../packages/components/date-picker/src/props.ts
const datePickerProps = require_runtime.buildProps({
	...require_props.timePickerDefaultProps,
	type: {
		type: require_runtime.definePropType(String),
		default: "date"
	}
});

//#endregion
exports.datePickerProps = datePickerProps;
//# sourceMappingURL=props.js.map
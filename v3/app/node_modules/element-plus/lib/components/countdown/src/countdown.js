Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/countdown/src/countdown.ts
/**
* @deprecated Removed after 3.0.0, Use `CountdownProps` instead.
*/
const countdownProps = require_runtime.buildProps({
	format: {
		type: String,
		default: "HH:mm:ss"
	},
	prefix: String,
	suffix: String,
	title: String,
	value: {
		type: require_runtime.definePropType([Number, Object]),
		default: 0
	},
	valueStyle: { type: require_runtime.definePropType([
		String,
		Object,
		Array
	]) }
});
const countdownEmits = {
	finish: () => true,
	[require_event.CHANGE_EVENT]: (value) => require_types.isNumber(value)
};

//#endregion
exports.countdownEmits = countdownEmits;
exports.countdownProps = countdownProps;
//# sourceMappingURL=countdown.js.map
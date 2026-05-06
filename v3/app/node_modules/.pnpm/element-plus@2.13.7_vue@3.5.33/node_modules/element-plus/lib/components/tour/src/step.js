Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_content = require('./content.js');

//#region ../../packages/components/tour/src/step.ts
/**
* @deprecated Removed after 3.0.0, Use `TourStepProps` instead.
*/
const tourStepProps = require_runtime.buildProps({
	target: { type: require_runtime.definePropType([
		String,
		Object,
		Function
	]) },
	title: String,
	description: String,
	showClose: {
		type: Boolean,
		default: void 0
	},
	closeIcon: { type: require_icon.iconPropType },
	showArrow: {
		type: Boolean,
		default: void 0
	},
	placement: require_content.tourContentProps.placement,
	mask: {
		type: require_runtime.definePropType([Boolean, Object]),
		default: void 0
	},
	contentStyle: { type: require_runtime.definePropType([Object]) },
	prevButtonProps: { type: require_runtime.definePropType(Object) },
	nextButtonProps: { type: require_runtime.definePropType(Object) },
	scrollIntoViewOptions: {
		type: require_runtime.definePropType([Boolean, Object]),
		default: void 0
	},
	type: { type: require_runtime.definePropType(String) }
});
const tourStepEmits = { close: () => true };

//#endregion
exports.tourStepEmits = tourStepEmits;
exports.tourStepProps = tourStepProps;
//# sourceMappingURL=step.js.map
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_teleport = require('../../teleport/src/teleport.js');
const require_content = require('./content.js');

//#region ../../packages/components/tour/src/tour.ts
/**
* @deprecated Removed after 3.0.0, Use `TourProps` instead.
*/
const tourProps = require_runtime.buildProps({
	modelValue: Boolean,
	current: {
		type: Number,
		default: 0
	},
	showArrow: {
		type: Boolean,
		default: true
	},
	showClose: {
		type: Boolean,
		default: true
	},
	closeIcon: { type: require_icon.iconPropType },
	placement: require_content.tourContentProps.placement,
	contentStyle: { type: require_runtime.definePropType([Object]) },
	mask: {
		type: require_runtime.definePropType([Boolean, Object]),
		default: true
	},
	gap: {
		type: require_runtime.definePropType(Object),
		default: () => ({
			offset: 6,
			radius: 2
		})
	},
	zIndex: { type: Number },
	scrollIntoViewOptions: {
		type: require_runtime.definePropType([Boolean, Object]),
		default: () => ({ block: "center" })
	},
	type: { type: require_runtime.definePropType(String) },
	appendTo: {
		type: require_teleport.teleportProps.to.type,
		default: "body"
	},
	closeOnPressEscape: {
		type: Boolean,
		default: true
	},
	targetAreaClickable: {
		type: Boolean,
		default: true
	}
});
const tourEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => require_types.isBoolean(value),
	["update:current"]: (current) => require_types.isNumber(current),
	close: (current) => require_types.isNumber(current),
	finish: () => true,
	change: (current) => require_types.isNumber(current)
};

//#endregion
exports.tourEmits = tourEmits;
exports.tourProps = tourProps;
//# sourceMappingURL=tour.js.map
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');

//#region ../../packages/components/timeline/src/timeline-item.ts
/**
* @deprecated Removed after 3.0.0, Use `TimelineItemProps` instead.
*/
const timelineItemProps = require_runtime.buildProps({
	timestamp: {
		type: String,
		default: ""
	},
	hideTimestamp: Boolean,
	center: Boolean,
	placement: {
		type: String,
		values: ["top", "bottom"],
		default: "bottom"
	},
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"warning",
			"danger",
			"info"
		],
		default: ""
	},
	color: {
		type: String,
		default: ""
	},
	size: {
		type: String,
		values: ["normal", "large"],
		default: "normal"
	},
	icon: { type: require_icon.iconPropType },
	hollow: Boolean
});

//#endregion
exports.timelineItemProps = timelineItemProps;
//# sourceMappingURL=timeline-item.js.map
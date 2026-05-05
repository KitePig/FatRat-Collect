Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/badge/src/badge.ts
/**
* @deprecated Removed after 3.0.0, Use `BadgeProps` instead.
*/
const badgeProps = require_runtime.buildProps({
	value: {
		type: [String, Number],
		default: ""
	},
	max: {
		type: Number,
		default: 99
	},
	isDot: Boolean,
	hidden: Boolean,
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"warning",
			"info",
			"danger"
		],
		default: "danger"
	},
	showZero: {
		type: Boolean,
		default: true
	},
	color: String,
	badgeStyle: { type: require_runtime.definePropType([
		String,
		Object,
		Array
	]) },
	offset: {
		type: require_runtime.definePropType(Array),
		default: () => [0, 0]
	},
	badgeClass: { type: String }
});

//#endregion
exports.badgeProps = badgeProps;
//# sourceMappingURL=badge.js.map
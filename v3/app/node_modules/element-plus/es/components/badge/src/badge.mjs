import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/badge/src/badge.ts
/**
* @deprecated Removed after 3.0.0, Use `BadgeProps` instead.
*/
const badgeProps = buildProps({
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
	badgeStyle: { type: definePropType([
		String,
		Object,
		Array
	]) },
	offset: {
		type: definePropType(Array),
		default: () => [0, 0]
	},
	badgeClass: { type: String }
});

//#endregion
export { badgeProps };
//# sourceMappingURL=badge.mjs.map
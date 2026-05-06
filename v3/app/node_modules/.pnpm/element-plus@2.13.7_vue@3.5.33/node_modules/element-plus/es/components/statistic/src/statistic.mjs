import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/statistic/src/statistic.ts
/**
* @deprecated Removed after 3.0.0, Use `StatisticProps` instead.
*/
const statisticProps = buildProps({
	decimalSeparator: {
		type: String,
		default: "."
	},
	groupSeparator: {
		type: String,
		default: ","
	},
	precision: {
		type: Number,
		default: 0
	},
	formatter: Function,
	value: {
		type: definePropType([Number, Object]),
		default: 0
	},
	prefix: String,
	suffix: String,
	title: String,
	valueStyle: { type: definePropType([
		String,
		Object,
		Array
	]) }
});

//#endregion
export { statisticProps };
//# sourceMappingURL=statistic.mjs.map
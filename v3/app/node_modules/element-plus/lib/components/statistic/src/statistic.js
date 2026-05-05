Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/statistic/src/statistic.ts
/**
* @deprecated Removed after 3.0.0, Use `StatisticProps` instead.
*/
const statisticProps = require_runtime.buildProps({
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
		type: require_runtime.definePropType([Number, Object]),
		default: 0
	},
	prefix: String,
	suffix: String,
	title: String,
	valueStyle: { type: require_runtime.definePropType([
		String,
		Object,
		Array
	]) }
});

//#endregion
exports.statisticProps = statisticProps;
//# sourceMappingURL=statistic.js.map
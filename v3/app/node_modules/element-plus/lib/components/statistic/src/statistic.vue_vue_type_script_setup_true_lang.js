const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_statistic = require('./statistic.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/statistic/src/statistic.vue?vue&type=script&setup=true&lang.ts
var statistic_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElStatistic",
	__name: "statistic",
	props: require_statistic.statisticProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = require_index.useNamespace("statistic");
		const displayValue = (0, vue.computed)(() => {
			const { value, formatter, precision, decimalSeparator, groupSeparator } = props;
			if ((0, _vue_shared.isFunction)(formatter)) return formatter(value);
			if (!require_types.isNumber(value) || Number.isNaN(value)) return value;
			let [integer, decimal = ""] = String(value).split(".");
			decimal = decimal.padEnd(precision, "0").slice(0, precision > 0 ? precision : 0);
			integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
			return [integer, decimal].join(decimal ? decimalSeparator : "");
		});
		__expose({ displayValue });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()) }, [_ctx.$slots.title || __props.title ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("head"))
			}, [(0, vue.renderSlot)(_ctx.$slots, "title", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.title), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")) }, [
				_ctx.$slots.prefix || __props.prefix ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("prefix"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "prefix", {}, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(__props.prefix), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("span", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("number")),
					style: (0, vue.normalizeStyle)(__props.valueStyle)
				}, (0, vue.toDisplayString)(displayValue.value), 7),
				_ctx.$slots.suffix || __props.suffix ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("suffix"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "suffix", {}, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(__props.suffix), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2)], 2);
		};
	}
});

//#endregion
exports.default = statistic_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=statistic.vue_vue_type_script_setup_true_lang.js.map
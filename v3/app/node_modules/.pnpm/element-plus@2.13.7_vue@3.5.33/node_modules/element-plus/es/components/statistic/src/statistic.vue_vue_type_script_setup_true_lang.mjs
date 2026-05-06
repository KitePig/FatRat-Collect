import { isFunction, isNumber } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { statisticProps } from "./statistic.mjs";
import { computed, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, toDisplayString, unref } from "vue";

//#region ../../packages/components/statistic/src/statistic.vue?vue&type=script&setup=true&lang.ts
var statistic_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElStatistic",
	__name: "statistic",
	props: statisticProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = useNamespace("statistic");
		const displayValue = computed(() => {
			const { value, formatter, precision, decimalSeparator, groupSeparator } = props;
			if (isFunction(formatter)) return formatter(value);
			if (!isNumber(value) || Number.isNaN(value)) return value;
			let [integer, decimal = ""] = String(value).split(".");
			decimal = decimal.padEnd(precision, "0").slice(0, precision > 0 ? precision : 0);
			integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
			return [integer, decimal].join(decimal ? decimalSeparator : "");
		});
		__expose({ displayValue });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(ns).b()) }, [_ctx.$slots.title || __props.title ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(ns).e("head"))
			}, [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])], 2)) : createCommentVNode("v-if", true), createElementVNode("div", { class: normalizeClass(unref(ns).e("content")) }, [
				_ctx.$slots.prefix || __props.prefix ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ns).e("prefix"))
				}, [renderSlot(_ctx.$slots, "prefix", {}, () => [createElementVNode("span", null, toDisplayString(__props.prefix), 1)])], 2)) : createCommentVNode("v-if", true),
				createElementVNode("span", {
					class: normalizeClass(unref(ns).e("number")),
					style: normalizeStyle(__props.valueStyle)
				}, toDisplayString(displayValue.value), 7),
				_ctx.$slots.suffix || __props.suffix ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(ns).e("suffix"))
				}, [renderSlot(_ctx.$slots, "suffix", {}, () => [createElementVNode("span", null, toDisplayString(__props.suffix), 1)])], 2)) : createCommentVNode("v-if", true)
			], 2)], 2);
		};
	}
});

//#endregion
export { statistic_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=statistic.vue_vue_type_script_setup_true_lang.mjs.map
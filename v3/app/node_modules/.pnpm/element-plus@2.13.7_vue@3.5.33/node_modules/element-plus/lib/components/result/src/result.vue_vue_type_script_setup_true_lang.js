const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_result = require('./result.js');
let vue = require("vue");

//#region ../../packages/components/result/src/result.vue?vue&type=script&setup=true&lang.ts
var result_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElResult",
	__name: "result",
	props: require_result.resultProps,
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("result");
		const resultIcon = (0, vue.computed)(() => {
			const icon = props.icon;
			const iconClass = icon && require_result.IconMap[icon] ? require_result.IconMap[icon] : "icon-info";
			return {
				class: iconClass,
				component: require_result.IconComponentMap[iconClass] || require_result.IconComponentMap["icon-info"]
			};
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()) }, [
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("icon")) }, [(0, vue.renderSlot)(_ctx.$slots, "icon", {}, () => [resultIcon.value.component ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(resultIcon.value.component), {
					key: 0,
					class: (0, vue.normalizeClass)(resultIcon.value.class)
				}, null, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)])], 2),
				__props.title || _ctx.$slots.title ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "title", {}, () => [(0, vue.createElementVNode)("p", null, (0, vue.toDisplayString)(__props.title), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
				__props.subTitle || _ctx.$slots["sub-title"] ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("subtitle"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "sub-title", {}, () => [(0, vue.createElementVNode)("p", null, (0, vue.toDisplayString)(__props.subTitle), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.$slots.extra ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 2,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("extra"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "extra")], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2);
		};
	}
});

//#endregion
exports.default = result_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=result.vue_vue_type_script_setup_true_lang.js.map
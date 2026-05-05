import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { IconComponentMap, IconMap, resultProps } from "./result.mjs";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, renderSlot, resolveDynamicComponent, toDisplayString, unref } from "vue";

//#region ../../packages/components/result/src/result.vue?vue&type=script&setup=true&lang.ts
var result_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElResult",
	__name: "result",
	props: resultProps,
	setup(__props) {
		const props = __props;
		const ns = useNamespace("result");
		const resultIcon = computed(() => {
			const icon = props.icon;
			const iconClass = icon && IconMap[icon] ? IconMap[icon] : "icon-info";
			return {
				class: iconClass,
				component: IconComponentMap[iconClass] || IconComponentMap["icon-info"]
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(ns).b()) }, [
				createElementVNode("div", { class: normalizeClass(unref(ns).e("icon")) }, [renderSlot(_ctx.$slots, "icon", {}, () => [resultIcon.value.component ? (openBlock(), createBlock(resolveDynamicComponent(resultIcon.value.component), {
					key: 0,
					class: normalizeClass(resultIcon.value.class)
				}, null, 8, ["class"])) : createCommentVNode("v-if", true)])], 2),
				__props.title || _ctx.$slots.title ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ns).e("title"))
				}, [renderSlot(_ctx.$slots, "title", {}, () => [createElementVNode("p", null, toDisplayString(__props.title), 1)])], 2)) : createCommentVNode("v-if", true),
				__props.subTitle || _ctx.$slots["sub-title"] ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(ns).e("subtitle"))
				}, [renderSlot(_ctx.$slots, "sub-title", {}, () => [createElementVNode("p", null, toDisplayString(__props.subTitle), 1)])], 2)) : createCommentVNode("v-if", true),
				_ctx.$slots.extra ? (openBlock(), createElementBlock("div", {
					key: 2,
					class: normalizeClass(unref(ns).e("extra"))
				}, [renderSlot(_ctx.$slots, "extra")], 2)) : createCommentVNode("v-if", true)
			], 2);
		};
	}
});

//#endregion
export { result_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=result.vue_vue_type_script_setup_true_lang.mjs.map
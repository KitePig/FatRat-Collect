import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useGlobalConfig } from "../../config-provider/src/hooks/use-global-config.mjs";
import { cardProps } from "./card.mjs";
import { createCommentVNode, createElementBlock, createElementVNode, createTextVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, toDisplayString, unref } from "vue";

//#region ../../packages/components/card/src/card.vue?vue&type=script&setup=true&lang.ts
var card_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCard",
	__name: "card",
	props: cardProps,
	setup(__props) {
		const globalConfig = useGlobalConfig("card");
		const ns = useNamespace("card");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass([unref(ns).b(), unref(ns).is(`${__props.shadow || unref(globalConfig)?.shadow || "always"}-shadow`)]) }, [
				_ctx.$slots.header || __props.header ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass([unref(ns).e("header"), __props.headerClass])
				}, [renderSlot(_ctx.$slots, "header", {}, () => [createTextVNode(toDisplayString(__props.header), 1)])], 2)) : createCommentVNode("v-if", true),
				createElementVNode("div", {
					class: normalizeClass([unref(ns).e("body"), __props.bodyClass]),
					style: normalizeStyle(__props.bodyStyle)
				}, [renderSlot(_ctx.$slots, "default")], 6),
				_ctx.$slots.footer || __props.footer ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass([unref(ns).e("footer"), __props.footerClass])
				}, [renderSlot(_ctx.$slots, "footer", {}, () => [createTextVNode(toDisplayString(__props.footer), 1)])], 2)) : createCommentVNode("v-if", true)
			], 2);
		};
	}
});

//#endregion
export { card_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=card.vue_vue_type_script_setup_true_lang.mjs.map
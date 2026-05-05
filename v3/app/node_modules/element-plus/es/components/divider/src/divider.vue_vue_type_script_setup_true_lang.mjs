import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { dividerProps } from "./divider.mjs";
import { computed, createCommentVNode, createElementBlock, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, unref } from "vue";

//#region ../../packages/components/divider/src/divider.vue?vue&type=script&setup=true&lang.ts
var divider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElDivider",
	__name: "divider",
	props: dividerProps,
	setup(__props) {
		const props = __props;
		const ns = useNamespace("divider");
		const dividerStyle = computed(() => {
			return ns.cssVar({ "border-style": props.borderStyle });
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass([unref(ns).b(), unref(ns).m(__props.direction)]),
				style: normalizeStyle(dividerStyle.value),
				role: "separator"
			}, [_ctx.$slots.default && __props.direction !== "vertical" ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass([unref(ns).e("text"), unref(ns).is(__props.contentPosition)])
			}, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("v-if", true)], 6);
		};
	}
});

//#endregion
export { divider_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=divider.vue_vue_type_script_setup_true_lang.mjs.map
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { computed, createElementBlock, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, unref } from "vue";

//#region ../../packages/components/container/src/footer.vue?vue&type=script&setup=true&lang.ts
var footer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElFooter",
	__name: "footer",
	props: { height: {
		type: [String, null],
		required: false,
		default: null
	} },
	setup(__props) {
		const props = __props;
		const ns = useNamespace("footer");
		const style = computed(() => props.height ? ns.cssVarBlock({ height: props.height }) : {});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("footer", {
				class: normalizeClass(unref(ns).b()),
				style: normalizeStyle(style.value)
			}, [renderSlot(_ctx.$slots, "default")], 6);
		};
	}
});

//#endregion
export { footer_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=footer.vue_vue_type_script_setup_true_lang.mjs.map
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { computed, createElementBlock, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, unref } from "vue";

//#region ../../packages/components/container/src/aside.vue?vue&type=script&setup=true&lang.ts
var aside_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElAside",
	__name: "aside",
	props: { width: {
		type: [String, null],
		required: false,
		default: null
	} },
	setup(__props) {
		const props = __props;
		const ns = useNamespace("aside");
		const style = computed(() => props.width ? ns.cssVarBlock({ width: props.width }) : {});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("aside", {
				class: normalizeClass(unref(ns).b()),
				style: normalizeStyle(style.value)
			}, [renderSlot(_ctx.$slots, "default")], 6);
		};
	}
});

//#endregion
export { aside_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=aside.vue_vue_type_script_setup_true_lang.mjs.map
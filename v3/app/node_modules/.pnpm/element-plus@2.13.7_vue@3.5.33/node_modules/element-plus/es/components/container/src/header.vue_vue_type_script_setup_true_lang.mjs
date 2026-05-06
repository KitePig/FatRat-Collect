import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { computed, createElementBlock, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, unref } from "vue";

//#region ../../packages/components/container/src/header.vue?vue&type=script&setup=true&lang.ts
var header_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElHeader",
	__name: "header",
	props: { height: {
		type: [String, null],
		required: false,
		default: null
	} },
	setup(__props) {
		const props = __props;
		const ns = useNamespace("header");
		const style = computed(() => {
			return props.height ? ns.cssVarBlock({ height: props.height }) : {};
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("header", {
				class: normalizeClass(unref(ns).b()),
				style: normalizeStyle(style.value)
			}, [renderSlot(_ctx.$slots, "default")], 6);
		};
	}
});

//#endregion
export { header_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=header.vue_vue_type_script_setup_true_lang.mjs.map
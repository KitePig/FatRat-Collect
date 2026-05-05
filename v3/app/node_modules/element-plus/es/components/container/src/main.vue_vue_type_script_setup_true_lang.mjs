import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref } from "vue";

//#region ../../packages/components/container/src/main.vue?vue&type=script&setup=true&lang.ts
var main_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElMain",
	__name: "main",
	setup(__props) {
		const ns = useNamespace("main");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("main", { class: normalizeClass(unref(ns).b()) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
export { main_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=main.vue_vue_type_script_setup_true_lang.mjs.map
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { POPPER_CONTENT_INJECTION_KEY } from "./constants.mjs";
import { createElementBlock, defineComponent, inject, normalizeClass, normalizeStyle, onBeforeUnmount, openBlock, unref } from "vue";

//#region ../../packages/components/popper/src/arrow.vue?vue&type=script&setup=true&lang.ts
var arrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPopperArrow",
	inheritAttrs: false,
	__name: "arrow",
	setup(__props, { expose: __expose }) {
		const ns = useNamespace("popper");
		const { arrowRef, arrowStyle } = inject(POPPER_CONTENT_INJECTION_KEY, void 0);
		onBeforeUnmount(() => {
			arrowRef.value = void 0;
		});
		__expose({ arrowRef });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				ref_key: "arrowRef",
				ref: arrowRef,
				class: normalizeClass(unref(ns).e("arrow")),
				style: normalizeStyle(unref(arrowStyle)),
				"data-popper-arrow": ""
			}, null, 6);
		};
	}
});

//#endregion
export { arrow_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=arrow.vue_vue_type_script_setup_true_lang.mjs.map
import { popperProps } from "./popper.mjs";
import { POPPER_INJECTION_KEY } from "./constants.mjs";
import { computed, defineComponent, provide, ref, renderSlot } from "vue";

//#region ../../packages/components/popper/src/popper.vue?vue&type=script&setup=true&lang.ts
var popper_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPopper",
	inheritAttrs: false,
	__name: "popper",
	props: popperProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const popperProvides = {
			triggerRef: ref(),
			popperInstanceRef: ref(),
			contentRef: ref(),
			referenceRef: ref(),
			role: computed(() => props.role)
		};
		__expose(popperProvides);
		provide(POPPER_INJECTION_KEY, popperProvides);
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});

//#endregion
export { popper_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=popper.vue_vue_type_script_setup_true_lang.mjs.map
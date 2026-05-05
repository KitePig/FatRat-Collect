import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, useSlots } from "vue";

//#region ../../packages/components/container/src/container.vue?vue&type=script&setup=true&lang.ts
var container_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElContainer",
	__name: "container",
	props: { direction: {
		type: String,
		required: false
	} },
	setup(__props) {
		const props = __props;
		const slots = useSlots();
		const ns = useNamespace("container");
		const isVertical = computed(() => {
			if (props.direction === "vertical") return true;
			else if (props.direction === "horizontal") return false;
			if (slots && slots.default) return slots.default().some((vNode) => {
				const tag = vNode.type.name;
				return tag === "ElHeader" || tag === "ElFooter";
			});
			else return false;
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("section", { class: normalizeClass([unref(ns).b(), unref(ns).is("vertical", isVertical.value)]) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
export { container_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=container.vue_vue_type_script_setup_true_lang.mjs.map
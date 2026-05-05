import { CHANGE_EVENT } from "../../../constants/event.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useOrderedChildren } from "../../../hooks/use-ordered-children/index.mjs";
import { stepsEmits, stepsProps } from "./steps.mjs";
import { STEPS_INJECTION_KEY } from "./tokens.mjs";
import { createElementBlock, createVNode, defineComponent, getCurrentInstance, normalizeClass, openBlock, provide, renderSlot, unref, watch } from "vue";

//#region ../../packages/components/steps/src/steps.vue?vue&type=script&setup=true&lang.ts
var steps_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElSteps",
	__name: "steps",
	props: stepsProps,
	emits: stepsEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("steps");
		const { children: steps, addChild: addStep, removeChild: removeStep, ChildrenSorter: StepsSorter } = useOrderedChildren(getCurrentInstance(), "ElStep");
		watch(steps, () => {
			steps.value.forEach((instance, index) => {
				instance.setIndex(index);
			});
		});
		provide(STEPS_INJECTION_KEY, {
			props,
			steps,
			addStep,
			removeStep
		});
		watch(() => props.active, (newVal, oldVal) => {
			emit(CHANGE_EVENT, newVal, oldVal);
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass([unref(ns).b(), unref(ns).m(__props.simple ? "simple" : __props.direction)]) }, [renderSlot(_ctx.$slots, "default"), createVNode(unref(StepsSorter))], 2);
		};
	}
});

//#endregion
export { steps_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=steps.vue_vue_type_script_setup_true_lang.mjs.map
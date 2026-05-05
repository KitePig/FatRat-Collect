import { collapseEmits, collapseProps } from "./collapse.mjs";
import { useCollapse, useCollapseDOM } from "./use-collapse.mjs";
import { createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref } from "vue";

//#region ../../packages/components/collapse/src/collapse.vue?vue&type=script&setup=true&lang.ts
var collapse_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCollapse",
	__name: "collapse",
	props: collapseProps,
	emits: collapseEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const { activeNames, setActiveNames } = useCollapse(props, __emit);
		const { rootKls } = useCollapseDOM(props);
		__expose({
			activeNames,
			setActiveNames
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(rootKls)) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
export { collapse_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=collapse.vue_vue_type_script_setup_true_lang.mjs.map
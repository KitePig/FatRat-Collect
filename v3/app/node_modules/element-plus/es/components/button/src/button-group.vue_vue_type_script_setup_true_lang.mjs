import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { buttonGroupContextKey } from "./constants.mjs";
import { buttonGroupProps } from "./button-group.mjs";
import { createElementBlock, defineComponent, normalizeClass, openBlock, provide, reactive, renderSlot, toRef, unref } from "vue";

//#region ../../packages/components/button/src/button-group.vue?vue&type=script&setup=true&lang.ts
var button_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElButtonGroup",
	__name: "button-group",
	props: buttonGroupProps,
	setup(__props) {
		const props = __props;
		provide(buttonGroupContextKey, reactive({
			size: toRef(props, "size"),
			type: toRef(props, "type")
		}));
		const ns = useNamespace("button");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass([unref(ns).b("group"), unref(ns).bm("group", props.direction)]) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
export { button_group_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=button-group.vue_vue_type_script_setup_true_lang.mjs.map
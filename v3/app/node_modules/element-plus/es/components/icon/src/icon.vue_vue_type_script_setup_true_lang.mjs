import { addUnit } from "../../../utils/dom/style.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { iconProps } from "./icon.mjs";
import { computed, createElementBlock, defineComponent, mergeProps, openBlock, renderSlot, unref } from "vue";

//#region ../../packages/components/icon/src/icon.vue?vue&type=script&setup=true&lang.ts
var icon_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElIcon",
	inheritAttrs: false,
	__name: "icon",
	props: iconProps,
	setup(__props) {
		const props = __props;
		const ns = useNamespace("icon");
		const style = computed(() => {
			const { size, color } = props;
			const fontSize = addUnit(size);
			if (!fontSize && !color) return {};
			return {
				fontSize,
				"--color": color
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("i", mergeProps({
				class: unref(ns).b(),
				style: style.value
			}, _ctx.$attrs), [renderSlot(_ctx.$slots, "default")], 16);
		};
	}
});

//#endregion
export { icon_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=icon.vue_vue_type_script_setup_true_lang.mjs.map
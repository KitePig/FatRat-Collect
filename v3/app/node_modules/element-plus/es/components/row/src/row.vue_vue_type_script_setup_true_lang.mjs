import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { rowProps } from "./row.mjs";
import { rowContextKey } from "./constants.mjs";
import { computed, createBlock, defineComponent, normalizeClass, normalizeStyle, openBlock, provide, renderSlot, resolveDynamicComponent, withCtx } from "vue";

//#region ../../packages/components/row/src/row.vue?vue&type=script&setup=true&lang.ts
var row_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElRow",
	__name: "row",
	props: rowProps,
	setup(__props) {
		const props = __props;
		const ns = useNamespace("row");
		provide(rowContextKey, { gutter: computed(() => props.gutter) });
		const style = computed(() => {
			const styles = {};
			if (!props.gutter) return styles;
			styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
			return styles;
		});
		const rowKls = computed(() => [
			ns.b(),
			ns.is(`justify-${props.justify}`, props.justify !== "start"),
			ns.is(`align-${props.align}`, !!props.align)
		]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
				class: normalizeClass(rowKls.value),
				style: normalizeStyle(style.value)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class", "style"]);
		};
	}
});

//#endregion
export { row_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=row.vue_vue_type_script_setup_true_lang.mjs.map
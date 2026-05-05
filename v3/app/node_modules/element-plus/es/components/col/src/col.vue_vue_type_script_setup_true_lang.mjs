import { isNumber, isObject } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { colProps } from "./col.mjs";
import { rowContextKey } from "../../row/src/constants.mjs";
import { computed, createBlock, defineComponent, inject, normalizeClass, normalizeStyle, openBlock, renderSlot, resolveDynamicComponent, withCtx } from "vue";

//#region ../../packages/components/col/src/col.vue?vue&type=script&setup=true&lang.ts
var col_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCol",
	__name: "col",
	props: colProps,
	setup(__props) {
		const props = __props;
		const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });
		const ns = useNamespace("col");
		const style = computed(() => {
			const styles = {};
			if (gutter.value) styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
			return styles;
		});
		const colKls = computed(() => {
			const classes = [];
			[
				"span",
				"offset",
				"pull",
				"push"
			].forEach((prop) => {
				const size = props[prop];
				if (isNumber(size)) {
					if (prop === "span") classes.push(ns.b(`${props[prop]}`));
					else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`));
				}
			});
			[
				"xs",
				"sm",
				"md",
				"lg",
				"xl"
			].forEach((size) => {
				if (isNumber(props[size])) classes.push(ns.b(`${size}-${props[size]}`));
				else if (isObject(props[size])) Object.entries(props[size]).forEach(([prop, sizeProp]) => {
					classes.push(prop !== "span" ? ns.b(`${size}-${prop}-${sizeProp}`) : ns.b(`${size}-${sizeProp}`));
				});
			});
			if (gutter.value) classes.push(ns.is("guttered"));
			return [ns.b(), classes];
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
				class: normalizeClass(colKls.value),
				style: normalizeStyle(style.value)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class", "style"]);
		};
	}
});

//#endregion
export { col_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=col.vue_vue_type_script_setup_true_lang.mjs.map
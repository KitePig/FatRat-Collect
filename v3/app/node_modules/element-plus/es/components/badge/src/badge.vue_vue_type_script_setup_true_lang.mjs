import { isNumber } from "../../../utils/types.mjs";
import { addUnit } from "../../../utils/dom/style.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { badgeProps } from "./badge.mjs";
import { Transition, computed, createCommentVNode, createElementBlock, createTextVNode, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, toDisplayString, unref, withCtx } from "vue";

//#region ../../packages/components/badge/src/badge.vue?vue&type=script&setup=true&lang.ts
var badge_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElBadge",
	__name: "badge",
	props: badgeProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = useNamespace("badge");
		const content = computed(() => {
			if (props.isDot) return "";
			if (isNumber(props.value) && isNumber(props.max)) return props.max < props.value ? `${props.max}+` : `${props.value}`;
			return `${props.value}`;
		});
		const style = computed(() => {
			return [{
				backgroundColor: props.color,
				marginRight: addUnit(-props.offset[0]),
				marginTop: addUnit(props.offset[1])
			}, props.badgeStyle ?? {}];
		});
		__expose({ content });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(ns).b()) }, [renderSlot(_ctx.$slots, "default"), createVNode(Transition, { name: `${unref(ns).namespace.value}-zoom-in-center` }, {
				default: withCtx(() => [!__props.hidden && (content.value || __props.isDot || _ctx.$slots.content) ? (openBlock(), createElementBlock("sup", {
					key: 0,
					class: normalizeClass([
						unref(ns).e("content"),
						unref(ns).em("content", __props.type),
						unref(ns).is("fixed", !!_ctx.$slots.default),
						unref(ns).is("dot", __props.isDot),
						unref(ns).is("hide-zero", !__props.showZero && __props.value === 0),
						__props.badgeClass
					]),
					style: normalizeStyle(style.value)
				}, [renderSlot(_ctx.$slots, "content", { value: content.value }, () => [createTextVNode(toDisplayString(content.value), 1)])], 6)) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, ["name"])], 2);
		};
	}
});

//#endregion
export { badge_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=badge.vue_vue_type_script_setup_true_lang.mjs.map
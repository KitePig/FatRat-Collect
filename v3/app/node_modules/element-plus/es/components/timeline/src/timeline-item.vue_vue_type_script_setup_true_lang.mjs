import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { TIMELINE_INJECTION_KEY } from "./tokens.mjs";
import { timelineItemProps } from "./timeline-item.mjs";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, inject, normalizeClass, normalizeStyle, openBlock, renderSlot, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";

//#region ../../packages/components/timeline/src/timeline-item.vue?vue&type=script&setup=true&lang.ts
var timeline_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTimelineItem",
	__name: "timeline-item",
	props: timelineItemProps,
	setup(__props) {
		const props = __props;
		const { props: timelineProps } = inject(TIMELINE_INJECTION_KEY);
		const ns = useNamespace("timeline-item");
		const defaultNodeKls = computed(() => [
			ns.e("node"),
			ns.em("node", props.size || ""),
			ns.em("node", props.type || ""),
			ns.is("hollow", props.hollow)
		]);
		const timelineItemKls = computed(() => [
			ns.b(),
			{ [ns.e("center")]: props.center },
			ns.is(timelineProps.mode)
		]);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("li", { class: normalizeClass(timelineItemKls.value) }, [
				createElementVNode("div", { class: normalizeClass(unref(ns).e("tail")) }, null, 2),
				!_ctx.$slots.dot ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(defaultNodeKls.value),
					style: normalizeStyle({ backgroundColor: __props.color })
				}, [__props.icon ? (openBlock(), createBlock(unref(ElIcon), {
					key: 0,
					class: normalizeClass(unref(ns).e("icon"))
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.icon)))]),
					_: 1
				}, 8, ["class"])) : createCommentVNode("v-if", true)], 6)) : createCommentVNode("v-if", true),
				_ctx.$slots.dot ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(ns).e("dot"))
				}, [renderSlot(_ctx.$slots, "dot")], 2)) : createCommentVNode("v-if", true),
				createElementVNode("div", { class: normalizeClass(unref(ns).e("wrapper")) }, [
					!__props.hideTimestamp && __props.placement === "top" ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: normalizeClass([unref(ns).e("timestamp"), unref(ns).is("top")])
					}, toDisplayString(__props.timestamp), 3)) : createCommentVNode("v-if", true),
					createElementVNode("div", { class: normalizeClass(unref(ns).e("content")) }, [renderSlot(_ctx.$slots, "default")], 2),
					!__props.hideTimestamp && __props.placement === "bottom" ? (openBlock(), createElementBlock("div", {
						key: 1,
						class: normalizeClass([unref(ns).e("timestamp"), unref(ns).is("bottom")])
					}, toDisplayString(__props.timestamp), 3)) : createCommentVNode("v-if", true)
				], 2)
			], 2);
		};
	}
});

//#endregion
export { timeline_item_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=timeline-item.vue_vue_type_script_setup_true_lang.mjs.map
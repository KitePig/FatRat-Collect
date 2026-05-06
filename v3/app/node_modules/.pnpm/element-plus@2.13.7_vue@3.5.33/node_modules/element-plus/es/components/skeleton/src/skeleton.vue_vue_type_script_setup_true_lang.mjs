import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useThrottleRender } from "../../../hooks/use-throttle-render/index.mjs";
import { skeletonProps } from "./skeleton.mjs";
import skeleton_item_default from "./skeleton-item2.mjs";
import { Fragment, createBlock, createCommentVNode, createElementBlock, createVNode, defineComponent, mergeProps, normalizeClass, normalizeProps, openBlock, renderList, renderSlot, toRef, unref } from "vue";

//#region ../../packages/components/skeleton/src/skeleton.vue?vue&type=script&setup=true&lang.ts
var skeleton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElSkeleton",
	__name: "skeleton",
	props: skeletonProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = useNamespace("skeleton");
		const uiLoading = useThrottleRender(toRef(props, "loading"), props.throttle);
		__expose({ uiLoading });
		return (_ctx, _cache) => {
			return unref(uiLoading) ? (openBlock(), createElementBlock("div", mergeProps({
				key: 0,
				class: [unref(ns).b(), unref(ns).is("animated", __props.animated)]
			}, _ctx.$attrs), [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.count, (i) => {
				return openBlock(), createElementBlock(Fragment, { key: i }, [unref(uiLoading) ? renderSlot(_ctx.$slots, "template", { key: i }, () => [createVNode(skeleton_item_default, {
					class: normalizeClass(unref(ns).is("first")),
					variant: "p"
				}, null, 8, ["class"]), (openBlock(true), createElementBlock(Fragment, null, renderList(__props.rows, (item) => {
					return openBlock(), createBlock(skeleton_item_default, {
						key: item,
						class: normalizeClass([unref(ns).e("paragraph"), unref(ns).is("last", item === __props.rows && __props.rows > 1)]),
						variant: "p"
					}, null, 8, ["class"]);
				}), 128))]) : createCommentVNode("v-if", true)], 64);
			}), 128))], 16)) : renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 1 }, _ctx.$attrs)));
		};
	}
});

//#endregion
export { skeleton_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=skeleton.vue_vue_type_script_setup_true_lang.mjs.map
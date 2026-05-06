import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { skeletonItemProps } from "./skeleton-item.mjs";
import { PictureFilled } from "@element-plus/icons-vue";
import { createBlock, createCommentVNode, createElementBlock, defineComponent, normalizeClass, openBlock, unref } from "vue";

//#region ../../packages/components/skeleton/src/skeleton-item.vue?vue&type=script&setup=true&lang.ts
var skeleton_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElSkeletonItem",
	__name: "skeleton-item",
	props: skeletonItemProps,
	setup(__props) {
		const ns = useNamespace("skeleton");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass([unref(ns).e("item"), unref(ns).e(__props.variant)]) }, [__props.variant === "image" ? (openBlock(), createBlock(unref(PictureFilled), { key: 0 })) : createCommentVNode("v-if", true)], 2);
		};
	}
});

//#endregion
export { skeleton_item_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=skeleton-item.vue_vue_type_script_setup_true_lang.mjs.map
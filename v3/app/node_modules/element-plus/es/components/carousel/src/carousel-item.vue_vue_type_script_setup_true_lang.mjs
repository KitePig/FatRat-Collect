import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { CAROUSEL_ITEM_NAME } from "./constants.mjs";
import { carouselItemProps } from "./carousel-item.mjs";
import { useCarouselItem } from "./use-carousel-item.mjs";
import { computed, createCommentVNode, createElementBlock, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, unref, vShow, withDirectives } from "vue";

//#region ../../packages/components/carousel/src/carousel-item.vue?vue&type=script&setup=true&lang.ts
var carousel_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: CAROUSEL_ITEM_NAME,
	__name: "carousel-item",
	props: carouselItemProps,
	setup(__props) {
		const props = __props;
		const ns = useNamespace("carousel");
		const { carouselItemRef, active, animating, hover, inStage, isVertical, translate, isCardType, scale, ready, handleItemClick } = useCarouselItem(props);
		const itemKls = computed(() => [
			ns.e("item"),
			ns.is("active", active.value),
			ns.is("in-stage", inStage.value),
			ns.is("hover", hover.value),
			ns.is("animating", animating.value),
			{
				[ns.em("item", "card")]: isCardType.value,
				[ns.em("item", "card-vertical")]: isCardType.value && isVertical.value
			}
		]);
		const itemStyle = computed(() => {
			return { transform: [`${`translate${unref(isVertical) ? "Y" : "X"}`}(${unref(translate)}px)`, `scale(${unref(scale)})`].join(" ") };
		});
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createElementBlock("div", {
				ref_key: "carouselItemRef",
				ref: carouselItemRef,
				class: normalizeClass(itemKls.value),
				style: normalizeStyle(itemStyle.value),
				onClick: _cache[0] || (_cache[0] = (...args) => unref(handleItemClick) && unref(handleItemClick)(...args))
			}, [unref(isCardType) ? withDirectives((openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(ns).e("mask"))
			}, null, 2)), [[vShow, !unref(active)]]) : createCommentVNode("v-if", true), renderSlot(_ctx.$slots, "default")], 6)), [[vShow, unref(ready)]]);
		};
	}
});

//#endregion
export { carousel_item_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=carousel-item.vue_vue_type_script_setup_true_lang.mjs.map
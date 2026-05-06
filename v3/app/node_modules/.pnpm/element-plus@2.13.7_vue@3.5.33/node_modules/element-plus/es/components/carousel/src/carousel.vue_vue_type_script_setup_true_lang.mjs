import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { carouselEmits, carouselProps } from "./carousel.mjs";
import { useCarousel } from "./use-carousel.mjs";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, renderList, renderSlot, toDisplayString, unref, vShow, withCtx, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/carousel/src/carousel.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["onMouseenter", "onClick"];
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = { key: 0 };
const _hoisted_6 = {
	key: 2,
	xmlns: "http://www.w3.org/2000/svg",
	version: "1.1",
	style: { "display": "none" }
};
const COMPONENT_NAME = "ElCarousel";
var carousel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "carousel",
	props: carouselProps,
	emits: carouselEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const { root, activeIndex, exposeActiveIndex, arrowDisplay, hasLabel, hover, isCardType, items, isVertical, containerStyle, handleButtonEnter, handleButtonLeave, handleIndicatorClick, handleMouseEnter, handleMouseLeave, setActiveItem, prev, next, PlaceholderItem, isTwoLengthShow, ItemsSorter, throttledArrowClick, throttledIndicatorHover } = useCarousel(props, __emit, COMPONENT_NAME);
		const ns = useNamespace("carousel");
		const { t } = useLocale();
		const carouselClasses = computed(() => {
			const classes = [ns.b(), ns.m(props.direction)];
			if (unref(isCardType)) classes.push(ns.m("card"));
			classes.push(ns.is("vertical-outside", unref(isVertical) && props.indicatorPosition === "outside"));
			return classes;
		});
		const indicatorsClasses = computed(() => {
			const classes = [ns.e("indicators"), ns.em("indicators", props.direction)];
			if (unref(hasLabel)) classes.push(ns.em("indicators", "labels"));
			if (props.indicatorPosition === "outside") classes.push(ns.em("indicators", "outside"));
			if (unref(isVertical)) classes.push(ns.em("indicators", "right"));
			return classes;
		});
		function handleTransitionStart(e) {
			if (!props.motionBlur) return;
			const kls = unref(isVertical) ? `${ns.namespace.value}-transitioning-vertical` : `${ns.namespace.value}-transitioning`;
			e.currentTarget.classList.add(kls);
		}
		function handleTransitionEnd(e) {
			if (!props.motionBlur) return;
			const kls = unref(isVertical) ? `${ns.namespace.value}-transitioning-vertical` : `${ns.namespace.value}-transitioning`;
			e.currentTarget.classList.remove(kls);
		}
		__expose({
			activeIndex: exposeActiveIndex,
			setActiveItem,
			prev,
			next
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "root",
				ref: root,
				class: normalizeClass(carouselClasses.value),
				onMouseenter: _cache[6] || (_cache[6] = withModifiers((...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args), ["stop"])),
				onMouseleave: _cache[7] || (_cache[7] = withModifiers((...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args), ["stop"]))
			}, [
				unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
					key: 0,
					name: "carousel-arrow-left",
					persisted: ""
				}, {
					default: withCtx(() => [withDirectives(createElementVNode("button", {
						type: "button",
						class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "left")]),
						"aria-label": unref(t)("el.carousel.leftArrow"),
						onMouseenter: _cache[0] || (_cache[0] = ($event) => unref(handleButtonEnter)("left")),
						onMouseleave: _cache[1] || (_cache[1] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
						onClick: _cache[2] || (_cache[2] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) - 1), ["stop"]))
					}, [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(ArrowLeft))]),
						_: 1
					})], 42, _hoisted_1), [[vShow, (__props.arrow === "always" || unref(hover)) && (__props.loop || unref(activeIndex) > 0)]])]),
					_: 1
				})) : createCommentVNode("v-if", true),
				unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
					key: 1,
					name: "carousel-arrow-right",
					persisted: ""
				}, {
					default: withCtx(() => [withDirectives(createElementVNode("button", {
						type: "button",
						class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "right")]),
						"aria-label": unref(t)("el.carousel.rightArrow"),
						onMouseenter: _cache[3] || (_cache[3] = ($event) => unref(handleButtonEnter)("right")),
						onMouseleave: _cache[4] || (_cache[4] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
						onClick: _cache[5] || (_cache[5] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) + 1), ["stop"]))
					}, [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(ArrowRight))]),
						_: 1
					})], 42, _hoisted_2), [[vShow, (__props.arrow === "always" || unref(hover)) && (__props.loop || unref(activeIndex) < unref(items).length - 1)]])]),
					_: 1
				})) : createCommentVNode("v-if", true),
				createElementVNode("div", {
					class: normalizeClass(unref(ns).e("container")),
					style: normalizeStyle(unref(containerStyle)),
					onTransitionstart: handleTransitionStart,
					onTransitionend: handleTransitionEnd
				}, [createVNode(unref(PlaceholderItem)), renderSlot(_ctx.$slots, "default")], 38),
				createVNode(unref(ItemsSorter), null, {
					default: withCtx(() => [__props.indicatorPosition !== "none" ? (openBlock(), createElementBlock("ul", {
						key: 0,
						class: normalizeClass(indicatorsClasses.value)
					}, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(items), (item, index) => {
						return withDirectives((openBlock(), createElementBlock("li", {
							key: index,
							class: normalizeClass([
								unref(ns).e("indicator"),
								unref(ns).em("indicator", __props.direction),
								unref(ns).is("active", index === unref(activeIndex))
							]),
							onMouseenter: ($event) => unref(throttledIndicatorHover)(index),
							onClick: withModifiers(($event) => unref(handleIndicatorClick)(index), ["stop"])
						}, [createElementVNode("button", {
							class: normalizeClass(unref(ns).e("button")),
							"aria-label": unref(t)("el.carousel.indicator", { index: index + 1 })
						}, [unref(hasLabel) ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(item.props.label), 1)) : createCommentVNode("v-if", true)], 10, _hoisted_4)], 42, _hoisted_3)), [[vShow, unref(isTwoLengthShow)(index)]]);
					}), 128))], 2)) : createCommentVNode("v-if", true)]),
					_: 1
				}),
				__props.motionBlur ? (openBlock(), createElementBlock("svg", _hoisted_6, [..._cache[8] || (_cache[8] = [createElementVNode("defs", null, [createElementVNode("filter", { id: "elCarouselHorizontal" }, [createElementVNode("feGaussianBlur", {
					in: "SourceGraphic",
					stdDeviation: "12,0"
				})]), createElementVNode("filter", { id: "elCarouselVertical" }, [createElementVNode("feGaussianBlur", {
					in: "SourceGraphic",
					stdDeviation: "0,10"
				})])], -1)])])) : createCommentVNode("v-if", true)
			], 34);
		};
	}
});

//#endregion
export { carousel_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=carousel.vue_vue_type_script_setup_true_lang.mjs.map
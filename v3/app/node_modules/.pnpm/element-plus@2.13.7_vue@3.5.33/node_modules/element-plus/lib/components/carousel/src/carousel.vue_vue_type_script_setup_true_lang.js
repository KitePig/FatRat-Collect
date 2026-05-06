const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../icon/index.js');
const require_carousel = require('./carousel.js');
const require_use_carousel = require('./use-carousel.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

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
var carousel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "carousel",
	props: require_carousel.carouselProps,
	emits: require_carousel.carouselEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const { root, activeIndex, exposeActiveIndex, arrowDisplay, hasLabel, hover, isCardType, items, isVertical, containerStyle, handleButtonEnter, handleButtonLeave, handleIndicatorClick, handleMouseEnter, handleMouseLeave, setActiveItem, prev, next, PlaceholderItem, isTwoLengthShow, ItemsSorter, throttledArrowClick, throttledIndicatorHover } = require_use_carousel.useCarousel(props, __emit, COMPONENT_NAME);
		const ns = require_index$1.useNamespace("carousel");
		const { t } = require_index.useLocale();
		const carouselClasses = (0, vue.computed)(() => {
			const classes = [ns.b(), ns.m(props.direction)];
			if ((0, vue.unref)(isCardType)) classes.push(ns.m("card"));
			classes.push(ns.is("vertical-outside", (0, vue.unref)(isVertical) && props.indicatorPosition === "outside"));
			return classes;
		});
		const indicatorsClasses = (0, vue.computed)(() => {
			const classes = [ns.e("indicators"), ns.em("indicators", props.direction)];
			if ((0, vue.unref)(hasLabel)) classes.push(ns.em("indicators", "labels"));
			if (props.indicatorPosition === "outside") classes.push(ns.em("indicators", "outside"));
			if ((0, vue.unref)(isVertical)) classes.push(ns.em("indicators", "right"));
			return classes;
		});
		function handleTransitionStart(e) {
			if (!props.motionBlur) return;
			const kls = (0, vue.unref)(isVertical) ? `${ns.namespace.value}-transitioning-vertical` : `${ns.namespace.value}-transitioning`;
			e.currentTarget.classList.add(kls);
		}
		function handleTransitionEnd(e) {
			if (!props.motionBlur) return;
			const kls = (0, vue.unref)(isVertical) ? `${ns.namespace.value}-transitioning-vertical` : `${ns.namespace.value}-transitioning`;
			e.currentTarget.classList.remove(kls);
		}
		__expose({
			activeIndex: exposeActiveIndex,
			setActiveItem,
			prev,
			next
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "root",
				ref: root,
				class: (0, vue.normalizeClass)(carouselClasses.value),
				onMouseenter: _cache[6] || (_cache[6] = (0, vue.withModifiers)((...args) => (0, vue.unref)(handleMouseEnter) && (0, vue.unref)(handleMouseEnter)(...args), ["stop"])),
				onMouseleave: _cache[7] || (_cache[7] = (0, vue.withModifiers)((...args) => (0, vue.unref)(handleMouseLeave) && (0, vue.unref)(handleMouseLeave)(...args), ["stop"]))
			}, [
				(0, vue.unref)(arrowDisplay) ? ((0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
					key: 0,
					name: "carousel-arrow-left",
					persisted: ""
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createElementVNode)("button", {
						type: "button",
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("arrow"), (0, vue.unref)(ns).em("arrow", "left")]),
						"aria-label": (0, vue.unref)(t)("el.carousel.leftArrow"),
						onMouseenter: _cache[0] || (_cache[0] = ($event) => (0, vue.unref)(handleButtonEnter)("left")),
						onMouseleave: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handleButtonLeave) && (0, vue.unref)(handleButtonLeave)(...args)),
						onClick: _cache[2] || (_cache[2] = (0, vue.withModifiers)(($event) => (0, vue.unref)(throttledArrowClick)((0, vue.unref)(activeIndex) - 1), ["stop"]))
					}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowLeft))]),
						_: 1
					})], 42, _hoisted_1), [[vue.vShow, (__props.arrow === "always" || (0, vue.unref)(hover)) && (__props.loop || (0, vue.unref)(activeIndex) > 0)]])]),
					_: 1
				})) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.unref)(arrowDisplay) ? ((0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
					key: 1,
					name: "carousel-arrow-right",
					persisted: ""
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createElementVNode)("button", {
						type: "button",
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("arrow"), (0, vue.unref)(ns).em("arrow", "right")]),
						"aria-label": (0, vue.unref)(t)("el.carousel.rightArrow"),
						onMouseenter: _cache[3] || (_cache[3] = ($event) => (0, vue.unref)(handleButtonEnter)("right")),
						onMouseleave: _cache[4] || (_cache[4] = (...args) => (0, vue.unref)(handleButtonLeave) && (0, vue.unref)(handleButtonLeave)(...args)),
						onClick: _cache[5] || (_cache[5] = (0, vue.withModifiers)(($event) => (0, vue.unref)(throttledArrowClick)((0, vue.unref)(activeIndex) + 1), ["stop"]))
					}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowRight))]),
						_: 1
					})], 42, _hoisted_2), [[vue.vShow, (__props.arrow === "always" || (0, vue.unref)(hover)) && (__props.loop || (0, vue.unref)(activeIndex) < (0, vue.unref)(items).length - 1)]])]),
					_: 1
				})) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("container")),
					style: (0, vue.normalizeStyle)((0, vue.unref)(containerStyle)),
					onTransitionstart: handleTransitionStart,
					onTransitionend: handleTransitionEnd
				}, [(0, vue.createVNode)((0, vue.unref)(PlaceholderItem)), (0, vue.renderSlot)(_ctx.$slots, "default")], 38),
				(0, vue.createVNode)((0, vue.unref)(ItemsSorter), null, {
					default: (0, vue.withCtx)(() => [__props.indicatorPosition !== "none" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("ul", {
						key: 0,
						class: (0, vue.normalizeClass)(indicatorsClasses.value)
					}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(items), (item, index) => {
						return (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
							key: index,
							class: (0, vue.normalizeClass)([
								(0, vue.unref)(ns).e("indicator"),
								(0, vue.unref)(ns).em("indicator", __props.direction),
								(0, vue.unref)(ns).is("active", index === (0, vue.unref)(activeIndex))
							]),
							onMouseenter: ($event) => (0, vue.unref)(throttledIndicatorHover)(index),
							onClick: (0, vue.withModifiers)(($event) => (0, vue.unref)(handleIndicatorClick)(index), ["stop"])
						}, [(0, vue.createElementVNode)("button", {
							class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("button")),
							"aria-label": (0, vue.unref)(t)("el.carousel.indicator", { index: index + 1 })
						}, [(0, vue.unref)(hasLabel) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_5, (0, vue.toDisplayString)(item.props.label), 1)) : (0, vue.createCommentVNode)("v-if", true)], 10, _hoisted_4)], 42, _hoisted_3)), [[vue.vShow, (0, vue.unref)(isTwoLengthShow)(index)]]);
					}), 128))], 2)) : (0, vue.createCommentVNode)("v-if", true)]),
					_: 1
				}),
				__props.motionBlur ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", _hoisted_6, [..._cache[8] || (_cache[8] = [(0, vue.createElementVNode)("defs", null, [(0, vue.createElementVNode)("filter", { id: "elCarouselHorizontal" }, [(0, vue.createElementVNode)("feGaussianBlur", {
					in: "SourceGraphic",
					stdDeviation: "12,0"
				})]), (0, vue.createElementVNode)("filter", { id: "elCarouselVertical" }, [(0, vue.createElementVNode)("feGaussianBlur", {
					in: "SourceGraphic",
					stdDeviation: "0,10"
				})])], -1)])])) : (0, vue.createCommentVNode)("v-if", true)
			], 34);
		};
	}
});

//#endregion
exports.default = carousel_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=carousel.vue_vue_type_script_setup_true_lang.js.map
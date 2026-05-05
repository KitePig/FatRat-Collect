const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_constants = require('./constants.js');
const require_carousel_item = require('./carousel-item.js');
const require_use_carousel_item = require('./use-carousel-item.js');
let vue = require("vue");

//#region ../../packages/components/carousel/src/carousel-item.vue?vue&type=script&setup=true&lang.ts
var carousel_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: require_constants.CAROUSEL_ITEM_NAME,
	__name: "carousel-item",
	props: require_carousel_item.carouselItemProps,
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("carousel");
		const { carouselItemRef, active, animating, hover, inStage, isVertical, translate, isCardType, scale, ready, handleItemClick } = require_use_carousel_item.useCarouselItem(props);
		const itemKls = (0, vue.computed)(() => [
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
		const itemStyle = (0, vue.computed)(() => {
			return { transform: [`${`translate${(0, vue.unref)(isVertical) ? "Y" : "X"}`}(${(0, vue.unref)(translate)}px)`, `scale(${(0, vue.unref)(scale)})`].join(" ") };
		});
		return (_ctx, _cache) => {
			return (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "carouselItemRef",
				ref: carouselItemRef,
				class: (0, vue.normalizeClass)(itemKls.value),
				style: (0, vue.normalizeStyle)(itemStyle.value),
				onClick: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleItemClick) && (0, vue.unref)(handleItemClick)(...args))
			}, [(0, vue.unref)(isCardType) ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("mask"))
			}, null, 2)), [[vue.vShow, !(0, vue.unref)(active)]]) : (0, vue.createCommentVNode)("v-if", true), (0, vue.renderSlot)(_ctx.$slots, "default")], 6)), [[vue.vShow, (0, vue.unref)(ready)]]);
		};
	}
});

//#endregion
exports.default = carousel_item_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=carousel-item.vue_vue_type_script_setup_true_lang.js.map
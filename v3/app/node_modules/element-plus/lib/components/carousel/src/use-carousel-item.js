Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/carousel/src/use-carousel-item.ts
const useCarouselItem = (props) => {
	const carouselContext = (0, vue.inject)(require_constants.carouselContextKey);
	const instance = (0, vue.getCurrentInstance)();
	if (!carouselContext) require_error.debugWarn(require_constants.CAROUSEL_ITEM_NAME, "usage: <el-carousel></el-carousel-item></el-carousel>");
	if (!instance) require_error.debugWarn(require_constants.CAROUSEL_ITEM_NAME, "compositional hook can only be invoked inside setups");
	const carouselItemRef = (0, vue.ref)();
	const hover = (0, vue.ref)(false);
	const translate = (0, vue.ref)(0);
	const scale = (0, vue.ref)(1);
	const active = (0, vue.ref)(false);
	const ready = (0, vue.ref)(false);
	const inStage = (0, vue.ref)(false);
	const animating = (0, vue.ref)(false);
	const { isCardType, isVertical, cardScale } = carouselContext;
	function processIndex(index, activeIndex, length) {
		const lastItemIndex = length - 1;
		const prevItemIndex = activeIndex - 1;
		const nextItemIndex = activeIndex + 1;
		const halfItemIndex = length / 2;
		if (activeIndex === 0 && index === lastItemIndex) return -1;
		else if (activeIndex === lastItemIndex && index === 0) return length;
		else if (index < prevItemIndex && activeIndex - index >= halfItemIndex) return length + 1;
		else if (index > nextItemIndex && index - activeIndex >= halfItemIndex) return -2;
		return index;
	}
	function calcCardTranslate(index, activeIndex) {
		const parentWidth = (0, vue.unref)(isVertical) ? carouselContext.root.value?.offsetHeight || 0 : carouselContext.root.value?.offsetWidth || 0;
		if (inStage.value) return parentWidth * ((2 - cardScale) * (index - activeIndex) + 1) / 4;
		else if (index < activeIndex) return -(1 + cardScale) * parentWidth / 4;
		else return (3 + cardScale) * parentWidth / 4;
	}
	function calcTranslate(index, activeIndex, isVertical) {
		const rootEl = carouselContext.root.value;
		if (!rootEl) return 0;
		return ((isVertical ? rootEl.offsetHeight : rootEl.offsetWidth) || 0) * (index - activeIndex);
	}
	const translateItem = (index, activeIndex, oldIndex) => {
		const _isCardType = (0, vue.unref)(isCardType);
		const carouselItemLength = carouselContext.items.value.length ?? NaN;
		const isActive = index === activeIndex;
		if (!_isCardType && !require_types.isUndefined(oldIndex)) animating.value = isActive || index === oldIndex;
		if (!isActive && carouselItemLength > 2 && carouselContext.loop) index = processIndex(index, activeIndex, carouselItemLength);
		const _isVertical = (0, vue.unref)(isVertical);
		active.value = isActive;
		if (_isCardType) {
			inStage.value = Math.round(Math.abs(index - activeIndex)) <= 1;
			translate.value = calcCardTranslate(index, activeIndex);
			scale.value = (0, vue.unref)(active) ? 1 : cardScale;
		} else translate.value = calcTranslate(index, activeIndex, _isVertical);
		ready.value = true;
		if (isActive && carouselItemRef.value) carouselContext.setContainerHeight(carouselItemRef.value.offsetHeight);
	};
	function handleItemClick() {
		if (carouselContext && (0, vue.unref)(isCardType)) {
			const index = carouselContext.items.value.findIndex(({ uid }) => uid === instance.uid);
			carouselContext.setActiveItem(index);
		}
	}
	const carouselItemContext = {
		props,
		states: (0, vue.reactive)({
			hover,
			translate,
			scale,
			active,
			ready,
			inStage,
			animating
		}),
		uid: instance.uid,
		getVnode: () => instance.vnode,
		translateItem
	};
	carouselContext.addItem(carouselItemContext);
	(0, vue.onBeforeUnmount)(() => {
		carouselContext.removeItem(carouselItemContext);
	});
	return {
		carouselItemRef,
		active,
		animating,
		hover,
		inStage,
		isVertical,
		translate,
		isCardType,
		scale,
		ready,
		handleItemClick
	};
};

//#endregion
exports.useCarouselItem = useCarouselItem;
//# sourceMappingURL=use-carousel-item.js.map
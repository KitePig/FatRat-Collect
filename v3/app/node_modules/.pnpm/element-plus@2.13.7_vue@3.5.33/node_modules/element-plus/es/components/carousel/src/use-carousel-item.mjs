import { isUndefined } from "../../../utils/types.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { CAROUSEL_ITEM_NAME, carouselContextKey } from "./constants.mjs";
import { getCurrentInstance, inject, onBeforeUnmount, reactive, ref, unref } from "vue";

//#region ../../packages/components/carousel/src/use-carousel-item.ts
const useCarouselItem = (props) => {
	const carouselContext = inject(carouselContextKey);
	const instance = getCurrentInstance();
	if (!carouselContext) debugWarn(CAROUSEL_ITEM_NAME, "usage: <el-carousel></el-carousel-item></el-carousel>");
	if (!instance) debugWarn(CAROUSEL_ITEM_NAME, "compositional hook can only be invoked inside setups");
	const carouselItemRef = ref();
	const hover = ref(false);
	const translate = ref(0);
	const scale = ref(1);
	const active = ref(false);
	const ready = ref(false);
	const inStage = ref(false);
	const animating = ref(false);
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
		const parentWidth = unref(isVertical) ? carouselContext.root.value?.offsetHeight || 0 : carouselContext.root.value?.offsetWidth || 0;
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
		const _isCardType = unref(isCardType);
		const carouselItemLength = carouselContext.items.value.length ?? NaN;
		const isActive = index === activeIndex;
		if (!_isCardType && !isUndefined(oldIndex)) animating.value = isActive || index === oldIndex;
		if (!isActive && carouselItemLength > 2 && carouselContext.loop) index = processIndex(index, activeIndex, carouselItemLength);
		const _isVertical = unref(isVertical);
		active.value = isActive;
		if (_isCardType) {
			inStage.value = Math.round(Math.abs(index - activeIndex)) <= 1;
			translate.value = calcCardTranslate(index, activeIndex);
			scale.value = unref(active) ? 1 : cardScale;
		} else translate.value = calcTranslate(index, activeIndex, _isVertical);
		ready.value = true;
		if (isActive && carouselItemRef.value) carouselContext.setContainerHeight(carouselItemRef.value.offsetHeight);
	};
	function handleItemClick() {
		if (carouselContext && unref(isCardType)) {
			const index = carouselContext.items.value.findIndex(({ uid }) => uid === instance.uid);
			carouselContext.setActiveItem(index);
		}
	}
	const carouselItemContext = {
		props,
		states: reactive({
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
	onBeforeUnmount(() => {
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
export { useCarouselItem };
//# sourceMappingURL=use-carousel-item.mjs.map
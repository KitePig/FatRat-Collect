Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_error = require('../../../utils/error.js');
const require_vnode = require('../../../utils/vue/vnode.js');
const require_index = require('../../../hooks/use-ordered-children/index.js');
const require_constants = require('./constants.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/carousel/src/use-carousel.ts
const THROTTLE_TIME = 300;
const useCarousel = (props, emit, componentName) => {
	const { children: items, addChild: addItem, removeChild: removeItem, ChildrenSorter: ItemsSorter } = require_index.useOrderedChildren((0, vue.getCurrentInstance)(), require_constants.CAROUSEL_ITEM_NAME);
	const slots = (0, vue.useSlots)();
	const activeIndex = (0, vue.ref)(-1);
	const timer = (0, vue.ref)(null);
	const hover = (0, vue.ref)(false);
	const root = (0, vue.ref)();
	const containerHeight = (0, vue.ref)(0);
	const isItemsTwoLength = (0, vue.ref)(true);
	const arrowDisplay = (0, vue.computed)(() => props.arrow !== "never" && !(0, vue.unref)(isVertical));
	const hasLabel = (0, vue.computed)(() => {
		return items.value.some((item) => item.props.label.toString().length > 0);
	});
	const isCardType = (0, vue.computed)(() => props.type === "card");
	const isVertical = (0, vue.computed)(() => props.direction === "vertical");
	const containerStyle = (0, vue.computed)(() => {
		if (props.height !== "auto") return { height: props.height };
		return {
			height: `${containerHeight.value}px`,
			overflow: "hidden"
		};
	});
	const throttledArrowClick = (0, lodash_unified.throttle)((index) => {
		setActiveItem(index);
	}, THROTTLE_TIME, { trailing: true });
	const throttledIndicatorHover = (0, lodash_unified.throttle)((index) => {
		handleIndicatorHover(index);
	}, THROTTLE_TIME);
	const isTwoLengthShow = (index) => {
		if (!isItemsTwoLength.value) return true;
		return activeIndex.value <= 1 ? index <= 1 : index > 1;
	};
	function pauseTimer() {
		if (timer.value) {
			clearInterval(timer.value);
			timer.value = null;
		}
	}
	function startTimer() {
		if (props.interval <= 0 || !props.autoplay || timer.value) return;
		timer.value = setInterval(() => playSlides(), props.interval);
	}
	const playSlides = () => {
		if (activeIndex.value < items.value.length - 1) activeIndex.value = activeIndex.value + 1;
		else if (props.loop) activeIndex.value = 0;
	};
	function setActiveItem(index) {
		if ((0, _vue_shared.isString)(index)) {
			const filteredItems = items.value.filter((item) => item.props.name === index);
			if (filteredItems.length > 0) index = items.value.indexOf(filteredItems[0]);
		}
		index = Number(index);
		if (Number.isNaN(index) || index !== Math.floor(index)) {
			require_error.debugWarn(componentName, "index must be integer.");
			return;
		}
		const itemCount = items.value.length;
		const oldIndex = activeIndex.value;
		if (index < 0) activeIndex.value = props.loop ? itemCount - 1 : 0;
		else if (index >= itemCount) activeIndex.value = props.loop ? 0 : itemCount - 1;
		else activeIndex.value = index;
		if (oldIndex === activeIndex.value) resetItemPosition(oldIndex);
		resetTimer();
	}
	function resetItemPosition(oldIndex) {
		items.value.forEach((item, index) => {
			item.translateItem(index, activeIndex.value, oldIndex);
		});
	}
	function itemInStage(item, index) {
		const _items = (0, vue.unref)(items);
		const itemCount = _items.length;
		if (itemCount === 0 || !item.states.inStage) return false;
		const nextItemIndex = index + 1;
		const prevItemIndex = index - 1;
		const lastItemIndex = itemCount - 1;
		const isLastItemActive = _items[lastItemIndex].states.active;
		const isFirstItemActive = _items[0].states.active;
		const isNextItemActive = _items[nextItemIndex]?.states?.active;
		const isPrevItemActive = _items[prevItemIndex]?.states?.active;
		if (index === lastItemIndex && isFirstItemActive || isNextItemActive) return "left";
		else if (index === 0 && isLastItemActive || isPrevItemActive) return "right";
		return false;
	}
	function handleMouseEnter() {
		hover.value = true;
		if (props.pauseOnHover) pauseTimer();
	}
	function handleMouseLeave() {
		hover.value = false;
		startTimer();
	}
	function handleButtonEnter(arrow) {
		if ((0, vue.unref)(isVertical)) return;
		items.value.forEach((item, index) => {
			if (arrow === itemInStage(item, index)) item.states.hover = true;
		});
	}
	function handleButtonLeave() {
		if ((0, vue.unref)(isVertical)) return;
		items.value.forEach((item) => {
			item.states.hover = false;
		});
	}
	function handleIndicatorClick(index) {
		activeIndex.value = index;
	}
	function handleIndicatorHover(index) {
		if (props.trigger === "hover" && index !== activeIndex.value) activeIndex.value = index;
	}
	function prev() {
		setActiveItem(activeIndex.value - 1);
	}
	function next() {
		setActiveItem(activeIndex.value + 1);
	}
	function resetTimer() {
		pauseTimer();
		if (!props.pauseOnHover || !hover.value) startTimer();
	}
	function setContainerHeight(height) {
		if (props.height !== "auto") return;
		containerHeight.value = height;
	}
	function PlaceholderItem() {
		const defaultSlots = slots.default?.();
		if (!defaultSlots) return null;
		const normalizeSlots = require_vnode.flattedChildren(defaultSlots).filter((slot) => {
			return (0, vue.isVNode)(slot) && slot.type.name === require_constants.CAROUSEL_ITEM_NAME;
		});
		if (normalizeSlots?.length === 2 && props.loop && !isCardType.value) {
			isItemsTwoLength.value = true;
			return normalizeSlots;
		}
		isItemsTwoLength.value = false;
		return null;
	}
	(0, vue.watch)(() => activeIndex.value, (current, prev) => {
		resetItemPosition(prev);
		if (isItemsTwoLength.value) {
			current = current % 2;
			prev = prev % 2;
		}
		if (prev > -1) emit(require_event.CHANGE_EVENT, current, prev);
	});
	const exposeActiveIndex = (0, vue.computed)({
		get: () => {
			return isItemsTwoLength.value ? activeIndex.value % 2 : activeIndex.value;
		},
		set: (value) => activeIndex.value = value
	});
	(0, vue.watch)(() => props.autoplay, (autoplay) => {
		autoplay ? startTimer() : pauseTimer();
	});
	(0, vue.watch)(() => props.loop, () => {
		setActiveItem(activeIndex.value);
	});
	(0, vue.watch)(() => props.interval, () => {
		resetTimer();
	});
	const resizeObserver = (0, vue.shallowRef)();
	(0, vue.onMounted)(() => {
		(0, vue.watch)(() => items.value, () => {
			if (items.value.length > 0) setActiveItem(props.initialIndex);
		}, { immediate: true });
		resizeObserver.value = (0, _vueuse_core.useResizeObserver)(root.value, () => {
			resetItemPosition();
		});
		startTimer();
	});
	(0, vue.onBeforeUnmount)(() => {
		pauseTimer();
		if (root.value && resizeObserver.value) resizeObserver.value.stop();
	});
	(0, vue.provide)(require_constants.carouselContextKey, {
		root,
		isCardType,
		isVertical,
		items,
		loop: props.loop,
		cardScale: props.cardScale,
		addItem,
		removeItem,
		setActiveItem,
		setContainerHeight
	});
	return {
		root,
		activeIndex,
		exposeActiveIndex,
		arrowDisplay,
		hasLabel,
		hover,
		isCardType,
		items,
		isVertical,
		containerStyle,
		isItemsTwoLength,
		handleButtonEnter,
		handleButtonLeave,
		handleIndicatorClick,
		handleMouseEnter,
		handleMouseLeave,
		setActiveItem,
		prev,
		next,
		PlaceholderItem,
		isTwoLengthShow,
		ItemsSorter,
		throttledArrowClick,
		throttledIndicatorHover
	};
};

//#endregion
exports.useCarousel = useCarousel;
//# sourceMappingURL=use-carousel.js.map
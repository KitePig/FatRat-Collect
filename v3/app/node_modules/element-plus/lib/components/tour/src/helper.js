Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_objects = require('../../../utils/objects.js');
let vue = require("vue");
let _floating_ui_dom = require("@floating-ui/dom");
let _vue_shared = require("@vue/shared");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/components/tour/src/helper.ts
const useTarget = (target, open, gap, mergedMask, scrollIntoViewOptions) => {
	const posInfo = (0, vue.ref)(null);
	const getTargetEl = () => {
		let targetEl;
		if ((0, _vue_shared.isString)(target.value)) targetEl = document.querySelector(target.value);
		else if ((0, _vue_shared.isFunction)(target.value)) targetEl = target.value();
		else targetEl = target.value;
		return targetEl;
	};
	const updatePosInfo = () => {
		const targetEl = getTargetEl();
		if (!targetEl || !open.value) {
			posInfo.value = null;
			return;
		}
		if (!isInViewPort(targetEl)) targetEl.scrollIntoView(scrollIntoViewOptions.value);
		const { left, top, width, height } = targetEl.getBoundingClientRect();
		posInfo.value = {
			left,
			top,
			width,
			height,
			radius: 0
		};
	};
	(0, vue.onMounted)(() => {
		(0, vue.watch)([open, target], () => {
			updatePosInfo();
		}, { immediate: true });
		window.addEventListener("resize", updatePosInfo);
	});
	(0, vue.onBeforeUnmount)(() => {
		window.removeEventListener("resize", updatePosInfo);
	});
	const getGapOffset = (index) => ((0, _vue_shared.isArray)(gap.value.offset) ? gap.value.offset[index] : gap.value.offset) ?? 6;
	const mergedPosInfo = (0, vue.computed)(() => {
		if (!posInfo.value) return posInfo.value;
		const gapOffsetX = getGapOffset(0);
		const gapOffsetY = getGapOffset(1);
		const gapRadius = gap.value?.radius || 2;
		return {
			left: posInfo.value.left - gapOffsetX,
			top: posInfo.value.top - gapOffsetY,
			width: posInfo.value.width + gapOffsetX * 2,
			height: posInfo.value.height + gapOffsetY * 2,
			radius: gapRadius
		};
	});
	return {
		mergedPosInfo,
		triggerTarget: (0, vue.computed)(() => {
			const targetEl = getTargetEl();
			if (!mergedMask.value || !targetEl || !window.DOMRect) return targetEl || void 0;
			return { getBoundingClientRect() {
				return window.DOMRect.fromRect({
					width: mergedPosInfo.value?.width || 0,
					height: mergedPosInfo.value?.height || 0,
					x: mergedPosInfo.value?.left || 0,
					y: mergedPosInfo.value?.top || 0
				});
			} };
		})
	};
};
const tourKey = Symbol("ElTour");
function isInViewPort(element) {
	const viewWidth = window.innerWidth || document.documentElement.clientWidth;
	const viewHeight = window.innerHeight || document.documentElement.clientHeight;
	const { top, right, bottom, left } = element.getBoundingClientRect();
	return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
const useFloating = (referenceRef, contentRef, arrowRef, placement, strategy, offset, zIndex, showArrow) => {
	const x = (0, vue.ref)();
	const y = (0, vue.ref)();
	const middlewareData = (0, vue.ref)({});
	const states = {
		x,
		y,
		placement,
		strategy,
		middlewareData
	};
	const middleware = (0, vue.computed)(() => {
		const _middleware = [
			(0, _floating_ui_dom.offset)((0, vue.unref)(offset)),
			(0, _floating_ui_dom.flip)(),
			(0, _floating_ui_dom.shift)(),
			overflowMiddleware()
		];
		if ((0, vue.unref)(showArrow) && (0, vue.unref)(arrowRef)) _middleware.push((0, _floating_ui_dom.arrow)({ element: (0, vue.unref)(arrowRef) }));
		return _middleware;
	});
	const update = async () => {
		if (!_vueuse_core.isClient) return;
		const referenceEl = (0, vue.unref)(referenceRef);
		const contentEl = (0, vue.unref)(contentRef);
		if (!referenceEl || !contentEl) return;
		const data = await (0, _floating_ui_dom.computePosition)(referenceEl, contentEl, {
			placement: (0, vue.unref)(placement),
			strategy: (0, vue.unref)(strategy),
			middleware: (0, vue.unref)(middleware)
		});
		require_objects.keysOf(states).forEach((key) => {
			states[key].value = data[key];
		});
	};
	const contentStyle = (0, vue.computed)(() => {
		if (!(0, vue.unref)(referenceRef)) return {
			position: "fixed",
			top: "50%",
			left: "50%",
			transform: "translate3d(-50%, -50%, 0)",
			maxWidth: "100vw",
			zIndex: (0, vue.unref)(zIndex)
		};
		const { overflow } = (0, vue.unref)(middlewareData);
		return {
			position: (0, vue.unref)(strategy),
			zIndex: (0, vue.unref)(zIndex),
			top: (0, vue.unref)(y) != null ? `${(0, vue.unref)(y)}px` : "",
			left: (0, vue.unref)(x) != null ? `${(0, vue.unref)(x)}px` : "",
			maxWidth: overflow?.maxWidth ? `${overflow?.maxWidth}px` : ""
		};
	});
	const arrowStyle = (0, vue.computed)(() => {
		if (!(0, vue.unref)(showArrow)) return {};
		const { arrow } = (0, vue.unref)(middlewareData);
		return {
			left: arrow?.x != null ? `${arrow?.x}px` : "",
			top: arrow?.y != null ? `${arrow?.y}px` : ""
		};
	});
	let cleanup;
	(0, vue.onMounted)(() => {
		const referenceEl = (0, vue.unref)(referenceRef);
		const contentEl = (0, vue.unref)(contentRef);
		if (referenceEl && contentEl) cleanup = (0, _floating_ui_dom.autoUpdate)(referenceEl, contentEl, update);
		(0, vue.watchEffect)(() => {
			update();
		});
	});
	(0, vue.onBeforeUnmount)(() => {
		cleanup && cleanup();
	});
	return {
		update,
		contentStyle,
		arrowStyle
	};
};
const overflowMiddleware = () => {
	return {
		name: "overflow",
		async fn(state) {
			const overflow = await (0, _floating_ui_dom.detectOverflow)(state);
			let overWidth = 0;
			if (overflow.left > 0) overWidth = overflow.left;
			if (overflow.right > 0) overWidth = overflow.right;
			return { data: { maxWidth: state.rects.floating.width - overWidth } };
		}
	};
};

//#endregion
exports.tourKey = tourKey;
exports.useFloating = useFloating;
exports.useTarget = useTarget;
//# sourceMappingURL=helper.js.map
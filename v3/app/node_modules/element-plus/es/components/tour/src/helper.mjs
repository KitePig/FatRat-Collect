import { isClient } from "../../../utils/browser.mjs";
import { isArray, isFunction, isString } from "../../../utils/types.mjs";
import { keysOf } from "../../../utils/objects.mjs";
import { computed, onBeforeUnmount, onMounted, ref, unref, watch, watchEffect } from "vue";
import { arrow, autoUpdate, computePosition, detectOverflow, flip, offset, shift } from "@floating-ui/dom";

//#region ../../packages/components/tour/src/helper.ts
const useTarget = (target, open, gap, mergedMask, scrollIntoViewOptions) => {
	const posInfo = ref(null);
	const getTargetEl = () => {
		let targetEl;
		if (isString(target.value)) targetEl = document.querySelector(target.value);
		else if (isFunction(target.value)) targetEl = target.value();
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
	onMounted(() => {
		watch([open, target], () => {
			updatePosInfo();
		}, { immediate: true });
		window.addEventListener("resize", updatePosInfo);
	});
	onBeforeUnmount(() => {
		window.removeEventListener("resize", updatePosInfo);
	});
	const getGapOffset = (index) => (isArray(gap.value.offset) ? gap.value.offset[index] : gap.value.offset) ?? 6;
	const mergedPosInfo = computed(() => {
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
		triggerTarget: computed(() => {
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
const useFloating = (referenceRef, contentRef, arrowRef, placement, strategy, offset$1, zIndex, showArrow) => {
	const x = ref();
	const y = ref();
	const middlewareData = ref({});
	const states = {
		x,
		y,
		placement,
		strategy,
		middlewareData
	};
	const middleware = computed(() => {
		const _middleware = [
			offset(unref(offset$1)),
			flip(),
			shift(),
			overflowMiddleware()
		];
		if (unref(showArrow) && unref(arrowRef)) _middleware.push(arrow({ element: unref(arrowRef) }));
		return _middleware;
	});
	const update = async () => {
		if (!isClient) return;
		const referenceEl = unref(referenceRef);
		const contentEl = unref(contentRef);
		if (!referenceEl || !contentEl) return;
		const data = await computePosition(referenceEl, contentEl, {
			placement: unref(placement),
			strategy: unref(strategy),
			middleware: unref(middleware)
		});
		keysOf(states).forEach((key) => {
			states[key].value = data[key];
		});
	};
	const contentStyle = computed(() => {
		if (!unref(referenceRef)) return {
			position: "fixed",
			top: "50%",
			left: "50%",
			transform: "translate3d(-50%, -50%, 0)",
			maxWidth: "100vw",
			zIndex: unref(zIndex)
		};
		const { overflow } = unref(middlewareData);
		return {
			position: unref(strategy),
			zIndex: unref(zIndex),
			top: unref(y) != null ? `${unref(y)}px` : "",
			left: unref(x) != null ? `${unref(x)}px` : "",
			maxWidth: overflow?.maxWidth ? `${overflow?.maxWidth}px` : ""
		};
	});
	const arrowStyle = computed(() => {
		if (!unref(showArrow)) return {};
		const { arrow } = unref(middlewareData);
		return {
			left: arrow?.x != null ? `${arrow?.x}px` : "",
			top: arrow?.y != null ? `${arrow?.y}px` : ""
		};
	});
	let cleanup;
	onMounted(() => {
		const referenceEl = unref(referenceRef);
		const contentEl = unref(contentRef);
		if (referenceEl && contentEl) cleanup = autoUpdate(referenceEl, contentEl, update);
		watchEffect(() => {
			update();
		});
	});
	onBeforeUnmount(() => {
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
			const overflow = await detectOverflow(state);
			let overWidth = 0;
			if (overflow.left > 0) overWidth = overflow.left;
			if (overflow.right > 0) overWidth = overflow.right;
			return { data: { maxWidth: state.rects.floating.width - overWidth } };
		}
	};
};

//#endregion
export { tourKey, useFloating, useTarget };
//# sourceMappingURL=helper.mjs.map
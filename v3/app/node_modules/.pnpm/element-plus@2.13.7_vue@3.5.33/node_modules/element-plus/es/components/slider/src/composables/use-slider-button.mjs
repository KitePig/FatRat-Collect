import { EVENT_CODE } from "../../../../constants/aria.mjs";
import { UPDATE_MODEL_EVENT } from "../../../../constants/event.mjs";
import { getEventCode } from "../../../../utils/dom/event.mjs";
import { isNumber } from "../../../../utils/types.mjs";
import { sliderContextKey } from "../constants.mjs";
import { useEventListener } from "@vueuse/core";
import { clamp as clamp$1, debounce } from "lodash-unified";
import { computed, inject, nextTick, ref, watch } from "vue";

//#region ../../packages/components/slider/src/composables/use-slider-button.ts
const useTooltip = (props, formatTooltip, showTooltip) => {
	const tooltip = ref();
	const tooltipVisible = ref(false);
	const enableFormat = computed(() => {
		return formatTooltip.value instanceof Function;
	});
	return {
		tooltip,
		tooltipVisible,
		formatValue: computed(() => {
			return enableFormat.value && formatTooltip.value(props.modelValue) || props.modelValue;
		}),
		displayTooltip: debounce(() => {
			showTooltip.value && (tooltipVisible.value = true);
		}, 50),
		hideTooltip: debounce(() => {
			showTooltip.value && (tooltipVisible.value = false);
		}, 50)
	};
};
const useSliderButton = (props, initData, emit) => {
	const { disabled, min, max, step, showTooltip, persistent, precision, sliderSize, formatTooltip, emitChange, resetSize, updateDragging, markList } = inject(sliderContextKey);
	const { tooltip, tooltipVisible, formatValue, displayTooltip, hideTooltip } = useTooltip(props, formatTooltip, showTooltip);
	const button = ref();
	const currentPosition = computed(() => {
		return `${(props.modelValue - min.value) / (max.value - min.value) * 100}%`;
	});
	const wrapperStyle = computed(() => {
		return props.vertical ? { bottom: currentPosition.value } : { left: currentPosition.value };
	});
	const shouldMoveToMark = computed(() => {
		return step.value === "mark" && markList.value.length > 0;
	});
	const handleMouseEnter = () => {
		initData.hovering = true;
		displayTooltip();
	};
	const handleMouseLeave = () => {
		initData.hovering = false;
		if (!initData.dragging) hideTooltip();
	};
	const onButtonDown = (event) => {
		if (disabled.value) return;
		event.preventDefault();
		onDragStart(event);
		window.addEventListener("mousemove", onDragging);
		window.addEventListener("touchmove", onDragging);
		window.addEventListener("mouseup", onDragEnd);
		window.addEventListener("touchend", onDragEnd);
		window.addEventListener("contextmenu", onDragEnd);
		button.value.focus();
	};
	const incrementPosition = (amount) => {
		if (disabled.value) return;
		initData.newPosition = Number.parseFloat(currentPosition.value) + amount / (max.value - min.value) * 100;
		setPosition(initData.newPosition);
		emitChange();
	};
	const moveToMark = (amount) => {
		if (disabled.value || !markList.value.length) return;
		const current = props.modelValue;
		const epsilon = Number.EPSILON;
		const stride = Math.abs(amount);
		let target;
		if (amount > 0) {
			const startIndex = markList.value.findIndex((m) => m.point > current + epsilon);
			if (startIndex !== -1) {
				const targetIndex = Math.min(startIndex + stride - 1, markList.value.length - 1);
				target = markList.value[targetIndex].point;
			}
		} else {
			let startIndex = -1;
			for (let i = markList.value.length - 1; i >= 0; i--) if (markList.value[i].point < current - epsilon) {
				startIndex = i;
				break;
			}
			if (startIndex !== -1) {
				const targetIndex = Math.max(startIndex - (stride - 1), 0);
				target = markList.value[targetIndex].point;
			}
		}
		if (target !== void 0 && target !== current) {
			setPosition((target - min.value) / (max.value - min.value) * 100);
			emitChange();
		}
	};
	const onLeftKeyDown = () => {
		if (shouldMoveToMark.value) moveToMark(-1);
		else if (isNumber(step.value)) incrementPosition(-step.value);
	};
	const onRightKeyDown = () => {
		if (shouldMoveToMark.value) moveToMark(1);
		else if (isNumber(step.value)) incrementPosition(step.value);
	};
	const onPageDownKeyDown = () => {
		if (shouldMoveToMark.value) moveToMark(-4);
		else if (isNumber(step.value)) incrementPosition(-step.value * 4);
	};
	const onPageUpKeyDown = () => {
		if (shouldMoveToMark.value) moveToMark(4);
		else if (isNumber(step.value)) incrementPosition(step.value * 4);
	};
	const onHomeKeyDown = () => {
		if (disabled.value) return;
		setPosition(0);
		emitChange();
	};
	const onEndKeyDown = () => {
		if (disabled.value) return;
		setPosition(100);
		emitChange();
	};
	const onKeyDown = (event) => {
		const code = getEventCode(event);
		let isPreventDefault = true;
		switch (code) {
			case EVENT_CODE.left:
			case EVENT_CODE.down:
				onLeftKeyDown();
				break;
			case EVENT_CODE.right:
			case EVENT_CODE.up:
				onRightKeyDown();
				break;
			case EVENT_CODE.home:
				onHomeKeyDown();
				break;
			case EVENT_CODE.end:
				onEndKeyDown();
				break;
			case EVENT_CODE.pageDown:
				onPageDownKeyDown();
				break;
			case EVENT_CODE.pageUp:
				onPageUpKeyDown();
				break;
			default:
				isPreventDefault = false;
				break;
		}
		isPreventDefault && event.preventDefault();
	};
	const getClientXY = (event) => {
		let clientX;
		let clientY;
		if (event.type.startsWith("touch")) {
			clientY = event.touches[0].clientY;
			clientX = event.touches[0].clientX;
		} else {
			clientY = event.clientY;
			clientX = event.clientX;
		}
		return {
			clientX,
			clientY
		};
	};
	const onDragStart = (event) => {
		initData.dragging = true;
		initData.isClick = true;
		const { clientX, clientY } = getClientXY(event);
		if (props.vertical) initData.startY = clientY;
		else initData.startX = clientX;
		initData.startPosition = Number.parseFloat(currentPosition.value);
		initData.newPosition = initData.startPosition;
	};
	const onDragging = (event) => {
		if (initData.dragging) {
			initData.isClick = false;
			displayTooltip();
			resetSize();
			let diff;
			const { clientX, clientY } = getClientXY(event);
			if (props.vertical) {
				initData.currentY = clientY;
				diff = (initData.startY - initData.currentY) / sliderSize.value * 100;
			} else {
				initData.currentX = clientX;
				diff = (initData.currentX - initData.startX) / sliderSize.value * 100;
			}
			initData.newPosition = initData.startPosition + diff;
			setPosition(initData.newPosition);
		}
	};
	const onDragEnd = () => {
		if (initData.dragging) {
			setTimeout(() => {
				initData.dragging = false;
				if (!initData.hovering) hideTooltip();
				if (!initData.isClick) setPosition(initData.newPosition);
				emitChange();
			}, 0);
			window.removeEventListener("mousemove", onDragging);
			window.removeEventListener("touchmove", onDragging);
			window.removeEventListener("mouseup", onDragEnd);
			window.removeEventListener("touchend", onDragEnd);
			window.removeEventListener("contextmenu", onDragEnd);
		}
	};
	const setPosition = async (newPosition) => {
		if (newPosition === null || Number.isNaN(+newPosition)) return;
		newPosition = clamp$1(newPosition, 0, 100);
		let value;
		if (step.value === "mark") if (markList.value.length === 0) value = newPosition <= 50 ? min.value : max.value;
		else value = markList.value.reduce((prev, curr) => {
			return Math.abs(curr.position - newPosition) < Math.abs(prev.position - newPosition) ? curr : prev;
		}).point;
		else {
			const fullSteps = Math.floor((max.value - min.value) / step.value);
			const fullRangePercentage = fullSteps * step.value / (max.value - min.value) * 100;
			const threshold = fullRangePercentage + (100 - fullRangePercentage) / 2;
			if (newPosition < fullRangePercentage) {
				const valueBetween = fullRangePercentage / fullSteps;
				const steps = Math.round(newPosition / valueBetween);
				value = min.value + steps * step.value;
			} else if (newPosition < threshold) value = min.value + fullSteps * step.value;
			else value = max.value;
			value = Number.parseFloat(value.toFixed(precision.value));
		}
		if (value !== props.modelValue) emit(UPDATE_MODEL_EVENT, value);
		if (!initData.dragging && props.modelValue !== initData.oldValue) initData.oldValue = props.modelValue;
		await nextTick();
		initData.dragging && displayTooltip();
		tooltip.value.updatePopper();
	};
	watch(() => initData.dragging, (val) => {
		updateDragging(val);
	});
	useEventListener(button, "touchstart", onButtonDown, { passive: false });
	return {
		disabled,
		button,
		tooltip,
		tooltipVisible,
		showTooltip,
		persistent,
		wrapperStyle,
		formatValue,
		handleMouseEnter,
		handleMouseLeave,
		onButtonDown,
		onKeyDown,
		setPosition
	};
};

//#endregion
export { useSliderButton };
//# sourceMappingURL=use-slider-button.mjs.map
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../../constants/aria.js');
const require_event = require('../../../../constants/event.js');
const require_event$1 = require('../../../../utils/dom/event.js');
const require_types = require('../../../../utils/types.js');
const require_constants = require('../constants.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/slider/src/composables/use-slider-button.ts
const useTooltip = (props, formatTooltip, showTooltip) => {
	const tooltip = (0, vue.ref)();
	const tooltipVisible = (0, vue.ref)(false);
	const enableFormat = (0, vue.computed)(() => {
		return formatTooltip.value instanceof Function;
	});
	return {
		tooltip,
		tooltipVisible,
		formatValue: (0, vue.computed)(() => {
			return enableFormat.value && formatTooltip.value(props.modelValue) || props.modelValue;
		}),
		displayTooltip: (0, lodash_unified.debounce)(() => {
			showTooltip.value && (tooltipVisible.value = true);
		}, 50),
		hideTooltip: (0, lodash_unified.debounce)(() => {
			showTooltip.value && (tooltipVisible.value = false);
		}, 50)
	};
};
const useSliderButton = (props, initData, emit) => {
	const { disabled, min, max, step, showTooltip, persistent, precision, sliderSize, formatTooltip, emitChange, resetSize, updateDragging, markList } = (0, vue.inject)(require_constants.sliderContextKey);
	const { tooltip, tooltipVisible, formatValue, displayTooltip, hideTooltip } = useTooltip(props, formatTooltip, showTooltip);
	const button = (0, vue.ref)();
	const currentPosition = (0, vue.computed)(() => {
		return `${(props.modelValue - min.value) / (max.value - min.value) * 100}%`;
	});
	const wrapperStyle = (0, vue.computed)(() => {
		return props.vertical ? { bottom: currentPosition.value } : { left: currentPosition.value };
	});
	const shouldMoveToMark = (0, vue.computed)(() => {
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
		else if (require_types.isNumber(step.value)) incrementPosition(-step.value);
	};
	const onRightKeyDown = () => {
		if (shouldMoveToMark.value) moveToMark(1);
		else if (require_types.isNumber(step.value)) incrementPosition(step.value);
	};
	const onPageDownKeyDown = () => {
		if (shouldMoveToMark.value) moveToMark(-4);
		else if (require_types.isNumber(step.value)) incrementPosition(-step.value * 4);
	};
	const onPageUpKeyDown = () => {
		if (shouldMoveToMark.value) moveToMark(4);
		else if (require_types.isNumber(step.value)) incrementPosition(step.value * 4);
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
		const code = require_event$1.getEventCode(event);
		let isPreventDefault = true;
		switch (code) {
			case require_aria.EVENT_CODE.left:
			case require_aria.EVENT_CODE.down:
				onLeftKeyDown();
				break;
			case require_aria.EVENT_CODE.right:
			case require_aria.EVENT_CODE.up:
				onRightKeyDown();
				break;
			case require_aria.EVENT_CODE.home:
				onHomeKeyDown();
				break;
			case require_aria.EVENT_CODE.end:
				onEndKeyDown();
				break;
			case require_aria.EVENT_CODE.pageDown:
				onPageDownKeyDown();
				break;
			case require_aria.EVENT_CODE.pageUp:
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
		newPosition = (0, lodash_unified.clamp)(newPosition, 0, 100);
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
		if (value !== props.modelValue) emit(require_event.UPDATE_MODEL_EVENT, value);
		if (!initData.dragging && props.modelValue !== initData.oldValue) initData.oldValue = props.modelValue;
		await (0, vue.nextTick)();
		initData.dragging && displayTooltip();
		tooltip.value.updatePopper();
	};
	(0, vue.watch)(() => initData.dragging, (val) => {
		updateDragging(val);
	});
	(0, _vueuse_core.useEventListener)(button, "touchstart", onButtonDown, { passive: false });
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
exports.useSliderButton = useSliderButton;
//# sourceMappingURL=use-slider-button.js.map
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../../constants/event.mjs";
import { useFormDisabled } from "../../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem } from "../../../form/src/hooks/use-form-item.mjs";
import { computed, nextTick, ref, shallowRef } from "vue";

//#region ../../packages/components/slider/src/composables/use-slide.ts
const useSlide = (props, initData, emit) => {
	const { formItem: elFormItem } = useFormItem();
	const slider = shallowRef();
	const firstButton = ref();
	const secondButton = ref();
	const buttonRefs = {
		firstButton,
		secondButton
	};
	const sliderDisabled = useFormDisabled();
	const minValue = computed(() => {
		return Math.min(initData.firstValue, initData.secondValue);
	});
	const maxValue = computed(() => {
		return Math.max(initData.firstValue, initData.secondValue);
	});
	const barSize = computed(() => {
		return props.range ? `${100 * (maxValue.value - minValue.value) / (props.max - props.min)}%` : `${100 * (initData.firstValue - props.min) / (props.max - props.min)}%`;
	});
	const barStart = computed(() => {
		return props.range ? `${100 * (minValue.value - props.min) / (props.max - props.min)}%` : "0%";
	});
	const runwayStyle = computed(() => {
		return props.vertical ? { height: props.height } : {};
	});
	const barStyle = computed(() => {
		return props.vertical ? {
			height: barSize.value,
			bottom: barStart.value
		} : {
			width: barSize.value,
			left: barStart.value
		};
	});
	const resetSize = () => {
		if (slider.value) initData.sliderSize = slider.value.getBoundingClientRect()[props.vertical ? "height" : "width"];
	};
	const getButtonRefByPercent = (percent) => {
		const targetValue = props.min + percent * (props.max - props.min) / 100;
		if (!props.range) return firstButton;
		let buttonRefName;
		if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) buttonRefName = initData.firstValue < initData.secondValue ? "firstButton" : "secondButton";
		else buttonRefName = initData.firstValue > initData.secondValue ? "firstButton" : "secondButton";
		return buttonRefs[buttonRefName];
	};
	const setPosition = (percent) => {
		const buttonRef = getButtonRefByPercent(percent);
		buttonRef.value.setPosition(percent);
		return buttonRef;
	};
	const setFirstValue = (firstValue) => {
		initData.firstValue = firstValue ?? props.min;
		_emit(props.range ? [minValue.value, maxValue.value] : firstValue ?? props.min);
	};
	const setSecondValue = (secondValue) => {
		initData.secondValue = secondValue;
		if (props.range) _emit([minValue.value, maxValue.value]);
	};
	const _emit = (val) => {
		emit(UPDATE_MODEL_EVENT, val);
		emit(INPUT_EVENT, val);
	};
	const emitChange = async () => {
		await nextTick();
		emit(CHANGE_EVENT, props.range ? [minValue.value, maxValue.value] : props.modelValue);
	};
	const handleSliderPointerEvent = (event) => {
		if (sliderDisabled.value || initData.dragging) return;
		resetSize();
		let newPercent = 0;
		if (props.vertical) {
			const clientY = event.touches?.item(0)?.clientY ?? event.clientY;
			newPercent = (slider.value.getBoundingClientRect().bottom - clientY) / initData.sliderSize * 100;
		} else newPercent = ((event.touches?.item(0)?.clientX ?? event.clientX) - slider.value.getBoundingClientRect().left) / initData.sliderSize * 100;
		if (newPercent < 0 || newPercent > 100) return;
		return setPosition(newPercent);
	};
	const onSliderWrapperPrevent = (event) => {
		if (buttonRefs["firstButton"].value?.dragging || buttonRefs["secondButton"].value?.dragging) event.preventDefault();
	};
	const onSliderDown = async (event) => {
		const buttonRef = handleSliderPointerEvent(event);
		if (buttonRef) {
			await nextTick();
			buttonRef.value.onButtonDown(event);
		}
	};
	const onSliderClick = (event) => {
		if (handleSliderPointerEvent(event)) emitChange();
	};
	const onSliderMarkerDown = (position) => {
		if (sliderDisabled.value || initData.dragging) return;
		if (setPosition(position)) emitChange();
	};
	return {
		elFormItem,
		slider,
		firstButton,
		secondButton,
		sliderDisabled,
		minValue,
		maxValue,
		runwayStyle,
		barStyle,
		resetSize,
		setPosition,
		emitChange,
		onSliderWrapperPrevent,
		onSliderClick,
		onSliderDown,
		onSliderMarkerDown,
		setFirstValue,
		setSecondValue
	};
};

//#endregion
export { useSlide };
//# sourceMappingURL=use-slide.mjs.map
import { MINIMUM_INPUT_WIDTH } from "../../constants/form.mjs";
import { useResizeObserver } from "@vueuse/core";
import { computed, ref, shallowRef } from "vue";

//#region ../../packages/hooks/use-calc-input-width/index.ts
function useCalcInputWidth() {
	const calculatorRef = shallowRef();
	const calculatorWidth = ref(0);
	const inputStyle = computed(() => ({ minWidth: `${Math.max(calculatorWidth.value, MINIMUM_INPUT_WIDTH)}px` }));
	const resetCalculatorWidth = () => {
		calculatorWidth.value = calculatorRef.value?.getBoundingClientRect().width ?? 0;
	};
	useResizeObserver(calculatorRef, resetCalculatorWidth);
	return {
		calculatorRef,
		calculatorWidth,
		inputStyle
	};
}

//#endregion
export { useCalcInputWidth };
//# sourceMappingURL=index.mjs.map
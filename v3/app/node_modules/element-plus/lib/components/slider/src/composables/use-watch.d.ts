import { FormItemContext } from "../../../form/src/types.js";
import "../../../form/index.js";
import { SliderEmits, SliderInitData, SliderProps } from "../slider.js";
import { ComputedRef, SetupContext } from "vue";

//#region ../../packages/components/slider/src/composables/use-watch.d.ts
declare const useWatch: (props: SliderProps, initData: SliderInitData, minValue: ComputedRef<number>, maxValue: ComputedRef<number>, emit: SetupContext<SliderEmits>["emit"], elFormItem: FormItemContext) => void;
//#endregion
export { useWatch };
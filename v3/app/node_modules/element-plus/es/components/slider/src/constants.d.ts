import { SliderProps } from "./slider.js";
import { Mark } from "./composables/use-marks.js";
import { ComputedRef, InjectionKey, Ref, ToRefs } from "vue";

//#region ../../packages/components/slider/src/constants.d.ts
interface SliderContext extends ToRefs<SliderProps> {
  precision: ComputedRef<number>;
  sliderSize: Ref<number>;
  emitChange: () => void;
  resetSize: () => void;
  updateDragging: (val: boolean) => void;
  disabled: ComputedRef<boolean>;
  markList: ComputedRef<Mark[]>;
}
declare const sliderContextKey: InjectionKey<SliderContext>;
//#endregion
export { SliderContext, sliderContextKey };
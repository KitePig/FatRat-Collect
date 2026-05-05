import { SliderInitData, SliderProps } from "../slider.js";
import { CSSProperties, ComputedRef } from "vue";

//#region ../../packages/components/slider/src/composables/use-stops.d.ts
type Stops = {
  stops: ComputedRef<number[]>;
  getStopStyle: (position: number) => CSSProperties;
};
declare const useStops: (props: SliderProps, initData: SliderInitData, minValue: ComputedRef<number>, maxValue: ComputedRef<number>) => Stops;
//#endregion
export { useStops };
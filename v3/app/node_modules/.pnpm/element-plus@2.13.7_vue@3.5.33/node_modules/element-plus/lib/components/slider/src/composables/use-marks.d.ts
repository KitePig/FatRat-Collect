import { SliderMarkerProps } from "../marker.js";
import { SliderProps } from "../slider.js";
import * as vue from "vue";

//#region ../../packages/components/slider/src/composables/use-marks.d.ts
interface Mark extends SliderMarkerProps {
  point: number;
  position: number;
}
declare const useMarks: (props: SliderProps) => vue.ComputedRef<Mark[]>;
//#endregion
export { Mark, useMarks };
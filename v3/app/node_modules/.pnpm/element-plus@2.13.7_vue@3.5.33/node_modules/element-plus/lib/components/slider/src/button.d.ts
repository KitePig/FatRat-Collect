import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./button.vue.js";
import { ComponentPublicInstance, ExtractPropTypes, ExtractPublicPropTypes, Ref } from "vue";
import * as _popperjs_core0 from "@popperjs/core";

//#region ../../packages/components/slider/src/button.d.ts
declare const sliderButtonProps: {
  readonly modelValue: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly vertical: BooleanConstructor;
  readonly tooltipClass: StringConstructor;
  readonly placement: EpPropFinalized<StringConstructor, _popperjs_core0.Placement, unknown, "top", boolean>;
};
type SliderButtonProps = ExtractPropTypes<typeof sliderButtonProps>;
declare const sliderButtonEmits: {
  "update:modelValue": (value: number) => boolean;
};
type SliderButtonEmits = typeof sliderButtonEmits;
type SliderButtonInstance = ComponentPublicInstance<typeof _default>;
interface SliderButtonInitData {
  hovering: boolean;
  dragging: boolean;
  isClick: boolean;
  startX: number;
  currentX: number;
  startY: number;
  currentY: number;
  startPosition: number;
  newPosition: number;
  oldValue: number;
}
//#endregion
export { SliderButtonEmits, SliderButtonInitData, SliderButtonInstance, SliderButtonProps };
import { FormItemContext } from "../../../form/src/types.js";
import "../../../form/index.js";
import { SliderEmits, SliderInitData, SliderProps } from "../slider.js";
import { SliderButtonInstance } from "../button.js";
import * as vue from "vue";
import { CSSProperties, Ref, SetupContext } from "vue";

//#region ../../packages/components/slider/src/composables/use-slide.d.ts
declare const useSlide: (props: SliderProps, initData: SliderInitData, emit: SetupContext<SliderEmits>["emit"]) => {
  elFormItem: FormItemContext | undefined;
  slider: vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  firstButton: Ref<SliderButtonInstance | undefined, SliderButtonInstance | undefined>;
  secondButton: Ref<SliderButtonInstance | undefined, SliderButtonInstance | undefined>;
  sliderDisabled: vue.ComputedRef<boolean>;
  minValue: vue.ComputedRef<number>;
  maxValue: vue.ComputedRef<number>;
  runwayStyle: vue.ComputedRef<CSSProperties>;
  barStyle: vue.ComputedRef<CSSProperties>;
  resetSize: () => void;
  setPosition: (percent: number) => Ref<SliderButtonInstance | undefined>;
  emitChange: () => Promise<void>;
  onSliderWrapperPrevent: (event: TouchEvent) => void;
  onSliderClick: (event: MouseEvent | TouchEvent) => void;
  onSliderDown: (event: MouseEvent | TouchEvent) => Promise<void>;
  onSliderMarkerDown: (position: number) => void;
  setFirstValue: (firstValue: number | undefined) => void;
  setSecondValue: (secondValue: number) => void;
};
//#endregion
export { useSlide };
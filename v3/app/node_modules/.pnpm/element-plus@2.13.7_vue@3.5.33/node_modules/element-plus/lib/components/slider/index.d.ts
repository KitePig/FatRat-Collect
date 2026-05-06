import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { _default } from "./src/slider.vue.js";
import { SliderEmits, SliderInitData, SliderInstance, SliderProps, SliderPropsPublic, sliderEmits, sliderProps } from "./src/slider.js";
import { SliderContext, sliderContextKey } from "./src/constants.js";

//#region ../../packages/components/slider/index.d.ts
declare const ElSlider: SFCWithInstall<typeof _default>;
//#endregion
export { ElSlider, ElSlider as default, SliderContext, SliderEmits, SliderInitData, SliderInstance, SliderProps, SliderPropsPublic, sliderContextKey, sliderEmits, sliderProps };
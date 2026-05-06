import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { RateProps } from "./rate.js";
import * as vue from "vue";

//#region ../../packages/components/rate/src/rate.vue.d.ts
declare function setCurrentValue(value: number, event?: MouseEvent): void;
declare function resetCurrentValue(): void;
declare const __VLS_export: vue.DefineComponent<RateProps, {
  /** @description set current value */setCurrentValue: typeof setCurrentValue; /** @description reset current value */
  resetCurrentValue: typeof resetCurrentValue;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (value: number) => void;
  "update:modelValue": (value: number) => void;
}, string, vue.PublicProps, Readonly<RateProps> & Readonly<{
  onChange?: ((value: number) => any) | undefined;
  "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
  id: string;
  disabled: boolean;
  modelValue: number;
  max: number;
  textColor: string;
  lowThreshold: number;
  highThreshold: number;
  colors: string[] | Record<number, string>;
  voidColor: string;
  disabledVoidColor: string;
  icons: Array<IconPropType> | Record<number, IconPropType>;
  voidIcon: IconPropType;
  disabledVoidIcon: IconPropType;
  texts: string[];
  scoreTemplate: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default };
import { TourGap, TourMask } from "./types.js";
import { TourProps } from "./tour.js";
import "../../../index.js";
import * as vue from "vue";
import * as _floating_ui_dom0 from "@floating-ui/dom";

//#region ../../packages/components/tour/src/tour.vue.d.ts
declare var __VLS_28: {}, __VLS_30: {
    current: number;
    total: number;
  };
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_28) => any;
} & {
  indicators?: (props: typeof __VLS_30) => any;
};
declare const __VLS_base: vue.DefineComponent<TourProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (current: number) => void;
  close: (current: number) => void;
  "update:modelValue": (value: boolean) => void;
  finish: () => void;
  "update:current": (current: number) => void;
}, string, vue.PublicProps, Readonly<TourProps> & Readonly<{
  onChange?: ((current: number) => any) | undefined;
  onClose?: ((current: number) => any) | undefined;
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  onFinish?: (() => any) | undefined;
  "onUpdate:current"?: ((current: number) => any) | undefined;
}>, {
  appendTo: string | HTMLElement;
  placement: _floating_ui_dom0.Placement;
  showArrow: boolean;
  gap: TourGap;
  mask: TourMask;
  closeOnPressEscape: boolean;
  showClose: boolean;
  scrollIntoViewOptions: boolean | ScrollIntoViewOptions;
  current: number;
  targetAreaClickable: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };
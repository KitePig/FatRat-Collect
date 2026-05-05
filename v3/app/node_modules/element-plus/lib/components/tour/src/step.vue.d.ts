import { TourMask } from "./types.js";
import { TourStepProps } from "./step.js";
import * as vue from "vue";
import * as _floating_ui_dom0 from "@floating-ui/dom";

//#region ../../packages/components/tour/src/step.vue.d.ts
declare var __VLS_12: {}, __VLS_14: {};
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_12) => any;
} & {
  default?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: vue.DefineComponent<TourStepProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  close: () => void;
}, string, vue.PublicProps, Readonly<TourStepProps> & Readonly<{
  onClose?: (() => any) | undefined;
}>, {
  placement: _floating_ui_dom0.Placement;
  showArrow: boolean;
  mask: TourMask;
  showClose: boolean;
  scrollIntoViewOptions: boolean | ScrollIntoViewOptions;
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
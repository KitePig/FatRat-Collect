import { PopperEffect } from "./popper.js";
import "../../../index.js";
import { PopperContentProps } from "./content.js";
import { Options as Options$1, Placement as Placement$1 } from "../index.js";
import * as vue from "vue";
import * as _popperjs_core0 from "@popperjs/core";

//#region ../../packages/components/popper/src/content.vue.d.ts
declare var __VLS_13: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_13) => any;
};
declare const __VLS_base: vue.DefineComponent<PopperContentProps, {
  /**
   * @description popper content element
   */
  popperContentRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  /**
   * @description popperjs instance
   */
  popperInstanceRef: vue.ComputedRef<_popperjs_core0.Instance | undefined>;
  /**
   * @description method for updating popper
   */
  updatePopper: (shouldUpdateZIndex?: boolean) => void;
  /**
   * @description content style
   */
  contentStyle: vue.ComputedRef<vue.StyleValue[]>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  blur: () => void;
  close: () => void;
  focus: () => void;
  mouseenter: (evt: MouseEvent) => void;
  mouseleave: (evt: MouseEvent) => void;
}, string, vue.PublicProps, Readonly<PopperContentProps> & Readonly<{
  onBlur?: (() => any) | undefined;
  onClose?: (() => any) | undefined;
  onFocus?: (() => any) | undefined;
  onMouseenter?: ((evt: MouseEvent) => any) | undefined;
  onMouseleave?: ((evt: MouseEvent) => any) | undefined;
}>, {
  offset: number;
  effect: PopperEffect;
  visible: boolean;
  style: string | false | vue.CSSProperties | vue.StyleValue[] | null;
  enterable: boolean;
  pure: boolean;
  focusOnShow: boolean;
  trapping: boolean;
  popperStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
  stopPopperMouseEvent: boolean;
  virtualTriggering: boolean;
  loop: boolean;
  boundariesPadding: number;
  gpuAcceleration: boolean;
  placement: Placement$1;
  popperOptions: Partial<Options$1>;
  strategy: "fixed" | "absolute";
  arrowOffset: number;
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
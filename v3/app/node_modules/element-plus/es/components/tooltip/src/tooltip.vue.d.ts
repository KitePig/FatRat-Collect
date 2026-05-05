import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { PopperEffect, PopperInstance, roleTypes } from "../../popper/src/popper.js";
import { TooltipTriggerType } from "./trigger.js";
import { TooltipContentInstance } from "./content.js";
import { UseTooltipProps } from "./tooltip.js";
import { Options, Placement } from "../../popper/index.js";
import * as vue from "vue";

//#region ../../packages/components/tooltip/src/tooltip.vue.d.ts
declare var __VLS_15: {}, __VLS_25: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_15) => any;
} & {
  content?: (props: typeof __VLS_25) => any;
};
declare const __VLS_base: vue.DefineComponent<UseTooltipProps, {
  /**
   * @description el-popper component instance
   */
  popperRef: vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
  /**
   * @description el-tooltip-content component instance
   */
  contentRef: vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
  /**
   * @description validate current focus event is trigger inside el-tooltip-content
   */
  isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
  /**
   * @description update el-popper component instance
   */
  updatePopper: () => void;
  /**
   * @description expose onOpen function to mange el-tooltip open state
   */
  onOpen: (event?: Event, delay?: number) => void;
  /**
   * @description expose onClose function to manage el-tooltip close state
   */
  onClose: (event?: Event, delay?: number) => void;
  /**
   * @description expose hide function
   */
  hide: (event?: Event) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  close: (...args: any[]) => void;
  hide: (...args: any[]) => void;
  show: (...args: any[]) => void;
  open: (...args: any[]) => void;
  "update:visible": (...args: any[]) => void;
  "before-show": (...args: any[]) => void;
  "before-hide": (...args: any[]) => void;
}, string, vue.PublicProps, Readonly<UseTooltipProps> & Readonly<{
  onClose?: ((...args: any[]) => any) | undefined;
  onHide?: ((...args: any[]) => any) | undefined;
  onShow?: ((...args: any[]) => any) | undefined;
  onOpen?: ((...args: any[]) => any) | undefined;
  "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
  "onBefore-show"?: ((...args: any[]) => any) | undefined;
  "onBefore-hide"?: ((...args: any[]) => any) | undefined;
}>, {
  offset: number;
  teleported: boolean;
  effect: PopperEffect;
  visible: boolean | null;
  content: string;
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
  placement: Placement;
  popperOptions: Partial<Options>;
  strategy: "fixed" | "absolute";
  arrowOffset: number;
  showArrow: boolean;
  role: typeof roleTypes[number];
  showAfter: number;
  hideAfter: number;
  autoClose: number;
  trigger: Arrayable<TooltipTriggerType>;
  triggerKeys: string[];
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
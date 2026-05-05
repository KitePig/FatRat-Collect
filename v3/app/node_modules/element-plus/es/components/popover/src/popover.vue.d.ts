import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { PopperEffect, PopperInstance } from "../../popper/src/popper.js";
import { TooltipTriggerType } from "../../tooltip/src/trigger.js";
import "../../tooltip/index.js";
import { PopoverProps } from "./popover.js";
import "../../../index.js";
import { Options, Placement } from "../../popper/index.js";
import * as vue from "vue";

//#region ../../packages/components/popover/src/popover.vue.d.ts
declare var __VLS_15: {}, __VLS_18: {
    hide: () => void;
  };
type __VLS_Slots = {} & {
  reference?: (props: typeof __VLS_15) => any;
} & {
  default?: (props: typeof __VLS_18) => any;
};
declare const __VLS_base: vue.DefineComponent<PopoverProps, {
  /** @description popper ref */popperRef: vue.ComputedRef<PopperInstance | undefined>; /** @description hide popover */
  hide: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  "update:visible": (value: boolean) => void;
  "before-enter": () => void;
  "before-leave": () => void;
  "after-enter": () => void;
  "after-leave": () => void;
}, string, vue.PublicProps, Readonly<PopoverProps> & Readonly<{
  "onUpdate:visible"?: ((value: boolean) => any) | undefined;
  "onBefore-enter"?: (() => any) | undefined;
  "onBefore-leave"?: (() => any) | undefined;
  "onAfter-enter"?: (() => any) | undefined;
  "onAfter-leave"?: (() => any) | undefined;
}>, {
  offset: number;
  teleported: boolean;
  effect: PopperEffect;
  tabindex: string | number;
  visible: boolean | null;
  content: string;
  enterable: boolean;
  popperStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
  placement: Placement;
  popperOptions: Partial<Options>;
  showArrow: boolean;
  persistent: boolean;
  showAfter: number;
  hideAfter: number;
  autoClose: number;
  trigger: Arrayable<TooltipTriggerType>;
  triggerKeys: string[];
  width: string | number;
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
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { TooltipTriggerType, UseTooltipTriggerProps } from "../../tooltip/src/trigger.js";
import { ElTooltipContentProps } from "../../tooltip/src/content.js";
import "../../tooltip/index.js";
import { _default } from "./popover.vue.js";
import { Placement as Placement$1 } from "../../popper/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, PropType } from "vue";
import { Options } from "@popperjs/core";

//#region ../../packages/components/popover/src/popover.d.ts
interface PopoverProps {
  /**
   * @description how the popover is triggered, not valid in controlled mode
   */
  trigger?: UseTooltipTriggerProps['trigger'];
  /**
   * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of popover through the keyboard, not valid in controlled mode
   */
  triggerKeys?: UseTooltipTriggerProps['triggerKeys'];
  /**
   * @description popover placement
   */
  placement?: Placement$1;
  /**
   * @description whether Popover is disabled
   */
  disabled?: UseTooltipTriggerProps['disabled'];
  /**
   * @description whether popover is visible
   */
  visible?: ElTooltipContentProps['visible'];
  /**
   * @description popover transition animation
   */
  transition?: ElTooltipContentProps['transition'];
  /**
   * @description parameters for [popper.js](https://popper.js.org/docs/v2/)
   */
  popperOptions?: Partial<Options>;
  /**
   * @description [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Popover
   */
  tabindex?: string | number;
  /**
   * @description popover content, can be replaced with a default `slot`
   */
  content?: ElTooltipContentProps['content'];
  /**
   * @description custom style for popover
   */
  popperStyle?: ElTooltipContentProps['popperStyle'];
  /**
   * @description custom class name for popover
   */
  popperClass?: ElTooltipContentProps['popperClass'];
  /**
   * @description whether the mouse can enter the popover
   */
  enterable?: ElTooltipContentProps['enterable'];
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light`
   */
  effect?: ElTooltipContentProps['effect'];
  /**
   * @description whether popover dropdown is teleported to the body
   */
  teleported?: ElTooltipContentProps['teleported'];
  /**
   * @description which select dropdown appends to
   */
  appendTo?: ElTooltipContentProps['appendTo'];
  /**
   * @description popover title
   */
  title?: string;
  /**
   * @description popover width
   */
  width?: string | number;
  /**
   * @description popover offset
   */
  offset?: number;
  /**
   * @description delay of appearance, in millisecond, not valid in controlled mode
   */
  showAfter?: number;
  /**
   * @description delay of disappear, in millisecond, not valid in controlled mode
   */
  hideAfter?: number;
  /**
   * @description timeout in milliseconds to hide tooltip, not valid in controlled mode
   */
  autoClose?: number;
  /**
   * @description whether a tooltip arrow is displayed or not. For more info, please refer to [ElPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper)
   */
  showArrow?: boolean;
  /**
   * @description when popover inactive and `persistent` is `false` , popover will be destroyed
   */
  persistent?: boolean;
  /**
   * @description update:visible event handler
   */
  'onUpdate:visible'?: (visible: boolean) => void;
}
/**
 * @deprecated Removed after 3.0.0, Use `PopoverProps` instead.
 */
declare const popoverProps: {
  readonly trigger: EpPropFinalized<(new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | TooltipTriggerType[]) | (() => Arrayable<TooltipTriggerType>) | (((new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | TooltipTriggerType[]) | (() => Arrayable<TooltipTriggerType>)) | null)[], unknown, unknown, "hover", boolean>;
  readonly triggerKeys: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => string[], boolean>;
  readonly placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement$1) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement$1)) | null)[], unknown, unknown, "bottom", boolean>;
  readonly disabled: BooleanConstructor;
  readonly visible: EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | (((new (...args: any[]) => boolean) | (() => boolean | null)) | null)[], unknown, unknown, null, boolean>;
  readonly transition: StringConstructor;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  readonly content: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly popperStyle: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperClass: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (((new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly enterable: {
    readonly default: true;
    readonly type: PropType<EpPropMergeType<BooleanConstructor, unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly effect: {
    readonly default: "light";
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly appendTo: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly title: StringConstructor;
  readonly width: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 150, boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, undefined, boolean>;
  readonly showAfter: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly hideAfter: EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
  readonly autoClose: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly 'onUpdate:visible': {
    readonly type: PropType<(visible: boolean) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `PopoverProps` instead.
 */
type PopoverPropsPublic = ExtractPublicPropTypes<typeof popoverProps>;
declare const popoverEmits: {
  'update:visible': (value: boolean) => boolean;
  'before-enter': () => boolean;
  'before-leave': () => boolean;
  'after-enter': () => boolean;
  'after-leave': () => boolean;
};
type PopoverEmits = typeof popoverEmits;
type PopoverInstance = InstanceType<typeof _default> & unknown;
/**
 * @description default values for PopoverProps
 */
declare const popoverPropsDefaults: {
  readonly trigger: "hover";
  readonly triggerKeys: () => string[];
  readonly placement: "bottom";
  readonly visible: null;
  readonly popperOptions: () => {};
  readonly tabindex: 0;
  readonly content: "";
  readonly popperStyle: undefined;
  readonly enterable: true;
  readonly effect: "light";
  readonly teleported: true;
  readonly width: 150;
  readonly offset: undefined;
  readonly showAfter: 0;
  readonly hideAfter: 200;
  readonly autoClose: 0;
  readonly showArrow: true;
  readonly persistent: true;
};
//#endregion
export { PopoverEmits, PopoverInstance, PopoverProps, PopoverPropsPublic, popoverEmits, popoverProps, popoverPropsDefaults };
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { PopperEffect, PopperProps } from "../../popper/src/popper.js";
import { Measurable } from "../../popper/src/constants.js";
import { ModelToggleParams, UseModelTogglePropsRaw } from "../../../hooks/use-model-toggle/index.js";
import "../../../hooks/index.js";
import { TooltipTriggerType, UseTooltipTriggerProps } from "./trigger.js";
import { ElTooltipContentProps } from "./content.js";
import { _default } from "./tooltip.vue.js";
import { PopperArrowProps } from "../../popper/src/arrow.js";
import { Options, Placement } from "../../popper/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/tooltip/src/tooltip.d.ts
declare const useTooltipModelToggleProps: UseModelTogglePropsRaw<"visible">, useTooltipModelToggleEmits: "update:visible"[], useTooltipModelToggle: ({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide
  }: ModelToggleParams) => {
    hide: (event?: Event) => void;
    show: (event?: Event) => void;
    toggle: () => void;
    hasUpdateHandler: vue.ComputedRef<boolean>;
  };
interface UseTooltipProps extends PopperProps, ElTooltipContentProps, UseTooltipTriggerProps, PopperArrowProps {
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow?: boolean;
  'onUpdate:visible'?: (value: boolean) => void;
}
/**
 * @deprecated Removed after 3.0.0, Use `UseTooltipProps` instead.
 */
declare const useTooltipProps: {
  showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  arrowOffset: EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
  disabled: BooleanConstructor;
  trigger: EpPropFinalized<(new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | TooltipTriggerType[]) | (() => Arrayable<TooltipTriggerType>) | (((new (...args: any[]) => "click" | "contextmenu" | "focus" | "hover" | TooltipTriggerType[]) | (() => Arrayable<TooltipTriggerType>)) | null)[], unknown, unknown, "hover", boolean>;
  triggerKeys: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => string[], boolean>;
  focusOnTarget: BooleanConstructor;
  virtualRef: {
    readonly type: vue.PropType<Measurable>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  virtualTriggering: BooleanConstructor;
  onMouseenter: {
    readonly type: vue.PropType<(e: MouseEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  onMouseleave: {
    readonly type: vue.PropType<(e: MouseEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  onClick: {
    readonly type: vue.PropType<(e: PointerEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  onKeydown: {
    readonly type: vue.PropType<(e: KeyboardEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  onFocus: {
    readonly type: vue.PropType<(e: FocusEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  onBlur: {
    readonly type: vue.PropType<(e: FocusEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  onContextmenu: {
    readonly type: vue.PropType<(e: PointerEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  id: StringConstructor;
  open: BooleanConstructor;
  ariaLabel: StringConstructor;
  appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  content: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  rawContent: BooleanConstructor;
  persistent: BooleanConstructor;
  visible: EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | (((new (...args: any[]) => boolean) | (() => boolean | null)) | null)[], unknown, unknown, null, boolean>;
  transition: StringConstructor;
  teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  loop: BooleanConstructor;
  style: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  className: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
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
  effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "dark", boolean>;
  enterable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  pure: BooleanConstructor;
  focusOnShow: BooleanConstructor;
  trapping: BooleanConstructor;
  popperClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
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
  popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  referenceEl: {
    readonly type: vue.PropType<HTMLElement>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  triggerTargetEl: {
    readonly type: vue.PropType<HTMLElement>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  stopPopperMouseEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  zIndex: NumberConstructor;
  boundariesPadding: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, undefined, boolean>;
  gpuAcceleration: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  offset: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  placement: EpPropFinalized<StringConstructor, Placement, unknown, "bottom", boolean>;
  popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  strategy: EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
  showAfter: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  hideAfter: EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
  autoClose: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  "onUpdate:visible": {
    readonly type: vue.PropType<(val: boolean) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  role: EpPropFinalized<StringConstructor, "listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree", unknown, "tooltip", boolean>;
};
declare const tooltipEmits: readonly [..."update:visible"[], "before-show", "before-hide", "show", "hide", "open", "close"];
/**
 * @deprecated Removed after 3.0.0, Use `UseTooltipProps` instead.
 */
type ElTooltipProps = UseTooltipProps;
/**
 * @deprecated Removed after 3.0.0, Use `UseTooltipProps` instead.
 */
type ElTooltipPropsPublic = ExtractPublicPropTypes<typeof useTooltipProps>;
type TooltipInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { ElTooltipProps, ElTooltipPropsPublic, TooltipInstance, UseTooltipProps, tooltipEmits, useTooltipModelToggle, useTooltipModelToggleEmits, useTooltipModelToggleProps, useTooltipProps };
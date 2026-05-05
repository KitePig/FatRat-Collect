import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { UseDelayedToggleProps } from "../../../hooks/use-delayed-toggle/index.js";
import { AriaProps } from "../../../hooks/use-aria/index.js";
import "../../../hooks/index.js";
import { _default } from "./content.vue.js";
import { PopperContentProps } from "../../popper/src/content.js";
import { Options, Placement } from "../../popper/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/tooltip/src/content.d.ts
interface ElTooltipContentProps extends UseDelayedToggleProps, Omit<PopperContentProps, 'visible'> {
  /**
   * @description which element the tooltip CONTENT appends to
   */
  appendTo?: string | HTMLElement;
  /**
   * @description display content, can be overridden by `slot#content`
   */
  content?: string;
  /**
   * @description whether `content` is treated as HTML string
   */
  rawContent?: boolean;
  /**
   * @description when tooltip inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent?: boolean;
  /**
   * @description visibility of Tooltip
   */
  visible?: boolean | null;
  /**
   * @description animation name
   */
  transition?: string;
  /**
   * @description whether tooltip content is teleported, if `true` it will be teleported to where `append-to` sets
   */
  teleported?: boolean;
  /**
   * @description whether Tooltip is disabled
   */
  disabled?: boolean;
  ariaLabel?: AriaProps['ariaLabel'];
}
declare const useTooltipContentPropsDefaults: {
  readonly content: "";
  readonly visible: null;
  readonly teleported: true;
  readonly effect: "dark";
  readonly enterable: true;
  readonly stopPopperMouseEvent: true;
  readonly pure: false;
  readonly focusOnShow: false;
  readonly trapping: false;
  readonly virtualTriggering: false;
  readonly loop: false;
  readonly style: undefined;
  readonly popperStyle: undefined;
  readonly arrowOffset: 5;
  readonly boundariesPadding: 0;
  readonly gpuAcceleration: true;
  readonly offset: 12;
  readonly placement: "bottom";
  readonly popperOptions: () => {};
  readonly strategy: "absolute";
  readonly showAfter: 0;
  readonly hideAfter: 200;
  readonly autoClose: 0;
};
/**
 * @deprecated Removed after 3.0.0, Use `ElTooltipContentProps` instead.
 */
declare const useTooltipContentProps: {
  readonly ariaLabel: StringConstructor;
  readonly appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly content: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly rawContent: BooleanConstructor;
  readonly persistent: BooleanConstructor;
  readonly visible: EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | (((new (...args: any[]) => boolean) | (() => boolean | null)) | null)[], unknown, unknown, null, boolean>;
  readonly transition: StringConstructor;
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly disabled: BooleanConstructor;
  readonly loop: BooleanConstructor;
  readonly id: StringConstructor;
  readonly style: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly className: {
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
  readonly effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "dark", boolean>;
  readonly enterable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly pure: BooleanConstructor;
  readonly focusOnShow: BooleanConstructor;
  readonly trapping: BooleanConstructor;
  readonly popperClass: {
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
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly referenceEl: {
    readonly type: vue.PropType<HTMLElement>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly triggerTargetEl: {
    readonly type: vue.PropType<HTMLElement>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly stopPopperMouseEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly virtualTriggering: BooleanConstructor;
  readonly zIndex: NumberConstructor;
  readonly arrowOffset: EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
  readonly boundariesPadding: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, undefined, boolean>;
  readonly gpuAcceleration: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "bottom", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly strategy: EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
  readonly showAfter: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly hideAfter: EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
  readonly autoClose: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `ElTooltipContentProps` instead.
 */
type ElTooltipContentPropsPublic = ExtractPublicPropTypes<typeof useTooltipContentProps>;
type TooltipContentInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { ElTooltipContentProps, ElTooltipContentPropsPublic, TooltipContentInstance, useTooltipContentProps, useTooltipContentPropsDefaults };
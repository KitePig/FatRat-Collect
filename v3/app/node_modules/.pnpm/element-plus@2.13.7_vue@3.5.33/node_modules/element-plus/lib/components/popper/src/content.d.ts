import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { PopperEffect } from "./popper.js";
import { Measurable } from "./constants.js";
import { PopperArrowProps } from "./arrow.js";
import { _default } from "./content.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, StyleValue } from "vue";
import { Options, Placement } from "@popperjs/core";

//#region ../../packages/components/popper/src/content.d.ts
type ClassObjectType = Record<string, boolean>;
type ClassType = string | ClassObjectType | ClassType[];
declare const POSITIONING_STRATEGIES: readonly ["fixed", "absolute"];
interface CreatePopperInstanceParams {
  referenceEl: Measurable;
  popperContentEl: HTMLElement;
  arrowEl: HTMLElement | undefined;
}
interface PopperCoreConfigProps {
  boundariesPadding?: number;
  fallbackPlacements?: Placement[];
  gpuAcceleration?: boolean;
  /**
   * @description offset of the Tooltip
   */
  offset?: number;
  /**
   * @description position of Tooltip
   */
  placement?: Placement;
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions?: Partial<Options>;
  strategy?: (typeof POSITIONING_STRATEGIES)[number];
}
/**
 * @deprecated Removed after 3.0.0, Use `PopperCoreConfigProps` instead.
 */
declare const popperCoreConfigProps: {
  readonly boundariesPadding: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, undefined, boolean>;
  readonly gpuAcceleration: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "bottom", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly strategy: EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `PopperCoreConfigProps` instead.
 */
type PopperCoreConfigPropsPublic = ExtractPublicPropTypes<typeof popperCoreConfigProps>;
interface PopperContentProps extends PopperCoreConfigProps, PopperArrowProps {
  id?: string;
  style?: StyleValue;
  className?: ClassType;
  effect?: PopperEffect;
  visible?: boolean;
  enterable?: boolean;
  pure?: boolean;
  focusOnShow?: boolean;
  trapping?: boolean;
  popperClass?: ClassType;
  popperStyle?: StyleValue;
  referenceEl?: HTMLElement;
  triggerTargetEl?: HTMLElement;
  stopPopperMouseEvent?: boolean;
  virtualTriggering?: boolean;
  zIndex?: number;
  ariaLabel?: string;
  loop?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `PopperContentProps` instead.
 */
declare const popperContentProps: {
  readonly loop: BooleanConstructor;
  readonly ariaLabel: StringConstructor;
  readonly id: StringConstructor;
  readonly style: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly className: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType) | (((new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "dark", boolean>;
  readonly visible: BooleanConstructor;
  readonly enterable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly pure: BooleanConstructor;
  readonly focusOnShow: BooleanConstructor;
  readonly trapping: BooleanConstructor;
  readonly popperClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType) | (((new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
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
};
/**
 * @deprecated Removed after 3.0.0, Use `PopperContentProps` instead.
 */
type PopperContentPropsPublic = ExtractPublicPropTypes<typeof popperContentProps>;
declare const popperCoreConfigPropsDefaults: {
  readonly boundariesPadding: 0;
  readonly gpuAcceleration: true;
  readonly offset: 12;
  readonly placement: "bottom";
  readonly popperOptions: () => {};
  readonly strategy: "absolute";
};
declare const popperContentPropsDefaults: {
  readonly effect: "dark";
  readonly enterable: true;
  readonly stopPopperMouseEvent: true;
  readonly visible: false;
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
};
declare const popperContentEmits: {
  mouseenter: (evt: MouseEvent) => boolean;
  mouseleave: (evt: MouseEvent) => boolean;
  focus: () => boolean;
  blur: () => boolean;
  close: () => boolean;
};
type PopperContentEmits = typeof popperContentEmits;
type PopperContentInstance = InstanceType<typeof _default> & unknown;
/** @deprecated use `popperCoreConfigProps` instead, and it will be deprecated in the next major version */
declare const usePopperCoreConfigProps: {
  readonly boundariesPadding: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, undefined, boolean>;
  readonly gpuAcceleration: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "bottom", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly strategy: EpPropFinalized<StringConstructor, "fixed" | "absolute", unknown, "absolute", boolean>;
};
/** @deprecated use `popperContentProps` instead, and it will be deprecated in the next major version */
declare const usePopperContentProps: {
  readonly loop: BooleanConstructor;
  readonly ariaLabel: StringConstructor;
  readonly id: StringConstructor;
  readonly style: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly className: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType) | (((new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "dark", boolean>;
  readonly visible: BooleanConstructor;
  readonly enterable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly pure: BooleanConstructor;
  readonly focusOnShow: BooleanConstructor;
  readonly trapping: BooleanConstructor;
  readonly popperClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType) | (((new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
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
};
/** @deprecated use `popperContentEmits` instead, and it will be deprecated in the next major version */
declare const usePopperContentEmits: {
  mouseenter: (evt: MouseEvent) => boolean;
  mouseleave: (evt: MouseEvent) => boolean;
  focus: () => boolean;
  blur: () => boolean;
  close: () => boolean;
};
/** @deprecated use `PopperCoreConfigProps` instead, and it will be deprecated in the next major version */
type UsePopperCoreConfigProps = PopperCoreConfigProps;
/** @deprecated use `PopperContentProps` instead, and it will be deprecated in the next major version */
type UsePopperContentProps = PopperContentProps;
/** @deprecated use `PopperContentInstance` instead, and it will be deprecated in the next major version */
type ElPopperArrowContent = PopperContentInstance;
//#endregion
export { CreatePopperInstanceParams, ElPopperArrowContent, PopperContentEmits, PopperContentInstance, PopperContentProps, PopperContentPropsPublic, PopperCoreConfigProps, PopperCoreConfigPropsPublic, UsePopperContentProps, UsePopperCoreConfigProps, popperContentEmits, popperContentProps, popperContentPropsDefaults, popperCoreConfigProps, popperCoreConfigPropsDefaults, usePopperContentEmits, usePopperContentProps, usePopperCoreConfigProps };
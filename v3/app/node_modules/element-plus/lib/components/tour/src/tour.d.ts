import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { TourContentProps } from "./content.js";
import { TourGap, TourMask } from "./types.js";
import { _default } from "./tour.vue.js";
import * as vue from "vue";
import { CSSProperties, ExtractPublicPropTypes } from "vue";
import * as _floating_ui_dom0 from "@floating-ui/dom";

//#region ../../packages/components/tour/src/tour.d.ts
interface TourProps {
  /**
   * @description open tour
   */
  modelValue?: boolean;
  /**
   * @description what is the current step
   */
  current?: number;
  /**
   * @description whether to show the arrow
   */
  showArrow?: boolean;
  /**
   * @description whether to show a close button
   */
  showClose?: boolean;
  /**
   * @description custom close icon
   */
  closeIcon?: IconPropType;
  /**
   * @description position of the guide card relative to the target element
   */
  placement?: TourContentProps['placement'];
  /**
   * @description custom style for content
   */
  contentStyle?: CSSProperties;
  /**
   * @description whether to enable masking, change mask style and fill color by pass custom props
   */
  mask?: TourMask;
  /**
   * @description transparent gap between mask and target
   */
  gap?: TourGap;
  /**
   * @description tour's zIndex
   */
  zIndex?: number;
  /**
   * @description support pass custom scrollIntoView options
   */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
  /**
   * @description type, affects the background color and text color
   */
  type?: 'default' | 'primary';
  /**
   * @description which element the TourContent appends to
   */
  appendTo?: string | HTMLElement;
  /**
   * @description whether the Tour can be closed by pressing ESC
   */
  closeOnPressEscape?: boolean;
  /**
   * @description whether the target element can be clickable, when using mask
   */
  targetAreaClickable?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `TourProps` instead.
 */
declare const tourProps: {
  modelValue: BooleanConstructor;
  current: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  showClose: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  closeIcon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  placement: EpPropFinalized<(new (...args: any[]) => "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _floating_ui_dom0.Placement) | (((new (...args: any[]) => "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _floating_ui_dom0.Placement)) | null)[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
  contentStyle: {
    readonly type: vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  mask: EpPropFinalized<(new (...args: any[]) => boolean | {
    style?: CSSProperties;
    color?: string;
  }) | (() => TourMask) | (((new (...args: any[]) => boolean | {
    style?: CSSProperties;
    color?: string;
  }) | (() => TourMask)) | null)[], unknown, unknown, boolean, boolean>;
  gap: EpPropFinalized<(new (...args: any[]) => TourGap) | (() => TourGap) | (((new (...args: any[]) => TourGap) | (() => TourGap)) | null)[], unknown, unknown, () => {
    offset: number;
    radius: number;
  }, boolean>;
  zIndex: {
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  scrollIntoViewOptions: EpPropFinalized<(new (...args: any[]) => boolean | ScrollIntoViewOptions) | (() => boolean | ScrollIntoViewOptions) | (((new (...args: any[]) => boolean | ScrollIntoViewOptions) | (() => boolean | ScrollIntoViewOptions)) | null)[], unknown, unknown, () => {
    block: string;
  }, boolean>;
  type: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "default" | "primary") | (() => "default" | "primary") | (((new (...args: any[]) => "default" | "primary") | (() => "default" | "primary")) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  appendTo: EpPropFinalized<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown, string, boolean>;
  closeOnPressEscape: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  targetAreaClickable: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `TourProps` instead.
 */
type TourPropsPublic = ExtractPublicPropTypes<typeof tourProps>;
type TourInstance = InstanceType<typeof _default> & unknown;
declare const tourEmits: {
  "update:modelValue": (value: boolean) => boolean;
  "update:current": (current: number) => boolean;
  close: (current: number) => boolean;
  finish: () => boolean;
  change: (current: number) => boolean;
};
type TourEmits = typeof tourEmits;
//#endregion
export { TourEmits, TourInstance, TourProps, TourPropsPublic, tourEmits, tourProps };
import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { TourContentProps } from "./content.js";
import { TourBtnProps, TourMask } from "./types.js";
import * as vue from "vue";
import { CSSProperties, ExtractPublicPropTypes } from "vue";
import * as _floating_ui_dom0 from "@floating-ui/dom";

//#region ../../packages/components/tour/src/step.d.ts
interface TourStepProps {
  /**
   * @description get the element the guide card points to. empty makes it show in center of screen
   */
  target?: string | HTMLElement | (() => HTMLElement | null) | null;
  /**
   * @description the title of the tour content
   */
  title?: string;
  /**
   * @description description
   */
  description?: string;
  /**
   * @description whether to show a close button
   */
  showClose?: boolean;
  /**
   * @description custom close icon, default is Close
   */
  closeIcon?: IconPropType;
  /**
   * @description whether to show the arrow
   */
  showArrow?: boolean;
  /**
   * @description position of the guide card relative to the target element
   */
  placement?: TourContentProps['placement'];
  /**
   * @description whether to enable masking, change mask style and fill color by pass custom props
   */
  mask?: TourMask;
  /**
   * @description custom style for content
   */
  contentStyle?: CSSProperties;
  /**
   * @description properties of the previous button
   */
  prevButtonProps?: TourBtnProps;
  /**
   * @description properties of the Next button
   */
  nextButtonProps?: TourBtnProps;
  /**
   * @description support pass custom scrollIntoView options
   */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
  /**
   * @description type, affects the background color and text color
   */
  type?: 'default' | 'primary';
}
/**
 * @deprecated Removed after 3.0.0, Use `TourStepProps` instead.
 */
declare const tourStepProps: {
  target: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement | (() => HTMLElement | null)) | (() => string | HTMLElement | (() => HTMLElement | null) | null) | (((new (...args: any[]) => string | HTMLElement | (() => HTMLElement | null)) | (() => string | HTMLElement | (() => HTMLElement | null) | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  title: StringConstructor;
  description: StringConstructor;
  showClose: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  closeIcon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  placement: EpPropFinalized<(new (...args: any[]) => "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _floating_ui_dom0.Placement) | (((new (...args: any[]) => "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _floating_ui_dom0.Placement)) | null)[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
  mask: EpPropFinalized<(new (...args: any[]) => boolean | {
    style?: CSSProperties;
    color?: string;
  }) | (() => TourMask) | (((new (...args: any[]) => boolean | {
    style?: CSSProperties;
    color?: string;
  }) | (() => TourMask)) | null)[], unknown, unknown, undefined, boolean>;
  contentStyle: {
    readonly type: vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  prevButtonProps: {
    readonly type: vue.PropType<TourBtnProps>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  nextButtonProps: {
    readonly type: vue.PropType<TourBtnProps>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  scrollIntoViewOptions: EpPropFinalized<(new (...args: any[]) => boolean | ScrollIntoViewOptions) | (() => boolean | ScrollIntoViewOptions) | (((new (...args: any[]) => boolean | ScrollIntoViewOptions) | (() => boolean | ScrollIntoViewOptions)) | null)[], unknown, unknown, undefined, boolean>;
  type: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "default" | "primary") | (() => "default" | "primary") | (((new (...args: any[]) => "default" | "primary") | (() => "default" | "primary")) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `TourStepProps` instead.
 */
type TourStepPropsPublic = ExtractPublicPropTypes<typeof tourStepProps>;
declare const tourStepEmits: {
  close: () => boolean;
};
type TourStepEmits = typeof tourStepEmits;
//#endregion
export { TourStepEmits, TourStepProps, TourStepPropsPublic, tourStepEmits, tourStepProps };
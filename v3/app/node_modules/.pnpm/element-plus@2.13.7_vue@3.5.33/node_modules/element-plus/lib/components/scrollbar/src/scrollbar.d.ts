import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./scrollbar.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, StyleValue } from "vue";

//#region ../../packages/components/scrollbar/src/scrollbar.d.ts
interface ScrollbarProps {
  /**
   * @description trigger distance(px)
   * @default 0
   */
  distance?: number;
  /**
   * @description height of scrollbar
   * @default ''
   */
  height?: number | string;
  /**
   * @description max height of scrollbar
   * @default ''
   */
  maxHeight?: number | string;
  /**
   * @description whether to use the native scrollbar
   */
  native?: boolean;
  /**
   * @description style of wrap
   * @default ''
   */
  wrapStyle?: StyleValue;
  /**
   * @description class of wrap
   * @default ''
   */
  wrapClass?: string | string[];
  /**
   * @description class of view
   * @default ''
   */
  viewClass?: string | string[];
  /**
   * @description style of view
   * @default ''
   */
  viewStyle?: StyleValue;
  /**
   * @description do not respond to container size changes, if the container size does not change, it is better to set it to optimize performance
   */
  noresize?: boolean;
  /**
   * @description element tag of the view
   * @default 'div'
   */
  tag?: keyof HTMLElementTagNameMap | (string & {});
  /**
   * @description always show
   */
  always?: boolean;
  /**
   * @description minimum size of scrollbar
   * @default 20
   */
  minSize?: number;
  /**
   * @description Wrap tabindex
   * @default undefined
   */
  tabindex?: number | string;
  /**
   * @description id of view
   */
  id?: string;
  /**
   * @description role of view
   */
  role?: string;
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel?: string;
  /**
   * @description native `aria-orientation` attribute
   */
  ariaOrientation?: 'horizontal' | 'vertical' | 'undefined';
}
/**
 * @deprecated Removed after 3.0.0, Use `ScrollbarProps` instead.
 */
declare const scrollbarProps: {
  readonly ariaLabel: StringConstructor;
  readonly ariaOrientation: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly distance: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly height: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
  readonly maxHeight: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
  readonly native: BooleanConstructor;
  readonly wrapStyle: EpPropFinalized<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown, "", boolean>;
  readonly wrapClass: EpPropFinalized<readonly [StringConstructor, ArrayConstructor], unknown, unknown, "", boolean>;
  readonly viewClass: EpPropFinalized<readonly [StringConstructor, ArrayConstructor], unknown, unknown, "", boolean>;
  readonly viewStyle: EpPropFinalized<readonly [StringConstructor, ArrayConstructor, ObjectConstructor], unknown, unknown, "", boolean>;
  readonly noresize: BooleanConstructor;
  readonly tag: EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
  readonly always: BooleanConstructor;
  readonly minSize: EpPropFinalized<NumberConstructor, unknown, unknown, 20, boolean>;
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, undefined, boolean>;
  readonly id: StringConstructor;
  readonly role: StringConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `ScrollbarProps` instead.
 */
type ScrollbarPropsPublic = ExtractPublicPropTypes<typeof scrollbarProps>;
declare const scrollbarEmits: {
  'end-reached': (direction: ScrollbarDirection) => boolean;
  scroll: ({
    scrollTop,
    scrollLeft
  }: {
    scrollTop: number;
    scrollLeft: number;
  }) => boolean;
};
type ScrollbarEmits = typeof scrollbarEmits;
type ScrollbarDirection = 'top' | 'bottom' | 'left' | 'right';
type ScrollbarInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { ScrollbarDirection, ScrollbarEmits, ScrollbarInstance, ScrollbarProps, ScrollbarPropsPublic, scrollbarEmits, scrollbarProps };
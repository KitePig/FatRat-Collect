import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./anchor.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/anchor/src/anchor.d.ts
interface AnchorProps {
  /**
   * @description scroll container
   */
  container?: string | HTMLElement | Window | null;
  /**
   * @description Set the offset of the anchor scroll
   */
  offset?: number;
  /**
   * @description The offset of the element starting to trigger the anchor
   */
  bound?: number;
  /**
   * @description Set the scroll duration of the container when the anchor is clicked, in milliseconds
   */
  duration?: number;
  /**
   * @description Whether to show the marker
   */
  marker?: boolean;
  /**
   * @description Set Anchor type
   */
  type?: 'default' | 'underline';
  /**
   * @description Set Anchor direction
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * @description Scroll whether link is selected at the top
   */
  selectScrollTop?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `AnchorProps` instead.
 */
declare const anchorProps: {
  container: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement | Window) | (() => string | HTMLElement | Window | null) | (((new (...args: any[]) => string | HTMLElement | Window) | (() => string | HTMLElement | Window | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  offset: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  bound: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  duration: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  marker: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  type: EpPropFinalized<(new (...args: any[]) => "default" | "underline") | (() => "default" | "underline") | (((new (...args: any[]) => "default" | "underline") | (() => "default" | "underline")) | null)[], unknown, unknown, string, boolean>;
  direction: EpPropFinalized<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical") | (((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical")) | null)[], unknown, unknown, string, boolean>;
  selectScrollTop: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `AnchorProps` instead.
 */
type AnchorPropsPublic = ExtractPublicPropTypes<typeof anchorProps>;
type AnchorInstance = InstanceType<typeof _default> & unknown;
declare const anchorEmits: {
  change: (href: string) => boolean;
  click: (e: MouseEvent, href?: string) => boolean;
};
type AnchorEmits = typeof anchorEmits;
//#endregion
export { AnchorEmits, AnchorInstance, AnchorProps, AnchorPropsPublic, anchorEmits, anchorProps };
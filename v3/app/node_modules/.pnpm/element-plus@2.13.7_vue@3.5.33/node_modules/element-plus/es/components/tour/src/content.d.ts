import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { ExtractPublicPropTypes } from "vue";
import { Placement, Strategy, VirtualElement } from "@floating-ui/dom";

//#region ../../packages/components/tour/src/content.d.ts
declare const tourStrategies: readonly ["absolute", "fixed"];
declare const tourPlacements: readonly ["top-start", "top-end", "top", "bottom-start", "bottom-end", "bottom", "left-start", "left-end", "left", "right-start", "right-end", "right"];
interface TourContentProps {
  /**
   * @description position of the guide card relative to the target element
   */
  placement?: Placement;
  /**
   * @description the reference dom
   */
  reference?: HTMLElement | VirtualElement | null;
  /**
   * @description position strategy of the content
   */
  strategy?: Strategy;
  /**
   * @description offset of the arrow
   */
  offset?: number;
  /**
   * @description whether to show the arrow
   */
  showArrow?: boolean;
  /**
   * @description content's zIndex
   */
  zIndex?: number;
}
/**
 * @deprecated Removed after 3.0.0, Use `TourContentProps` instead.
 */
declare const tourContentProps: {
  placement: EpPropFinalized<(new (...args: any[]) => "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end", unknown, string, boolean>;
  reference: EpPropFinalized<(new (...args: any[]) => HTMLElement | VirtualElement) | (() => HTMLElement | VirtualElement | null) | (((new (...args: any[]) => HTMLElement | VirtualElement) | (() => HTMLElement | VirtualElement | null)) | null)[], unknown, unknown, null, boolean>;
  strategy: EpPropFinalized<(new (...args: any[]) => "fixed" | "absolute") | (() => Strategy) | (((new (...args: any[]) => "fixed" | "absolute") | (() => Strategy)) | null)[], "fixed" | "absolute", unknown, string, boolean>;
  offset: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  showArrow: BooleanConstructor;
  zIndex: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `TourContentProps` instead.
 */
type TourContentPropsPublic = ExtractPublicPropTypes<typeof tourContentProps>;
declare const tourContentEmits: {
  close: () => boolean;
};
type TourContentEmits = typeof tourContentEmits;
//#endregion
export { TourContentEmits, TourContentProps, TourContentPropsPublic, tourContentEmits, tourContentProps, tourPlacements, tourStrategies };
import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/carousel/src/carousel.d.ts
interface CarouselProps {
  /**
   * @description index of the initially active slide (starting from 0)
   */
  initialIndex?: number;
  /**
   * @description height of the carousel
   */
  height?: string;
  /**
   * @description how indicators are triggered
   */
  trigger?: 'hover' | 'click';
  /**
   * @description whether automatically loop the slides
   */
  autoplay?: boolean;
  /**
   * @description interval of the auto loop, in milliseconds
   */
  interval?: number;
  /**
   * @description position of the indicators
   */
  indicatorPosition?: '' | 'none' | 'outside';
  /**
   * @description when arrows are shown
   */
  arrow?: 'always' | 'hover' | 'never';
  /**
   * @description type of the Carousel
   */
  type?: '' | 'card';
  /**
   * @description when type is card, scaled size of secondary cards
   */
  cardScale?: number;
  /**
   * @description display the items in loop
   */
  loop?: boolean;
  /**
   * @description display direction
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description pause autoplay when hover
   */
  pauseOnHover?: boolean;
  /**
   * @description infuse dynamism and smoothness into the carousel
   */
  motionBlur?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `CarouselProps` instead.
 */
declare const carouselProps: {
  readonly initialIndex: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly height: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly trigger: EpPropFinalized<StringConstructor, "click" | "hover", unknown, "hover", boolean>;
  readonly autoplay: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly interval: EpPropFinalized<NumberConstructor, unknown, unknown, 3000, boolean>;
  readonly indicatorPosition: EpPropFinalized<StringConstructor, "" | "none" | "outside", unknown, "", boolean>;
  readonly arrow: EpPropFinalized<StringConstructor, "always" | "never" | "hover", unknown, "hover", boolean>;
  readonly type: EpPropFinalized<StringConstructor, "" | "card", unknown, "", boolean>;
  readonly cardScale: EpPropFinalized<NumberConstructor, unknown, unknown, 0.83, boolean>;
  readonly loop: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly direction: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
  readonly pauseOnHover: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly motionBlur: BooleanConstructor;
};
declare const carouselEmits: {
  /**
   * @description triggers when the active slide switches
   * @param current index of the new active slide
   * @param prev index of the old active slide
   */
  change: (current: number, prev: number) => boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `CarouselProps` instead.
 */
type CarouselPropsPublic = ExtractPublicPropTypes<typeof carouselProps>;
type CarouselEmits = typeof carouselEmits;
//#endregion
export { CarouselEmits, CarouselProps, CarouselPropsPublic, carouselEmits, carouselProps };
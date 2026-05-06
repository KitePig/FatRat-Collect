import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/carousel/src/carousel-item.d.ts
interface CarouselItemProps {
  /**
   * @description name of the item, can be used in `setActiveItem`
   */
  name?: string;
  /**
   * @description text content for the corresponding indicator
   */
  label?: string | number;
}
/**
 * @deprecated Removed after 3.0.0, Use `CarouselItemProps` instead.
 */
declare const carouselItemProps: {
  readonly name: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly label: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `CarouselItemProps` instead.
 */
type CarouselItemPropsPublic = ExtractPublicPropTypes<typeof carouselItemProps>;
//#endregion
export { CarouselItemProps, CarouselItemPropsPublic, carouselItemProps };
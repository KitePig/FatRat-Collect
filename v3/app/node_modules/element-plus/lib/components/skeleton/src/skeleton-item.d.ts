import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./skeleton-item.vue.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/skeleton/src/skeleton-item.d.ts
interface SkeletonItemProps {
  /**
   * @description the current rendering skeleton type
   */
  variant?: 'circle' | 'rect' | 'h1' | 'h3' | 'text' | 'caption' | 'p' | 'image' | 'button';
}
/**
 * @deprecated Removed after 3.0.0, Use `SkeletonItemProps` instead.
 */
declare const skeletonItemProps: {
  readonly variant: EpPropFinalized<StringConstructor, "text" | "button" | "circle" | "caption" | "image" | "h1" | "h3" | "p" | "rect", unknown, "text", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `SkeletonItemProps` instead.
 */
type SkeletonItemPropsPublic = ExtractPublicPropTypes<typeof skeletonItemProps>;
type SkeletonItemInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { SkeletonItemInstance, SkeletonItemProps, SkeletonItemPropsPublic, skeletonItemProps };
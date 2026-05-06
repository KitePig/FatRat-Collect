import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { ThrottleType } from "../../../hooks/use-throttle-render/index.js";
import "../../../hooks/index.js";
import { _default } from "./skeleton.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/skeleton/src/skeleton.d.ts
interface SkeletonProps {
  /**
   * @description whether showing the animation
   */
  animated?: boolean;
  /**
   * @description how many fake items to render to the DOM
   */
  count?: number;
  /**
   * @description numbers of the row, only useful when no template slot were given
   */
  rows?: number;
  /**
   * @description whether showing the real DOM
   */
  loading?: boolean;
  /**
   * @description rendering delay in milliseconds
   */
  throttle?: ThrottleType;
}
/**
 * @deprecated Removed after 3.0.0, Use `SkeletonProps` instead.
 */
declare const skeletonProps: {
  readonly animated: BooleanConstructor;
  readonly count: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly rows: EpPropFinalized<NumberConstructor, unknown, unknown, 3, boolean>;
  readonly loading: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly throttle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => number | {
      leading?: number;
      trailing?: number;
      initVal?: boolean;
    }) | (() => ThrottleType) | (((new (...args: any[]) => number | {
      leading?: number;
      trailing?: number;
      initVal?: boolean;
    }) | (() => ThrottleType)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `SkeletonProps` instead.
 */
type SkeletonPropsPublic = ExtractPublicPropTypes<typeof skeletonProps>;
type SkeletonInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { SkeletonInstance, SkeletonProps, SkeletonPropsPublic, skeletonProps };
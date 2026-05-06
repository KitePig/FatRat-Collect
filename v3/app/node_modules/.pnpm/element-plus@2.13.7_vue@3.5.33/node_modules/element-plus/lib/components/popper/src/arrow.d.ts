import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./arrow.vue.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/popper/src/arrow.d.ts
interface PopperArrowProps {
  /**
   * @description arrow offset
   */
  arrowOffset?: number;
}
/**
 * @deprecated Removed after 3.0.0, Use `PopperArrowProps` instead.
 */
declare const popperArrowProps: {
  readonly arrowOffset: EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `PopperArrowProps` instead.
 */
type PopperArrowPropsPublic = ExtractPublicPropTypes<typeof popperArrowProps>;
declare const popperArrowPropsDefaults: {
  readonly arrowOffset: 5;
};
type PopperArrowInstance = InstanceType<typeof _default> & unknown;
/** @deprecated use `popperArrowProps` instead, and it will be deprecated in the next major version */
declare const usePopperArrowProps: {
  readonly arrowOffset: EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
};
/** @deprecated use `PopperArrowProps` instead, and it will be deprecated in the next major version */
type UsePopperArrowProps = PopperArrowProps;
/** @deprecated use `PopperArrowInstance` instead, and it will be deprecated in the next major version */
type ElPopperArrowInstance = PopperArrowInstance;
//#endregion
export { ElPopperArrowInstance, PopperArrowInstance, PopperArrowProps, PopperArrowPropsPublic, UsePopperArrowProps, popperArrowProps, popperArrowPropsDefaults, usePopperArrowProps };
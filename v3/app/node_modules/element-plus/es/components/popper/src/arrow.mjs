import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/popper/src/arrow.ts
/**
* @deprecated Removed after 3.0.0, Use `PopperArrowProps` instead.
*/
const popperArrowProps = buildProps({ arrowOffset: {
	type: Number,
	default: 5
} });
const popperArrowPropsDefaults = { arrowOffset: 5 };
/** @deprecated use `popperArrowProps` instead, and it will be deprecated in the next major version */
const usePopperArrowProps = popperArrowProps;

//#endregion
export { popperArrowProps, popperArrowPropsDefaults, usePopperArrowProps };
//# sourceMappingURL=arrow.mjs.map
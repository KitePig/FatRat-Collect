Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/popper/src/arrow.ts
/**
* @deprecated Removed after 3.0.0, Use `PopperArrowProps` instead.
*/
const popperArrowProps = require_runtime.buildProps({ arrowOffset: {
	type: Number,
	default: 5
} });
const popperArrowPropsDefaults = { arrowOffset: 5 };
/** @deprecated use `popperArrowProps` instead, and it will be deprecated in the next major version */
const usePopperArrowProps = popperArrowProps;

//#endregion
exports.popperArrowProps = popperArrowProps;
exports.popperArrowPropsDefaults = popperArrowPropsDefaults;
exports.usePopperArrowProps = usePopperArrowProps;
//# sourceMappingURL=arrow.js.map
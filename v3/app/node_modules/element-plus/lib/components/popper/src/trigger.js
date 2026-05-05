Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/popper/src/trigger.ts
/**
* @deprecated Removed after 3.0.0, Use `PopperTriggerProps` instead.
*/
const popperTriggerProps = require_runtime.buildProps({
	virtualRef: { type: require_runtime.definePropType(Object) },
	virtualTriggering: Boolean,
	onMouseenter: { type: require_runtime.definePropType(Function) },
	onMouseleave: { type: require_runtime.definePropType(Function) },
	onClick: { type: require_runtime.definePropType(Function) },
	onKeydown: { type: require_runtime.definePropType(Function) },
	onFocus: { type: require_runtime.definePropType(Function) },
	onBlur: { type: require_runtime.definePropType(Function) },
	onContextmenu: { type: require_runtime.definePropType(Function) },
	id: String,
	open: Boolean
});
/** @deprecated use `popperTriggerProps` instead, and it will be deprecated in the next major version */
const usePopperTriggerProps = popperTriggerProps;

//#endregion
exports.popperTriggerProps = popperTriggerProps;
exports.usePopperTriggerProps = usePopperTriggerProps;
//# sourceMappingURL=trigger.js.map
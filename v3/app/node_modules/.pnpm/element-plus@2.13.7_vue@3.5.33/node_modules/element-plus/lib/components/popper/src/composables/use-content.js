Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-popper/index.js');
const require_constants = require('../constants.js');
const require_utils = require('../utils.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/popper/src/composables/use-content.ts
const DEFAULT_ARROW_OFFSET = 0;
const usePopperContent = (props) => {
	const { popperInstanceRef, contentRef, triggerRef, role } = (0, vue.inject)(require_constants.POPPER_INJECTION_KEY, void 0);
	const arrowRef = (0, vue.ref)();
	const arrowOffset = (0, vue.computed)(() => props.arrowOffset);
	const eventListenerModifier = (0, vue.computed)(() => {
		return {
			name: "eventListeners",
			enabled: !!props.visible
		};
	});
	const arrowModifier = (0, vue.computed)(() => {
		const arrowEl = (0, vue.unref)(arrowRef);
		const offset = (0, vue.unref)(arrowOffset) ?? DEFAULT_ARROW_OFFSET;
		return {
			name: "arrow",
			enabled: !(0, lodash_unified.isUndefined)(arrowEl),
			options: {
				element: arrowEl,
				padding: offset
			}
		};
	});
	const options = (0, vue.computed)(() => {
		return {
			onFirstUpdate: () => {
				update();
			},
			...require_utils.buildPopperOptions(props, [(0, vue.unref)(arrowModifier), (0, vue.unref)(eventListenerModifier)])
		};
	});
	const computedReference = (0, vue.computed)(() => require_utils.unwrapMeasurableEl(props.referenceEl) || (0, vue.unref)(triggerRef));
	const { attributes, state, styles, update, forceUpdate, instanceRef } = require_index.usePopper(computedReference, contentRef, options);
	(0, vue.watch)(instanceRef, (instance) => popperInstanceRef.value = instance, { flush: "sync" });
	(0, vue.onMounted)(() => {
		(0, vue.watch)(() => (0, vue.unref)(computedReference)?.getBoundingClientRect?.(), () => {
			update();
		});
	});
	let stopResizeObserver;
	(0, vue.watch)(() => props.visible, (visible) => {
		stopResizeObserver?.();
		stopResizeObserver = void 0;
		if (visible) stopResizeObserver = (0, _vueuse_core.useResizeObserver)(contentRef, update).stop;
	});
	(0, vue.onBeforeUnmount)(() => {
		popperInstanceRef.value = void 0;
		stopResizeObserver?.();
		stopResizeObserver = void 0;
	});
	return {
		attributes,
		arrowRef,
		contentRef,
		instanceRef,
		state,
		styles,
		role,
		forceUpdate,
		update
	};
};

//#endregion
exports.usePopperContent = usePopperContent;
//# sourceMappingURL=use-content.js.map
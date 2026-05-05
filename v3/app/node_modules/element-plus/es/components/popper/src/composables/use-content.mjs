import { usePopper } from "../../../../hooks/use-popper/index.mjs";
import { POPPER_INJECTION_KEY } from "../constants.mjs";
import { buildPopperOptions, unwrapMeasurableEl } from "../utils.mjs";
import { useResizeObserver } from "@vueuse/core";
import { isUndefined } from "lodash-unified";
import { computed, inject, onBeforeUnmount, onMounted, ref, unref, watch } from "vue";

//#region ../../packages/components/popper/src/composables/use-content.ts
const DEFAULT_ARROW_OFFSET = 0;
const usePopperContent = (props) => {
	const { popperInstanceRef, contentRef, triggerRef, role } = inject(POPPER_INJECTION_KEY, void 0);
	const arrowRef = ref();
	const arrowOffset = computed(() => props.arrowOffset);
	const eventListenerModifier = computed(() => {
		return {
			name: "eventListeners",
			enabled: !!props.visible
		};
	});
	const arrowModifier = computed(() => {
		const arrowEl = unref(arrowRef);
		const offset = unref(arrowOffset) ?? DEFAULT_ARROW_OFFSET;
		return {
			name: "arrow",
			enabled: !isUndefined(arrowEl),
			options: {
				element: arrowEl,
				padding: offset
			}
		};
	});
	const options = computed(() => {
		return {
			onFirstUpdate: () => {
				update();
			},
			...buildPopperOptions(props, [unref(arrowModifier), unref(eventListenerModifier)])
		};
	});
	const computedReference = computed(() => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef));
	const { attributes, state, styles, update, forceUpdate, instanceRef } = usePopper(computedReference, contentRef, options);
	watch(instanceRef, (instance) => popperInstanceRef.value = instance, { flush: "sync" });
	onMounted(() => {
		watch(() => unref(computedReference)?.getBoundingClientRect?.(), () => {
			update();
		});
	});
	let stopResizeObserver;
	watch(() => props.visible, (visible) => {
		stopResizeObserver?.();
		stopResizeObserver = void 0;
		if (visible) stopResizeObserver = useResizeObserver(contentRef, update).stop;
	});
	onBeforeUnmount(() => {
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
export { usePopperContent };
//# sourceMappingURL=use-content.mjs.map
import { addUnit } from "../../../../utils/dom/style.mjs";
import { clamp, useEventListener, useWindowSize } from "@vueuse/core";
import { computed, onBeforeUnmount, ref, watch } from "vue";

//#region ../../packages/components/drawer/src/composables/useResizable.ts
function useResizable(props, target, emit) {
	const { width, height } = useWindowSize();
	const isHorizontal = computed(() => ["ltr", "rtl"].includes(props.direction));
	const sign = computed(() => ["ltr", "ttb"].includes(props.direction) ? 1 : -1);
	const windowSize = computed(() => isHorizontal.value ? width.value : height.value);
	const getSize = computed(() => {
		return clamp(startSize.value + sign.value * offset.value, 4, windowSize.value);
	});
	const startSize = ref(0);
	const offset = ref(0);
	const isResizing = ref(false);
	const hasStartedDragging = ref(false);
	let startPos = [];
	let cleanups = [];
	const getActualSize = () => {
		const drawerEl = target.value?.closest("[aria-modal=\"true\"]");
		if (drawerEl) return isHorizontal.value ? drawerEl.offsetWidth : drawerEl.offsetHeight;
		return 100;
	};
	watch(() => [props.size, props.resizable], () => {
		hasStartedDragging.value = false;
		startSize.value = 0;
		offset.value = 0;
		onMouseUp();
	});
	const onMousedown = (e) => {
		if (!props.resizable) return;
		if (!hasStartedDragging.value) {
			startSize.value = getActualSize();
			hasStartedDragging.value = true;
		}
		startPos = [e.pageX, e.pageY];
		isResizing.value = true;
		emit("resize-start", e, startSize.value);
		cleanups.push(useEventListener(window, "mouseup", onMouseUp), useEventListener(window, "mousemove", onMouseMove));
	};
	const onMouseMove = (e) => {
		const { pageX, pageY } = e;
		const offsetX = pageX - startPos[0];
		const offsetY = pageY - startPos[1];
		offset.value = isHorizontal.value ? offsetX : offsetY;
		emit("resize", e, getSize.value);
	};
	const onMouseUp = (e) => {
		if (!isResizing.value) return;
		startPos = [];
		startSize.value = getSize.value;
		offset.value = 0;
		isResizing.value = false;
		cleanups.forEach((cleanup) => cleanup?.());
		cleanups = [];
		if (e) emit("resize-end", e, startSize.value);
	};
	const cleanup = useEventListener(target, "mousedown", onMousedown);
	onBeforeUnmount(() => {
		cleanup();
		onMouseUp();
	});
	return {
		size: computed(() => {
			return hasStartedDragging.value ? `${getSize.value}px` : addUnit(props.size);
		}),
		isResizing,
		isHorizontal
	};
}

//#endregion
export { useResizable };
//# sourceMappingURL=useResizable.mjs.map
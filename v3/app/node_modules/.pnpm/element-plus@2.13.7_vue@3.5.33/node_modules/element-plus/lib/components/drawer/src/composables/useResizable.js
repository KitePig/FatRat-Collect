Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../../utils/dom/style.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/drawer/src/composables/useResizable.ts
function useResizable(props, target, emit) {
	const { width, height } = (0, _vueuse_core.useWindowSize)();
	const isHorizontal = (0, vue.computed)(() => ["ltr", "rtl"].includes(props.direction));
	const sign = (0, vue.computed)(() => ["ltr", "ttb"].includes(props.direction) ? 1 : -1);
	const windowSize = (0, vue.computed)(() => isHorizontal.value ? width.value : height.value);
	const getSize = (0, vue.computed)(() => {
		return (0, _vueuse_core.clamp)(startSize.value + sign.value * offset.value, 4, windowSize.value);
	});
	const startSize = (0, vue.ref)(0);
	const offset = (0, vue.ref)(0);
	const isResizing = (0, vue.ref)(false);
	const hasStartedDragging = (0, vue.ref)(false);
	let startPos = [];
	let cleanups = [];
	const getActualSize = () => {
		const drawerEl = target.value?.closest("[aria-modal=\"true\"]");
		if (drawerEl) return isHorizontal.value ? drawerEl.offsetWidth : drawerEl.offsetHeight;
		return 100;
	};
	(0, vue.watch)(() => [props.size, props.resizable], () => {
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
		cleanups.push((0, _vueuse_core.useEventListener)(window, "mouseup", onMouseUp), (0, _vueuse_core.useEventListener)(window, "mousemove", onMouseMove));
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
	const cleanup = (0, _vueuse_core.useEventListener)(target, "mousedown", onMousedown);
	(0, vue.onBeforeUnmount)(() => {
		cleanup();
		onMouseUp();
	});
	return {
		size: (0, vue.computed)(() => {
			return hasStartedDragging.value ? `${getSize.value}px` : require_style.addUnit(props.size);
		}),
		isResizing,
		isHorizontal
	};
}

//#endregion
exports.useResizable = useResizable;
//# sourceMappingURL=useResizable.js.map
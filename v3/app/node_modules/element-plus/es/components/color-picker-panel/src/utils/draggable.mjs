import { isClient } from "../../../../utils/browser.mjs";

//#region ../../packages/components/color-picker-panel/src/utils/draggable.ts
let isDragging = false;
function draggable(element, options) {
	if (!isClient) return;
	const moveFn = function(event) {
		options.drag?.(event);
	};
	const upFn = function(event) {
		document.removeEventListener("mousemove", moveFn);
		document.removeEventListener("mouseup", upFn);
		document.removeEventListener("touchmove", moveFn);
		document.removeEventListener("touchend", upFn);
		document.onselectstart = null;
		document.ondragstart = null;
		isDragging = false;
		options.end?.(event);
	};
	const downFn = function(event) {
		if (isDragging) return;
		document.onselectstart = () => false;
		document.ondragstart = () => false;
		document.addEventListener("mousemove", moveFn);
		document.addEventListener("mouseup", upFn);
		document.addEventListener("touchmove", moveFn);
		document.addEventListener("touchend", upFn);
		isDragging = true;
		options.start?.(event);
	};
	element.addEventListener("mousedown", downFn);
	element.addEventListener("touchstart", downFn, { passive: false });
}

//#endregion
export { draggable };
//# sourceMappingURL=draggable.mjs.map
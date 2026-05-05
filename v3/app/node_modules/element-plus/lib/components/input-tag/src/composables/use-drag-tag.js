Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_style = require('../../../../utils/dom/style.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
let vue = require("vue");

//#region ../../packages/components/input-tag/src/composables/use-drag-tag.ts
function useDragTag({ wrapperRef, handleDragged, afterDragged }) {
	const ns = require_index.useNamespace("input-tag");
	const dropIndicatorRef = (0, vue.shallowRef)();
	const showDropIndicator = (0, vue.ref)(false);
	let draggingIndex;
	let draggingTag;
	let dropIndex;
	let dropType;
	function getTagClassName(index) {
		return `.${ns.e("inner")} .${ns.namespace.value}-tag:nth-child(${index + 1})`;
	}
	function handleDragStart(event, index) {
		draggingIndex = index;
		draggingTag = wrapperRef.value.querySelector(getTagClassName(index));
		if (draggingTag) draggingTag.style.opacity = "0.5";
		event.dataTransfer.effectAllowed = "move";
	}
	function handleDragOver(event, index) {
		dropIndex = index;
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
		if (require_types.isUndefined(draggingIndex) || draggingIndex === index) {
			showDropIndicator.value = false;
			return;
		}
		const dropPosition = wrapperRef.value.querySelector(getTagClassName(index)).getBoundingClientRect();
		const dropPrev = !(draggingIndex + 1 === index);
		const dropNext = !(draggingIndex - 1 === index);
		const distance = event.clientX - dropPosition.left;
		const prevPercent = dropPrev ? dropNext ? .5 : 1 : -1;
		const nextPercent = dropNext ? dropPrev ? .5 : 0 : 1;
		if (distance <= dropPosition.width * prevPercent) dropType = "before";
		else if (distance > dropPosition.width * nextPercent) dropType = "after";
		else dropType = void 0;
		const innerEl = wrapperRef.value.querySelector(`.${ns.e("inner")}`);
		const innerPosition = innerEl.getBoundingClientRect();
		const gap = Number.parseFloat(require_style.getStyle(innerEl, "gap")) / 2;
		const indicatorTop = dropPosition.top - innerPosition.top;
		let indicatorLeft = -9999;
		if (dropType === "before") indicatorLeft = Math.max(dropPosition.left - innerPosition.left - gap, Math.floor(-gap / 2));
		else if (dropType === "after") {
			const left = dropPosition.right - innerPosition.left;
			indicatorLeft = left + (innerPosition.width === left ? Math.floor(gap / 2) : gap);
		}
		require_style.setStyle(dropIndicatorRef.value, {
			top: `${indicatorTop}px`,
			left: `${indicatorLeft}px`
		});
		showDropIndicator.value = !!dropType;
	}
	function handleDragEnd(event) {
		event.preventDefault();
		if (draggingTag) draggingTag.style.opacity = "";
		if (dropType && !require_types.isUndefined(draggingIndex) && !require_types.isUndefined(dropIndex) && draggingIndex !== dropIndex) handleDragged(draggingIndex, dropIndex, dropType);
		showDropIndicator.value = false;
		draggingIndex = void 0;
		draggingTag = null;
		dropIndex = void 0;
		dropType = void 0;
		afterDragged?.();
	}
	return {
		dropIndicatorRef,
		showDropIndicator,
		handleDragStart,
		handleDragOver,
		handleDragEnd
	};
}

//#endregion
exports.useDragTag = useDragTag;
//# sourceMappingURL=use-drag-tag.js.map
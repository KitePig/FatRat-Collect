import { nextTick, ref } from "vue";

//#region ../../packages/hooks/use-composition/index.ts
function useComposition({ afterComposition, emit }) {
	const isComposing = ref(false);
	const handleCompositionStart = (event) => {
		emit?.("compositionstart", event);
		isComposing.value = true;
	};
	const handleCompositionUpdate = (event) => {
		emit?.("compositionupdate", event);
		isComposing.value = true;
	};
	const handleCompositionEnd = (event) => {
		emit?.("compositionend", event);
		if (isComposing.value) {
			isComposing.value = false;
			nextTick(() => afterComposition(event));
		}
	};
	const handleComposition = (event) => {
		event.type === "compositionend" ? handleCompositionEnd(event) : handleCompositionUpdate(event);
	};
	return {
		isComposing,
		handleComposition,
		handleCompositionStart,
		handleCompositionUpdate,
		handleCompositionEnd
	};
}

//#endregion
export { useComposition };
//# sourceMappingURL=index.mjs.map
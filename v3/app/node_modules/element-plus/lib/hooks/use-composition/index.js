Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/hooks/use-composition/index.ts
function useComposition({ afterComposition, emit }) {
	const isComposing = (0, vue.ref)(false);
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
			(0, vue.nextTick)(() => afterComposition(event));
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
exports.useComposition = useComposition;
//# sourceMappingURL=index.js.map
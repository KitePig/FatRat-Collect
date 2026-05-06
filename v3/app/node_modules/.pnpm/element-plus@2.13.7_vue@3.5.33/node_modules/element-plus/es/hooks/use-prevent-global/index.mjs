import { useEventListener } from "@vueuse/core";
import { watch } from "vue";

//#region ../../packages/hooks/use-prevent-global/index.ts
const usePreventGlobal = (indicator, evt, cb) => {
	const prevent = (e) => {
		if (cb(e)) e.stopImmediatePropagation();
	};
	let stop = void 0;
	watch(() => indicator.value, (val) => {
		if (val) stop = useEventListener(document, evt, prevent, true);
		else stop?.();
	}, { immediate: true });
};

//#endregion
export { usePreventGlobal };
//# sourceMappingURL=index.mjs.map
import { nextTick, unref, watch } from "vue";

//#region ../../packages/hooks/use-intermediate-render/index.ts
const useDelayedRender = ({ indicator, intermediateIndicator, shouldSetIntermediate = () => true, beforeShow, afterShow, afterHide, beforeHide }) => {
	watch(() => unref(indicator), (val) => {
		if (val) {
			beforeShow?.();
			nextTick(() => {
				if (!unref(indicator)) return;
				if (shouldSetIntermediate("show")) intermediateIndicator.value = true;
			});
		} else {
			beforeHide?.();
			nextTick(() => {
				if (unref(indicator)) return;
				if (shouldSetIntermediate("hide")) intermediateIndicator.value = false;
			});
		}
	});
	watch(() => intermediateIndicator.value, (val) => {
		if (val) afterShow?.();
		else afterHide?.();
	});
};

//#endregion
export { useDelayedRender };
//# sourceMappingURL=index.mjs.map
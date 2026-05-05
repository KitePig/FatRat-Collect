Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/hooks/use-intermediate-render/index.ts
const useDelayedRender = ({ indicator, intermediateIndicator, shouldSetIntermediate = () => true, beforeShow, afterShow, afterHide, beforeHide }) => {
	(0, vue.watch)(() => (0, vue.unref)(indicator), (val) => {
		if (val) {
			beforeShow?.();
			(0, vue.nextTick)(() => {
				if (!(0, vue.unref)(indicator)) return;
				if (shouldSetIntermediate("show")) intermediateIndicator.value = true;
			});
		} else {
			beforeHide?.();
			(0, vue.nextTick)(() => {
				if ((0, vue.unref)(indicator)) return;
				if (shouldSetIntermediate("hide")) intermediateIndicator.value = false;
			});
		}
	});
	(0, vue.watch)(() => intermediateIndicator.value, (val) => {
		if (val) afterShow?.();
		else afterHide?.();
	});
};

//#endregion
exports.useDelayedRender = useDelayedRender;
//# sourceMappingURL=index.js.map
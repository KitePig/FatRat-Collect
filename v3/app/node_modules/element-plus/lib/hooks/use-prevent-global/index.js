Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/hooks/use-prevent-global/index.ts
const usePreventGlobal = (indicator, evt, cb) => {
	const prevent = (e) => {
		if (cb(e)) e.stopImmediatePropagation();
	};
	let stop = void 0;
	(0, vue.watch)(() => indicator.value, (val) => {
		if (val) stop = (0, _vueuse_core.useEventListener)(document, evt, prevent, true);
		else stop?.();
	}, { immediate: true });
};

//#endregion
exports.usePreventGlobal = usePreventGlobal;
//# sourceMappingURL=index.js.map
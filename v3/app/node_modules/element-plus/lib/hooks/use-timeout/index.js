Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/hooks/use-timeout/index.ts
function useTimeout() {
	let timeoutHandle;
	const registerTimeout = (fn, delay) => {
		cancelTimeout();
		timeoutHandle = globalThis.setTimeout(fn, delay);
	};
	const cancelTimeout = () => {
		if (timeoutHandle === void 0) return;
		globalThis.clearTimeout(timeoutHandle);
		timeoutHandle = void 0;
	};
	(0, _vueuse_core.tryOnScopeDispose)(() => cancelTimeout());
	return {
		registerTimeout,
		cancelTimeout
	};
}

//#endregion
exports.useTimeout = useTimeout;
//# sourceMappingURL=index.js.map
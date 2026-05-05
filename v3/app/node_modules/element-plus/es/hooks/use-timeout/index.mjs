import { tryOnScopeDispose } from "@vueuse/core";

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
	tryOnScopeDispose(() => cancelTimeout());
	return {
		registerTimeout,
		cancelTimeout
	};
}

//#endregion
export { useTimeout };
//# sourceMappingURL=index.mjs.map
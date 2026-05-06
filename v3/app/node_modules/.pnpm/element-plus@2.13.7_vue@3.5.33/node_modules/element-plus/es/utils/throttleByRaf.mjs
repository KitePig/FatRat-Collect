import { cAF, rAF } from "./raf.mjs";

//#region ../../packages/utils/throttleByRaf.ts
function throttleByRaf(cb) {
	let timer = 0;
	const throttle = (...args) => {
		if (timer) cAF(timer);
		timer = rAF(() => {
			cb(...args);
			timer = 0;
		});
	};
	throttle.cancel = () => {
		cAF(timer);
		timer = 0;
	};
	return throttle;
}

//#endregion
export { throttleByRaf };
//# sourceMappingURL=throttleByRaf.mjs.map
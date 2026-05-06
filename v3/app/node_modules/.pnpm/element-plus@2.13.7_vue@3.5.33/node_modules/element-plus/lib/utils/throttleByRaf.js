Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_raf = require('./raf.js');

//#region ../../packages/utils/throttleByRaf.ts
function throttleByRaf(cb) {
	let timer = 0;
	const throttle = (...args) => {
		if (timer) require_raf.cAF(timer);
		timer = require_raf.rAF(() => {
			cb(...args);
			timer = 0;
		});
	};
	throttle.cancel = () => {
		require_raf.cAF(timer);
		timer = 0;
	};
	return throttle;
}

//#endregion
exports.throttleByRaf = throttleByRaf;
//# sourceMappingURL=throttleByRaf.js.map
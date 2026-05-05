Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/directives/repeat-click/index.ts
const REPEAT_INTERVAL = 100;
const REPEAT_DELAY = 600;
const SCOPE = "_RepeatClick";
const vRepeatClick = {
	beforeMount(el, binding) {
		const value = binding.value;
		const { interval = REPEAT_INTERVAL, delay = REPEAT_DELAY } = (0, _vue_shared.isFunction)(value) ? {} : value;
		let intervalId;
		let delayId;
		const handler = () => (0, _vue_shared.isFunction)(value) ? value() : value.handler();
		const clear = () => {
			if (delayId) {
				clearTimeout(delayId);
				delayId = void 0;
			}
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = void 0;
			}
		};
		const start = (evt) => {
			if (evt.button !== 0) return;
			clear();
			handler();
			document.addEventListener("mouseup", clear, { once: true });
			delayId = setTimeout(() => {
				intervalId = setInterval(() => {
					handler();
				}, interval);
			}, delay);
		};
		el[SCOPE] = {
			start,
			clear
		};
		el.addEventListener("mousedown", start);
	},
	unmounted(el) {
		if (!el[SCOPE]) return;
		const { start, clear } = el[SCOPE];
		if (start) el.removeEventListener("mousedown", start);
		if (clear) {
			clear();
			document.removeEventListener("mouseup", clear);
		}
		el[SCOPE] = null;
	}
};

//#endregion
exports.REPEAT_DELAY = REPEAT_DELAY;
exports.REPEAT_INTERVAL = REPEAT_INTERVAL;
exports.vRepeatClick = vRepeatClick;
//# sourceMappingURL=index.js.map
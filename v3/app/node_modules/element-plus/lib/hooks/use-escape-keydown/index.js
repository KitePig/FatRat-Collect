Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../constants/aria.js');
const require_event = require('../../utils/dom/event.js');
let vue = require("vue");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/hooks/use-escape-keydown/index.ts
let registeredEscapeHandlers = [];
const cachedHandler = (event) => {
	if (require_event.getEventCode(event) === require_aria.EVENT_CODE.esc) registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event));
};
const useEscapeKeydown = (handler) => {
	(0, vue.onMounted)(() => {
		if (registeredEscapeHandlers.length === 0) document.addEventListener("keydown", cachedHandler);
		if (_vueuse_core.isClient) registeredEscapeHandlers.push(handler);
	});
	(0, vue.onBeforeUnmount)(() => {
		registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler);
		if (registeredEscapeHandlers.length === 0) {
			if (_vueuse_core.isClient) document.removeEventListener("keydown", cachedHandler);
		}
	});
};

//#endregion
exports.useEscapeKeydown = useEscapeKeydown;
//# sourceMappingURL=index.js.map
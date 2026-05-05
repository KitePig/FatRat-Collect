import { EVENT_CODE } from "../../constants/aria.mjs";
import { isClient } from "../../utils/browser.mjs";
import { getEventCode } from "../../utils/dom/event.mjs";
import { onBeforeUnmount, onMounted } from "vue";

//#region ../../packages/hooks/use-escape-keydown/index.ts
let registeredEscapeHandlers = [];
const cachedHandler = (event) => {
	if (getEventCode(event) === EVENT_CODE.esc) registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event));
};
const useEscapeKeydown = (handler) => {
	onMounted(() => {
		if (registeredEscapeHandlers.length === 0) document.addEventListener("keydown", cachedHandler);
		if (isClient) registeredEscapeHandlers.push(handler);
	});
	onBeforeUnmount(() => {
		registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler);
		if (registeredEscapeHandlers.length === 0) {
			if (isClient) document.removeEventListener("keydown", cachedHandler);
		}
	});
};

//#endregion
export { useEscapeKeydown };
//# sourceMappingURL=index.mjs.map
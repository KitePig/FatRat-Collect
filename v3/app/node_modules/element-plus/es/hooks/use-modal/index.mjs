import { EVENT_CODE } from "../../constants/aria.mjs";
import { getEventCode } from "../../utils/dom/event.mjs";
import { isClient, useEventListener } from "@vueuse/core";
import { watch } from "vue";

//#region ../../packages/hooks/use-modal/index.ts
const modalStack = [];
const closeModal = (e) => {
	if (modalStack.length === 0) return;
	if (getEventCode(e) === EVENT_CODE.esc) {
		e.stopPropagation();
		modalStack[modalStack.length - 1].handleClose();
	}
};
const useModal = (instance, visibleRef) => {
	watch(visibleRef, (val) => {
		if (val) modalStack.push(instance);
		else modalStack.splice(modalStack.indexOf(instance), 1);
	});
};
if (isClient) useEventListener(document, "keydown", closeModal);

//#endregion
export { useModal };
//# sourceMappingURL=index.mjs.map
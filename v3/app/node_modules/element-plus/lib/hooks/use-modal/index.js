Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../constants/aria.js');
const require_event = require('../../utils/dom/event.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/hooks/use-modal/index.ts
const modalStack = [];
const closeModal = (e) => {
	if (modalStack.length === 0) return;
	if (require_event.getEventCode(e) === require_aria.EVENT_CODE.esc) {
		e.stopPropagation();
		modalStack[modalStack.length - 1].handleClose();
	}
};
const useModal = (instance, visibleRef) => {
	(0, vue.watch)(visibleRef, (val) => {
		if (val) modalStack.push(instance);
		else modalStack.splice(modalStack.indexOf(instance), 1);
	});
};
if (_vueuse_core.isClient) (0, _vueuse_core.useEventListener)(document, "keydown", closeModal);

//#endregion
exports.useModal = useModal;
//# sourceMappingURL=index.js.map
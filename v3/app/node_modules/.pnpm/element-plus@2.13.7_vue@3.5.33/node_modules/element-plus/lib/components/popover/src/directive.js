Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });

//#region ../../packages/components/popover/src/directive.ts
const attachEvents = (el, binding) => {
	const popover = (binding.arg || binding.value)?.popperRef;
	if (popover) popover.triggerRef = el;
};
var directive_default = {
	mounted(el, binding) {
		attachEvents(el, binding);
	},
	updated(el, binding) {
		attachEvents(el, binding);
	}
};
const VPopover = "popover";

//#endregion
exports.VPopover = VPopover;
exports.default = directive_default;
//# sourceMappingURL=directive.js.map
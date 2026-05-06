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
export { VPopover, directive_default as default };
//# sourceMappingURL=directive.mjs.map
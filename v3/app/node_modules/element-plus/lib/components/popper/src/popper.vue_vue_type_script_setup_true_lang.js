const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_popper = require('./popper.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/popper/src/popper.vue?vue&type=script&setup=true&lang.ts
var popper_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPopper",
	inheritAttrs: false,
	__name: "popper",
	props: require_popper.popperProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const popperProvides = {
			triggerRef: (0, vue.ref)(),
			popperInstanceRef: (0, vue.ref)(),
			contentRef: (0, vue.ref)(),
			referenceRef: (0, vue.ref)(),
			role: (0, vue.computed)(() => props.role)
		};
		__expose(popperProvides);
		(0, vue.provide)(require_constants.POPPER_INJECTION_KEY, popperProvides);
		return (_ctx, _cache) => {
			return (0, vue.renderSlot)(_ctx.$slots, "default");
		};
	}
});

//#endregion
exports.default = popper_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=popper.vue_vue_type_script_setup_true_lang.js.map
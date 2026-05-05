const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/popper/src/arrow.vue?vue&type=script&setup=true&lang.ts
var arrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPopperArrow",
	inheritAttrs: false,
	__name: "arrow",
	setup(__props, { expose: __expose }) {
		const ns = require_index.useNamespace("popper");
		const { arrowRef, arrowStyle } = (0, vue.inject)(require_constants.POPPER_CONTENT_INJECTION_KEY, void 0);
		(0, vue.onBeforeUnmount)(() => {
			arrowRef.value = void 0;
		});
		__expose({ arrowRef });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				ref_key: "arrowRef",
				ref: arrowRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("arrow")),
				style: (0, vue.normalizeStyle)((0, vue.unref)(arrowStyle)),
				"data-popper-arrow": ""
			}, null, 6);
		};
	}
});

//#endregion
exports.default = arrow_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=arrow.vue_vue_type_script_setup_true_lang.js.map
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let vue = require("vue");

//#region ../../packages/components/container/src/main.vue?vue&type=script&setup=true&lang.ts
var main_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElMain",
	__name: "main",
	setup(__props) {
		const ns = require_index.useNamespace("main");
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("main", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
exports.default = main_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=main.vue_vue_type_script_setup_true_lang.js.map
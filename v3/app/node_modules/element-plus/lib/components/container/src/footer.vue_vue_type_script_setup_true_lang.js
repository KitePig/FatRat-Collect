const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let vue = require("vue");

//#region ../../packages/components/container/src/footer.vue?vue&type=script&setup=true&lang.ts
var footer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElFooter",
	__name: "footer",
	props: { height: {
		type: [String, null],
		required: false,
		default: null
	} },
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("footer");
		const style = (0, vue.computed)(() => props.height ? ns.cssVarBlock({ height: props.height }) : {});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("footer", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()),
				style: (0, vue.normalizeStyle)(style.value)
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 6);
		};
	}
});

//#endregion
exports.default = footer_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=footer.vue_vue_type_script_setup_true_lang.js.map
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let vue = require("vue");

//#region ../../packages/components/container/src/header.vue?vue&type=script&setup=true&lang.ts
var header_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElHeader",
	__name: "header",
	props: { height: {
		type: [String, null],
		required: false,
		default: null
	} },
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("header");
		const style = (0, vue.computed)(() => {
			return props.height ? ns.cssVarBlock({ height: props.height }) : {};
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("header", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()),
				style: (0, vue.normalizeStyle)(style.value)
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 6);
		};
	}
});

//#endregion
exports.default = header_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=header.vue_vue_type_script_setup_true_lang.js.map
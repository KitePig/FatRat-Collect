const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_constants = require('./constants.js');
const require_button_group = require('./button-group.js');
let vue = require("vue");

//#region ../../packages/components/button/src/button-group.vue?vue&type=script&setup=true&lang.ts
var button_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElButtonGroup",
	__name: "button-group",
	props: require_button_group.buttonGroupProps,
	setup(__props) {
		const props = __props;
		(0, vue.provide)(require_constants.buttonGroupContextKey, (0, vue.reactive)({
			size: (0, vue.toRef)(props, "size"),
			type: (0, vue.toRef)(props, "type")
		}));
		const ns = require_index.useNamespace("button");
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b("group"), (0, vue.unref)(ns).bm("group", props.direction)]) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
exports.default = button_group_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=button-group.vue_vue_type_script_setup_true_lang.js.map
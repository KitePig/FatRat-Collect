const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_teleport = require('./teleport.js');
let vue = require("vue");

//#region ../../packages/components/teleport/src/teleport.vue?vue&type=script&setup=true&lang.ts
var teleport_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "teleport",
	props: require_teleport.teleportProps,
	setup(__props) {
		return (_ctx, _cache) => {
			return _ctx.disabled ? (0, vue.renderSlot)(_ctx.$slots, "default", { key: 0 }) : ((0, vue.openBlock)(), (0, vue.createBlock)(vue.Teleport, {
				key: 1,
				to: _ctx.to
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 8, ["to"]));
		};
	}
});

//#endregion
exports.default = teleport_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=teleport.vue_vue_type_script_setup_true_lang.js.map
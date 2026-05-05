import { teleportProps } from "./teleport.mjs";
import { Teleport, createBlock, defineComponent, openBlock, renderSlot } from "vue";

//#region ../../packages/components/teleport/src/teleport.vue?vue&type=script&setup=true&lang.ts
var teleport_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "teleport",
	props: teleportProps,
	setup(__props) {
		return (_ctx, _cache) => {
			return _ctx.disabled ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(Teleport, {
				key: 1,
				to: _ctx.to
			}, [renderSlot(_ctx.$slots, "default")], 8, ["to"]));
		};
	}
});

//#endregion
export { teleport_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=teleport.vue_vue_type_script_setup_true_lang.mjs.map
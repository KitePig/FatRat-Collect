const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let vue = require("vue");

//#region ../../packages/components/container/src/container.vue?vue&type=script&setup=true&lang.ts
var container_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElContainer",
	__name: "container",
	props: { direction: {
		type: String,
		required: false
	} },
	setup(__props) {
		const props = __props;
		const slots = (0, vue.useSlots)();
		const ns = require_index.useNamespace("container");
		const isVertical = (0, vue.computed)(() => {
			if (props.direction === "vertical") return true;
			else if (props.direction === "horizontal") return false;
			if (slots && slots.default) return slots.default().some((vNode) => {
				const tag = vNode.type.name;
				return tag === "ElHeader" || tag === "ElFooter";
			});
			else return false;
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("section", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b(), (0, vue.unref)(ns).is("vertical", isVertical.value)]) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
exports.default = container_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=container.vue_vue_type_script_setup_true_lang.js.map
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_divider = require('./divider.js');
let vue = require("vue");

//#region ../../packages/components/divider/src/divider.vue?vue&type=script&setup=true&lang.ts
var divider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElDivider",
	__name: "divider",
	props: require_divider.dividerProps,
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("divider");
		const dividerStyle = (0, vue.computed)(() => {
			return ns.cssVar({ "border-style": props.borderStyle });
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b(), (0, vue.unref)(ns).m(__props.direction)]),
				style: (0, vue.normalizeStyle)(dividerStyle.value),
				role: "separator"
			}, [_ctx.$slots.default && __props.direction !== "vertical" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("text"), (0, vue.unref)(ns).is(__props.contentPosition)])
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)) : (0, vue.createCommentVNode)("v-if", true)], 6);
		};
	}
});

//#endregion
exports.default = divider_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=divider.vue_vue_type_script_setup_true_lang.js.map
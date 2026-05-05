const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_icon = require('./icon.js');
let vue = require("vue");

//#region ../../packages/components/icon/src/icon.vue?vue&type=script&setup=true&lang.ts
var icon_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElIcon",
	inheritAttrs: false,
	__name: "icon",
	props: require_icon.iconProps,
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("icon");
		const style = (0, vue.computed)(() => {
			const { size, color } = props;
			const fontSize = require_style.addUnit(size);
			if (!fontSize && !color) return {};
			return {
				fontSize,
				"--color": color
			};
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("i", (0, vue.mergeProps)({
				class: (0, vue.unref)(ns).b(),
				style: style.value
			}, _ctx.$attrs), [(0, vue.renderSlot)(_ctx.$slots, "default")], 16);
		};
	}
});

//#endregion
exports.default = icon_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=icon.vue_vue_type_script_setup_true_lang.js.map
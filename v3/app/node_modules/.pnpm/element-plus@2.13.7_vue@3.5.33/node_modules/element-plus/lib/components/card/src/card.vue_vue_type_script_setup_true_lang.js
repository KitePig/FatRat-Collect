const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_global_config = require('../../config-provider/src/hooks/use-global-config.js');
const require_card = require('./card.js');
let vue = require("vue");

//#region ../../packages/components/card/src/card.vue?vue&type=script&setup=true&lang.ts
var card_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCard",
	__name: "card",
	props: require_card.cardProps,
	setup(__props) {
		const globalConfig = require_use_global_config.useGlobalConfig("card");
		const ns = require_index.useNamespace("card");
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b(), (0, vue.unref)(ns).is(`${__props.shadow || (0, vue.unref)(globalConfig)?.shadow || "always"}-shadow`)]) }, [
				_ctx.$slots.header || __props.header ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("header"), __props.headerClass])
				}, [(0, vue.renderSlot)(_ctx.$slots, "header", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.header), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("body"), __props.bodyClass]),
					style: (0, vue.normalizeStyle)(__props.bodyStyle)
				}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 6),
				_ctx.$slots.footer || __props.footer ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("footer"), __props.footerClass])
				}, [(0, vue.renderSlot)(_ctx.$slots, "footer", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.footer), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2);
		};
	}
});

//#endregion
exports.default = card_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=card.vue_vue_type_script_setup_true_lang.js.map
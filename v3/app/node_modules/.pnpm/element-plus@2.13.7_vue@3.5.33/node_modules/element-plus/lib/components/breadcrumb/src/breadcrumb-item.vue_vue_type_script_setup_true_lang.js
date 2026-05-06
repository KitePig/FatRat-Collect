const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_constants = require('./constants.js');
const require_breadcrumb_item = require('./breadcrumb-item.js');
let vue = require("vue");

//#region ../../packages/components/breadcrumb/src/breadcrumb-item.vue?vue&type=script&setup=true&lang.ts
var breadcrumb_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElBreadcrumbItem",
	__name: "breadcrumb-item",
	props: require_breadcrumb_item.breadcrumbItemProps,
	setup(__props) {
		const props = __props;
		const instance = (0, vue.getCurrentInstance)();
		const breadcrumbContext = (0, vue.inject)(require_constants.breadcrumbKey, void 0);
		const ns = require_index.useNamespace("breadcrumb");
		const router = instance.appContext.config.globalProperties.$router;
		const onClick = () => {
			if (!props.to || !router) return;
			props.replace ? router.replace(props.to) : router.push(props.to);
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("item")) }, [(0, vue.createElementVNode)("span", {
				class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("inner"), (0, vue.unref)(ns).is("link", !!__props.to)]),
				role: "link",
				onClick
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2), (0, vue.unref)(breadcrumbContext)?.separatorIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("separator"))
			}, {
				default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)((0, vue.unref)(breadcrumbContext).separatorIcon)))]),
				_: 1
			}, 8, ["class"])) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				key: 1,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("separator")),
				role: "presentation"
			}, (0, vue.toDisplayString)((0, vue.unref)(breadcrumbContext)?.separator), 3))], 2);
		};
	}
});

//#endregion
exports.default = breadcrumb_item_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=breadcrumb-item.vue_vue_type_script_setup_true_lang.js.map
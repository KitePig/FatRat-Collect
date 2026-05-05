const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_breadcrumb = require('./breadcrumb.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/breadcrumb/src/breadcrumb.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
var breadcrumb_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElBreadcrumb",
	__name: "breadcrumb",
	props: require_breadcrumb.breadcrumbProps,
	setup(__props) {
		const { t } = require_index.useLocale();
		const props = __props;
		const ns = require_index$1.useNamespace("breadcrumb");
		const breadcrumb = (0, vue.ref)();
		(0, vue.provide)(require_constants.breadcrumbKey, props);
		(0, vue.onMounted)(() => {
			const items = breadcrumb.value.querySelectorAll(`.${ns.e("item")}`);
			if (items.length) items[items.length - 1].setAttribute("aria-current", "page");
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "breadcrumb",
				ref: breadcrumb,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()),
				"aria-label": (0, vue.unref)(t)("el.breadcrumb.label"),
				role: "navigation"
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 10, _hoisted_1);
		};
	}
});

//#endregion
exports.default = breadcrumb_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=breadcrumb.vue_vue_type_script_setup_true_lang.js.map
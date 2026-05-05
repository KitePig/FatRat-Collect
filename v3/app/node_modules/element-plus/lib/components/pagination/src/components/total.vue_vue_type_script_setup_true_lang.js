const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_usePagination = require('../usePagination.js');
const require_total = require('./total.js');
let vue = require("vue");

//#region ../../packages/components/pagination/src/components/total.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled"];
var total_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPaginationTotal",
	__name: "total",
	props: require_total.paginationTotalProps,
	setup(__props) {
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("pagination");
		const { disabled } = require_usePagination.usePagination();
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("total")),
				disabled: (0, vue.unref)(disabled)
			}, (0, vue.toDisplayString)((0, vue.unref)(t)("el.pagination.total", { total: _ctx.total })), 11, _hoisted_1);
		};
	}
});

//#endregion
exports.default = total_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=total.vue_vue_type_script_setup_true_lang.js.map
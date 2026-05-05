import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { usePagination } from "../usePagination.mjs";
import { paginationTotalProps } from "./total.mjs";
import { createElementBlock, defineComponent, normalizeClass, openBlock, toDisplayString, unref } from "vue";

//#region ../../packages/components/pagination/src/components/total.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled"];
var total_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPaginationTotal",
	__name: "total",
	props: paginationTotalProps,
	setup(__props) {
		const { t } = useLocale();
		const ns = useNamespace("pagination");
		const { disabled } = usePagination();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				class: normalizeClass(unref(ns).e("total")),
				disabled: unref(disabled)
			}, toDisplayString(unref(t)("el.pagination.total", { total: _ctx.total })), 11, _hoisted_1);
		};
	}
});

//#endregion
export { total_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=total.vue_vue_type_script_setup_true_lang.mjs.map
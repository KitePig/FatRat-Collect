import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { breadcrumbProps } from "./breadcrumb.mjs";
import { breadcrumbKey } from "./constants.mjs";
import { createElementBlock, defineComponent, normalizeClass, onMounted, openBlock, provide, ref, renderSlot, unref } from "vue";

//#region ../../packages/components/breadcrumb/src/breadcrumb.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
var breadcrumb_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElBreadcrumb",
	__name: "breadcrumb",
	props: breadcrumbProps,
	setup(__props) {
		const { t } = useLocale();
		const props = __props;
		const ns = useNamespace("breadcrumb");
		const breadcrumb = ref();
		provide(breadcrumbKey, props);
		onMounted(() => {
			const items = breadcrumb.value.querySelectorAll(`.${ns.e("item")}`);
			if (items.length) items[items.length - 1].setAttribute("aria-current", "page");
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "breadcrumb",
				ref: breadcrumb,
				class: normalizeClass(unref(ns).b()),
				"aria-label": unref(t)("el.breadcrumb.label"),
				role: "navigation"
			}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_1);
		};
	}
});

//#endregion
export { breadcrumb_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=breadcrumb.vue_vue_type_script_setup_true_lang.mjs.map
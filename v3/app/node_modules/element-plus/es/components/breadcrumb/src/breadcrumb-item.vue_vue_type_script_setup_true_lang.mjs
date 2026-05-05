import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { breadcrumbKey } from "./constants.mjs";
import { breadcrumbItemProps } from "./breadcrumb-item.mjs";
import { createBlock, createElementBlock, createElementVNode, defineComponent, getCurrentInstance, inject, normalizeClass, openBlock, renderSlot, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";

//#region ../../packages/components/breadcrumb/src/breadcrumb-item.vue?vue&type=script&setup=true&lang.ts
var breadcrumb_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElBreadcrumbItem",
	__name: "breadcrumb-item",
	props: breadcrumbItemProps,
	setup(__props) {
		const props = __props;
		const instance = getCurrentInstance();
		const breadcrumbContext = inject(breadcrumbKey, void 0);
		const ns = useNamespace("breadcrumb");
		const router = instance.appContext.config.globalProperties.$router;
		const onClick = () => {
			if (!props.to || !router) return;
			props.replace ? router.replace(props.to) : router.push(props.to);
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", { class: normalizeClass(unref(ns).e("item")) }, [createElementVNode("span", {
				class: normalizeClass([unref(ns).e("inner"), unref(ns).is("link", !!__props.to)]),
				role: "link",
				onClick
			}, [renderSlot(_ctx.$slots, "default")], 2), unref(breadcrumbContext)?.separatorIcon ? (openBlock(), createBlock(unref(ElIcon), {
				key: 0,
				class: normalizeClass(unref(ns).e("separator"))
			}, {
				default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(breadcrumbContext).separatorIcon)))]),
				_: 1
			}, 8, ["class"])) : (openBlock(), createElementBlock("span", {
				key: 1,
				class: normalizeClass(unref(ns).e("separator")),
				role: "presentation"
			}, toDisplayString(unref(breadcrumbContext)?.separator), 3))], 2);
		};
	}
});

//#endregion
export { breadcrumb_item_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=breadcrumb-item.vue_vue_type_script_setup_true_lang.mjs.map
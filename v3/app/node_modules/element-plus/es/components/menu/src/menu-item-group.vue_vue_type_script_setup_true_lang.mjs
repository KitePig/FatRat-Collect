import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { menuItemGroupProps } from "./menu-item-group.mjs";
import { Fragment, createElementBlock, createElementVNode, createTextVNode, defineComponent, normalizeClass, openBlock, renderSlot, toDisplayString, unref } from "vue";

//#region ../../packages/components/menu/src/menu-item-group.vue?vue&type=script&setup=true&lang.ts
var menu_item_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElMenuItemGroup",
	__name: "menu-item-group",
	props: menuItemGroupProps,
	setup(__props) {
		const ns = useNamespace("menu-item-group");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("li", { class: normalizeClass(unref(ns).b()) }, [createElementVNode("div", { class: normalizeClass(unref(ns).e("title")) }, [!_ctx.$slots.title ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(__props.title), 1)], 64)) : renderSlot(_ctx.$slots, "title", { key: 1 })], 2), createElementVNode("ul", null, [renderSlot(_ctx.$slots, "default")])], 2);
		};
	}
});

//#endregion
export { menu_item_group_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=menu-item-group.vue_vue_type_script_setup_true_lang.mjs.map
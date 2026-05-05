const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_menu_item_group = require('./menu-item-group.js');
let vue = require("vue");

//#region ../../packages/components/menu/src/menu-item-group.vue?vue&type=script&setup=true&lang.ts
var menu_item_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElMenuItemGroup",
	__name: "menu-item-group",
	props: require_menu_item_group.menuItemGroupProps,
	setup(__props) {
		const ns = require_index.useNamespace("menu-item-group");
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title")) }, [!_ctx.$slots.title ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.title), 1)], 64)) : (0, vue.renderSlot)(_ctx.$slots, "title", { key: 1 })], 2), (0, vue.createElementVNode)("ul", null, [(0, vue.renderSlot)(_ctx.$slots, "default")])], 2);
		};
	}
});

//#endregion
exports.default = menu_item_group_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=menu-item-group.vue_vue_type_script_setup_true_lang.js.map
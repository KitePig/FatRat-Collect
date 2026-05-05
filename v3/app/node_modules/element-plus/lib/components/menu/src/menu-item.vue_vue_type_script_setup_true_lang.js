const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../tooltip/index.js');
const require_use_menu = require('./use-menu.js');
const require_tokens = require('./tokens.js');
const require_menu_item = require('./menu-item.js');
let vue = require("vue");

//#region ../../packages/components/menu/src/menu-item.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElMenuItem";
var menu_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "menu-item",
	props: require_menu_item.menuItemProps,
	emits: require_menu_item.menuItemEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		require_types.isPropAbsent(props.index) && require_error.debugWarn(COMPONENT_NAME, "Missing required prop: \"index\"");
		const instance = (0, vue.getCurrentInstance)();
		const rootMenu = (0, vue.inject)(require_tokens.MENU_INJECTION_KEY);
		const nsMenu = require_index.useNamespace("menu");
		const nsMenuItem = require_index.useNamespace("menu-item");
		if (!rootMenu) require_error.throwError(COMPONENT_NAME, "can not inject root menu");
		const { parentMenu, indexPath } = require_use_menu.default(instance, (0, vue.toRef)(props, "index"));
		const subMenu = (0, vue.inject)(`${require_tokens.SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`);
		if (!subMenu) require_error.throwError(COMPONENT_NAME, "can not inject sub menu");
		const active = (0, vue.computed)(() => props.index === rootMenu.activeIndex);
		const item = (0, vue.reactive)({
			index: props.index,
			indexPath,
			active
		});
		const handleClick = () => {
			if (!props.disabled) {
				rootMenu.handleMenuItemClick({
					index: props.index,
					indexPath: indexPath.value,
					route: props.route
				});
				emit("click", item);
			}
		};
		(0, vue.onMounted)(() => {
			subMenu.addSubMenu(item);
			rootMenu.addMenuItem(item);
		});
		(0, vue.onBeforeUnmount)(() => {
			subMenu.removeSubMenu(item);
			rootMenu.removeMenuItem(item);
		});
		__expose({
			parentMenu,
			rootMenu,
			active,
			nsMenu,
			nsMenuItem,
			handleClick
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(nsMenuItem).b(),
					(0, vue.unref)(nsMenuItem).is("active", active.value),
					(0, vue.unref)(nsMenuItem).is("disabled", __props.disabled)
				]),
				role: "menuitem",
				tabindex: "-1",
				onClick: handleClick
			}, [(0, vue.unref)(parentMenu).type.name === "ElMenu" && (0, vue.unref)(rootMenu).props.collapse && _ctx.$slots.title ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElTooltip), {
				key: 0,
				effect: (0, vue.unref)(rootMenu).props.popperEffect,
				placement: "right",
				"fallback-placements": ["left"],
				"popper-class": (0, vue.unref)(rootMenu).props.popperClass,
				"popper-style": (0, vue.unref)(rootMenu).props.popperStyle,
				persistent: (0, vue.unref)(rootMenu).props.persistent,
				"focus-on-target": ""
			}, {
				content: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "title")]),
				default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(nsMenu).be("tooltip", "trigger")) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)]),
				_: 3
			}, 8, [
				"effect",
				"popper-class",
				"popper-style",
				"persistent"
			])) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, [(0, vue.renderSlot)(_ctx.$slots, "default"), (0, vue.renderSlot)(_ctx.$slots, "title")], 64))], 2);
		};
	}
});

//#endregion
exports.default = menu_item_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=menu-item.vue_vue_type_script_setup_true_lang.js.map
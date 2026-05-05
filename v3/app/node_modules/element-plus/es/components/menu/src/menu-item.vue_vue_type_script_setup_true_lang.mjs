import { isPropAbsent } from "../../../utils/types.mjs";
import { debugWarn, throwError } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import useMenu from "./use-menu.mjs";
import { MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from "./tokens.mjs";
import { menuItemEmits, menuItemProps } from "./menu-item.mjs";
import { Fragment, computed, createBlock, createElementBlock, createElementVNode, defineComponent, getCurrentInstance, inject, normalizeClass, onBeforeUnmount, onMounted, openBlock, reactive, renderSlot, toRef, unref, withCtx } from "vue";

//#region ../../packages/components/menu/src/menu-item.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElMenuItem";
var menu_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "menu-item",
	props: menuItemProps,
	emits: menuItemEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		isPropAbsent(props.index) && debugWarn(COMPONENT_NAME, "Missing required prop: \"index\"");
		const instance = getCurrentInstance();
		const rootMenu = inject(MENU_INJECTION_KEY);
		const nsMenu = useNamespace("menu");
		const nsMenuItem = useNamespace("menu-item");
		if (!rootMenu) throwError(COMPONENT_NAME, "can not inject root menu");
		const { parentMenu, indexPath } = useMenu(instance, toRef(props, "index"));
		const subMenu = inject(`${SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`);
		if (!subMenu) throwError(COMPONENT_NAME, "can not inject sub menu");
		const active = computed(() => props.index === rootMenu.activeIndex);
		const item = reactive({
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
		onMounted(() => {
			subMenu.addSubMenu(item);
			rootMenu.addMenuItem(item);
		});
		onBeforeUnmount(() => {
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
			return openBlock(), createElementBlock("li", {
				class: normalizeClass([
					unref(nsMenuItem).b(),
					unref(nsMenuItem).is("active", active.value),
					unref(nsMenuItem).is("disabled", __props.disabled)
				]),
				role: "menuitem",
				tabindex: "-1",
				onClick: handleClick
			}, [unref(parentMenu).type.name === "ElMenu" && unref(rootMenu).props.collapse && _ctx.$slots.title ? (openBlock(), createBlock(unref(ElTooltip), {
				key: 0,
				effect: unref(rootMenu).props.popperEffect,
				placement: "right",
				"fallback-placements": ["left"],
				"popper-class": unref(rootMenu).props.popperClass,
				"popper-style": unref(rootMenu).props.popperStyle,
				persistent: unref(rootMenu).props.persistent,
				"focus-on-target": ""
			}, {
				content: withCtx(() => [renderSlot(_ctx.$slots, "title")]),
				default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(nsMenu).be("tooltip", "trigger")) }, [renderSlot(_ctx.$slots, "default")], 2)]),
				_: 3
			}, 8, [
				"effect",
				"popper-class",
				"popper-style",
				"persistent"
			])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [renderSlot(_ctx.$slots, "default"), renderSlot(_ctx.$slots, "title")], 64))], 2);
		};
	}
});

//#endregion
export { menu_item_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=menu-item.vue_vue_type_script_setup_true_lang.mjs.map
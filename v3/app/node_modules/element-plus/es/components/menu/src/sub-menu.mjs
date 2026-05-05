import { focusElement } from "../../../utils/dom/aria.mjs";
import { isString, isUndefined } from "../../../utils/types.mjs";
import { throwError } from "../../../utils/error.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { ElCollapseTransition } from "../../collapse-transition/index.mjs";
import useMenu from "./use-menu.mjs";
import { useMenuCssVar } from "./use-menu-css-var.mjs";
import { MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from "./tokens.mjs";
import { useTimeoutFn } from "@vueuse/core";
import { ArrowDown, ArrowRight } from "@element-plus/icons-vue";
import { Fragment, computed, defineComponent, getCurrentInstance, h, inject, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, vShow, watch, withDirectives } from "vue";

//#region ../../packages/components/menu/src/sub-menu.ts
const subMenuProps = buildProps({
	index: {
		type: String,
		required: true
	},
	showTimeout: Number,
	hideTimeout: Number,
	popperClass: String,
	popperStyle: { type: definePropType([String, Object]) },
	disabled: Boolean,
	teleported: {
		type: Boolean,
		default: void 0
	},
	popperOffset: Number,
	expandCloseIcon: { type: iconPropType },
	expandOpenIcon: { type: iconPropType },
	collapseCloseIcon: { type: iconPropType },
	collapseOpenIcon: { type: iconPropType }
});
const COMPONENT_NAME = "ElSubMenu";
var sub_menu_default = defineComponent({
	name: COMPONENT_NAME,
	props: subMenuProps,
	setup(props, { slots, expose }) {
		const instance = getCurrentInstance();
		const { indexPath, parentMenu } = useMenu(instance, computed(() => props.index));
		const nsMenu = useNamespace("menu");
		const nsSubMenu = useNamespace("sub-menu");
		const rootMenu = inject(MENU_INJECTION_KEY);
		if (!rootMenu) throwError(COMPONENT_NAME, "can not inject root menu");
		const subMenu = inject(`${SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`);
		if (!subMenu) throwError(COMPONENT_NAME, "can not inject sub menu");
		const items = ref({});
		const subMenus = ref({});
		let timeout;
		const mouseInChild = ref(false);
		const verticalTitleRef = ref();
		const vPopper = ref();
		const isFirstLevel = computed(() => subMenu.level === 0);
		const currentPlacement = computed(() => mode.value === "horizontal" && isFirstLevel.value ? "bottom-start" : "right-start");
		const subMenuTitleIcon = computed(() => {
			if (mode.value === "horizontal" && isFirstLevel.value || mode.value === "vertical" && !rootMenu.props.collapse) {
				if (props.expandCloseIcon && props.expandOpenIcon) return opened.value ? props.expandOpenIcon : props.expandCloseIcon;
				return ArrowDown;
			} else {
				if (props.collapseCloseIcon && props.collapseOpenIcon) return opened.value ? props.collapseOpenIcon : props.collapseCloseIcon;
				return ArrowRight;
			}
		});
		const appendToBody = computed(() => {
			const value = props.teleported;
			return isUndefined(value) ? isFirstLevel.value : value;
		});
		const menuTransitionName = computed(() => rootMenu.props.collapse ? `${nsMenu.namespace.value}-zoom-in-left` : `${nsMenu.namespace.value}-zoom-in-top`);
		const fallbackPlacements = computed(() => mode.value === "horizontal" && isFirstLevel.value ? [
			"bottom-start",
			"bottom-end",
			"top-start",
			"top-end",
			"right-start",
			"left-start"
		] : [
			"right-start",
			"right",
			"right-end",
			"left-start",
			"bottom-start",
			"bottom-end",
			"top-start",
			"top-end"
		]);
		const opened = computed(() => rootMenu.openedMenus.includes(props.index));
		const active = computed(() => [...Object.values(items.value), ...Object.values(subMenus.value)].some(({ active }) => active));
		const mode = computed(() => rootMenu.props.mode);
		const persistent = computed(() => rootMenu.props.persistent);
		const item = reactive({
			index: props.index,
			indexPath,
			active
		});
		const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1);
		const subMenuPopperOffset = computed(() => props.popperOffset ?? rootMenu.props.popperOffset);
		const subMenuPopperClass = computed(() => props.popperClass ?? rootMenu.props.popperClass);
		const subMenuPopperStyle = computed(() => props.popperStyle ?? rootMenu.props.popperStyle);
		const subMenuShowTimeout = computed(() => props.showTimeout ?? rootMenu.props.showTimeout);
		const subMenuHideTimeout = computed(() => props.hideTimeout ?? rootMenu.props.hideTimeout);
		const doDestroy = () => vPopper.value?.popperRef?.popperInstanceRef?.destroy();
		const handleCollapseToggle = (value) => {
			if (!value) doDestroy();
		};
		const handleClick = () => {
			if (rootMenu.props.menuTrigger === "hover" && rootMenu.props.mode === "horizontal" || rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled) return;
			rootMenu.handleSubMenuClick({
				index: props.index,
				indexPath: indexPath.value,
				active: active.value
			});
		};
		const handleMouseenter = (event, showTimeout = subMenuShowTimeout.value) => {
			if (event.type === "focus") return;
			if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled) {
				subMenu.mouseInChild.value = true;
				return;
			}
			subMenu.mouseInChild.value = true;
			timeout?.();
			({stop: timeout} = useTimeoutFn(() => {
				rootMenu.openMenu(props.index, indexPath.value);
			}, showTimeout));
			if (appendToBody.value) parentMenu.value.vnode.el?.dispatchEvent(new MouseEvent("mouseenter"));
			if (event.type === "mouseenter" && event.target) nextTick(() => {
				focusElement(event.target, { preventScroll: true });
			});
		};
		const handleMouseleave = (deepDispatch = false) => {
			if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical") {
				subMenu.mouseInChild.value = false;
				return;
			}
			timeout?.();
			subMenu.mouseInChild.value = false;
			({stop: timeout} = useTimeoutFn(() => !mouseInChild.value && rootMenu.closeMenu(props.index, indexPath.value), subMenuHideTimeout.value));
			if (appendToBody.value && deepDispatch) subMenu.handleMouseleave?.(true);
		};
		watch(() => rootMenu.props.collapse, (value) => handleCollapseToggle(Boolean(value)));
		{
			const addSubMenu = (item) => {
				subMenus.value[item.index] = item;
			};
			const removeSubMenu = (item) => {
				delete subMenus.value[item.index];
			};
			provide(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
				addSubMenu,
				removeSubMenu,
				handleMouseleave,
				mouseInChild,
				level: subMenu.level + 1
			});
		}
		expose({ opened });
		onMounted(() => {
			rootMenu.addSubMenu(item);
			subMenu.addSubMenu(item);
		});
		onBeforeUnmount(() => {
			subMenu.removeSubMenu(item);
			rootMenu.removeSubMenu(item);
		});
		return () => {
			const titleTag = [slots.title?.(), h(ElIcon, {
				class: nsSubMenu.e("icon-arrow"),
				style: { transform: opened.value ? props.expandCloseIcon && props.expandOpenIcon || props.collapseCloseIcon && props.collapseOpenIcon && rootMenu.props.collapse ? "none" : "rotateZ(180deg)" : "none" }
			}, { default: () => isString(subMenuTitleIcon.value) ? h(instance.appContext.components[subMenuTitleIcon.value]) : h(subMenuTitleIcon.value) })];
			const child = rootMenu.isMenuPopup ? h(ElTooltip, {
				ref: vPopper,
				visible: opened.value,
				effect: "light",
				pure: true,
				offset: subMenuPopperOffset.value,
				showArrow: false,
				persistent: persistent.value,
				popperClass: subMenuPopperClass.value,
				popperStyle: subMenuPopperStyle.value,
				placement: currentPlacement.value,
				teleported: appendToBody.value,
				fallbackPlacements: fallbackPlacements.value,
				transition: menuTransitionName.value,
				gpuAcceleration: false
			}, {
				content: () => h("div", {
					class: [
						nsMenu.m(mode.value),
						nsMenu.m("popup-container"),
						subMenuPopperClass.value
					],
					onMouseenter: (evt) => handleMouseenter(evt, 100),
					onMouseleave: () => handleMouseleave(true),
					onFocus: (evt) => handleMouseenter(evt, 100)
				}, [h("ul", {
					class: [
						nsMenu.b(),
						nsMenu.m("popup"),
						nsMenu.m(`popup-${currentPlacement.value}`)
					],
					style: ulStyle.value
				}, [slots.default?.()])]),
				default: () => h("div", {
					class: nsSubMenu.e("title"),
					onClick: handleClick
				}, titleTag)
			}) : h(Fragment, {}, [h("div", {
				class: nsSubMenu.e("title"),
				ref: verticalTitleRef,
				onClick: handleClick
			}, titleTag), h(ElCollapseTransition, {}, { default: () => withDirectives(h("ul", {
				role: "menu",
				class: [nsMenu.b(), nsMenu.m("inline")],
				style: ulStyle.value
			}, [slots.default?.()]), [[vShow, opened.value]]) })]);
			return h("li", {
				class: [
					nsSubMenu.b(),
					nsSubMenu.is("active", active.value),
					nsSubMenu.is("opened", opened.value),
					nsSubMenu.is("disabled", props.disabled)
				],
				role: "menuitem",
				ariaHaspopup: true,
				ariaExpanded: opened.value,
				onMouseenter: handleMouseenter,
				onMouseleave: () => handleMouseleave(),
				onFocus: handleMouseenter
			}, [child]);
		};
	}
});

//#endregion
export { sub_menu_default as default, subMenuProps };
//# sourceMappingURL=sub-menu.mjs.map
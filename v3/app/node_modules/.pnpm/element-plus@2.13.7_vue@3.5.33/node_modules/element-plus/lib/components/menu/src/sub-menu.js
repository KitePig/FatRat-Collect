Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../utils/dom/aria.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_index$2 = require('../../tooltip/index.js');
const require_index$3 = require('../../collapse-transition/index.js');
const require_use_menu = require('./use-menu.js');
const require_use_menu_css_var = require('./use-menu-css-var.js');
const require_tokens = require('./tokens.js');
let _vueuse_core = require("@vueuse/core");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/menu/src/sub-menu.ts
const subMenuProps = require_runtime$1.buildProps({
	index: {
		type: String,
		required: true
	},
	showTimeout: Number,
	hideTimeout: Number,
	popperClass: String,
	popperStyle: { type: require_runtime$1.definePropType([String, Object]) },
	disabled: Boolean,
	teleported: {
		type: Boolean,
		default: void 0
	},
	popperOffset: Number,
	expandCloseIcon: { type: require_icon.iconPropType },
	expandOpenIcon: { type: require_icon.iconPropType },
	collapseCloseIcon: { type: require_icon.iconPropType },
	collapseOpenIcon: { type: require_icon.iconPropType }
});
const COMPONENT_NAME = "ElSubMenu";
var sub_menu_default = (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	props: subMenuProps,
	setup(props, { slots, expose }) {
		const instance = (0, vue.getCurrentInstance)();
		const { indexPath, parentMenu } = require_use_menu.default(instance, (0, vue.computed)(() => props.index));
		const nsMenu = require_index.useNamespace("menu");
		const nsSubMenu = require_index.useNamespace("sub-menu");
		const rootMenu = (0, vue.inject)(require_tokens.MENU_INJECTION_KEY);
		if (!rootMenu) require_error.throwError(COMPONENT_NAME, "can not inject root menu");
		const subMenu = (0, vue.inject)(`${require_tokens.SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`);
		if (!subMenu) require_error.throwError(COMPONENT_NAME, "can not inject sub menu");
		const items = (0, vue.ref)({});
		const subMenus = (0, vue.ref)({});
		let timeout;
		const mouseInChild = (0, vue.ref)(false);
		const verticalTitleRef = (0, vue.ref)();
		const vPopper = (0, vue.ref)();
		const isFirstLevel = (0, vue.computed)(() => subMenu.level === 0);
		const currentPlacement = (0, vue.computed)(() => mode.value === "horizontal" && isFirstLevel.value ? "bottom-start" : "right-start");
		const subMenuTitleIcon = (0, vue.computed)(() => {
			if (mode.value === "horizontal" && isFirstLevel.value || mode.value === "vertical" && !rootMenu.props.collapse) {
				if (props.expandCloseIcon && props.expandOpenIcon) return opened.value ? props.expandOpenIcon : props.expandCloseIcon;
				return _element_plus_icons_vue.ArrowDown;
			} else {
				if (props.collapseCloseIcon && props.collapseOpenIcon) return opened.value ? props.collapseOpenIcon : props.collapseCloseIcon;
				return _element_plus_icons_vue.ArrowRight;
			}
		});
		const appendToBody = (0, vue.computed)(() => {
			const value = props.teleported;
			return require_types.isUndefined(value) ? isFirstLevel.value : value;
		});
		const menuTransitionName = (0, vue.computed)(() => rootMenu.props.collapse ? `${nsMenu.namespace.value}-zoom-in-left` : `${nsMenu.namespace.value}-zoom-in-top`);
		const fallbackPlacements = (0, vue.computed)(() => mode.value === "horizontal" && isFirstLevel.value ? [
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
		const opened = (0, vue.computed)(() => rootMenu.openedMenus.includes(props.index));
		const active = (0, vue.computed)(() => [...Object.values(items.value), ...Object.values(subMenus.value)].some(({ active }) => active));
		const mode = (0, vue.computed)(() => rootMenu.props.mode);
		const persistent = (0, vue.computed)(() => rootMenu.props.persistent);
		const item = (0, vue.reactive)({
			index: props.index,
			indexPath,
			active
		});
		const ulStyle = require_use_menu_css_var.useMenuCssVar(rootMenu.props, subMenu.level + 1);
		const subMenuPopperOffset = (0, vue.computed)(() => props.popperOffset ?? rootMenu.props.popperOffset);
		const subMenuPopperClass = (0, vue.computed)(() => props.popperClass ?? rootMenu.props.popperClass);
		const subMenuPopperStyle = (0, vue.computed)(() => props.popperStyle ?? rootMenu.props.popperStyle);
		const subMenuShowTimeout = (0, vue.computed)(() => props.showTimeout ?? rootMenu.props.showTimeout);
		const subMenuHideTimeout = (0, vue.computed)(() => props.hideTimeout ?? rootMenu.props.hideTimeout);
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
			({stop: timeout} = (0, _vueuse_core.useTimeoutFn)(() => {
				rootMenu.openMenu(props.index, indexPath.value);
			}, showTimeout));
			if (appendToBody.value) parentMenu.value.vnode.el?.dispatchEvent(new MouseEvent("mouseenter"));
			if (event.type === "mouseenter" && event.target) (0, vue.nextTick)(() => {
				require_aria.focusElement(event.target, { preventScroll: true });
			});
		};
		const handleMouseleave = (deepDispatch = false) => {
			if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical") {
				subMenu.mouseInChild.value = false;
				return;
			}
			timeout?.();
			subMenu.mouseInChild.value = false;
			({stop: timeout} = (0, _vueuse_core.useTimeoutFn)(() => !mouseInChild.value && rootMenu.closeMenu(props.index, indexPath.value), subMenuHideTimeout.value));
			if (appendToBody.value && deepDispatch) subMenu.handleMouseleave?.(true);
		};
		(0, vue.watch)(() => rootMenu.props.collapse, (value) => handleCollapseToggle(Boolean(value)));
		{
			const addSubMenu = (item) => {
				subMenus.value[item.index] = item;
			};
			const removeSubMenu = (item) => {
				delete subMenus.value[item.index];
			};
			(0, vue.provide)(`${require_tokens.SUB_MENU_INJECTION_KEY}${instance.uid}`, {
				addSubMenu,
				removeSubMenu,
				handleMouseleave,
				mouseInChild,
				level: subMenu.level + 1
			});
		}
		expose({ opened });
		(0, vue.onMounted)(() => {
			rootMenu.addSubMenu(item);
			subMenu.addSubMenu(item);
		});
		(0, vue.onBeforeUnmount)(() => {
			subMenu.removeSubMenu(item);
			rootMenu.removeSubMenu(item);
		});
		return () => {
			const titleTag = [slots.title?.(), (0, vue.h)(require_index$1.ElIcon, {
				class: nsSubMenu.e("icon-arrow"),
				style: { transform: opened.value ? props.expandCloseIcon && props.expandOpenIcon || props.collapseCloseIcon && props.collapseOpenIcon && rootMenu.props.collapse ? "none" : "rotateZ(180deg)" : "none" }
			}, { default: () => (0, _vue_shared.isString)(subMenuTitleIcon.value) ? (0, vue.h)(instance.appContext.components[subMenuTitleIcon.value]) : (0, vue.h)(subMenuTitleIcon.value) })];
			const child = rootMenu.isMenuPopup ? (0, vue.h)(require_index$2.ElTooltip, {
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
				content: () => (0, vue.h)("div", {
					class: [
						nsMenu.m(mode.value),
						nsMenu.m("popup-container"),
						subMenuPopperClass.value
					],
					onMouseenter: (evt) => handleMouseenter(evt, 100),
					onMouseleave: () => handleMouseleave(true),
					onFocus: (evt) => handleMouseenter(evt, 100)
				}, [(0, vue.h)("ul", {
					class: [
						nsMenu.b(),
						nsMenu.m("popup"),
						nsMenu.m(`popup-${currentPlacement.value}`)
					],
					style: ulStyle.value
				}, [slots.default?.()])]),
				default: () => (0, vue.h)("div", {
					class: nsSubMenu.e("title"),
					onClick: handleClick
				}, titleTag)
			}) : (0, vue.h)(vue.Fragment, {}, [(0, vue.h)("div", {
				class: nsSubMenu.e("title"),
				ref: verticalTitleRef,
				onClick: handleClick
			}, titleTag), (0, vue.h)(require_index$3.ElCollapseTransition, {}, { default: () => (0, vue.withDirectives)((0, vue.h)("ul", {
				role: "menu",
				class: [nsMenu.b(), nsMenu.m("inline")],
				style: ulStyle.value
			}, [slots.default?.()]), [[vue.vShow, opened.value]]) })]);
			return (0, vue.h)("li", {
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
exports.default = sub_menu_default;
exports.subMenuProps = subMenuProps;
//# sourceMappingURL=sub-menu.js.map
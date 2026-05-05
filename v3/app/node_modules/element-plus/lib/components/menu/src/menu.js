Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_vnode = require('../../../utils/vue/vnode.js');
const require_typescript = require('../../../utils/typescript.js');
const require_index = require('../../../directives/click-outside/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../icon/index.js');
const require_menu_bar = require('./utils/menu-bar.js');
const require_menu_collapse_transition = require('./menu-collapse-transition.js');
const require_use_menu_css_var = require('./use-menu-css-var.js');
const require_tokens = require('./tokens.js');
const require_sub_menu = require('./sub-menu.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/menu/src/menu.ts
const menuProps = require_runtime$1.buildProps({
	mode: {
		type: String,
		values: ["horizontal", "vertical"],
		default: "vertical"
	},
	defaultActive: {
		type: String,
		default: ""
	},
	defaultOpeneds: {
		type: require_runtime$1.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	uniqueOpened: Boolean,
	router: Boolean,
	menuTrigger: {
		type: String,
		values: ["hover", "click"],
		default: "hover"
	},
	collapse: Boolean,
	backgroundColor: String,
	textColor: String,
	activeTextColor: String,
	closeOnClickOutside: Boolean,
	collapseTransition: {
		type: Boolean,
		default: true
	},
	ellipsis: {
		type: Boolean,
		default: true
	},
	popperOffset: {
		type: Number,
		default: 6
	},
	ellipsisIcon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.More
	},
	popperEffect: {
		type: require_runtime$1.definePropType(String),
		default: "dark"
	},
	popperClass: String,
	popperStyle: { type: require_runtime$1.definePropType([String, Object]) },
	showTimeout: {
		type: Number,
		default: 300
	},
	hideTimeout: {
		type: Number,
		default: 300
	},
	persistent: {
		type: Boolean,
		default: true
	}
});
const checkIndexPath = (indexPath) => (0, _vue_shared.isArray)(indexPath) && indexPath.every((path) => (0, _vue_shared.isString)(path));
const menuEmits = {
	close: (index, indexPath) => (0, _vue_shared.isString)(index) && checkIndexPath(indexPath),
	open: (index, indexPath) => (0, _vue_shared.isString)(index) && checkIndexPath(indexPath),
	select: (index, indexPath, item, routerResult) => (0, _vue_shared.isString)(index) && checkIndexPath(indexPath) && (0, _vue_shared.isObject)(item) && (require_types.isUndefined(routerResult) || routerResult instanceof Promise)
};
const DEFAULT_MORE_ITEM_WIDTH = 64;
var menu_default = (0, vue.defineComponent)({
	name: "ElMenu",
	props: menuProps,
	emits: menuEmits,
	setup(props, { emit, slots, expose }) {
		const instance = (0, vue.getCurrentInstance)();
		const router = instance.appContext.config.globalProperties.$router;
		const menu = (0, vue.ref)();
		const subMenu = (0, vue.ref)();
		const nsMenu = require_index$1.useNamespace("menu");
		const nsSubMenu = require_index$1.useNamespace("sub-menu");
		let moreItemWidth = DEFAULT_MORE_ITEM_WIDTH;
		const sliceIndex = (0, vue.ref)(-1);
		const openedMenus = (0, vue.ref)(props.defaultOpeneds && !props.collapse ? props.defaultOpeneds.slice(0) : []);
		const activeIndex = (0, vue.ref)(props.defaultActive);
		const items = (0, vue.ref)({});
		const subMenus = (0, vue.ref)({});
		const isMenuPopup = (0, vue.computed)(() => props.mode === "horizontal" || props.mode === "vertical" && props.collapse);
		const initMenu = () => {
			const activeItem = activeIndex.value && items.value[activeIndex.value];
			if (!activeItem || props.mode === "horizontal" || props.collapse) return;
			activeItem.indexPath.forEach((index) => {
				const subMenu = subMenus.value[index];
				subMenu && openMenu(index, subMenu.indexPath);
			});
		};
		const openMenu = (index, indexPath) => {
			if (openedMenus.value.includes(index)) return;
			if (props.uniqueOpened) openedMenus.value = openedMenus.value.filter((index) => indexPath.includes(index));
			openedMenus.value.push(index);
			emit("open", index, indexPath);
		};
		const close = (index) => {
			const i = openedMenus.value.indexOf(index);
			if (i !== -1) openedMenus.value.splice(i, 1);
		};
		const closeMenu = (index, indexPath) => {
			close(index);
			emit("close", index, indexPath);
		};
		const handleSubMenuClick = ({ index, indexPath }) => {
			openedMenus.value.includes(index) ? closeMenu(index, indexPath) : openMenu(index, indexPath);
		};
		const handleMenuItemClick = (menuItem) => {
			if (props.mode === "horizontal" || props.collapse) openedMenus.value = [];
			const { index, indexPath } = menuItem;
			if ((0, lodash_unified.isNil)(index) || (0, lodash_unified.isNil)(indexPath)) return;
			if (props.router && router) {
				const route = menuItem.route || index;
				const routerResult = router.push(route).then((res) => {
					if (!res) activeIndex.value = index;
					return res;
				});
				emit("select", index, indexPath, {
					index,
					indexPath,
					route
				}, routerResult);
			} else {
				activeIndex.value = index;
				emit("select", index, indexPath, {
					index,
					indexPath
				});
			}
		};
		const updateActiveIndex = (val) => {
			const itemsInData = items.value;
			activeIndex.value = (itemsInData[val] || activeIndex.value && itemsInData[activeIndex.value] || itemsInData[props.defaultActive])?.index ?? val;
		};
		const calcMenuItemWidth = (menuItem) => {
			const computedStyle = getComputedStyle(menuItem);
			const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
			const marginRight = Number.parseInt(computedStyle.marginRight, 10);
			return menuItem.offsetWidth + marginLeft + marginRight || 0;
		};
		const calcSliceIndex = () => {
			if (!menu.value) return -1;
			const items = Array.from(menu.value.childNodes).filter((item) => item.nodeName !== "#comment" && (item.nodeName !== "#text" || item.nodeValue));
			const computedMenuStyle = getComputedStyle(menu.value);
			const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10);
			const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10);
			const menuWidth = menu.value.clientWidth - paddingLeft - paddingRight;
			let calcWidth = 0;
			let sliceIndex = 0;
			items.forEach((item, index) => {
				calcWidth += calcMenuItemWidth(item);
				if (calcWidth <= menuWidth - moreItemWidth) sliceIndex = index + 1;
			});
			return sliceIndex === items.length ? -1 : sliceIndex;
		};
		const getIndexPath = (index) => subMenus.value[index].indexPath;
		const debounce = (fn, wait = 33.34) => {
			let timer;
			return () => {
				timer && clearTimeout(timer);
				timer = setTimeout(() => {
					fn();
				}, wait);
			};
		};
		let isFirstTimeRender = true;
		const handleResize = () => {
			const el = (0, _vueuse_core.unrefElement)(subMenu);
			if (el) moreItemWidth = calcMenuItemWidth(el) || DEFAULT_MORE_ITEM_WIDTH;
			if (sliceIndex.value === calcSliceIndex()) return;
			const callback = () => {
				sliceIndex.value = -1;
				(0, vue.nextTick)(() => {
					sliceIndex.value = calcSliceIndex();
				});
			};
			isFirstTimeRender ? callback() : debounce(callback)();
			isFirstTimeRender = false;
		};
		(0, vue.watch)(() => props.defaultActive, (currentActive) => {
			if (!items.value[currentActive]) activeIndex.value = "";
			updateActiveIndex(currentActive);
		});
		(0, vue.watch)(() => props.collapse, (value) => {
			if (value) openedMenus.value = [];
		});
		(0, vue.watch)(items.value, initMenu);
		let resizeStopper;
		(0, vue.watchEffect)(() => {
			if (props.mode === "horizontal" && props.ellipsis) resizeStopper = (0, _vueuse_core.useResizeObserver)(menu, handleResize).stop;
			else resizeStopper?.();
		});
		const mouseInChild = (0, vue.ref)(false);
		{
			const addSubMenu = (item) => {
				subMenus.value[item.index] = item;
			};
			const removeSubMenu = (item) => {
				delete subMenus.value[item.index];
			};
			const addMenuItem = (item) => {
				items.value[item.index] = item;
			};
			const removeMenuItem = (item) => {
				delete items.value[item.index];
			};
			(0, vue.provide)(require_tokens.MENU_INJECTION_KEY, (0, vue.reactive)({
				props,
				openedMenus,
				items,
				subMenus,
				activeIndex,
				isMenuPopup,
				addMenuItem,
				removeMenuItem,
				addSubMenu,
				removeSubMenu,
				openMenu,
				closeMenu,
				handleMenuItemClick,
				handleSubMenuClick
			}));
			(0, vue.provide)(`${require_tokens.SUB_MENU_INJECTION_KEY}${instance.uid}`, {
				addSubMenu,
				removeSubMenu,
				mouseInChild,
				level: 0
			});
		}
		(0, vue.onMounted)(() => {
			if (props.mode === "horizontal") new require_menu_bar.default(instance.vnode.el, nsMenu.namespace.value);
		});
		{
			const open = (index) => {
				const { indexPath } = subMenus.value[index];
				indexPath.forEach((i) => openMenu(i, indexPath));
			};
			expose({
				open,
				close,
				updateActiveIndex,
				handleResize
			});
		}
		const ulStyle = require_use_menu_css_var.useMenuCssVar(props, 0);
		return () => {
			let slot = slots.default?.() ?? [];
			const vShowMore = [];
			if (props.mode === "horizontal" && menu.value) {
				const originalSlot = require_vnode.flattedChildren(slot).filter((vnode) => {
					return vnode?.shapeFlag !== 8;
				});
				const slotDefault = sliceIndex.value === -1 ? originalSlot : originalSlot.slice(0, sliceIndex.value);
				const slotMore = sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value);
				if (slotMore?.length && props.ellipsis) {
					slot = slotDefault;
					vShowMore.push((0, vue.h)(require_sub_menu.default, {
						ref: subMenu,
						index: "sub-menu-more",
						class: nsSubMenu.e("hide-arrow"),
						popperOffset: props.popperOffset
					}, {
						title: () => (0, vue.h)(require_index$2.ElIcon, { class: nsSubMenu.e("icon-more") }, { default: () => (0, vue.h)(props.ellipsisIcon) }),
						default: () => slotMore
					}));
				}
			}
			const directives = props.closeOnClickOutside ? [[require_index.default, () => {
				if (!openedMenus.value.length) return;
				if (!mouseInChild.value) {
					openedMenus.value.forEach((openedMenu) => emit("close", openedMenu, getIndexPath(openedMenu)));
					openedMenus.value = [];
				}
			}]] : [];
			const vMenu = (0, vue.withDirectives)((0, vue.h)("ul", {
				key: String(props.collapse),
				role: "menubar",
				ref: menu,
				style: ulStyle.value,
				class: {
					[nsMenu.b()]: true,
					[nsMenu.m(props.mode)]: true,
					[nsMenu.m("collapse")]: props.collapse
				}
			}, [...slot, ...vShowMore]), directives);
			if (props.collapseTransition && props.mode === "vertical") return (0, vue.h)(require_menu_collapse_transition.default, () => vMenu);
			return vMenu;
		};
	}
});

//#endregion
exports.default = menu_default;
exports.menuEmits = menuEmits;
exports.menuProps = menuProps;
//# sourceMappingURL=menu.js.map
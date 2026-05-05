import { isArray, isObject, isString, isUndefined as isUndefined$1 } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { flattedChildren } from "../../../utils/vue/vnode.mjs";
import { mutable } from "../../../utils/typescript.mjs";
import ClickOutside from "../../../directives/click-outside/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import Menu from "./utils/menu-bar.mjs";
import menu_collapse_transition_default from "./menu-collapse-transition.mjs";
import { useMenuCssVar } from "./use-menu-css-var.mjs";
import { MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from "./tokens.mjs";
import sub_menu_default from "./sub-menu.mjs";
import { unrefElement, useResizeObserver } from "@vueuse/core";
import { isNil } from "lodash-unified";
import { More } from "@element-plus/icons-vue";
import { computed, defineComponent, getCurrentInstance, h, nextTick, onMounted, provide, reactive, ref, watch, watchEffect, withDirectives } from "vue";

//#region ../../packages/components/menu/src/menu.ts
const menuProps = buildProps({
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
		type: definePropType(Array),
		default: () => mutable([])
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
		type: iconPropType,
		default: () => More
	},
	popperEffect: {
		type: definePropType(String),
		default: "dark"
	},
	popperClass: String,
	popperStyle: { type: definePropType([String, Object]) },
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
const checkIndexPath = (indexPath) => isArray(indexPath) && indexPath.every((path) => isString(path));
const menuEmits = {
	close: (index, indexPath) => isString(index) && checkIndexPath(indexPath),
	open: (index, indexPath) => isString(index) && checkIndexPath(indexPath),
	select: (index, indexPath, item, routerResult) => isString(index) && checkIndexPath(indexPath) && isObject(item) && (isUndefined$1(routerResult) || routerResult instanceof Promise)
};
const DEFAULT_MORE_ITEM_WIDTH = 64;
var menu_default = defineComponent({
	name: "ElMenu",
	props: menuProps,
	emits: menuEmits,
	setup(props, { emit, slots, expose }) {
		const instance = getCurrentInstance();
		const router = instance.appContext.config.globalProperties.$router;
		const menu = ref();
		const subMenu = ref();
		const nsMenu = useNamespace("menu");
		const nsSubMenu = useNamespace("sub-menu");
		let moreItemWidth = DEFAULT_MORE_ITEM_WIDTH;
		const sliceIndex = ref(-1);
		const openedMenus = ref(props.defaultOpeneds && !props.collapse ? props.defaultOpeneds.slice(0) : []);
		const activeIndex = ref(props.defaultActive);
		const items = ref({});
		const subMenus = ref({});
		const isMenuPopup = computed(() => props.mode === "horizontal" || props.mode === "vertical" && props.collapse);
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
			if (isNil(index) || isNil(indexPath)) return;
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
			const el = unrefElement(subMenu);
			if (el) moreItemWidth = calcMenuItemWidth(el) || DEFAULT_MORE_ITEM_WIDTH;
			if (sliceIndex.value === calcSliceIndex()) return;
			const callback = () => {
				sliceIndex.value = -1;
				nextTick(() => {
					sliceIndex.value = calcSliceIndex();
				});
			};
			isFirstTimeRender ? callback() : debounce(callback)();
			isFirstTimeRender = false;
		};
		watch(() => props.defaultActive, (currentActive) => {
			if (!items.value[currentActive]) activeIndex.value = "";
			updateActiveIndex(currentActive);
		});
		watch(() => props.collapse, (value) => {
			if (value) openedMenus.value = [];
		});
		watch(items.value, initMenu);
		let resizeStopper;
		watchEffect(() => {
			if (props.mode === "horizontal" && props.ellipsis) resizeStopper = useResizeObserver(menu, handleResize).stop;
			else resizeStopper?.();
		});
		const mouseInChild = ref(false);
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
			provide(MENU_INJECTION_KEY, reactive({
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
			provide(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
				addSubMenu,
				removeSubMenu,
				mouseInChild,
				level: 0
			});
		}
		onMounted(() => {
			if (props.mode === "horizontal") new Menu(instance.vnode.el, nsMenu.namespace.value);
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
		const ulStyle = useMenuCssVar(props, 0);
		return () => {
			let slot = slots.default?.() ?? [];
			const vShowMore = [];
			if (props.mode === "horizontal" && menu.value) {
				const originalSlot = flattedChildren(slot).filter((vnode) => {
					return vnode?.shapeFlag !== 8;
				});
				const slotDefault = sliceIndex.value === -1 ? originalSlot : originalSlot.slice(0, sliceIndex.value);
				const slotMore = sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value);
				if (slotMore?.length && props.ellipsis) {
					slot = slotDefault;
					vShowMore.push(h(sub_menu_default, {
						ref: subMenu,
						index: "sub-menu-more",
						class: nsSubMenu.e("hide-arrow"),
						popperOffset: props.popperOffset
					}, {
						title: () => h(ElIcon, { class: nsSubMenu.e("icon-more") }, { default: () => h(props.ellipsisIcon) }),
						default: () => slotMore
					}));
				}
			}
			const directives = props.closeOnClickOutside ? [[ClickOutside, () => {
				if (!openedMenus.value.length) return;
				if (!mouseInChild.value) {
					openedMenus.value.forEach((openedMenu) => emit("close", openedMenu, getIndexPath(openedMenu)));
					openedMenus.value = [];
				}
			}]] : [];
			const vMenu = withDirectives(h("ul", {
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
			if (props.collapseTransition && props.mode === "vertical") return h(menu_collapse_transition_default, () => vMenu);
			return vMenu;
		};
	}
});

//#endregion
export { menu_default as default, menuEmits, menuProps };
//# sourceMappingURL=menu.mjs.map
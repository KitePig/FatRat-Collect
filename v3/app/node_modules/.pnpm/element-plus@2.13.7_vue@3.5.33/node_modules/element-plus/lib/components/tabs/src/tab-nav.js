const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_raf = require('../../../utils/raf.js');
const require_error = require('../../../utils/error.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');
const require_numbers = require('../../../utils/numbers.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_use_wheel = require('../../virtual-list/src/hooks/use-wheel.js');
const require_constants = require('./constants.js');
const require_tab_bar = require('./tab-bar2.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/tabs/src/tab-nav.tsx
const tabNavProps = require_runtime$1.buildProps({
	panes: {
		type: require_runtime$1.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	currentName: {
		type: [String, Number],
		default: ""
	},
	editable: Boolean,
	type: {
		type: String,
		values: [
			"card",
			"border-card",
			""
		],
		default: ""
	},
	stretch: Boolean,
	tabindex: {
		type: [String, Number],
		default: void 0
	}
});
const tabNavEmits = {
	tabClick: (tab, tabName, ev) => ev instanceof Event,
	tabRemove: (tab, ev) => ev instanceof Event
};
const COMPONENT_NAME = "ElTabNav";
const TabNav = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	props: tabNavProps,
	emits: tabNavEmits,
	setup(props, { expose, emit }) {
		const rootTabs = (0, vue.inject)(require_constants.tabsRootContextKey);
		if (!rootTabs) require_error.throwError(COMPONENT_NAME, `<el-tabs><tab-nav /></el-tabs>`);
		const ns = require_index.useNamespace("tabs");
		const visibility = (0, _vueuse_core.useDocumentVisibility)();
		const focused = (0, _vueuse_core.useWindowFocus)();
		const navScroll$ = (0, vue.ref)();
		const nav$ = (0, vue.ref)();
		const el$ = (0, vue.ref)();
		const tabRefsMap = (0, vue.ref)({});
		const tabBarRef = (0, vue.ref)();
		const scrollable = (0, vue.ref)(false);
		const navOffset = (0, vue.ref)(0);
		const isFocus = (0, vue.ref)(false);
		const focusable = (0, vue.ref)(true);
		const isWheelScrolling = (0, vue.ref)(false);
		const tracker = (0, vue.shallowRef)();
		const isHorizontal = (0, vue.computed)(() => ["top", "bottom"].includes(rootTabs.props.tabPosition));
		const sizeName = (0, vue.computed)(() => isHorizontal.value ? "width" : "height");
		const navStyle = (0, vue.computed)(() => {
			const dir = sizeName.value === "width" ? "X" : "Y";
			return {
				transition: isWheelScrolling.value ? "none" : void 0,
				transform: `translate${dir}(-${navOffset.value}px)`
			};
		});
		const { width: navContainerWidth, height: navContainerHeight } = (0, _vueuse_core.useElementSize)(navScroll$);
		const { width: navWidth, height: navHeight } = (0, _vueuse_core.useElementSize)(nav$, {
			width: 0,
			height: 0
		}, { box: "border-box" });
		const navContainerSize = (0, vue.computed)(() => isHorizontal.value ? navContainerWidth.value : navContainerHeight.value);
		const navSize = (0, vue.computed)(() => isHorizontal.value ? navWidth.value : navHeight.value);
		const { onWheel } = require_use_wheel.default({
			atStartEdge: (0, vue.computed)(() => navOffset.value <= 0),
			atEndEdge: (0, vue.computed)(() => navSize.value - navOffset.value <= navContainerSize.value),
			layout: (0, vue.computed)(() => isHorizontal.value ? "horizontal" : "vertical")
		}, (offset) => {
			navOffset.value = (0, lodash_unified.clamp)(navOffset.value + offset, 0, navSize.value - navContainerSize.value);
		});
		const handleWheel = (event) => {
			isWheelScrolling.value = true;
			onWheel(event);
			require_raf.rAF(() => {
				isWheelScrolling.value = false;
			});
		};
		const scrollPrev = () => {
			if (!navScroll$.value) return;
			const containerSize = navScroll$.value.getBoundingClientRect()[sizeName.value];
			const currentOffset = navOffset.value;
			if (!currentOffset) return;
			navOffset.value = currentOffset > containerSize ? currentOffset - containerSize : 0;
		};
		const scrollNext = () => {
			if (!navScroll$.value || !nav$.value) return;
			const navSize = nav$.value.getBoundingClientRect()[sizeName.value];
			const containerSize = navScroll$.value.getBoundingClientRect()[sizeName.value];
			const currentOffset = navOffset.value;
			if (!require_numbers.isGreaterThan(navSize - currentOffset, containerSize)) return;
			navOffset.value = navSize - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize - containerSize;
		};
		const scrollToActiveTab = async () => {
			const nav = nav$.value;
			if (!scrollable.value || !el$.value || !navScroll$.value || !nav) return;
			await (0, vue.nextTick)();
			const activeTab = tabRefsMap.value[props.currentName];
			if (!activeTab) return;
			const navScroll = navScroll$.value;
			const activeTabBounding = activeTab.getBoundingClientRect();
			const navScrollBounding = navScroll.getBoundingClientRect();
			const navScrollLeft = navScrollBounding.left + 1;
			const navScrollRight = navScrollBounding.right - 1;
			const navBounding = nav.getBoundingClientRect();
			const maxOffset = isHorizontal.value ? navBounding.width - navScrollBounding.width : navBounding.height - navScrollBounding.height;
			const currentOffset = navOffset.value;
			let newOffset = currentOffset;
			if (isHorizontal.value) {
				if (activeTabBounding.left < navScrollLeft) newOffset = currentOffset - (navScrollLeft - activeTabBounding.left);
				if (activeTabBounding.right > navScrollRight) newOffset = currentOffset + activeTabBounding.right - navScrollRight;
			} else {
				if (activeTabBounding.top < navScrollBounding.top) newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
				if (activeTabBounding.bottom > navScrollBounding.bottom) newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
			}
			newOffset = Math.max(newOffset, 0);
			navOffset.value = Math.min(newOffset, maxOffset);
		};
		const update = () => {
			if (!nav$.value || !navScroll$.value) return;
			props.stretch && tabBarRef.value?.update();
			const navSize = nav$.value.getBoundingClientRect()[sizeName.value];
			const containerSize = navScroll$.value.getBoundingClientRect()[sizeName.value];
			const currentOffset = navOffset.value;
			if (containerSize < navSize) {
				scrollable.value = scrollable.value || {};
				scrollable.value.prev = currentOffset;
				scrollable.value.next = require_numbers.isGreaterThan(navSize, currentOffset + containerSize);
				if (require_numbers.isGreaterThan(containerSize, navSize - currentOffset)) navOffset.value = navSize - containerSize;
			} else {
				scrollable.value = false;
				if (currentOffset > 0) navOffset.value = 0;
			}
		};
		const changeTab = (event) => {
			const code = require_event.getEventCode(event);
			let step = 0;
			switch (code) {
				case require_aria.EVENT_CODE.left:
				case require_aria.EVENT_CODE.up:
					step = -1;
					break;
				case require_aria.EVENT_CODE.right:
				case require_aria.EVENT_CODE.down:
					step = 1;
					break;
				default: return;
			}
			const tabList = Array.from(event.currentTarget.querySelectorAll("[role=tab]:not(.is-disabled)"));
			let nextIndex = tabList.indexOf(event.target) + step;
			if (nextIndex < 0) nextIndex = tabList.length - 1;
			else if (nextIndex >= tabList.length) nextIndex = 0;
			tabList[nextIndex].focus({ preventScroll: true });
			tabList[nextIndex].click();
			setFocus();
		};
		const setFocus = () => {
			if (focusable.value) isFocus.value = true;
		};
		const removeFocus = () => isFocus.value = false;
		const setRefs = (el, key) => {
			tabRefsMap.value[key] = el;
		};
		const focusActiveTab = async () => {
			await (0, vue.nextTick)();
			tabRefsMap.value[props.currentName]?.focus({ preventScroll: true });
		};
		(0, vue.watch)(visibility, (visibility) => {
			if (visibility === "hidden") focusable.value = false;
			else if (visibility === "visible") setTimeout(() => focusable.value = true, 50);
		});
		(0, vue.watch)(focused, (focused) => {
			if (focused) setTimeout(() => focusable.value = true, 50);
			else focusable.value = false;
		});
		(0, _vueuse_core.useResizeObserver)(el$, () => {
			require_raf.rAF(update);
		});
		(0, vue.onMounted)(() => setTimeout(() => scrollToActiveTab(), 0));
		(0, vue.onUpdated)(() => update());
		expose({
			scrollToActiveTab,
			removeFocus,
			focusActiveTab,
			tabListRef: nav$,
			tabBarRef,
			scheduleRender: () => (0, vue.triggerRef)(tracker)
		});
		return () => {
			const scrollBtn = scrollable.value ? [(0, vue.createVNode)("span", {
				"class": [ns.e("nav-prev"), ns.is("disabled", !scrollable.value.prev)],
				"onClick": scrollPrev
			}, [(0, vue.createVNode)(require_index$1.ElIcon, null, { default: () => [(0, vue.createVNode)(_element_plus_icons_vue.ArrowLeft, null, null)] })]), (0, vue.createVNode)("span", {
				"class": [ns.e("nav-next"), ns.is("disabled", !scrollable.value.next)],
				"onClick": scrollNext
			}, [(0, vue.createVNode)(require_index$1.ElIcon, null, { default: () => [(0, vue.createVNode)(_element_plus_icons_vue.ArrowRight, null, null)] })])] : null;
			const tabs = props.panes.map((pane, index) => {
				const uid = pane.uid;
				const disabled = pane.props.disabled;
				const tabName = pane.props.name ?? pane.index ?? `${index}`;
				const closable = !disabled && (pane.isClosable || pane.props.closable !== false && props.editable);
				pane.index = `${index}`;
				const btnClose = closable ? (0, vue.createVNode)(require_index$1.ElIcon, {
					"class": "is-icon-close",
					"onClick": (ev) => emit("tabRemove", pane, ev)
				}, { default: () => [(0, vue.createVNode)(_element_plus_icons_vue.Close, null, null)] }) : null;
				const tabLabelContent = pane.slots.label?.() || pane.props.label;
				const tabindex = !disabled && pane.active ? props.tabindex ?? rootTabs.props.tabindex : -1;
				return (0, vue.createVNode)("div", {
					"ref": (el) => setRefs(el, tabName),
					"class": [
						ns.e("item"),
						ns.is(rootTabs.props.tabPosition),
						ns.is("active", pane.active),
						ns.is("disabled", disabled),
						ns.is("closable", closable),
						ns.is("focus", isFocus.value)
					],
					"id": `tab-${tabName}`,
					"key": `tab-${uid}`,
					"aria-controls": `pane-${tabName}`,
					"role": "tab",
					"aria-selected": pane.active,
					"tabindex": tabindex,
					"onFocus": () => setFocus(),
					"onBlur": () => removeFocus(),
					"onClick": (ev) => {
						removeFocus();
						emit("tabClick", pane, tabName, ev);
					},
					"onKeydown": (ev) => {
						const code = require_event.getEventCode(ev);
						if (closable && (code === require_aria.EVENT_CODE.delete || code === require_aria.EVENT_CODE.backspace)) emit("tabRemove", pane, ev);
					}
				}, [...[tabLabelContent, btnClose]]);
			});
			tracker.value;
			return (0, vue.createVNode)("div", {
				"ref": el$,
				"class": [
					ns.e("nav-wrap"),
					ns.is("scrollable", !!scrollable.value),
					ns.is(rootTabs.props.tabPosition)
				]
			}, [scrollBtn, (0, vue.createVNode)("div", {
				"class": ns.e("nav-scroll"),
				"ref": navScroll$
			}, [props.panes.length > 0 ? (0, vue.createVNode)("div", {
				"class": [
					ns.e("nav"),
					ns.is(rootTabs.props.tabPosition),
					ns.is("stretch", props.stretch && ["top", "bottom"].includes(rootTabs.props.tabPosition))
				],
				"ref": nav$,
				"style": navStyle.value,
				"role": "tablist",
				"onKeydown": changeTab,
				"onWheel": handleWheel
			}, [...[!props.type ? (0, vue.createVNode)(require_tab_bar.default, {
				"ref": tabBarRef,
				"tabs": [...props.panes],
				"tabRefs": tabRefsMap.value
			}, null) : null, tabs]]) : null])]);
		};
	}
});

//#endregion
exports.default = TabNav;
exports.tabNavEmits = tabNavEmits;
exports.tabNavProps = tabNavProps;
//# sourceMappingURL=tab-nav.js.map
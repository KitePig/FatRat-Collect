const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-ordered-children/index.js');
const require_index$2 = require('../../icon/index.js');
const require_constants = require('./constants.js');
const require_tab_nav = require('./tab-nav.js');
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/tabs/src/tabs.tsx
const tabsProps = require_runtime$1.buildProps({
	type: {
		type: String,
		values: [
			"card",
			"border-card",
			""
		],
		default: ""
	},
	closable: Boolean,
	addable: Boolean,
	modelValue: { type: [String, Number] },
	defaultValue: { type: [String, Number] },
	editable: Boolean,
	tabPosition: {
		type: String,
		values: [
			"top",
			"right",
			"bottom",
			"left"
		],
		default: "top"
	},
	beforeLeave: {
		type: require_runtime$1.definePropType(Function),
		default: () => true
	},
	stretch: Boolean,
	tabindex: {
		type: [String, Number],
		default: 0
	}
});
const isPaneName = (value) => (0, _vue_shared.isString)(value) || require_types.isNumber(value);
const tabsEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (name) => isPaneName(name),
	tabClick: (pane, ev) => ev instanceof Event,
	tabChange: (name) => isPaneName(name),
	edit: (paneName, action) => ["remove", "add"].includes(action),
	tabRemove: (name) => isPaneName(name),
	tabAdd: () => true
};
const Tabs = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTabs",
	props: tabsProps,
	emits: tabsEmits,
	setup(props, { emit, slots, expose }) {
		const ns = require_index.useNamespace("tabs");
		const isVertical = (0, vue.computed)(() => ["left", "right"].includes(props.tabPosition));
		const { children: panes, addChild: registerPane, removeChild: unregisterPane, ChildrenSorter: PanesSorter } = require_index$1.useOrderedChildren((0, vue.getCurrentInstance)(), "ElTabPane");
		const nav$ = (0, vue.ref)();
		const currentName = (0, vue.ref)((require_types.isUndefined(props.modelValue) ? props.defaultValue : props.modelValue) ?? "0");
		const setCurrentName = async (value, trigger = false) => {
			if (currentName.value === value || require_types.isUndefined(value)) return;
			try {
				let canLeave;
				if (props.beforeLeave) {
					const result = props.beforeLeave(value, currentName.value);
					canLeave = result instanceof Promise ? await result : result;
				} else canLeave = true;
				if (canLeave !== false) {
					const isFocusInsidePane = panes.value.find((item) => item.paneName === currentName.value)?.isFocusInsidePane();
					currentName.value = value;
					if (trigger) {
						emit(require_event.UPDATE_MODEL_EVENT, value);
						emit("tabChange", value);
					}
					nav$.value?.removeFocus?.();
					if (isFocusInsidePane) nav$.value?.focusActiveTab();
				}
			} catch {}
		};
		const handleTabClick = (tab, tabName, event) => {
			if (tab.props.disabled) return;
			emit("tabClick", tab, event);
			setCurrentName(tabName, true);
		};
		const handleTabRemove = (pane, ev) => {
			if (pane.props.disabled || require_types.isUndefined(pane.props.name)) return;
			ev.stopPropagation();
			emit("edit", pane.props.name, "remove");
			emit("tabRemove", pane.props.name);
		};
		const handleTabAdd = () => {
			emit("edit", void 0, "add");
			emit("tabAdd");
		};
		const handleKeydown = (event) => {
			const code = require_event$1.getEventCode(event);
			if ([require_aria.EVENT_CODE.enter, require_aria.EVENT_CODE.numpadEnter].includes(code)) handleTabAdd();
		};
		const swapChildren = (vnode) => {
			const actualFirstChild = vnode.el.firstChild;
			const firstChild = ["bottom", "right"].includes(props.tabPosition) ? vnode.children[0].el : vnode.children[1].el;
			if (actualFirstChild !== firstChild) actualFirstChild.before(firstChild);
		};
		(0, vue.watch)(() => props.modelValue, (modelValue) => setCurrentName(modelValue));
		(0, vue.watch)(currentName, async () => {
			await (0, vue.nextTick)();
			nav$.value?.scrollToActiveTab();
		});
		(0, vue.provide)(require_constants.tabsRootContextKey, {
			props,
			currentName,
			registerPane,
			unregisterPane,
			nav$
		});
		expose({
			currentName,
			get tabNavRef() {
				return (0, lodash_unified.omit)(nav$.value, ["scheduleRender"]);
			}
		});
		return () => {
			const addSlot = slots["add-icon"];
			const newButton = props.editable || props.addable ? (0, vue.createVNode)("div", {
				"class": [ns.e("new-tab"), isVertical.value && ns.e("new-tab-vertical")],
				"tabindex": props.tabindex,
				"onClick": handleTabAdd,
				"onKeydown": handleKeydown
			}, [addSlot ? (0, vue.renderSlot)(slots, "add-icon") : (0, vue.createVNode)(require_index$2.ElIcon, { "class": ns.is("icon-plus") }, { default: () => [(0, vue.createVNode)(_element_plus_icons_vue.Plus, null, null)] })]) : null;
			const tabNav = () => (0, vue.createVNode)(require_tab_nav.default, {
				"ref": nav$,
				"currentName": currentName.value,
				"editable": props.editable,
				"type": props.type,
				"panes": panes.value,
				"stretch": props.stretch,
				"onTabClick": handleTabClick,
				"onTabRemove": handleTabRemove
			}, null);
			const header = (0, vue.createVNode)("div", { "class": [
				ns.e("header"),
				isVertical.value && ns.e("header-vertical"),
				ns.is(props.tabPosition)
			] }, [(0, vue.createVNode)(PanesSorter, null, {
				default: tabNav,
				$stable: true
			}), newButton]);
			const panels = (0, vue.createVNode)("div", { "class": ns.e("content") }, [(0, vue.renderSlot)(slots, "default")]);
			return (0, vue.createVNode)("div", {
				"class": [
					ns.b(),
					ns.m(props.tabPosition),
					{
						[ns.m("card")]: props.type === "card",
						[ns.m("border-card")]: props.type === "border-card"
					}
				],
				"onVnodeMounted": swapChildren,
				"onVnodeUpdated": swapChildren
			}, [panels, header]);
		};
	}
});

//#endregion
exports.default = Tabs;
exports.tabsEmits = tabsEmits;
exports.tabsProps = tabsProps;
//# sourceMappingURL=tabs.js.map
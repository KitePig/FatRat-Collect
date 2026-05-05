import { EVENT_CODE } from "../../../constants/aria.mjs";
import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isNumber, isString, isUndefined as isUndefined$1 } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useOrderedChildren } from "../../../hooks/use-ordered-children/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { tabsRootContextKey } from "./constants.mjs";
import TabNav from "./tab-nav.mjs";
import { omit } from "lodash-unified";
import { Plus } from "@element-plus/icons-vue";
import { computed, createVNode, defineComponent, getCurrentInstance, nextTick, provide, ref, renderSlot, watch } from "vue";

//#region ../../packages/components/tabs/src/tabs.tsx
const tabsProps = buildProps({
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
		type: definePropType(Function),
		default: () => true
	},
	stretch: Boolean,
	tabindex: {
		type: [String, Number],
		default: 0
	}
});
const isPaneName = (value) => isString(value) || isNumber(value);
const tabsEmits = {
	[UPDATE_MODEL_EVENT]: (name) => isPaneName(name),
	tabClick: (pane, ev) => ev instanceof Event,
	tabChange: (name) => isPaneName(name),
	edit: (paneName, action) => ["remove", "add"].includes(action),
	tabRemove: (name) => isPaneName(name),
	tabAdd: () => true
};
const Tabs = /* @__PURE__ */ defineComponent({
	name: "ElTabs",
	props: tabsProps,
	emits: tabsEmits,
	setup(props, { emit, slots, expose }) {
		const ns = useNamespace("tabs");
		const isVertical = computed(() => ["left", "right"].includes(props.tabPosition));
		const { children: panes, addChild: registerPane, removeChild: unregisterPane, ChildrenSorter: PanesSorter } = useOrderedChildren(getCurrentInstance(), "ElTabPane");
		const nav$ = ref();
		const currentName = ref((isUndefined$1(props.modelValue) ? props.defaultValue : props.modelValue) ?? "0");
		const setCurrentName = async (value, trigger = false) => {
			if (currentName.value === value || isUndefined$1(value)) return;
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
						emit(UPDATE_MODEL_EVENT, value);
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
			if (pane.props.disabled || isUndefined$1(pane.props.name)) return;
			ev.stopPropagation();
			emit("edit", pane.props.name, "remove");
			emit("tabRemove", pane.props.name);
		};
		const handleTabAdd = () => {
			emit("edit", void 0, "add");
			emit("tabAdd");
		};
		const handleKeydown = (event) => {
			const code = getEventCode(event);
			if ([EVENT_CODE.enter, EVENT_CODE.numpadEnter].includes(code)) handleTabAdd();
		};
		const swapChildren = (vnode) => {
			const actualFirstChild = vnode.el.firstChild;
			const firstChild = ["bottom", "right"].includes(props.tabPosition) ? vnode.children[0].el : vnode.children[1].el;
			if (actualFirstChild !== firstChild) actualFirstChild.before(firstChild);
		};
		watch(() => props.modelValue, (modelValue) => setCurrentName(modelValue));
		watch(currentName, async () => {
			await nextTick();
			nav$.value?.scrollToActiveTab();
		});
		provide(tabsRootContextKey, {
			props,
			currentName,
			registerPane,
			unregisterPane,
			nav$
		});
		expose({
			currentName,
			get tabNavRef() {
				return omit(nav$.value, ["scheduleRender"]);
			}
		});
		return () => {
			const addSlot = slots["add-icon"];
			const newButton = props.editable || props.addable ? createVNode("div", {
				"class": [ns.e("new-tab"), isVertical.value && ns.e("new-tab-vertical")],
				"tabindex": props.tabindex,
				"onClick": handleTabAdd,
				"onKeydown": handleKeydown
			}, [addSlot ? renderSlot(slots, "add-icon") : createVNode(ElIcon, { "class": ns.is("icon-plus") }, { default: () => [createVNode(Plus, null, null)] })]) : null;
			const tabNav = () => createVNode(TabNav, {
				"ref": nav$,
				"currentName": currentName.value,
				"editable": props.editable,
				"type": props.type,
				"panes": panes.value,
				"stretch": props.stretch,
				"onTabClick": handleTabClick,
				"onTabRemove": handleTabRemove
			}, null);
			const header = createVNode("div", { "class": [
				ns.e("header"),
				isVertical.value && ns.e("header-vertical"),
				ns.is(props.tabPosition)
			] }, [createVNode(PanesSorter, null, {
				default: tabNav,
				$stable: true
			}), newButton]);
			const panels = createVNode("div", { "class": ns.e("content") }, [renderSlot(slots, "default")]);
			return createVNode("div", {
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
export { Tabs as default, tabsEmits, tabsProps };
//# sourceMappingURL=tabs.mjs.map
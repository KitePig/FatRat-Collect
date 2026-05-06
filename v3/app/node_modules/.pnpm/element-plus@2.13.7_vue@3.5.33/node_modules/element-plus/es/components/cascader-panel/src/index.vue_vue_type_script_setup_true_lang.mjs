import { EVENT_CODE } from "../../../constants/aria.mjs";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { focusNode, getSibling } from "../../../utils/dom/aria.mjs";
import { isClient } from "../../../utils/browser.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isEmpty } from "../../../utils/types.mjs";
import { scrollIntoView } from "../../../utils/dom/scroll.mjs";
import { castArray, unique } from "../../../utils/arrays.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { cascaderPanelEmits, cascaderPanelProps, useCascaderConfig } from "./config.mjs";
import { CASCADER_PANEL_INJECTION_KEY } from "./types.mjs";
import menu_default from "./menu.mjs";
import Node from "./node.mjs";
import Store from "./store.mjs";
import { checkNode, getMenuIndex, sortByOriginalOrder } from "./utils.mjs";
import { cloneDeep, flattenDeep, isEqual } from "lodash-unified";
import { Fragment, computed, createBlock, createElementBlock, defineComponent, nextTick, normalizeClass, onBeforeUpdate, onMounted, openBlock, provide, reactive, ref, renderList, renderSlot, unref, useSlots, watch, withCtx } from "vue";

//#region ../../packages/components/cascader-panel/src/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCascaderPanel",
	__name: "index",
	props: cascaderPanelProps,
	emits: cascaderPanelEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		let manualChecked = false;
		const ns = useNamespace("cascader");
		const config = useCascaderConfig(props);
		const slots = useSlots();
		let store;
		const initialLoaded = ref(true);
		const initialLoadedOnce = ref(false);
		const menuList = ref([]);
		const checkedValue = ref();
		const menus = ref([]);
		const expandingNode = ref();
		const checkedNodes = ref([]);
		const isHoverMenu = computed(() => config.value.expandTrigger === "hover");
		const renderLabelFn = computed(() => props.renderLabel || slots.default);
		const initStore = () => {
			const { options } = props;
			const cfg = config.value;
			manualChecked = false;
			store = new Store(options, cfg);
			menus.value = [store.getNodes()];
			if (cfg.lazy && isEmpty(props.options)) {
				initialLoaded.value = false;
				lazyLoad(void 0, (list) => {
					if (list) {
						store = new Store(list, cfg);
						menus.value = [store.getNodes()];
					}
					initialLoaded.value = true;
					syncCheckedValue(false, true);
				});
			} else syncCheckedValue(false, true);
		};
		const lazyLoad = (node, cb) => {
			const cfg = config.value;
			node = node || new Node({}, cfg, void 0, true);
			node.loading = true;
			const resolve = (dataList) => {
				const _node = node;
				const parent = _node.root ? null : _node;
				_node.loading = false;
				_node.loaded = true;
				_node.childrenData = _node.childrenData || [];
				dataList && store?.appendNodes(dataList, parent);
				dataList && cb?.(dataList);
				if (node.level === 0) initialLoadedOnce.value = true;
			};
			const reject = () => {
				node.loading = false;
				node.loaded = false;
				if (node.level === 0) initialLoaded.value = true;
			};
			cfg.lazyLoad(node, resolve, reject);
		};
		const expandNode = (node, silent) => {
			const { level } = node;
			const newMenus = menus.value.slice(0, level);
			let newExpandingNode;
			if (node.isLeaf) newExpandingNode = node.pathNodes[level - 2];
			else {
				newExpandingNode = node;
				newMenus.push(node.children);
			}
			if (expandingNode.value?.uid !== newExpandingNode?.uid) {
				expandingNode.value = node;
				menus.value = newMenus;
				!silent && emit("expand-change", node?.pathValues || []);
			}
		};
		const handleCheckChange = (node, checked, emitClose = true) => {
			const { checkStrictly, multiple } = config.value;
			const oldNode = checkedNodes.value[0];
			manualChecked = true;
			!multiple && oldNode?.doCheck(false);
			node.doCheck(checked);
			calculateCheckedValue();
			emitClose && !multiple && !checkStrictly && emit("close");
			!emitClose && !multiple && expandParentNode(node);
		};
		const expandParentNode = (node) => {
			if (!node) return;
			node = node.parent;
			expandParentNode(node);
			node && expandNode(node);
		};
		const getFlattedNodes = (leafOnly) => store?.getFlattedNodes(leafOnly);
		const getCheckedNodes = (leafOnly) => {
			return getFlattedNodes(leafOnly)?.filter(({ checked }) => checked !== false);
		};
		const clearCheckedNodes = () => {
			checkedNodes.value.forEach((node) => node.doCheck(false));
			calculateCheckedValue();
			menus.value = menus.value.slice(0, 1);
			expandingNode.value = void 0;
			emit("expand-change", []);
		};
		const calculateCheckedValue = () => {
			const { checkStrictly, multiple } = config.value;
			const oldNodes = checkedNodes.value;
			const nodes = sortByOriginalOrder(oldNodes, getCheckedNodes(!checkStrictly));
			const values = nodes.map((node) => node.valueByOption);
			checkedNodes.value = nodes;
			checkedValue.value = multiple ? values : values[0] ?? null;
		};
		const syncCheckedValue = (loaded = false, forced = false) => {
			const { modelValue } = props;
			const { lazy, multiple, checkStrictly } = config.value;
			const leafOnly = !checkStrictly;
			if (!initialLoaded.value || manualChecked || !forced && isEqual(modelValue, checkedValue.value)) return;
			if (lazy && !loaded) {
				const nodes = unique(flattenDeep(castArray(modelValue))).map((val) => store?.getNodeByValue(val)).filter((node) => !!node && !node.loaded && !node.loading);
				if (nodes.length) nodes.forEach((node) => {
					lazyLoad(node, () => syncCheckedValue(false, forced));
				});
				else syncCheckedValue(true, forced);
			} else {
				syncMenuState(unique((multiple ? castArray(modelValue) : [modelValue]).map((val) => store?.getNodeByValue(val, leafOnly))), forced);
				checkedValue.value = cloneDeep(modelValue ?? void 0);
			}
		};
		const syncMenuState = (newCheckedNodes, reserveExpandingState = true) => {
			const { checkStrictly } = config.value;
			const oldNodes = checkedNodes.value;
			const newNodes = newCheckedNodes.filter((node) => !!node && (checkStrictly || node.isLeaf));
			const oldExpandingNode = store?.getSameNode(expandingNode.value);
			const newExpandingNode = reserveExpandingState && oldExpandingNode || newNodes[0];
			if (newExpandingNode) newExpandingNode.pathNodes.forEach((node) => expandNode(node, true));
			else expandingNode.value = void 0;
			oldNodes.forEach((node) => node.doCheck(false));
			reactive(newNodes).forEach((node) => node.doCheck(true));
			checkedNodes.value = newNodes;
			nextTick(scrollToExpandingNode);
		};
		const scrollToExpandingNode = () => {
			if (!isClient) return;
			menuList.value.forEach((menu) => {
				const menuElement = menu?.$el;
				if (menuElement) {
					const container = menuElement.querySelector(`.${ns.namespace.value}-scrollbar__wrap`);
					let activeNode = menuElement.querySelector(`.${ns.b("node")}.in-active-path`);
					if (!activeNode) {
						const activeElements = menuElement.querySelectorAll(`.${ns.b("node")}.${ns.is("active")}`);
						activeNode = activeElements[activeElements.length - 1];
					}
					scrollIntoView(container, activeNode);
				}
			});
		};
		const handleKeyDown = (e) => {
			const target = e.target;
			const code = getEventCode(e);
			switch (code) {
				case EVENT_CODE.up:
				case EVENT_CODE.down:
					e.preventDefault();
					focusNode(getSibling(target, code === EVENT_CODE.up ? -1 : 1, `.${ns.b("node")}[tabindex="-1"]`));
					break;
				case EVENT_CODE.left: {
					e.preventDefault();
					const expandedNode = menuList.value[getMenuIndex(target) - 1]?.$el.querySelector(`.${ns.b("node")}[aria-expanded="true"]`);
					focusNode(expandedNode);
					break;
				}
				case EVENT_CODE.right: {
					e.preventDefault();
					const firstNode = menuList.value[getMenuIndex(target) + 1]?.$el.querySelector(`.${ns.b("node")}[tabindex="-1"]`);
					focusNode(firstNode);
					break;
				}
				case EVENT_CODE.enter:
				case EVENT_CODE.numpadEnter:
					checkNode(target);
					break;
			}
		};
		provide(CASCADER_PANEL_INJECTION_KEY, reactive({
			config,
			expandingNode,
			checkedNodes,
			isHoverMenu,
			initialLoaded,
			renderLabelFn,
			lazyLoad,
			expandNode,
			handleCheckChange
		}));
		watch(config, (newVal, oldVal) => {
			if (isEqual(newVal, oldVal)) return;
			initStore();
		}, { immediate: true });
		watch(() => props.options, initStore, { deep: true });
		watch(() => props.modelValue, () => {
			manualChecked = false;
			syncCheckedValue();
		}, { deep: true });
		watch(() => checkedValue.value, (val) => {
			if (!isEqual(val, props.modelValue)) {
				emit(UPDATE_MODEL_EVENT, val);
				emit(CHANGE_EVENT, val);
			}
		});
		const loadLazyRootNodes = () => {
			if (initialLoadedOnce.value) return;
			initStore();
		};
		onBeforeUpdate(() => menuList.value = []);
		onMounted(() => !isEmpty(props.modelValue) && syncCheckedValue());
		__expose({
			menuList,
			menus,
			checkedNodes,
			handleKeyDown,
			handleCheckChange,
			getFlattedNodes,
			getCheckedNodes,
			clearCheckedNodes,
			calculateCheckedValue,
			scrollToExpandingNode,
			loadLazyRootNodes
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass([unref(ns).b("panel"), unref(ns).is("bordered", __props.border)]),
				onKeydown: handleKeyDown
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(menus.value, (menu, index) => {
				return openBlock(), createBlock(menu_default, {
					key: index,
					ref_for: true,
					ref: (item) => menuList.value[index] = item,
					index,
					nodes: [...menu]
				}, {
					empty: withCtx(() => [renderSlot(_ctx.$slots, "empty")]),
					_: 3
				}, 8, ["index", "nodes"]);
			}), 128))], 34);
		};
	}
});

//#endregion
export { index_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=index.vue_vue_type_script_setup_true_lang.mjs.map
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_aria$1 = require('../../../utils/dom/aria.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_types = require('../../../utils/types.js');
const require_scroll = require('../../../utils/dom/scroll.js');
const require_arrays = require('../../../utils/arrays.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_config = require('./config.js');
const require_types$1 = require('./types.js');
const require_menu = require('./menu.js');
const require_node = require('./node.js');
const require_store = require('./store.js');
const require_utils = require('./utils.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/components/cascader-panel/src/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCascaderPanel",
	__name: "index",
	props: require_config.cascaderPanelProps,
	emits: require_config.cascaderPanelEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		let manualChecked = false;
		const ns = require_index.useNamespace("cascader");
		const config = require_config.useCascaderConfig(props);
		const slots = (0, vue.useSlots)();
		let store;
		const initialLoaded = (0, vue.ref)(true);
		const initialLoadedOnce = (0, vue.ref)(false);
		const menuList = (0, vue.ref)([]);
		const checkedValue = (0, vue.ref)();
		const menus = (0, vue.ref)([]);
		const expandingNode = (0, vue.ref)();
		const checkedNodes = (0, vue.ref)([]);
		const isHoverMenu = (0, vue.computed)(() => config.value.expandTrigger === "hover");
		const renderLabelFn = (0, vue.computed)(() => props.renderLabel || slots.default);
		const initStore = () => {
			const { options } = props;
			const cfg = config.value;
			manualChecked = false;
			store = new require_store.default(options, cfg);
			menus.value = [store.getNodes()];
			if (cfg.lazy && require_types.isEmpty(props.options)) {
				initialLoaded.value = false;
				lazyLoad(void 0, (list) => {
					if (list) {
						store = new require_store.default(list, cfg);
						menus.value = [store.getNodes()];
					}
					initialLoaded.value = true;
					syncCheckedValue(false, true);
				});
			} else syncCheckedValue(false, true);
		};
		const lazyLoad = (node, cb) => {
			const cfg = config.value;
			node = node || new require_node.default({}, cfg, void 0, true);
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
			const nodes = require_utils.sortByOriginalOrder(oldNodes, getCheckedNodes(!checkStrictly));
			const values = nodes.map((node) => node.valueByOption);
			checkedNodes.value = nodes;
			checkedValue.value = multiple ? values : values[0] ?? null;
		};
		const syncCheckedValue = (loaded = false, forced = false) => {
			const { modelValue } = props;
			const { lazy, multiple, checkStrictly } = config.value;
			const leafOnly = !checkStrictly;
			if (!initialLoaded.value || manualChecked || !forced && (0, lodash_unified.isEqual)(modelValue, checkedValue.value)) return;
			if (lazy && !loaded) {
				const nodes = require_arrays.unique((0, lodash_unified.flattenDeep)(require_arrays.castArray(modelValue))).map((val) => store?.getNodeByValue(val)).filter((node) => !!node && !node.loaded && !node.loading);
				if (nodes.length) nodes.forEach((node) => {
					lazyLoad(node, () => syncCheckedValue(false, forced));
				});
				else syncCheckedValue(true, forced);
			} else {
				syncMenuState(require_arrays.unique((multiple ? require_arrays.castArray(modelValue) : [modelValue]).map((val) => store?.getNodeByValue(val, leafOnly))), forced);
				checkedValue.value = (0, lodash_unified.cloneDeep)(modelValue ?? void 0);
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
			(0, vue.reactive)(newNodes).forEach((node) => node.doCheck(true));
			checkedNodes.value = newNodes;
			(0, vue.nextTick)(scrollToExpandingNode);
		};
		const scrollToExpandingNode = () => {
			if (!_vueuse_core.isClient) return;
			menuList.value.forEach((menu) => {
				const menuElement = menu?.$el;
				if (menuElement) {
					const container = menuElement.querySelector(`.${ns.namespace.value}-scrollbar__wrap`);
					let activeNode = menuElement.querySelector(`.${ns.b("node")}.in-active-path`);
					if (!activeNode) {
						const activeElements = menuElement.querySelectorAll(`.${ns.b("node")}.${ns.is("active")}`);
						activeNode = activeElements[activeElements.length - 1];
					}
					require_scroll.scrollIntoView(container, activeNode);
				}
			});
		};
		const handleKeyDown = (e) => {
			const target = e.target;
			const code = require_event$1.getEventCode(e);
			switch (code) {
				case require_aria.EVENT_CODE.up:
				case require_aria.EVENT_CODE.down:
					e.preventDefault();
					require_aria$1.focusNode(require_aria$1.getSibling(target, code === require_aria.EVENT_CODE.up ? -1 : 1, `.${ns.b("node")}[tabindex="-1"]`));
					break;
				case require_aria.EVENT_CODE.left: {
					e.preventDefault();
					const expandedNode = menuList.value[require_utils.getMenuIndex(target) - 1]?.$el.querySelector(`.${ns.b("node")}[aria-expanded="true"]`);
					require_aria$1.focusNode(expandedNode);
					break;
				}
				case require_aria.EVENT_CODE.right: {
					e.preventDefault();
					const firstNode = menuList.value[require_utils.getMenuIndex(target) + 1]?.$el.querySelector(`.${ns.b("node")}[tabindex="-1"]`);
					require_aria$1.focusNode(firstNode);
					break;
				}
				case require_aria.EVENT_CODE.enter:
				case require_aria.EVENT_CODE.numpadEnter:
					require_utils.checkNode(target);
					break;
			}
		};
		(0, vue.provide)(require_types$1.CASCADER_PANEL_INJECTION_KEY, (0, vue.reactive)({
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
		(0, vue.watch)(config, (newVal, oldVal) => {
			if ((0, lodash_unified.isEqual)(newVal, oldVal)) return;
			initStore();
		}, { immediate: true });
		(0, vue.watch)(() => props.options, initStore, { deep: true });
		(0, vue.watch)(() => props.modelValue, () => {
			manualChecked = false;
			syncCheckedValue();
		}, { deep: true });
		(0, vue.watch)(() => checkedValue.value, (val) => {
			if (!(0, lodash_unified.isEqual)(val, props.modelValue)) {
				emit(require_event.UPDATE_MODEL_EVENT, val);
				emit(require_event.CHANGE_EVENT, val);
			}
		});
		const loadLazyRootNodes = () => {
			if (initialLoadedOnce.value) return;
			initStore();
		};
		(0, vue.onBeforeUpdate)(() => menuList.value = []);
		(0, vue.onMounted)(() => !require_types.isEmpty(props.modelValue) && syncCheckedValue());
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b("panel"), (0, vue.unref)(ns).is("bordered", __props.border)]),
				onKeydown: handleKeyDown
			}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(menus.value, (menu, index) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)(require_menu.default, {
					key: index,
					ref_for: true,
					ref: (item) => menuList.value[index] = item,
					index,
					nodes: [...menu]
				}, {
					empty: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "empty")]),
					_: 3
				}, 8, ["index", "nodes"]);
			}), 128))], 34);
		};
	}
});

//#endregion
exports.default = index_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=index.vue_vue_type_script_setup_true_lang.js.map
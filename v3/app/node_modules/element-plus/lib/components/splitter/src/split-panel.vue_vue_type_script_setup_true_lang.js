const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_useSize = require('./hooks/useSize.js');
const require_type = require('./type.js');
const require_split_panel = require('./split-panel.js');
const require_usePanel = require('./hooks/usePanel.js');
const require_split_bar = require('./split-bar.js');
let vue = require("vue");

//#region ../../packages/components/splitter/src/split-panel.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElSplitterPanel";
var split_panel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "split-panel",
	props: require_split_panel.splitterPanelProps,
	emits: require_split_panel.splitterPanelEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const ns = require_index.useNamespace("splitter-panel");
		const props = __props;
		const emits = __emit;
		const splitterContext = (0, vue.inject)(require_type.splitterRootContextKey);
		if (!splitterContext) require_error.throwError(COMPONENT_NAME, "usage: <el-splitter><el-splitter-panel /></el-splitter/>");
		const { panels, layout, lazy, containerSize, pxSizes } = (0, vue.toRefs)(splitterContext);
		const { registerPanel, unregisterPanel, onCollapse, onMoveEnd, onMoveStart, onMoving } = splitterContext;
		const panelEl = (0, vue.ref)();
		const instance = (0, vue.getCurrentInstance)();
		const uid = instance.uid;
		const index = (0, vue.ref)(0);
		const panel = (0, vue.computed)(() => panels.value[index.value]);
		const setIndex = (val) => {
			index.value = val;
		};
		const panelSize = (0, vue.computed)(() => {
			if (!panel.value) return 0;
			return pxSizes.value[index.value] ?? 0;
		});
		const nextSize = (0, vue.computed)(() => {
			if (!panel.value) return 0;
			return pxSizes.value[index.value + 1] ?? 0;
		});
		const nextPanel = (0, vue.computed)(() => {
			if (panel.value) return panels.value[index.value + 1];
			return null;
		});
		const isResizable = (0, vue.computed)(() => {
			if (!nextPanel.value) return false;
			return props.resizable && nextPanel.value?.resizable && (panelSize.value !== 0 || !props.min) && (nextSize.value !== 0 || !nextPanel.value.min);
		});
		const isShowBar = (0, vue.computed)(() => {
			if (!panel.value) return false;
			return index.value !== panels.value.length - 1;
		});
		const startCollapsible = (0, vue.computed)(() => require_usePanel.isCollapsible(panel.value, panelSize.value, nextPanel.value, nextSize.value));
		const endCollapsible = (0, vue.computed)(() => require_usePanel.isCollapsible(nextPanel.value, nextSize.value, panel.value, panelSize.value));
		function sizeToPx(str) {
			if (require_useSize.isPct(str)) return require_useSize.getPct(str) * containerSize.value || 0;
			else if (require_useSize.isPx(str)) return require_useSize.getPx(str);
			return str ?? 0;
		}
		let isSizeUpdating = false;
		(0, vue.watch)(() => props.size, () => {
			if (!isSizeUpdating && panel.value) {
				if (!containerSize.value) {
					panel.value.size = props.size;
					return;
				}
				const size = sizeToPx(props.size);
				const maxSize = sizeToPx(props.max);
				const minSize = sizeToPx(props.min);
				const finalSize = Math.min(Math.max(size, minSize || 0), maxSize || size);
				if (finalSize !== size) emits("update:size", finalSize);
				panel.value.size = finalSize;
			}
		});
		(0, vue.watch)(() => panel.value?.size, (val) => {
			if (val !== props.size) {
				isSizeUpdating = true;
				emits("update:size", val);
				(0, vue.nextTick)(() => isSizeUpdating = false);
			}
		});
		(0, vue.watch)(() => props.resizable, (val) => {
			if (panel.value) panel.value.resizable = val;
		});
		const _panel = (0, vue.reactive)({
			uid,
			getVnode: () => instance.vnode,
			setIndex,
			...props,
			collapsible: (0, vue.computed)(() => require_usePanel.getCollapsible(props.collapsible))
		});
		registerPanel(_panel);
		(0, vue.onBeforeUnmount)(() => unregisterPanel(_panel));
		__expose({ splitterPanelRef: panelEl });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [(0, vue.createElementVNode)("div", (0, vue.mergeProps)({
				ref_key: "panelEl",
				ref: panelEl,
				class: [(0, vue.unref)(ns).b()],
				style: { flexBasis: `${panelSize.value}px` }
			}, _ctx.$attrs), [(0, vue.renderSlot)(_ctx.$slots, "default")], 16), isShowBar.value ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_split_bar.default, {
				key: 0,
				index: index.value,
				layout: (0, vue.unref)(layout),
				lazy: (0, vue.unref)(lazy),
				resizable: isResizable.value,
				"start-collapsible": startCollapsible.value,
				"end-collapsible": endCollapsible.value,
				onMoveStart: (0, vue.unref)(onMoveStart),
				onMoving: (0, vue.unref)(onMoving),
				onMoveEnd: (0, vue.unref)(onMoveEnd),
				onCollapse: (0, vue.unref)(onCollapse)
			}, {
				"start-collapsible": (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "start-collapsible")]),
				"end-collapsible": (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "end-collapsible")]),
				_: 3
			}, 8, [
				"index",
				"layout",
				"lazy",
				"resizable",
				"start-collapsible",
				"end-collapsible",
				"onMoveStart",
				"onMoving",
				"onMoveEnd",
				"onCollapse"
			])) : (0, vue.createCommentVNode)("v-if", true)], 64);
		};
	}
});

//#endregion
exports.default = split_panel_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=split-panel.vue_vue_type_script_setup_true_lang.js.map
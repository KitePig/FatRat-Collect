import { throwError } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { getPct, getPx, isPct, isPx } from "./hooks/useSize.mjs";
import { splitterRootContextKey } from "./type.mjs";
import { splitterPanelEmits, splitterPanelProps } from "./split-panel.mjs";
import { getCollapsible, isCollapsible } from "./hooks/usePanel.mjs";
import split_bar_default from "./split-bar.mjs";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, getCurrentInstance, inject, mergeProps, nextTick, onBeforeUnmount, openBlock, reactive, ref, renderSlot, toRefs, unref, watch, withCtx } from "vue";

//#region ../../packages/components/splitter/src/split-panel.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElSplitterPanel";
var split_panel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "split-panel",
	props: splitterPanelProps,
	emits: splitterPanelEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const ns = useNamespace("splitter-panel");
		const props = __props;
		const emits = __emit;
		const splitterContext = inject(splitterRootContextKey);
		if (!splitterContext) throwError(COMPONENT_NAME, "usage: <el-splitter><el-splitter-panel /></el-splitter/>");
		const { panels, layout, lazy, containerSize, pxSizes } = toRefs(splitterContext);
		const { registerPanel, unregisterPanel, onCollapse, onMoveEnd, onMoveStart, onMoving } = splitterContext;
		const panelEl = ref();
		const instance = getCurrentInstance();
		const uid = instance.uid;
		const index = ref(0);
		const panel = computed(() => panels.value[index.value]);
		const setIndex = (val) => {
			index.value = val;
		};
		const panelSize = computed(() => {
			if (!panel.value) return 0;
			return pxSizes.value[index.value] ?? 0;
		});
		const nextSize = computed(() => {
			if (!panel.value) return 0;
			return pxSizes.value[index.value + 1] ?? 0;
		});
		const nextPanel = computed(() => {
			if (panel.value) return panels.value[index.value + 1];
			return null;
		});
		const isResizable = computed(() => {
			if (!nextPanel.value) return false;
			return props.resizable && nextPanel.value?.resizable && (panelSize.value !== 0 || !props.min) && (nextSize.value !== 0 || !nextPanel.value.min);
		});
		const isShowBar = computed(() => {
			if (!panel.value) return false;
			return index.value !== panels.value.length - 1;
		});
		const startCollapsible = computed(() => isCollapsible(panel.value, panelSize.value, nextPanel.value, nextSize.value));
		const endCollapsible = computed(() => isCollapsible(nextPanel.value, nextSize.value, panel.value, panelSize.value));
		function sizeToPx(str) {
			if (isPct(str)) return getPct(str) * containerSize.value || 0;
			else if (isPx(str)) return getPx(str);
			return str ?? 0;
		}
		let isSizeUpdating = false;
		watch(() => props.size, () => {
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
		watch(() => panel.value?.size, (val) => {
			if (val !== props.size) {
				isSizeUpdating = true;
				emits("update:size", val);
				nextTick(() => isSizeUpdating = false);
			}
		});
		watch(() => props.resizable, (val) => {
			if (panel.value) panel.value.resizable = val;
		});
		const _panel = reactive({
			uid,
			getVnode: () => instance.vnode,
			setIndex,
			...props,
			collapsible: computed(() => getCollapsible(props.collapsible))
		});
		registerPanel(_panel);
		onBeforeUnmount(() => unregisterPanel(_panel));
		__expose({ splitterPanelRef: panelEl });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createElementVNode("div", mergeProps({
				ref_key: "panelEl",
				ref: panelEl,
				class: [unref(ns).b()],
				style: { flexBasis: `${panelSize.value}px` }
			}, _ctx.$attrs), [renderSlot(_ctx.$slots, "default")], 16), isShowBar.value ? (openBlock(), createBlock(split_bar_default, {
				key: 0,
				index: index.value,
				layout: unref(layout),
				lazy: unref(lazy),
				resizable: isResizable.value,
				"start-collapsible": startCollapsible.value,
				"end-collapsible": endCollapsible.value,
				onMoveStart: unref(onMoveStart),
				onMoving: unref(onMoving),
				onMoveEnd: unref(onMoveEnd),
				onCollapse: unref(onCollapse)
			}, {
				"start-collapsible": withCtx(() => [renderSlot(_ctx.$slots, "start-collapsible")]),
				"end-collapsible": withCtx(() => [renderSlot(_ctx.$slots, "end-collapsible")]),
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
			])) : createCommentVNode("v-if", true)], 64);
		};
	}
});

//#endregion
export { split_panel_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=split-panel.vue_vue_type_script_setup_true_lang.mjs.map
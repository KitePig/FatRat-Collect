const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-ordered-children/index.js');
const require_splitter = require('./splitter.js');
const require_useContainer = require('./hooks/useContainer.js');
const require_useSize = require('./hooks/useSize.js');
const require_useResize = require('./hooks/useResize.js');
const require_type = require('./type.js');
let vue = require("vue");

//#region ../../packages/components/splitter/src/splitter.vue?vue&type=script&setup=true&lang.ts
var splitter_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSplitter",
	__name: "splitter",
	props: require_splitter.splitterProps,
	emits: require_splitter.splitterEmits,
	setup(__props, { emit: __emit }) {
		const ns = require_index.useNamespace("splitter");
		const emits = __emit;
		const props = __props;
		const layout = (0, vue.toRef)(props, "layout");
		const lazy = (0, vue.toRef)(props, "lazy");
		const { containerEl, containerSize } = require_useContainer.useContainer(layout);
		const { removeChild: unregisterPanel, children: panels, addChild: registerPanel, ChildrenSorter: PanelsSorter } = require_index$1.useOrderedChildren((0, vue.getCurrentInstance)(), "ElSplitterPanel");
		(0, vue.watch)(panels, () => {
			movingIndex.value = null;
			panels.value.forEach((instance, index) => {
				instance.setIndex(index);
			});
		});
		const { percentSizes, pxSizes } = require_useSize.useSize(panels, containerSize);
		const { lazyOffset, movingIndex, onMoveStart, onMoving, onMoveEnd, onCollapse } = require_useResize.useResize(panels, containerSize, pxSizes, lazy);
		const splitterStyles = (0, vue.computed)(() => {
			return { [ns.cssVarBlockName("bar-offset")]: lazy.value ? `${lazyOffset.value}px` : void 0 };
		});
		const onResizeStart = (index) => {
			onMoveStart(index);
			emits("resizeStart", index, pxSizes.value);
		};
		const onResize = (index, offset) => {
			onMoving(index, offset);
			if (!lazy.value) emits("resize", index, pxSizes.value);
		};
		const onResizeEnd = async (index) => {
			onMoveEnd();
			await (0, vue.nextTick)();
			emits("resizeEnd", index, pxSizes.value);
		};
		const onCollapsible = (index, type) => {
			onCollapse(index, type);
			emits("collapse", index, type, pxSizes.value);
		};
		(0, vue.provide)(require_type.splitterRootContextKey, (0, vue.reactive)({
			panels,
			percentSizes,
			pxSizes,
			layout,
			lazy,
			movingIndex,
			containerSize,
			onMoveStart: onResizeStart,
			onMoving: onResize,
			onMoveEnd: onResizeEnd,
			onCollapse: onCollapsible,
			registerPanel,
			unregisterPanel
		}));
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "containerEl",
				ref: containerEl,
				class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b(), (0, vue.unref)(ns).e(layout.value)]),
				style: (0, vue.normalizeStyle)(splitterStyles.value)
			}, [
				(0, vue.renderSlot)(_ctx.$slots, "default"),
				(0, vue.createVNode)((0, vue.unref)(PanelsSorter)),
				(0, vue.createCommentVNode)(" Prevent iframe touch events from breaking "),
				(0, vue.unref)(movingIndex) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("mask"), (0, vue.unref)(ns).e(`mask-${layout.value}`)])
				}, null, 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 6);
		};
	}
});

//#endregion
exports.default = splitter_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=splitter.vue_vue_type_script_setup_true_lang.js.map
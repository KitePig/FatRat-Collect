const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_scroll = require('../../../utils/dom/scroll.js');
const require_index = require('../../../hooks/use-attrs/index.js');
const require_index$1 = require('../../../hooks/use-locale/index.js');
const require_index$2 = require('../../../hooks/use-namespace/index.js');
const require_image = require('./image.js');
const require_index$3 = require('../../image-viewer/index.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/image/src/image.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"src",
	"loading",
	"crossorigin"
];
const _hoisted_2 = { key: 0 };
var image_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElImage",
	inheritAttrs: false,
	__name: "image",
	props: require_image.imageProps,
	emits: require_image.imageEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = require_index$1.useLocale();
		const ns = require_index$2.useNamespace("image");
		const rawAttrs = (0, vue.useAttrs)();
		const containerAttrs = (0, vue.computed)(() => {
			return (0, lodash_unified.fromPairs)(Object.entries(rawAttrs).filter(([key]) => /^(data-|on[A-Z])/i.test(key) || ["id", "style"].includes(key)));
		});
		const imgAttrs = require_index.useAttrs({
			excludeListeners: true,
			excludeKeys: (0, vue.computed)(() => {
				return Object.keys(containerAttrs.value);
			})
		});
		const imageSrc = (0, vue.ref)();
		const hasLoadError = (0, vue.ref)(false);
		const isLoading = (0, vue.ref)(true);
		const showViewer = (0, vue.ref)(false);
		const container = (0, vue.ref)();
		const _scrollContainer = (0, vue.ref)();
		const supportLoading = _vueuse_core.isClient && "loading" in HTMLImageElement.prototype;
		let stopScrollListener;
		const imageKls = (0, vue.computed)(() => [
			ns.e("inner"),
			preview.value && ns.e("preview"),
			isLoading.value && ns.is("loading")
		]);
		const imageStyle = (0, vue.computed)(() => {
			const { fit } = props;
			if (_vueuse_core.isClient && fit) return { objectFit: fit };
			return {};
		});
		const preview = (0, vue.computed)(() => {
			const { previewSrcList } = props;
			return (0, _vue_shared.isArray)(previewSrcList) && previewSrcList.length > 0;
		});
		const imageIndex = (0, vue.computed)(() => {
			const { previewSrcList, initialIndex } = props;
			let previewIndex = initialIndex;
			if (initialIndex > previewSrcList.length - 1) previewIndex = 0;
			return previewIndex;
		});
		const isManual = (0, vue.computed)(() => {
			if (props.loading === "eager") return false;
			return !supportLoading && props.loading === "lazy" || props.lazy;
		});
		const loadImage = () => {
			if (!_vueuse_core.isClient) return;
			isLoading.value = true;
			hasLoadError.value = false;
			imageSrc.value = props.src;
		};
		function handleLoad(event) {
			isLoading.value = false;
			hasLoadError.value = false;
			emit("load", event);
		}
		function handleError(event) {
			isLoading.value = false;
			hasLoadError.value = true;
			emit("error", event);
		}
		function handleLazyLoad(isIntersecting) {
			if (isIntersecting) {
				loadImage();
				removeLazyLoadListener();
			}
		}
		const lazyLoadHandler = (0, _vueuse_core.useThrottleFn)(handleLazyLoad, 200, true);
		async function addLazyLoadListener() {
			if (!_vueuse_core.isClient) return;
			await (0, vue.nextTick)();
			const { scrollContainer } = props;
			if (require_types.isElement(scrollContainer)) _scrollContainer.value = scrollContainer;
			else if ((0, _vue_shared.isString)(scrollContainer) && scrollContainer !== "") _scrollContainer.value = document.querySelector(scrollContainer) ?? void 0;
			else if (container.value) {
				const scrollContainer = require_scroll.getScrollContainer(container.value);
				_scrollContainer.value = require_types.isWindow(scrollContainer) ? void 0 : scrollContainer;
			}
			const { stop } = (0, _vueuse_core.useIntersectionObserver)(container, ([entry]) => {
				lazyLoadHandler(entry.isIntersecting);
			}, { root: _scrollContainer });
			stopScrollListener = stop;
		}
		function removeLazyLoadListener() {
			if (!_vueuse_core.isClient || !lazyLoadHandler) return;
			stopScrollListener?.();
			_scrollContainer.value = void 0;
			stopScrollListener = void 0;
		}
		function clickHandler() {
			if (!preview.value) return;
			showViewer.value = true;
			emit("show");
		}
		function closeViewer() {
			showViewer.value = false;
			emit("close");
		}
		function switchViewer(val) {
			emit("switch", val);
		}
		(0, vue.watch)(() => props.src, () => {
			if (isManual.value) {
				isLoading.value = true;
				hasLoadError.value = false;
				removeLazyLoadListener();
				addLazyLoadListener();
			} else loadImage();
		});
		(0, vue.onMounted)(() => {
			if (isManual.value) addLazyLoadListener();
			else loadImage();
		});
		__expose({ showPreview: clickHandler });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", (0, vue.mergeProps)({
				ref_key: "container",
				ref: container
			}, containerAttrs.value, { class: [(0, vue.unref)(ns).b(), _ctx.$attrs.class] }), [hasLoadError.value ? (0, vue.renderSlot)(_ctx.$slots, "error", { key: 0 }, () => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("error")) }, (0, vue.toDisplayString)((0, vue.unref)(t)("el.image.error")), 3)]) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, [imageSrc.value !== void 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("img", (0, vue.mergeProps)({ key: 0 }, (0, vue.unref)(imgAttrs), {
				src: imageSrc.value,
				loading: __props.loading,
				style: imageStyle.value,
				class: imageKls.value,
				crossorigin: __props.crossorigin,
				onClick: clickHandler,
				onLoad: handleLoad,
				onError: handleError
			}), null, 16, _hoisted_1)) : (0, vue.createCommentVNode)("v-if", true), isLoading.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 1,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("wrapper"))
			}, [(0, vue.renderSlot)(_ctx.$slots, "placeholder", {}, () => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("placeholder")) }, null, 2)])], 2)) : (0, vue.createCommentVNode)("v-if", true)], 64)), preview.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 2 }, [showViewer.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElImageViewer), {
				key: 0,
				"z-index": __props.zIndex,
				"initial-index": imageIndex.value,
				infinite: __props.infinite,
				"zoom-rate": __props.zoomRate,
				"min-scale": __props.minScale,
				"max-scale": __props.maxScale,
				"show-progress": __props.showProgress,
				"url-list": __props.previewSrcList,
				scale: __props.scale,
				crossorigin: __props.crossorigin,
				"hide-on-click-modal": __props.hideOnClickModal,
				teleported: __props.previewTeleported,
				"close-on-press-escape": __props.closeOnPressEscape,
				onClose: closeViewer,
				onSwitch: switchViewer
			}, (0, vue.createSlots)({
				toolbar: (0, vue.withCtx)((toolbar) => [(0, vue.renderSlot)(_ctx.$slots, "toolbar", (0, vue.normalizeProps)((0, vue.guardReactiveProps)(toolbar)))]),
				default: (0, vue.withCtx)(() => [_ctx.$slots.viewer ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", _hoisted_2, [(0, vue.renderSlot)(_ctx.$slots, "viewer")])) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 2
			}, [_ctx.$slots.progress ? {
				name: "progress",
				fn: (0, vue.withCtx)((progress) => [(0, vue.renderSlot)(_ctx.$slots, "progress", (0, vue.normalizeProps)((0, vue.guardReactiveProps)(progress)))]),
				key: "0"
			} : void 0, _ctx.$slots["viewer-error"] ? {
				name: "viewer-error",
				fn: (0, vue.withCtx)((viewerError) => [(0, vue.renderSlot)(_ctx.$slots, "viewer-error", (0, vue.normalizeProps)((0, vue.guardReactiveProps)(viewerError)))]),
				key: "1"
			} : void 0]), 1032, [
				"z-index",
				"initial-index",
				"infinite",
				"zoom-rate",
				"min-scale",
				"max-scale",
				"show-progress",
				"url-list",
				"scale",
				"crossorigin",
				"hide-on-click-modal",
				"teleported",
				"close-on-press-escape"
			])) : (0, vue.createCommentVNode)("v-if", true)], 64)) : (0, vue.createCommentVNode)("v-if", true)], 16);
		};
	}
});

//#endregion
exports.default = image_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=image.vue_vue_type_script_setup_true_lang.js.map
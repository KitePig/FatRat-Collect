const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_objects = require('../../../utils/objects.js');
const require_index = require('../../teleport/index.js');
const require_index$1 = require('../../../hooks/use-locale/index.js');
const require_index$2 = require('../../../hooks/use-namespace/index.js');
const require_index$3 = require('../../../hooks/use-lockscreen/index.js');
const require_index$4 = require('../../../hooks/use-z-index/index.js');
const require_index$5 = require('../../icon/index.js');
const require_index$6 = require('../../focus-trap/index.js');
const require_image_viewer = require('./image-viewer.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/image-viewer/src/image-viewer.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["src", "crossorigin"];
var image_viewer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElImageViewer",
	__name: "image-viewer",
	props: require_image_viewer.imageViewerProps,
	emits: require_image_viewer.imageViewerEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const modes = {
			CONTAIN: {
				name: "contain",
				icon: (0, vue.markRaw)(_element_plus_icons_vue.FullScreen)
			},
			ORIGINAL: {
				name: "original",
				icon: (0, vue.markRaw)(_element_plus_icons_vue.ScaleToOriginal)
			}
		};
		const props = __props;
		const emit = __emit;
		let stopWheelListener;
		const { t } = require_index$1.useLocale();
		const ns = require_index$2.useNamespace("image-viewer");
		const { nextZIndex } = require_index$4.useZIndex();
		const wrapper = (0, vue.ref)();
		const imgRef = (0, vue.ref)();
		const scopeEventListener = (0, vue.effectScope)();
		const scaleClamped = (0, vue.computed)(() => {
			const { scale, minScale, maxScale } = props;
			return (0, _vueuse_core.clamp)(scale, minScale, maxScale);
		});
		const loading = (0, vue.ref)(true);
		const loadError = (0, vue.ref)(false);
		const visible = (0, vue.ref)(false);
		const activeIndex = (0, vue.ref)(props.initialIndex);
		const mode = (0, vue.shallowRef)(modes.CONTAIN);
		const transform = (0, vue.ref)({
			scale: scaleClamped.value,
			deg: 0,
			offsetX: 0,
			offsetY: 0,
			enableTransition: false
		});
		const zIndex = (0, vue.ref)(props.zIndex ?? nextZIndex());
		require_index$3.useLockscreen(visible, { ns });
		const isSingle = (0, vue.computed)(() => {
			const { urlList } = props;
			return urlList.length <= 1;
		});
		const isFirst = (0, vue.computed)(() => activeIndex.value === 0);
		const isLast = (0, vue.computed)(() => activeIndex.value === props.urlList.length - 1);
		const currentImg = (0, vue.computed)(() => props.urlList[activeIndex.value]);
		const arrowPrevKls = (0, vue.computed)(() => [
			ns.e("btn"),
			ns.e("prev"),
			ns.is("disabled", !props.infinite && isFirst.value)
		]);
		const arrowNextKls = (0, vue.computed)(() => [
			ns.e("btn"),
			ns.e("next"),
			ns.is("disabled", !props.infinite && isLast.value)
		]);
		const imgStyle = (0, vue.computed)(() => {
			const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
			let translateX = offsetX / scale;
			let translateY = offsetY / scale;
			const radian = deg * Math.PI / 180;
			const cosRadian = Math.cos(radian);
			const sinRadian = Math.sin(radian);
			translateX = translateX * cosRadian + translateY * sinRadian;
			translateY = translateY * cosRadian - offsetX / scale * sinRadian;
			const style = {
				transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
				transition: enableTransition ? "transform .3s" : ""
			};
			if (mode.value.name === modes.CONTAIN.name) style.maxWidth = style.maxHeight = "100%";
			return style;
		});
		const progress = (0, vue.computed)(() => `${activeIndex.value + 1} / ${props.urlList.length}`);
		function hide() {
			unregisterEventListener();
			stopWheelListener?.();
			visible.value = false;
			emit("close");
		}
		function registerEventListener() {
			const keydownHandler = (0, lodash_unified.throttle)((e) => {
				switch (require_event.getEventCode(e)) {
					case require_aria.EVENT_CODE.esc:
						props.closeOnPressEscape && hide();
						break;
					case require_aria.EVENT_CODE.space:
						toggleMode();
						break;
					case require_aria.EVENT_CODE.left:
						prev();
						break;
					case require_aria.EVENT_CODE.up:
						handleActions("zoomIn");
						break;
					case require_aria.EVENT_CODE.right:
						next();
						break;
					case require_aria.EVENT_CODE.down:
						handleActions("zoomOut");
						break;
				}
			});
			const mousewheelHandler = (0, lodash_unified.throttle)((e) => {
				handleActions((e.deltaY || e.deltaX) < 0 ? "zoomIn" : "zoomOut", {
					zoomRate: props.zoomRate,
					enableTransition: false
				});
			});
			scopeEventListener.run(() => {
				(0, _vueuse_core.useEventListener)(document, "keydown", keydownHandler);
				(0, _vueuse_core.useEventListener)(wrapper, "wheel", mousewheelHandler);
			});
		}
		function unregisterEventListener() {
			scopeEventListener.stop();
		}
		function handleImgLoad() {
			loading.value = false;
		}
		function handleImgError(e) {
			loadError.value = true;
			loading.value = false;
			emit("error", e);
			e.target.alt = t("el.image.error");
		}
		function handleMouseDown(e) {
			if (loading.value || e.button !== 0 || !wrapper.value) return;
			transform.value.enableTransition = false;
			const { offsetX, offsetY } = transform.value;
			const startX = e.pageX;
			const startY = e.pageY;
			const dragHandler = (0, lodash_unified.throttle)((ev) => {
				transform.value = {
					...transform.value,
					offsetX: offsetX + ev.pageX - startX,
					offsetY: offsetY + ev.pageY - startY
				};
			});
			const removeMousemove = (0, _vueuse_core.useEventListener)(document, "mousemove", dragHandler);
			const removeMouseup = (0, _vueuse_core.useEventListener)(document, "mouseup", () => {
				removeMousemove();
				removeMouseup();
			});
			e.preventDefault();
		}
		function handleTouchStart(e) {
			if (loading.value || !wrapper.value || e.touches.length !== 1) return;
			transform.value.enableTransition = false;
			const { offsetX, offsetY } = transform.value;
			const { pageX: startX, pageY: startY } = e.touches[0];
			const dragHandler = (0, lodash_unified.throttle)((ev) => {
				const targetTouch = ev.touches[0];
				transform.value = {
					...transform.value,
					offsetX: offsetX + targetTouch.pageX - startX,
					offsetY: offsetY + targetTouch.pageY - startY
				};
			});
			const removeTouchmove = (0, _vueuse_core.useEventListener)(document, "touchmove", dragHandler);
			const removeTouchend = (0, _vueuse_core.useEventListener)(document, "touchend", () => {
				removeTouchmove();
				removeTouchend();
			});
			e.preventDefault();
		}
		function reset() {
			transform.value = {
				scale: scaleClamped.value,
				deg: 0,
				offsetX: 0,
				offsetY: 0,
				enableTransition: false
			};
		}
		function toggleMode() {
			if (loading.value || loadError.value) return;
			const modeNames = require_objects.keysOf(modes);
			const modeValues = Object.values(modes);
			const currentMode = mode.value.name;
			mode.value = modes[modeNames[(modeValues.findIndex((i) => i.name === currentMode) + 1) % modeNames.length]];
			reset();
		}
		function setActiveItem(index) {
			loadError.value = false;
			const len = props.urlList.length;
			activeIndex.value = (index + len) % len;
		}
		function prev() {
			if (isFirst.value && !props.infinite) return;
			setActiveItem(activeIndex.value - 1);
		}
		function next() {
			if (isLast.value && !props.infinite) return;
			setActiveItem(activeIndex.value + 1);
		}
		function handleActions(action, options = {}) {
			if (loading.value || loadError.value) return;
			const { minScale, maxScale } = props;
			const { zoomRate, rotateDeg, enableTransition } = {
				zoomRate: props.zoomRate,
				rotateDeg: 90,
				enableTransition: true,
				...options
			};
			switch (action) {
				case "zoomOut":
					if (transform.value.scale > minScale) transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
					break;
				case "zoomIn":
					if (transform.value.scale < maxScale) transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
					break;
				case "clockwise":
					transform.value.deg += rotateDeg;
					emit("rotate", transform.value.deg);
					break;
				case "anticlockwise":
					transform.value.deg -= rotateDeg;
					emit("rotate", transform.value.deg);
					break;
			}
			transform.value.enableTransition = enableTransition;
		}
		function onFocusoutPrevented(event) {
			if (event.detail?.focusReason === "pointer") event.preventDefault();
		}
		function onCloseRequested() {
			if (props.closeOnPressEscape) hide();
		}
		function wheelHandler(e) {
			if (!e.ctrlKey) return;
			if (e.deltaY < 0) {
				e.preventDefault();
				return false;
			} else if (e.deltaY > 0) {
				e.preventDefault();
				return false;
			}
		}
		(0, vue.watch)(() => scaleClamped.value, (val) => {
			transform.value.scale = val;
		});
		(0, vue.watch)(currentImg, () => {
			(0, vue.nextTick)(() => {
				if (!imgRef.value?.complete) loading.value = true;
			});
		});
		(0, vue.watch)(activeIndex, (val) => {
			reset();
			emit("switch", val);
		});
		(0, vue.onMounted)(() => {
			visible.value = true;
			registerEventListener();
			stopWheelListener = (0, _vueuse_core.useEventListener)("wheel", wheelHandler, { passive: false });
		});
		__expose({ setActiveItem });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index.ElTeleport), {
				to: "body",
				disabled: !__props.teleported
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createVNode)(vue.Transition, {
					name: "viewer-fade",
					appear: ""
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
						ref_key: "wrapper",
						ref: wrapper,
						tabindex: -1,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("wrapper")),
						style: (0, vue.normalizeStyle)({ zIndex: zIndex.value })
					}, [(0, vue.createVNode)((0, vue.unref)(require_index$6.default), {
						loop: "",
						trapped: "",
						"focus-trap-el": wrapper.value,
						"focus-start-el": "container",
						onFocusoutPrevented,
						onReleaseRequested: onCloseRequested
					}, {
						default: (0, vue.withCtx)(() => [
							(0, vue.createElementVNode)("div", {
								class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("mask")),
								onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(($event) => __props.hideOnClickModal && hide(), ["self"]))
							}, null, 2),
							(0, vue.createCommentVNode)(" CLOSE "),
							(0, vue.createElementVNode)("span", {
								class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("btn"), (0, vue.unref)(ns).e("close")]),
								onClick: hide
							}, [(0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Close))]),
								_: 1
							})], 2),
							(0, vue.createCommentVNode)(" ARROW "),
							!isSingle.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createElementVNode)("span", {
								class: (0, vue.normalizeClass)(arrowPrevKls.value),
								onClick: prev
							}, [(0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowLeft))]),
								_: 1
							})], 2), (0, vue.createElementVNode)("span", {
								class: (0, vue.normalizeClass)(arrowNextKls.value),
								onClick: next
							}, [(0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), null, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowRight))]),
								_: 1
							})], 2)], 64)) : (0, vue.createCommentVNode)("v-if", true),
							_ctx.$slots.progress || __props.showProgress ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
								key: 1,
								class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("btn"), (0, vue.unref)(ns).e("progress")])
							}, [(0, vue.renderSlot)(_ctx.$slots, "progress", {
								activeIndex: activeIndex.value,
								total: __props.urlList.length
							}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(progress.value), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
							(0, vue.createCommentVNode)(" ACTIONS "),
							(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("btn"), (0, vue.unref)(ns).e("actions")]) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("actions__inner")) }, [(0, vue.renderSlot)(_ctx.$slots, "toolbar", {
								actions: handleActions,
								prev,
								next,
								reset: toggleMode,
								activeIndex: activeIndex.value,
								setActiveItem
							}, () => [
								(0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), { onClick: _cache[1] || (_cache[1] = ($event) => handleActions("zoomOut")) }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ZoomOut))]),
									_: 1
								}),
								(0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), { onClick: _cache[2] || (_cache[2] = ($event) => handleActions("zoomIn")) }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ZoomIn))]),
									_: 1
								}),
								(0, vue.createElementVNode)("i", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("actions__divider")) }, null, 2),
								(0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), { onClick: toggleMode }, {
									default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(mode.value.icon)))]),
									_: 1
								}),
								(0, vue.createElementVNode)("i", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("actions__divider")) }, null, 2),
								(0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), { onClick: _cache[3] || (_cache[3] = ($event) => handleActions("anticlockwise")) }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.RefreshLeft))]),
									_: 1
								}),
								(0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), { onClick: _cache[4] || (_cache[4] = ($event) => handleActions("clockwise")) }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.RefreshRight))]),
									_: 1
								})
							])], 2)], 2),
							(0, vue.createCommentVNode)(" CANVAS "),
							(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("canvas")) }, [loadError.value && _ctx.$slots["viewer-error"] ? (0, vue.renderSlot)(_ctx.$slots, "viewer-error", {
								key: 0,
								activeIndex: activeIndex.value,
								src: currentImg.value
							}) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("img", {
								ref_key: "imgRef",
								ref: imgRef,
								key: currentImg.value,
								src: currentImg.value,
								style: (0, vue.normalizeStyle)(imgStyle.value),
								class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("img")),
								crossorigin: __props.crossorigin,
								onLoad: handleImgLoad,
								onError: handleImgError,
								onMousedown: handleMouseDown,
								onTouchstart: handleTouchStart
							}, null, 46, _hoisted_1))], 2),
							(0, vue.renderSlot)(_ctx.$slots, "default")
						]),
						_: 3
					}, 8, ["focus-trap-el"])], 6)]),
					_: 3
				})]),
				_: 3
			}, 8, ["disabled"]);
		};
	}
});

//#endregion
exports.default = image_viewer_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=image-viewer.vue_vue_type_script_setup_true_lang.js.map
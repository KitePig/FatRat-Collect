import { EVENT_CODE } from "../../../constants/aria.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { keysOf } from "../../../utils/objects.mjs";
import { ElTeleport } from "../../teleport/index.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useLockscreen } from "../../../hooks/use-lockscreen/index.mjs";
import { useZIndex } from "../../../hooks/use-z-index/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import focus_trap_default from "../../focus-trap/index.mjs";
import { imageViewerEmits, imageViewerProps } from "./image-viewer.mjs";
import { clamp, useEventListener } from "@vueuse/core";
import { throttle } from "lodash-unified";
import { ArrowLeft, ArrowRight, Close, FullScreen, RefreshLeft, RefreshRight, ScaleToOriginal, ZoomIn, ZoomOut } from "@element-plus/icons-vue";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, effectScope, markRaw, nextTick, normalizeClass, normalizeStyle, onMounted, openBlock, ref, renderSlot, resolveDynamicComponent, shallowRef, toDisplayString, unref, watch, withCtx, withModifiers } from "vue";

//#region ../../packages/components/image-viewer/src/image-viewer.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["src", "crossorigin"];
var image_viewer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElImageViewer",
	__name: "image-viewer",
	props: imageViewerProps,
	emits: imageViewerEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const modes = {
			CONTAIN: {
				name: "contain",
				icon: markRaw(FullScreen)
			},
			ORIGINAL: {
				name: "original",
				icon: markRaw(ScaleToOriginal)
			}
		};
		const props = __props;
		const emit = __emit;
		let stopWheelListener;
		const { t } = useLocale();
		const ns = useNamespace("image-viewer");
		const { nextZIndex } = useZIndex();
		const wrapper = ref();
		const imgRef = ref();
		const scopeEventListener = effectScope();
		const scaleClamped = computed(() => {
			const { scale, minScale, maxScale } = props;
			return clamp(scale, minScale, maxScale);
		});
		const loading = ref(true);
		const loadError = ref(false);
		const visible = ref(false);
		const activeIndex = ref(props.initialIndex);
		const mode = shallowRef(modes.CONTAIN);
		const transform = ref({
			scale: scaleClamped.value,
			deg: 0,
			offsetX: 0,
			offsetY: 0,
			enableTransition: false
		});
		const zIndex = ref(props.zIndex ?? nextZIndex());
		useLockscreen(visible, { ns });
		const isSingle = computed(() => {
			const { urlList } = props;
			return urlList.length <= 1;
		});
		const isFirst = computed(() => activeIndex.value === 0);
		const isLast = computed(() => activeIndex.value === props.urlList.length - 1);
		const currentImg = computed(() => props.urlList[activeIndex.value]);
		const arrowPrevKls = computed(() => [
			ns.e("btn"),
			ns.e("prev"),
			ns.is("disabled", !props.infinite && isFirst.value)
		]);
		const arrowNextKls = computed(() => [
			ns.e("btn"),
			ns.e("next"),
			ns.is("disabled", !props.infinite && isLast.value)
		]);
		const imgStyle = computed(() => {
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
		const progress = computed(() => `${activeIndex.value + 1} / ${props.urlList.length}`);
		function hide() {
			unregisterEventListener();
			stopWheelListener?.();
			visible.value = false;
			emit("close");
		}
		function registerEventListener() {
			const keydownHandler = throttle((e) => {
				switch (getEventCode(e)) {
					case EVENT_CODE.esc:
						props.closeOnPressEscape && hide();
						break;
					case EVENT_CODE.space:
						toggleMode();
						break;
					case EVENT_CODE.left:
						prev();
						break;
					case EVENT_CODE.up:
						handleActions("zoomIn");
						break;
					case EVENT_CODE.right:
						next();
						break;
					case EVENT_CODE.down:
						handleActions("zoomOut");
						break;
				}
			});
			const mousewheelHandler = throttle((e) => {
				handleActions((e.deltaY || e.deltaX) < 0 ? "zoomIn" : "zoomOut", {
					zoomRate: props.zoomRate,
					enableTransition: false
				});
			});
			scopeEventListener.run(() => {
				useEventListener(document, "keydown", keydownHandler);
				useEventListener(wrapper, "wheel", mousewheelHandler);
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
			const dragHandler = throttle((ev) => {
				transform.value = {
					...transform.value,
					offsetX: offsetX + ev.pageX - startX,
					offsetY: offsetY + ev.pageY - startY
				};
			});
			const removeMousemove = useEventListener(document, "mousemove", dragHandler);
			const removeMouseup = useEventListener(document, "mouseup", () => {
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
			const dragHandler = throttle((ev) => {
				const targetTouch = ev.touches[0];
				transform.value = {
					...transform.value,
					offsetX: offsetX + targetTouch.pageX - startX,
					offsetY: offsetY + targetTouch.pageY - startY
				};
			});
			const removeTouchmove = useEventListener(document, "touchmove", dragHandler);
			const removeTouchend = useEventListener(document, "touchend", () => {
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
			const modeNames = keysOf(modes);
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
		watch(() => scaleClamped.value, (val) => {
			transform.value.scale = val;
		});
		watch(currentImg, () => {
			nextTick(() => {
				if (!imgRef.value?.complete) loading.value = true;
			});
		});
		watch(activeIndex, (val) => {
			reset();
			emit("switch", val);
		});
		onMounted(() => {
			visible.value = true;
			registerEventListener();
			stopWheelListener = useEventListener("wheel", wheelHandler, { passive: false });
		});
		__expose({ setActiveItem });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ElTeleport), {
				to: "body",
				disabled: !__props.teleported
			}, {
				default: withCtx(() => [createVNode(Transition, {
					name: "viewer-fade",
					appear: ""
				}, {
					default: withCtx(() => [createElementVNode("div", {
						ref_key: "wrapper",
						ref: wrapper,
						tabindex: -1,
						class: normalizeClass(unref(ns).e("wrapper")),
						style: normalizeStyle({ zIndex: zIndex.value })
					}, [createVNode(unref(focus_trap_default), {
						loop: "",
						trapped: "",
						"focus-trap-el": wrapper.value,
						"focus-start-el": "container",
						onFocusoutPrevented,
						onReleaseRequested: onCloseRequested
					}, {
						default: withCtx(() => [
							createElementVNode("div", {
								class: normalizeClass(unref(ns).e("mask")),
								onClick: _cache[0] || (_cache[0] = withModifiers(($event) => __props.hideOnClickModal && hide(), ["self"]))
							}, null, 2),
							createCommentVNode(" CLOSE "),
							createElementVNode("span", {
								class: normalizeClass([unref(ns).e("btn"), unref(ns).e("close")]),
								onClick: hide
							}, [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(Close))]),
								_: 1
							})], 2),
							createCommentVNode(" ARROW "),
							!isSingle.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createElementVNode("span", {
								class: normalizeClass(arrowPrevKls.value),
								onClick: prev
							}, [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(ArrowLeft))]),
								_: 1
							})], 2), createElementVNode("span", {
								class: normalizeClass(arrowNextKls.value),
								onClick: next
							}, [createVNode(unref(ElIcon), null, {
								default: withCtx(() => [createVNode(unref(ArrowRight))]),
								_: 1
							})], 2)], 64)) : createCommentVNode("v-if", true),
							_ctx.$slots.progress || __props.showProgress ? (openBlock(), createElementBlock("div", {
								key: 1,
								class: normalizeClass([unref(ns).e("btn"), unref(ns).e("progress")])
							}, [renderSlot(_ctx.$slots, "progress", {
								activeIndex: activeIndex.value,
								total: __props.urlList.length
							}, () => [createTextVNode(toDisplayString(progress.value), 1)])], 2)) : createCommentVNode("v-if", true),
							createCommentVNode(" ACTIONS "),
							createElementVNode("div", { class: normalizeClass([unref(ns).e("btn"), unref(ns).e("actions")]) }, [createElementVNode("div", { class: normalizeClass(unref(ns).e("actions__inner")) }, [renderSlot(_ctx.$slots, "toolbar", {
								actions: handleActions,
								prev,
								next,
								reset: toggleMode,
								activeIndex: activeIndex.value,
								setActiveItem
							}, () => [
								createVNode(unref(ElIcon), { onClick: _cache[1] || (_cache[1] = ($event) => handleActions("zoomOut")) }, {
									default: withCtx(() => [createVNode(unref(ZoomOut))]),
									_: 1
								}),
								createVNode(unref(ElIcon), { onClick: _cache[2] || (_cache[2] = ($event) => handleActions("zoomIn")) }, {
									default: withCtx(() => [createVNode(unref(ZoomIn))]),
									_: 1
								}),
								createElementVNode("i", { class: normalizeClass(unref(ns).e("actions__divider")) }, null, 2),
								createVNode(unref(ElIcon), { onClick: toggleMode }, {
									default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(mode.value.icon)))]),
									_: 1
								}),
								createElementVNode("i", { class: normalizeClass(unref(ns).e("actions__divider")) }, null, 2),
								createVNode(unref(ElIcon), { onClick: _cache[3] || (_cache[3] = ($event) => handleActions("anticlockwise")) }, {
									default: withCtx(() => [createVNode(unref(RefreshLeft))]),
									_: 1
								}),
								createVNode(unref(ElIcon), { onClick: _cache[4] || (_cache[4] = ($event) => handleActions("clockwise")) }, {
									default: withCtx(() => [createVNode(unref(RefreshRight))]),
									_: 1
								})
							])], 2)], 2),
							createCommentVNode(" CANVAS "),
							createElementVNode("div", { class: normalizeClass(unref(ns).e("canvas")) }, [loadError.value && _ctx.$slots["viewer-error"] ? renderSlot(_ctx.$slots, "viewer-error", {
								key: 0,
								activeIndex: activeIndex.value,
								src: currentImg.value
							}) : (openBlock(), createElementBlock("img", {
								ref_key: "imgRef",
								ref: imgRef,
								key: currentImg.value,
								src: currentImg.value,
								style: normalizeStyle(imgStyle.value),
								class: normalizeClass(unref(ns).e("img")),
								crossorigin: __props.crossorigin,
								onLoad: handleImgLoad,
								onError: handleImgError,
								onMousedown: handleMouseDown,
								onTouchstart: handleTouchStart
							}, null, 46, _hoisted_1))], 2),
							renderSlot(_ctx.$slots, "default")
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
export { image_viewer_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=image-viewer.vue_vue_type_script_setup_true_lang.mjs.map
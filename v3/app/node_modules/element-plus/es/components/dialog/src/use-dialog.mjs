import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isClient as isClient$1 } from "../../../utils/browser.mjs";
import { isArray, isFunction, isObject } from "../../../utils/types.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { addUnit } from "../../../utils/dom/style.mjs";
import { defaultNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useLockscreen } from "../../../hooks/use-lockscreen/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { useZIndex } from "../../../hooks/use-z-index/index.mjs";
import { useGlobalConfig } from "../../config-provider/src/hooks/use-global-config.mjs";
import { DEFAULT_DIALOG_TRANSITION } from "./constants.mjs";
import { useTimeoutFn } from "@vueuse/core";
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from "vue";

//#region ../../packages/components/dialog/src/use-dialog.ts
const COMPONENT_NAME = "ElDialog";
const useDialog = (props, targetRef) => {
	const emit = getCurrentInstance().emit;
	const { nextZIndex } = useZIndex();
	let lastPosition = "";
	const titleId = useId();
	const bodyId = useId();
	const visible = ref(false);
	const closed = ref(false);
	const rendered = ref(false);
	const zIndex = ref(props.zIndex ?? nextZIndex());
	const closing = ref(false);
	let openTimer = void 0;
	let closeTimer = void 0;
	const config = useGlobalConfig();
	const namespace = computed(() => config.value?.namespace ?? defaultNamespace);
	const globalConfig = computed(() => config.value?.dialog);
	const style = computed(() => {
		const style = {};
		const varPrefix = `--${namespace.value}-dialog`;
		if (!props.fullscreen) {
			if (props.top) style[`${varPrefix}-margin-top`] = props.top;
			const width = addUnit(props.width);
			if (width) style[`${varPrefix}-width`] = width;
		}
		return style;
	});
	const _draggable = computed(() => (props.draggable ?? globalConfig.value?.draggable ?? false) && !props.fullscreen);
	const _alignCenter = computed(() => props.alignCenter ?? globalConfig.value?.alignCenter ?? false);
	const _overflow = computed(() => props.overflow ?? globalConfig.value?.overflow ?? false);
	const penetrable = computed(() => props.modalPenetrable && !props.modal && !props.fullscreen);
	const overlayDialogStyle = computed(() => {
		if (_alignCenter.value) return { display: "flex" };
		return {};
	});
	const transitionConfig = computed(() => {
		const transition = props.transition ?? globalConfig.value?.transition ?? DEFAULT_DIALOG_TRANSITION;
		const baseConfig = {
			name: transition,
			onAfterEnter: afterEnter,
			onBeforeLeave: beforeLeave,
			onAfterLeave: afterLeave
		};
		if (isObject(transition)) {
			const config = { ...transition };
			const _mergeHook = (userHook, defaultHook) => {
				return (el) => {
					if (isArray(userHook)) userHook.forEach((fn) => {
						if (isFunction(fn)) fn(el);
					});
					else if (isFunction(userHook)) userHook(el);
					defaultHook();
				};
			};
			config.onAfterEnter = _mergeHook(config.onAfterEnter, afterEnter);
			config.onBeforeLeave = _mergeHook(config.onBeforeLeave, beforeLeave);
			config.onAfterLeave = _mergeHook(config.onAfterLeave, afterLeave);
			if (!config.name) {
				config.name = DEFAULT_DIALOG_TRANSITION;
				debugWarn(COMPONENT_NAME, `transition.name is missing when using object syntax, fallback to '${DEFAULT_DIALOG_TRANSITION}'`);
			}
			return config;
		}
		return baseConfig;
	});
	function afterEnter() {
		emit("opened");
	}
	function afterLeave() {
		emit("closed");
		emit(UPDATE_MODEL_EVENT, false);
		if (props.destroyOnClose) rendered.value = false;
		closing.value = false;
	}
	function beforeLeave() {
		closing.value = true;
		emit("close");
	}
	function open() {
		closeTimer?.();
		openTimer?.();
		if (props.openDelay && props.openDelay > 0) ({stop: openTimer} = useTimeoutFn(() => doOpen(), props.openDelay));
		else doOpen();
	}
	function close() {
		openTimer?.();
		closeTimer?.();
		if (props.closeDelay && props.closeDelay > 0) ({stop: closeTimer} = useTimeoutFn(() => doClose(), props.closeDelay));
		else doClose();
	}
	function handleClose() {
		function hide(shouldCancel) {
			if (shouldCancel) return;
			closed.value = true;
			visible.value = false;
		}
		if (props.beforeClose) props.beforeClose(hide);
		else close();
	}
	function onModalClick() {
		if (props.closeOnClickModal) handleClose();
	}
	function doOpen() {
		if (!isClient$1) return;
		visible.value = true;
	}
	function doClose() {
		visible.value = false;
	}
	function onOpenAutoFocus() {
		emit("openAutoFocus");
	}
	function onCloseAutoFocus() {
		emit("closeAutoFocus");
	}
	function onFocusoutPrevented(event) {
		if (event.detail?.focusReason === "pointer") event.preventDefault();
	}
	if (props.lockScroll) useLockscreen(visible);
	function onCloseRequested() {
		if (props.closeOnPressEscape) handleClose();
	}
	function bringToFront() {
		if (!visible.value || !penetrable.value || props.zIndex !== void 0) return;
		zIndex.value = nextZIndex();
	}
	watch(() => props.zIndex, () => {
		zIndex.value = props.zIndex ?? nextZIndex();
	});
	watch(() => props.modelValue, (val) => {
		if (val) {
			closed.value = false;
			closing.value = false;
			open();
			rendered.value = true;
			zIndex.value = props.zIndex ?? nextZIndex();
			nextTick(() => {
				emit("open");
				if (targetRef.value) {
					targetRef.value.parentElement.scrollTop = 0;
					targetRef.value.parentElement.scrollLeft = 0;
					targetRef.value.scrollTop = 0;
				}
			});
		} else if (visible.value) close();
	});
	watch(() => props.fullscreen, (val) => {
		if (!targetRef.value) return;
		if (val) {
			lastPosition = targetRef.value.style.transform;
			targetRef.value.style.transform = "";
		} else targetRef.value.style.transform = lastPosition;
	});
	onMounted(() => {
		if (props.modelValue) {
			visible.value = true;
			rendered.value = true;
			open();
		}
	});
	return {
		afterEnter,
		afterLeave,
		beforeLeave,
		handleClose,
		onModalClick,
		close,
		doClose,
		onOpenAutoFocus,
		onCloseAutoFocus,
		onCloseRequested,
		onFocusoutPrevented,
		bringToFront,
		titleId,
		bodyId,
		closed,
		style,
		overlayDialogStyle,
		rendered,
		visible,
		zIndex,
		transitionConfig,
		_draggable,
		_alignCenter,
		_overflow,
		closing,
		penetrable
	};
};

//#endregion
export { useDialog };
//# sourceMappingURL=use-dialog.mjs.map
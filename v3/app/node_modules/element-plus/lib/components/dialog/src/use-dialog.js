Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_error = require('../../../utils/error.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-lockscreen/index.js');
const require_index$2 = require('../../../hooks/use-id/index.js');
const require_index$3 = require('../../../hooks/use-z-index/index.js');
const require_use_global_config = require('../../config-provider/src/hooks/use-global-config.js');
const require_constants = require('./constants.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/dialog/src/use-dialog.ts
const COMPONENT_NAME = "ElDialog";
const useDialog = (props, targetRef) => {
	const emit = (0, vue.getCurrentInstance)().emit;
	const { nextZIndex } = require_index$3.useZIndex();
	let lastPosition = "";
	const titleId = require_index$2.useId();
	const bodyId = require_index$2.useId();
	const visible = (0, vue.ref)(false);
	const closed = (0, vue.ref)(false);
	const rendered = (0, vue.ref)(false);
	const zIndex = (0, vue.ref)(props.zIndex ?? nextZIndex());
	const closing = (0, vue.ref)(false);
	let openTimer = void 0;
	let closeTimer = void 0;
	const config = require_use_global_config.useGlobalConfig();
	const namespace = (0, vue.computed)(() => config.value?.namespace ?? require_index.defaultNamespace);
	const globalConfig = (0, vue.computed)(() => config.value?.dialog);
	const style = (0, vue.computed)(() => {
		const style = {};
		const varPrefix = `--${namespace.value}-dialog`;
		if (!props.fullscreen) {
			if (props.top) style[`${varPrefix}-margin-top`] = props.top;
			const width = require_style.addUnit(props.width);
			if (width) style[`${varPrefix}-width`] = width;
		}
		return style;
	});
	const _draggable = (0, vue.computed)(() => (props.draggable ?? globalConfig.value?.draggable ?? false) && !props.fullscreen);
	const _alignCenter = (0, vue.computed)(() => props.alignCenter ?? globalConfig.value?.alignCenter ?? false);
	const _overflow = (0, vue.computed)(() => props.overflow ?? globalConfig.value?.overflow ?? false);
	const penetrable = (0, vue.computed)(() => props.modalPenetrable && !props.modal && !props.fullscreen);
	const overlayDialogStyle = (0, vue.computed)(() => {
		if (_alignCenter.value) return { display: "flex" };
		return {};
	});
	const transitionConfig = (0, vue.computed)(() => {
		const transition = props.transition ?? globalConfig.value?.transition ?? require_constants.DEFAULT_DIALOG_TRANSITION;
		const baseConfig = {
			name: transition,
			onAfterEnter: afterEnter,
			onBeforeLeave: beforeLeave,
			onAfterLeave: afterLeave
		};
		if ((0, _vue_shared.isObject)(transition)) {
			const config = { ...transition };
			const _mergeHook = (userHook, defaultHook) => {
				return (el) => {
					if ((0, _vue_shared.isArray)(userHook)) userHook.forEach((fn) => {
						if ((0, _vue_shared.isFunction)(fn)) fn(el);
					});
					else if ((0, _vue_shared.isFunction)(userHook)) userHook(el);
					defaultHook();
				};
			};
			config.onAfterEnter = _mergeHook(config.onAfterEnter, afterEnter);
			config.onBeforeLeave = _mergeHook(config.onBeforeLeave, beforeLeave);
			config.onAfterLeave = _mergeHook(config.onAfterLeave, afterLeave);
			if (!config.name) {
				config.name = require_constants.DEFAULT_DIALOG_TRANSITION;
				require_error.debugWarn(COMPONENT_NAME, `transition.name is missing when using object syntax, fallback to '${require_constants.DEFAULT_DIALOG_TRANSITION}'`);
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
		emit(require_event.UPDATE_MODEL_EVENT, false);
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
		if (props.openDelay && props.openDelay > 0) ({stop: openTimer} = (0, _vueuse_core.useTimeoutFn)(() => doOpen(), props.openDelay));
		else doOpen();
	}
	function close() {
		openTimer?.();
		closeTimer?.();
		if (props.closeDelay && props.closeDelay > 0) ({stop: closeTimer} = (0, _vueuse_core.useTimeoutFn)(() => doClose(), props.closeDelay));
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
		if (!_vueuse_core.isClient) return;
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
	if (props.lockScroll) require_index$1.useLockscreen(visible);
	function onCloseRequested() {
		if (props.closeOnPressEscape) handleClose();
	}
	function bringToFront() {
		if (!visible.value || !penetrable.value || props.zIndex !== void 0) return;
		zIndex.value = nextZIndex();
	}
	(0, vue.watch)(() => props.zIndex, () => {
		zIndex.value = props.zIndex ?? nextZIndex();
	});
	(0, vue.watch)(() => props.modelValue, (val) => {
		if (val) {
			closed.value = false;
			closing.value = false;
			open();
			rendered.value = true;
			zIndex.value = props.zIndex ?? nextZIndex();
			(0, vue.nextTick)(() => {
				emit("open");
				if (targetRef.value) {
					targetRef.value.parentElement.scrollTop = 0;
					targetRef.value.parentElement.scrollLeft = 0;
					targetRef.value.scrollTop = 0;
				}
			});
		} else if (visible.value) close();
	});
	(0, vue.watch)(() => props.fullscreen, (val) => {
		if (!targetRef.value) return;
		if (val) {
			lastPosition = targetRef.value.style.transform;
			targetRef.value.style.transform = "";
		} else targetRef.value.style.transform = lastPosition;
	});
	(0, vue.onMounted)(() => {
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
exports.useDialog = useDialog;
//# sourceMappingURL=use-dialog.js.map
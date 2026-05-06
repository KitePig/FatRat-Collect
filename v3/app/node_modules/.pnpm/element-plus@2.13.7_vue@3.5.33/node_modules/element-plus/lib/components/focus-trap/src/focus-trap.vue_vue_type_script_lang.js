const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_index = require('../../../hooks/use-escape-keydown/index.js');
const require_tokens = require('./tokens.js');
const require_utils = require('./utils.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/focus-trap/src/focus-trap.vue?vue&type=script&lang.ts
var focus_trap_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElFocusTrap",
	inheritAttrs: false,
	props: {
		loop: Boolean,
		trapped: Boolean,
		focusTrapEl: Object,
		focusStartEl: {
			type: [Object, String],
			default: "first"
		}
	},
	emits: [
		require_tokens.ON_TRAP_FOCUS_EVT,
		require_tokens.ON_RELEASE_FOCUS_EVT,
		"focusin",
		"focusout",
		"focusout-prevented",
		"release-requested"
	],
	setup(props, { emit }) {
		const forwardRef = (0, vue.ref)();
		let lastFocusBeforeTrapped;
		let lastFocusAfterTrapped;
		const { focusReason } = require_utils.useFocusReason();
		require_index.useEscapeKeydown((event) => {
			if (props.trapped && !focusLayer.paused) emit("release-requested", event);
		});
		const focusLayer = {
			paused: false,
			pause() {
				this.paused = true;
			},
			resume() {
				this.paused = false;
			}
		};
		const onKeydown = (e) => {
			if (!props.loop && !props.trapped) return;
			if (focusLayer.paused) return;
			const { altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
			const { loop } = props;
			const isTabbing = require_event.getEventCode(e) === require_aria.EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
			const currentFocusingEl = document.activeElement;
			if (isTabbing && currentFocusingEl) {
				const container = currentTarget;
				const [first, last] = require_utils.getEdges(container);
				if (!(first && last)) {
					if (currentFocusingEl === container) {
						const focusoutPreventedEvent = require_utils.createFocusOutPreventedEvent({ focusReason: focusReason.value });
						emit("focusout-prevented", focusoutPreventedEvent);
						if (!focusoutPreventedEvent.defaultPrevented) e.preventDefault();
					}
				} else if (!shiftKey && currentFocusingEl === last) {
					const focusoutPreventedEvent = require_utils.createFocusOutPreventedEvent({ focusReason: focusReason.value });
					emit("focusout-prevented", focusoutPreventedEvent);
					if (!focusoutPreventedEvent.defaultPrevented) {
						e.preventDefault();
						if (loop) require_utils.tryFocus(first, true);
					}
				} else if (shiftKey && [first, container].includes(currentFocusingEl)) {
					const focusoutPreventedEvent = require_utils.createFocusOutPreventedEvent({ focusReason: focusReason.value });
					emit("focusout-prevented", focusoutPreventedEvent);
					if (!focusoutPreventedEvent.defaultPrevented) {
						e.preventDefault();
						if (loop) require_utils.tryFocus(last, true);
					}
				}
			}
		};
		(0, vue.provide)(require_tokens.FOCUS_TRAP_INJECTION_KEY, {
			focusTrapRef: forwardRef,
			onKeydown
		});
		(0, vue.watch)(() => props.focusTrapEl, (focusTrapEl) => {
			if (focusTrapEl) forwardRef.value = focusTrapEl;
		}, { immediate: true });
		(0, vue.watch)([forwardRef], ([forwardRef], [oldForwardRef]) => {
			if (forwardRef) {
				forwardRef.addEventListener("keydown", onKeydown);
				forwardRef.addEventListener("focusin", onFocusIn);
				forwardRef.addEventListener("focusout", onFocusOut);
			}
			if (oldForwardRef) {
				oldForwardRef.removeEventListener("keydown", onKeydown);
				oldForwardRef.removeEventListener("focusin", onFocusIn);
				oldForwardRef.removeEventListener("focusout", onFocusOut);
			}
		});
		const trapOnFocus = (e) => {
			emit(require_tokens.ON_TRAP_FOCUS_EVT, e);
		};
		const releaseOnFocus = (e) => emit(require_tokens.ON_RELEASE_FOCUS_EVT, e);
		const onFocusIn = (e) => {
			const trapContainer = (0, vue.unref)(forwardRef);
			if (!trapContainer) return;
			const target = e.target;
			const relatedTarget = e.relatedTarget;
			const isFocusedInTrap = target && trapContainer.contains(target);
			if (!props.trapped) {
				if (!(relatedTarget && trapContainer.contains(relatedTarget))) lastFocusBeforeTrapped = relatedTarget;
			}
			if (isFocusedInTrap) emit("focusin", e);
			if (focusLayer.paused) return;
			if (props.trapped) if (isFocusedInTrap) lastFocusAfterTrapped = target;
			else require_utils.tryFocus(lastFocusAfterTrapped, true);
		};
		const onFocusOut = (e) => {
			const trapContainer = (0, vue.unref)(forwardRef);
			if (focusLayer.paused || !trapContainer) return;
			if (props.trapped) {
				const relatedTarget = e.relatedTarget;
				if (!(0, lodash_unified.isNil)(relatedTarget) && !trapContainer.contains(relatedTarget)) setTimeout(() => {
					if (!focusLayer.paused && props.trapped) {
						const focusoutPreventedEvent = require_utils.createFocusOutPreventedEvent({ focusReason: focusReason.value });
						emit("focusout-prevented", focusoutPreventedEvent);
						if (!focusoutPreventedEvent.defaultPrevented) require_utils.tryFocus(lastFocusAfterTrapped, true);
					}
				}, 0);
			} else {
				const target = e.target;
				if (!(target && trapContainer.contains(target))) emit("focusout", e);
			}
		};
		async function startTrap() {
			await (0, vue.nextTick)();
			const trapContainer = (0, vue.unref)(forwardRef);
			if (trapContainer) {
				require_utils.focusableStack.push(focusLayer);
				const prevFocusedElement = trapContainer.contains(document.activeElement) ? lastFocusBeforeTrapped : document.activeElement;
				lastFocusBeforeTrapped = prevFocusedElement;
				if (!trapContainer.contains(prevFocusedElement)) {
					const focusEvent = new Event(require_tokens.FOCUS_AFTER_TRAPPED, require_tokens.FOCUS_AFTER_TRAPPED_OPTS);
					trapContainer.addEventListener(require_tokens.FOCUS_AFTER_TRAPPED, trapOnFocus);
					trapContainer.dispatchEvent(focusEvent);
					if (!focusEvent.defaultPrevented) (0, vue.nextTick)(() => {
						let focusStartEl = props.focusStartEl;
						if (!(0, _vue_shared.isString)(focusStartEl)) {
							require_utils.tryFocus(focusStartEl);
							if (document.activeElement !== focusStartEl) focusStartEl = "first";
						}
						if (focusStartEl === "first") require_utils.focusFirstDescendant(require_utils.obtainAllFocusableElements(trapContainer), true);
						if (document.activeElement === prevFocusedElement || focusStartEl === "container") require_utils.tryFocus(trapContainer);
					});
				}
			}
		}
		function stopTrap() {
			const trapContainer = (0, vue.unref)(forwardRef);
			if (trapContainer) {
				trapContainer.removeEventListener(require_tokens.FOCUS_AFTER_TRAPPED, trapOnFocus);
				const releasedEvent = new CustomEvent(require_tokens.FOCUS_AFTER_RELEASED, {
					...require_tokens.FOCUS_AFTER_TRAPPED_OPTS,
					detail: { focusReason: focusReason.value }
				});
				trapContainer.addEventListener(require_tokens.FOCUS_AFTER_RELEASED, releaseOnFocus);
				trapContainer.dispatchEvent(releasedEvent);
				if (!releasedEvent.defaultPrevented && (focusReason.value == "keyboard" || !require_utils.isFocusCausedByUserEvent() || trapContainer.contains(document.activeElement))) require_utils.tryFocus(lastFocusBeforeTrapped ?? document.body);
				trapContainer.removeEventListener(require_tokens.FOCUS_AFTER_RELEASED, releaseOnFocus);
				require_utils.focusableStack.remove(focusLayer);
				lastFocusBeforeTrapped = null;
				lastFocusAfterTrapped = null;
			}
		}
		(0, vue.onMounted)(() => {
			if (props.trapped) startTrap();
			(0, vue.watch)(() => props.trapped, (trapped) => {
				if (trapped) startTrap();
				else stopTrap();
			});
		});
		(0, vue.onBeforeUnmount)(() => {
			if (props.trapped) stopTrap();
			if (forwardRef.value) {
				forwardRef.value.removeEventListener("keydown", onKeydown);
				forwardRef.value.removeEventListener("focusin", onFocusIn);
				forwardRef.value.removeEventListener("focusout", onFocusOut);
				forwardRef.value = void 0;
			}
			lastFocusBeforeTrapped = null;
			lastFocusAfterTrapped = null;
		});
		return { onKeydown };
	}
});

//#endregion
exports.default = focus_trap_vue_vue_type_script_lang_default;
//# sourceMappingURL=focus-trap.vue_vue_type_script_lang.js.map
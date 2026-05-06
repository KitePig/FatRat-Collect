import { EVENT_CODE } from "../../../constants/aria.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isString } from "../../../utils/types.mjs";
import { useEscapeKeydown } from "../../../hooks/use-escape-keydown/index.mjs";
import { FOCUS_AFTER_RELEASED, FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS, FOCUS_TRAP_INJECTION_KEY, ON_RELEASE_FOCUS_EVT, ON_TRAP_FOCUS_EVT } from "./tokens.mjs";
import { createFocusOutPreventedEvent, focusFirstDescendant, focusableStack, getEdges, isFocusCausedByUserEvent, obtainAllFocusableElements, tryFocus, useFocusReason } from "./utils.mjs";
import { isNil } from "lodash-unified";
import { defineComponent, nextTick, onBeforeUnmount, onMounted, provide, ref, unref, watch } from "vue";

//#region ../../packages/components/focus-trap/src/focus-trap.vue?vue&type=script&lang.ts
var focus_trap_vue_vue_type_script_lang_default = defineComponent({
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
		ON_TRAP_FOCUS_EVT,
		ON_RELEASE_FOCUS_EVT,
		"focusin",
		"focusout",
		"focusout-prevented",
		"release-requested"
	],
	setup(props, { emit }) {
		const forwardRef = ref();
		let lastFocusBeforeTrapped;
		let lastFocusAfterTrapped;
		const { focusReason } = useFocusReason();
		useEscapeKeydown((event) => {
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
			const isTabbing = getEventCode(e) === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
			const currentFocusingEl = document.activeElement;
			if (isTabbing && currentFocusingEl) {
				const container = currentTarget;
				const [first, last] = getEdges(container);
				if (!(first && last)) {
					if (currentFocusingEl === container) {
						const focusoutPreventedEvent = createFocusOutPreventedEvent({ focusReason: focusReason.value });
						emit("focusout-prevented", focusoutPreventedEvent);
						if (!focusoutPreventedEvent.defaultPrevented) e.preventDefault();
					}
				} else if (!shiftKey && currentFocusingEl === last) {
					const focusoutPreventedEvent = createFocusOutPreventedEvent({ focusReason: focusReason.value });
					emit("focusout-prevented", focusoutPreventedEvent);
					if (!focusoutPreventedEvent.defaultPrevented) {
						e.preventDefault();
						if (loop) tryFocus(first, true);
					}
				} else if (shiftKey && [first, container].includes(currentFocusingEl)) {
					const focusoutPreventedEvent = createFocusOutPreventedEvent({ focusReason: focusReason.value });
					emit("focusout-prevented", focusoutPreventedEvent);
					if (!focusoutPreventedEvent.defaultPrevented) {
						e.preventDefault();
						if (loop) tryFocus(last, true);
					}
				}
			}
		};
		provide(FOCUS_TRAP_INJECTION_KEY, {
			focusTrapRef: forwardRef,
			onKeydown
		});
		watch(() => props.focusTrapEl, (focusTrapEl) => {
			if (focusTrapEl) forwardRef.value = focusTrapEl;
		}, { immediate: true });
		watch([forwardRef], ([forwardRef], [oldForwardRef]) => {
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
			emit(ON_TRAP_FOCUS_EVT, e);
		};
		const releaseOnFocus = (e) => emit(ON_RELEASE_FOCUS_EVT, e);
		const onFocusIn = (e) => {
			const trapContainer = unref(forwardRef);
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
			else tryFocus(lastFocusAfterTrapped, true);
		};
		const onFocusOut = (e) => {
			const trapContainer = unref(forwardRef);
			if (focusLayer.paused || !trapContainer) return;
			if (props.trapped) {
				const relatedTarget = e.relatedTarget;
				if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) setTimeout(() => {
					if (!focusLayer.paused && props.trapped) {
						const focusoutPreventedEvent = createFocusOutPreventedEvent({ focusReason: focusReason.value });
						emit("focusout-prevented", focusoutPreventedEvent);
						if (!focusoutPreventedEvent.defaultPrevented) tryFocus(lastFocusAfterTrapped, true);
					}
				}, 0);
			} else {
				const target = e.target;
				if (!(target && trapContainer.contains(target))) emit("focusout", e);
			}
		};
		async function startTrap() {
			await nextTick();
			const trapContainer = unref(forwardRef);
			if (trapContainer) {
				focusableStack.push(focusLayer);
				const prevFocusedElement = trapContainer.contains(document.activeElement) ? lastFocusBeforeTrapped : document.activeElement;
				lastFocusBeforeTrapped = prevFocusedElement;
				if (!trapContainer.contains(prevFocusedElement)) {
					const focusEvent = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
					trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
					trapContainer.dispatchEvent(focusEvent);
					if (!focusEvent.defaultPrevented) nextTick(() => {
						let focusStartEl = props.focusStartEl;
						if (!isString(focusStartEl)) {
							tryFocus(focusStartEl);
							if (document.activeElement !== focusStartEl) focusStartEl = "first";
						}
						if (focusStartEl === "first") focusFirstDescendant(obtainAllFocusableElements(trapContainer), true);
						if (document.activeElement === prevFocusedElement || focusStartEl === "container") tryFocus(trapContainer);
					});
				}
			}
		}
		function stopTrap() {
			const trapContainer = unref(forwardRef);
			if (trapContainer) {
				trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
				const releasedEvent = new CustomEvent(FOCUS_AFTER_RELEASED, {
					...FOCUS_AFTER_TRAPPED_OPTS,
					detail: { focusReason: focusReason.value }
				});
				trapContainer.addEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
				trapContainer.dispatchEvent(releasedEvent);
				if (!releasedEvent.defaultPrevented && (focusReason.value == "keyboard" || !isFocusCausedByUserEvent() || trapContainer.contains(document.activeElement))) tryFocus(lastFocusBeforeTrapped ?? document.body);
				trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
				focusableStack.remove(focusLayer);
				lastFocusBeforeTrapped = null;
				lastFocusAfterTrapped = null;
			}
		}
		onMounted(() => {
			if (props.trapped) startTrap();
			watch(() => props.trapped, (trapped) => {
				if (trapped) startTrap();
				else stopTrap();
			});
		});
		onBeforeUnmount(() => {
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
export { focus_trap_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=focus-trap.vue_vue_type_script_lang.mjs.map
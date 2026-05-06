import { composeEventHandlers } from "../../../utils/dom/event.mjs";
import { ROVING_FOCUS_COLLECTION_INJECTION_KEY as COLLECTION_INJECTION_KEY, rovingFocusGroupProps } from "./roving-focus-group.mjs";
import { ROVING_FOCUS_GROUP_INJECTION_KEY } from "./tokens.mjs";
import { focusFirst, getFocusIntent, reorderArray } from "./utils.mjs";
import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, inject, nextTick, provide, readonly, ref, toRef, unref, watch } from "vue";

//#region ../../packages/components/roving-focus-group/src/roving-focus-group-impl.vue?vue&type=script&lang.ts
const CURRENT_TAB_ID_CHANGE_EVT = "currentTabIdChange";
const ENTRY_FOCUS_EVT = "rovingFocusGroup.entryFocus";
const EVT_OPTS = {
	bubbles: false,
	cancelable: true
};
var roving_focus_group_impl_vue_vue_type_script_lang_default = defineComponent({
	name: "ElRovingFocusGroupImpl",
	inheritAttrs: false,
	props: rovingFocusGroupProps,
	emits: [CURRENT_TAB_ID_CHANGE_EVT, "entryFocus"],
	setup(props, { emit }) {
		const currentTabbedId = ref((props.currentTabId || props.defaultCurrentTabId) ?? null);
		const isBackingOut = ref(false);
		const isClickFocus = ref(false);
		const rovingFocusGroupRef = ref();
		const { getItems } = inject(COLLECTION_INJECTION_KEY, void 0);
		const rovingFocusGroupRootStyle = computed(() => {
			return [{ outline: "none" }, props.style];
		});
		const onItemFocus = (tabbedId) => {
			emit(CURRENT_TAB_ID_CHANGE_EVT, tabbedId);
		};
		const onItemShiftTab = () => {
			isBackingOut.value = true;
		};
		const onMousedown = composeEventHandlers((e) => {
			props.onMousedown?.(e);
		}, () => {
			isClickFocus.value = true;
		});
		const onFocus = composeEventHandlers((e) => {
			props.onFocus?.(e);
		}, (e) => {
			const isKeyboardFocus = !unref(isClickFocus);
			const { target, currentTarget } = e;
			if (target === currentTarget && isKeyboardFocus && !unref(isBackingOut)) {
				const entryFocusEvt = new Event(ENTRY_FOCUS_EVT, EVT_OPTS);
				currentTarget?.dispatchEvent(entryFocusEvt);
				if (!entryFocusEvt.defaultPrevented) {
					const items = getItems().filter((item) => item.focusable);
					focusFirst([
						items.find((item) => item.active),
						items.find((item) => item.id === unref(currentTabbedId)),
						...items
					].filter(Boolean).map((item) => item.ref));
				}
			}
			isClickFocus.value = false;
		});
		const onBlur = composeEventHandlers((e) => {
			props.onBlur?.(e);
		}, () => {
			isBackingOut.value = false;
		});
		const handleEntryFocus = (...args) => {
			emit("entryFocus", ...args);
		};
		const onKeydown = (e) => {
			const focusIntent = getFocusIntent(e);
			if (focusIntent) {
				e.preventDefault();
				let elements = getItems().filter((item) => item.focusable).map((item) => item.ref);
				switch (focusIntent) {
					case "last":
						elements.reverse();
						break;
					case "prev":
					case "next": {
						if (focusIntent === "prev") elements.reverse();
						const currentIdx = elements.indexOf(e.currentTarget);
						elements = props.loop ? reorderArray(elements, currentIdx + 1) : elements.slice(currentIdx + 1);
						break;
					}
					default: break;
				}
				nextTick(() => {
					focusFirst(elements);
				});
			}
		};
		provide(ROVING_FOCUS_GROUP_INJECTION_KEY, {
			currentTabbedId: readonly(currentTabbedId),
			loop: toRef(props, "loop"),
			tabIndex: computed(() => {
				return unref(isBackingOut) ? -1 : 0;
			}),
			rovingFocusGroupRef,
			rovingFocusGroupRootStyle,
			orientation: toRef(props, "orientation"),
			dir: toRef(props, "dir"),
			onItemFocus,
			onItemShiftTab,
			onBlur,
			onFocus,
			onMousedown,
			onKeydown
		});
		watch(() => props.currentTabId, (val) => {
			currentTabbedId.value = val ?? null;
		});
		useEventListener(rovingFocusGroupRef, ENTRY_FOCUS_EVT, handleEntryFocus);
	}
});

//#endregion
export { roving_focus_group_impl_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=roving-focus-group-impl.vue_vue_type_script_lang.mjs.map
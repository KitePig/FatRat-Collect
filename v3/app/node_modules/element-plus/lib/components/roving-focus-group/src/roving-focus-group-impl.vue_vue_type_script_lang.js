const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../utils/dom/event.js');
const require_roving_focus_group = require('./roving-focus-group.js');
const require_tokens = require('./tokens.js');
const require_utils = require('./utils.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/roving-focus-group/src/roving-focus-group-impl.vue?vue&type=script&lang.ts
const CURRENT_TAB_ID_CHANGE_EVT = "currentTabIdChange";
const ENTRY_FOCUS_EVT = "rovingFocusGroup.entryFocus";
const EVT_OPTS = {
	bubbles: false,
	cancelable: true
};
var roving_focus_group_impl_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElRovingFocusGroupImpl",
	inheritAttrs: false,
	props: require_roving_focus_group.rovingFocusGroupProps,
	emits: [CURRENT_TAB_ID_CHANGE_EVT, "entryFocus"],
	setup(props, { emit }) {
		const currentTabbedId = (0, vue.ref)((props.currentTabId || props.defaultCurrentTabId) ?? null);
		const isBackingOut = (0, vue.ref)(false);
		const isClickFocus = (0, vue.ref)(false);
		const rovingFocusGroupRef = (0, vue.ref)();
		const { getItems } = (0, vue.inject)(require_roving_focus_group.ROVING_FOCUS_COLLECTION_INJECTION_KEY, void 0);
		const rovingFocusGroupRootStyle = (0, vue.computed)(() => {
			return [{ outline: "none" }, props.style];
		});
		const onItemFocus = (tabbedId) => {
			emit(CURRENT_TAB_ID_CHANGE_EVT, tabbedId);
		};
		const onItemShiftTab = () => {
			isBackingOut.value = true;
		};
		const onMousedown = require_event.composeEventHandlers((e) => {
			props.onMousedown?.(e);
		}, () => {
			isClickFocus.value = true;
		});
		const onFocus = require_event.composeEventHandlers((e) => {
			props.onFocus?.(e);
		}, (e) => {
			const isKeyboardFocus = !(0, vue.unref)(isClickFocus);
			const { target, currentTarget } = e;
			if (target === currentTarget && isKeyboardFocus && !(0, vue.unref)(isBackingOut)) {
				const entryFocusEvt = new Event(ENTRY_FOCUS_EVT, EVT_OPTS);
				currentTarget?.dispatchEvent(entryFocusEvt);
				if (!entryFocusEvt.defaultPrevented) {
					const items = getItems().filter((item) => item.focusable);
					require_utils.focusFirst([
						items.find((item) => item.active),
						items.find((item) => item.id === (0, vue.unref)(currentTabbedId)),
						...items
					].filter(Boolean).map((item) => item.ref));
				}
			}
			isClickFocus.value = false;
		});
		const onBlur = require_event.composeEventHandlers((e) => {
			props.onBlur?.(e);
		}, () => {
			isBackingOut.value = false;
		});
		const handleEntryFocus = (...args) => {
			emit("entryFocus", ...args);
		};
		const onKeydown = (e) => {
			const focusIntent = require_utils.getFocusIntent(e);
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
						elements = props.loop ? require_utils.reorderArray(elements, currentIdx + 1) : elements.slice(currentIdx + 1);
						break;
					}
					default: break;
				}
				(0, vue.nextTick)(() => {
					require_utils.focusFirst(elements);
				});
			}
		};
		(0, vue.provide)(require_tokens.ROVING_FOCUS_GROUP_INJECTION_KEY, {
			currentTabbedId: (0, vue.readonly)(currentTabbedId),
			loop: (0, vue.toRef)(props, "loop"),
			tabIndex: (0, vue.computed)(() => {
				return (0, vue.unref)(isBackingOut) ? -1 : 0;
			}),
			rovingFocusGroupRef,
			rovingFocusGroupRootStyle,
			orientation: (0, vue.toRef)(props, "orientation"),
			dir: (0, vue.toRef)(props, "dir"),
			onItemFocus,
			onItemShiftTab,
			onBlur,
			onFocus,
			onMousedown,
			onKeydown
		});
		(0, vue.watch)(() => props.currentTabId, (val) => {
			currentTabbedId.value = val ?? null;
		});
		(0, _vueuse_core.useEventListener)(rovingFocusGroupRef, ENTRY_FOCUS_EVT, handleEntryFocus);
	}
});

//#endregion
exports.default = roving_focus_group_impl_vue_vue_type_script_lang_default;
//# sourceMappingURL=roving-focus-group-impl.vue_vue_type_script_lang.js.map
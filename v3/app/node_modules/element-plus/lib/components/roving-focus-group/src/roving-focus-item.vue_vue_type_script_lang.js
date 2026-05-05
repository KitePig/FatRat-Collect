const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_index = require('../../../hooks/use-id/index.js');
const require_roving_focus_group = require('./roving-focus-group.js');
const require_tokens = require('./tokens.js');
let vue = require("vue");

//#region ../../packages/components/roving-focus-group/src/roving-focus-item.vue?vue&type=script&lang.ts
var roving_focus_item_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	components: { ElRovingFocusCollectionItem: require_roving_focus_group.ElCollectionItem },
	props: {
		focusable: {
			type: Boolean,
			default: true
		},
		active: Boolean
	},
	emits: [
		"mousedown",
		"focus",
		"keydown"
	],
	setup(props, { emit }) {
		const { currentTabbedId, onItemFocus, onItemShiftTab, onKeydown } = (0, vue.inject)(require_tokens.ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
		const id = require_index.useId();
		const rovingFocusGroupItemRef = (0, vue.ref)();
		const handleMousedown = require_event.composeEventHandlers((e) => {
			emit("mousedown", e);
		}, (e) => {
			if (!props.focusable) e.preventDefault();
			else onItemFocus((0, vue.unref)(id));
		});
		const handleFocus = require_event.composeEventHandlers((e) => {
			emit("focus", e);
		}, () => {
			onItemFocus((0, vue.unref)(id));
		});
		const handleKeydown = require_event.composeEventHandlers((e) => {
			emit("keydown", e);
		}, (e) => {
			const { shiftKey, target, currentTarget } = e;
			if (require_event.getEventCode(e) === require_aria.EVENT_CODE.tab && shiftKey) {
				onItemShiftTab();
				return;
			}
			if (target !== currentTarget) return;
			onKeydown(e);
		});
		const isCurrentTab = (0, vue.computed)(() => currentTabbedId.value === (0, vue.unref)(id));
		(0, vue.provide)(require_tokens.ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, {
			rovingFocusGroupItemRef,
			tabIndex: (0, vue.computed)(() => (0, vue.unref)(isCurrentTab) ? 0 : -1),
			handleMousedown,
			handleFocus,
			handleKeydown
		});
		return {
			id,
			handleKeydown,
			handleFocus,
			handleMousedown
		};
	}
});

//#endregion
exports.default = roving_focus_item_vue_vue_type_script_lang_default;
//# sourceMappingURL=roving-focus-item.vue_vue_type_script_lang.js.map
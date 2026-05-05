const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_refs = require('../../../utils/vue/refs.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_collection = require('../../collection/src/collection.js');
const require_roving_focus_group = require('../../roving-focus-group/src/roving-focus-group.js');
const require_tokens = require('../../roving-focus-group/src/tokens.js');
const require_dropdown = require('./dropdown.js');
const require_tokens$1 = require('./tokens.js');
let vue = require("vue");

//#region ../../packages/components/dropdown/src/dropdown-item-impl.vue?vue&type=script&lang.ts
var dropdown_item_impl_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "DropdownItemImpl",
	components: { ElIcon: require_index$1.ElIcon },
	props: require_dropdown.dropdownItemProps,
	emits: [
		"pointermove",
		"pointerleave",
		"click",
		"clickimpl"
	],
	setup(_, { emit }) {
		const ns = require_index.useNamespace("dropdown");
		const { role: menuRole } = (0, vue.inject)(require_tokens$1.DROPDOWN_INJECTION_KEY, void 0);
		const { collectionItemRef: rovingFocusCollectionItemRef } = (0, vue.inject)(require_roving_focus_group.ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY, void 0);
		const { rovingFocusGroupItemRef, tabIndex, handleFocus, handleKeydown: handleItemKeydown, handleMousedown } = (0, vue.inject)(require_tokens.ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, void 0);
		const itemRef = require_refs.composeRefs(rovingFocusCollectionItemRef, rovingFocusGroupItemRef);
		const role = (0, vue.computed)(() => {
			if (menuRole.value === "menu") return "menuitem";
			else if (menuRole.value === "navigation") return "link";
			return "button";
		});
		const handleKeydown = require_event.composeEventHandlers((e) => {
			const code = require_event.getEventCode(e);
			if ([
				require_aria.EVENT_CODE.enter,
				require_aria.EVENT_CODE.numpadEnter,
				require_aria.EVENT_CODE.space
			].includes(code)) {
				e.preventDefault();
				e.stopImmediatePropagation();
				emit("clickimpl", e);
				return true;
			}
		}, handleItemKeydown);
		return {
			ns,
			itemRef,
			dataset: { [require_collection.COLLECTION_ITEM_SIGN]: "" },
			role,
			tabIndex,
			handleFocus,
			handleKeydown,
			handleMousedown
		};
	}
});

//#endregion
exports.default = dropdown_item_impl_vue_vue_type_script_lang_default;
//# sourceMappingURL=dropdown-item-impl.vue_vue_type_script_lang.js.map
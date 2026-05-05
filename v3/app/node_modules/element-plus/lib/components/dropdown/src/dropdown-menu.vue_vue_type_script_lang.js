const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_refs = require('../../../utils/vue/refs.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_roving_focus_group = require('../../roving-focus-group/src/roving-focus-group.js');
const require_tokens = require('../../roving-focus-group/src/tokens.js');
const require_dropdown = require('./dropdown.js');
const require_tokens$1 = require('./tokens.js');
const require_useDropdown = require('./useDropdown.js');
let vue = require("vue");

//#region ../../packages/components/dropdown/src/dropdown-menu.vue?vue&type=script&lang.ts
var dropdown_menu_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElDropdownMenu",
	props: require_dropdown.dropdownMenuProps,
	setup(props) {
		const ns = require_index.useNamespace("dropdown");
		const { _elDropdownSize } = require_useDropdown.useDropdown();
		const size = _elDropdownSize.value;
		const { contentRef, role, triggerId, isUsingKeyboard, handleClose } = (0, vue.inject)(require_tokens$1.DROPDOWN_INJECTION_KEY, void 0);
		const { rovingFocusGroupRef, rovingFocusGroupRootStyle, onBlur, onFocus, onKeydown, onMousedown } = (0, vue.inject)(require_tokens.ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
		const { collectionRef: rovingFocusGroupCollectionRef } = (0, vue.inject)(require_roving_focus_group.ROVING_FOCUS_COLLECTION_INJECTION_KEY, void 0);
		const dropdownKls = (0, vue.computed)(() => {
			return [ns.b("menu"), ns.bm("menu", size?.value)];
		});
		const dropdownListWrapperRef = require_refs.composeRefs(contentRef, rovingFocusGroupRef, rovingFocusGroupCollectionRef);
		const handleKeydown = require_event.composeEventHandlers((e) => {
			props.onKeydown?.(e);
		}, (e) => {
			const { currentTarget, target } = e;
			const code = require_event.getEventCode(e);
			if (currentTarget.contains(target)) {}
			if (require_aria.EVENT_CODE.tab === code) return handleClose();
			onKeydown(e);
		});
		function handleFocus(e) {
			isUsingKeyboard.value && onFocus(e);
		}
		return {
			size,
			rovingFocusGroupRootStyle,
			dropdownKls,
			role,
			triggerId,
			dropdownListWrapperRef,
			handleKeydown,
			onBlur,
			handleFocus,
			onMousedown
		};
	}
});

//#endregion
exports.default = dropdown_menu_vue_vue_type_script_lang_default;
//# sourceMappingURL=dropdown-menu.vue_vue_type_script_lang.js.map
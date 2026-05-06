import { EVENT_CODE } from "../../../constants/aria.mjs";
import { composeEventHandlers, getEventCode } from "../../../utils/dom/event.mjs";
import { composeRefs } from "../../../utils/vue/refs.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ROVING_FOCUS_COLLECTION_INJECTION_KEY as COLLECTION_INJECTION_KEY } from "../../roving-focus-group/src/roving-focus-group.mjs";
import { ROVING_FOCUS_GROUP_INJECTION_KEY } from "../../roving-focus-group/src/tokens.mjs";
import { dropdownMenuProps } from "./dropdown.mjs";
import { DROPDOWN_INJECTION_KEY } from "./tokens.mjs";
import { useDropdown } from "./useDropdown.mjs";
import { computed, defineComponent, inject } from "vue";

//#region ../../packages/components/dropdown/src/dropdown-menu.vue?vue&type=script&lang.ts
var dropdown_menu_vue_vue_type_script_lang_default = defineComponent({
	name: "ElDropdownMenu",
	props: dropdownMenuProps,
	setup(props) {
		const ns = useNamespace("dropdown");
		const { _elDropdownSize } = useDropdown();
		const size = _elDropdownSize.value;
		const { contentRef, role, triggerId, isUsingKeyboard, handleClose } = inject(DROPDOWN_INJECTION_KEY, void 0);
		const { rovingFocusGroupRef, rovingFocusGroupRootStyle, onBlur, onFocus, onKeydown, onMousedown } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
		const { collectionRef: rovingFocusGroupCollectionRef } = inject(COLLECTION_INJECTION_KEY, void 0);
		const dropdownKls = computed(() => {
			return [ns.b("menu"), ns.bm("menu", size?.value)];
		});
		const dropdownListWrapperRef = composeRefs(contentRef, rovingFocusGroupRef, rovingFocusGroupCollectionRef);
		const handleKeydown = composeEventHandlers((e) => {
			props.onKeydown?.(e);
		}, (e) => {
			const { currentTarget, target } = e;
			const code = getEventCode(e);
			if (currentTarget.contains(target)) {}
			if (EVENT_CODE.tab === code) return handleClose();
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
export { dropdown_menu_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=dropdown-menu.vue_vue_type_script_lang.mjs.map
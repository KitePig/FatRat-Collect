import { composeEventHandlers, whenMouse } from "../../../utils/dom/event.mjs";
import roving_focus_item_default from "../../roving-focus-group/src/roving-focus-item.mjs";
import { dropdownItemProps } from "./dropdown.mjs";
import { DROPDOWN_INJECTION_KEY } from "./tokens.mjs";
import dropdown_item_impl_default from "./dropdown-item-impl.mjs";
import { useDropdown } from "./useDropdown.mjs";
import { computed, defineComponent, getCurrentInstance, inject } from "vue";

//#region ../../packages/components/dropdown/src/dropdown-item.vue?vue&type=script&lang.ts
var dropdown_item_vue_vue_type_script_lang_default = defineComponent({
	name: "ElDropdownItem",
	components: {
		ElRovingFocusItem: roving_focus_item_default,
		ElDropdownItemImpl: dropdown_item_impl_default
	},
	inheritAttrs: false,
	props: dropdownItemProps,
	emits: [
		"pointermove",
		"pointerleave",
		"click"
	],
	setup(props, { emit, attrs }) {
		const { elDropdown } = useDropdown();
		const _instance = getCurrentInstance();
		const { onItemEnter, onItemLeave } = inject(DROPDOWN_INJECTION_KEY, void 0);
		const handlePointerMove = composeEventHandlers((e) => {
			emit("pointermove", e);
			return e.defaultPrevented;
		}, whenMouse((e) => {
			if (props.disabled) {
				onItemLeave(e);
				return;
			}
			const target = e.currentTarget;
			/**
			* This handles the following scenario:
			*   when the item contains a form element such as input element
			*   when the mouse is moving over the element itself which is contained by
			*   the item, the default focusing logic should be prevented so that
			*   it won't cause weird action.
			*/
			if (target === document.activeElement || target.contains(document.activeElement)) return;
			onItemEnter(e);
			if (!e.defaultPrevented) target?.focus({ preventScroll: true });
		}));
		const handlePointerLeave = composeEventHandlers((e) => {
			emit("pointerleave", e);
			return e.defaultPrevented;
		}, whenMouse(onItemLeave));
		return {
			handleClick: composeEventHandlers((e) => {
				if (props.disabled) return;
				emit("click", e);
				return e.type !== "keydown" && e.defaultPrevented;
			}, (e) => {
				if (props.disabled) {
					e.stopImmediatePropagation();
					return;
				}
				if (elDropdown?.hideOnClick?.value) elDropdown.handleClick?.();
				elDropdown.commandHandler?.(props.command, _instance, e);
			}),
			handlePointerMove,
			handlePointerLeave,
			propsAndAttrs: computed(() => ({
				...props,
				...attrs
			}))
		};
	}
});

//#endregion
export { dropdown_item_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=dropdown-item.vue_vue_type_script_lang.mjs.map
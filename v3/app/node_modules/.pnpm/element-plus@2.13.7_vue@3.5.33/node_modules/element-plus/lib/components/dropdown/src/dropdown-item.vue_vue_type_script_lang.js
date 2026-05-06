const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../utils/dom/event.js');
const require_roving_focus_item = require('../../roving-focus-group/src/roving-focus-item.js');
const require_dropdown = require('./dropdown.js');
const require_tokens = require('./tokens.js');
const require_dropdown_item_impl = require('./dropdown-item-impl.js');
const require_useDropdown = require('./useDropdown.js');
let vue = require("vue");

//#region ../../packages/components/dropdown/src/dropdown-item.vue?vue&type=script&lang.ts
var dropdown_item_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElDropdownItem",
	components: {
		ElRovingFocusItem: require_roving_focus_item.default,
		ElDropdownItemImpl: require_dropdown_item_impl.default
	},
	inheritAttrs: false,
	props: require_dropdown.dropdownItemProps,
	emits: [
		"pointermove",
		"pointerleave",
		"click"
	],
	setup(props, { emit, attrs }) {
		const { elDropdown } = require_useDropdown.useDropdown();
		const _instance = (0, vue.getCurrentInstance)();
		const { onItemEnter, onItemLeave } = (0, vue.inject)(require_tokens.DROPDOWN_INJECTION_KEY, void 0);
		const handlePointerMove = require_event.composeEventHandlers((e) => {
			emit("pointermove", e);
			return e.defaultPrevented;
		}, require_event.whenMouse((e) => {
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
		const handlePointerLeave = require_event.composeEventHandlers((e) => {
			emit("pointerleave", e);
			return e.defaultPrevented;
		}, require_event.whenMouse(onItemLeave));
		return {
			handleClick: require_event.composeEventHandlers((e) => {
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
			propsAndAttrs: (0, vue.computed)(() => ({
				...props,
				...attrs
			}))
		};
	}
});

//#endregion
exports.default = dropdown_item_vue_vue_type_script_lang_default;
//# sourceMappingURL=dropdown-item.vue_vue_type_script_lang.js.map
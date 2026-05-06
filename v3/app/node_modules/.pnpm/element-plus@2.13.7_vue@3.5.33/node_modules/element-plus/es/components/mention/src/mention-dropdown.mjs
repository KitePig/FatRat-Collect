import { isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/mention/src/mention-dropdown.ts
/**
* @deprecated Removed after 3.0.0, Use `MentionDropdownProps` instead.
*/
const mentionDropdownProps = buildProps({
	options: {
		type: definePropType(Array),
		default: () => []
	},
	loading: Boolean,
	disabled: Boolean,
	contentId: String,
	ariaLabel: String
});
const mentionDropdownEmits = { select: (option) => isString(option.value) };

//#endregion
export { mentionDropdownEmits, mentionDropdownProps };
//# sourceMappingURL=mention-dropdown.mjs.map
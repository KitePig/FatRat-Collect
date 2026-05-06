import { CHANGE_EVENT } from "../../../constants/event.mjs";
import { isBoolean, isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { teleportProps } from "../../teleport/src/teleport.mjs";

//#region ../../packages/components/affix/src/affix.ts
/**
* @deprecated Removed after 3.0.0, Use `AffixProps` instead.
*/
const affixProps = buildProps({
	zIndex: {
		type: definePropType([Number, String]),
		default: 100
	},
	target: {
		type: String,
		default: ""
	},
	offset: {
		type: Number,
		default: 0
	},
	position: {
		type: String,
		values: ["top", "bottom"],
		default: "top"
	},
	teleported: Boolean,
	appendTo: {
		type: teleportProps.to.type,
		default: "body"
	}
});
const affixEmits = {
	scroll: ({ scrollTop, fixed }) => isNumber(scrollTop) && isBoolean(fixed),
	[CHANGE_EVENT]: (fixed) => isBoolean(fixed)
};

//#endregion
export { affixEmits, affixProps };
//# sourceMappingURL=affix.mjs.map
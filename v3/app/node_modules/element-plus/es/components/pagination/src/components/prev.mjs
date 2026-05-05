import { buildProps } from "../../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../../utils/vue/icon.mjs";

//#region ../../packages/components/pagination/src/components/prev.ts
const paginationPrevProps = buildProps({
	disabled: Boolean,
	currentPage: {
		type: Number,
		default: 1
	},
	prevText: { type: String },
	prevIcon: { type: iconPropType }
});
const paginationPrevEmits = { click: (evt) => evt instanceof MouseEvent };

//#endregion
export { paginationPrevEmits, paginationPrevProps };
//# sourceMappingURL=prev.mjs.map
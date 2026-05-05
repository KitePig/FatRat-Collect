import { buildProps } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/popper/src/popper.ts
const Effect = {
	LIGHT: "light",
	DARK: "dark"
};
const roleTypes = [
	"dialog",
	"grid",
	"group",
	"listbox",
	"menu",
	"navigation",
	"tooltip",
	"tree"
];
/**
* @deprecated Removed after 3.0.0, Use `PopperProps` instead.
*/
const popperProps = buildProps({ role: {
	type: String,
	values: roleTypes,
	default: "tooltip"
} });
/** @deprecated use `popperProps` instead, and it will be deprecated in the next major version */
const usePopperProps = popperProps;

//#endregion
export { Effect, popperProps, roleTypes, usePopperProps };
//# sourceMappingURL=popper.mjs.map
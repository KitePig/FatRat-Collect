Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

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
const popperProps = require_runtime.buildProps({ role: {
	type: String,
	values: roleTypes,
	default: "tooltip"
} });
/** @deprecated use `popperProps` instead, and it will be deprecated in the next major version */
const usePopperProps = popperProps;

//#endregion
exports.Effect = Effect;
exports.popperProps = popperProps;
exports.roleTypes = roleTypes;
exports.usePopperProps = usePopperProps;
//# sourceMappingURL=popper.js.map
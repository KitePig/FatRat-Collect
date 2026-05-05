import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/icon/src/icon.ts
/**
* @deprecated Removed after 3.0.0, Use `IconProps` instead.
*/
const iconProps = buildProps({
	size: { type: definePropType([Number, String]) },
	color: { type: String }
});

//#endregion
export { iconProps };
//# sourceMappingURL=icon.mjs.map
import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/color-picker-panel/src/props/predefine.ts
/**
* @deprecated Removed after 3.0.0, Use `PredefineProps` instead.
*/
const predefineProps = buildProps({
	colors: {
		type: definePropType(Array),
		required: true
	},
	color: {
		type: definePropType(Object),
		required: true
	},
	enableAlpha: {
		type: Boolean,
		required: true
	},
	disabled: Boolean
});

//#endregion
export { predefineProps };
//# sourceMappingURL=predefine.mjs.map
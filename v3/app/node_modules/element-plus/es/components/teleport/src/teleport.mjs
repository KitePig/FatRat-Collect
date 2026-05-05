import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/teleport/src/teleport.ts
const teleportProps = buildProps({
	to: {
		type: definePropType([String, Object]),
		required: true
	},
	disabled: Boolean
});

//#endregion
export { teleportProps };
//# sourceMappingURL=teleport.mjs.map
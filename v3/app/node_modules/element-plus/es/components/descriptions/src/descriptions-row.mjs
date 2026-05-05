import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/descriptions/src/descriptions-row.ts
/**
* @deprecated Removed after 3.0.0, Use `DescriptionsRowProps` instead.
*/
const descriptionsRowProps = buildProps({ row: {
	type: definePropType(Array),
	default: () => []
} });

//#endregion
export { descriptionsRowProps };
//# sourceMappingURL=descriptions-row.mjs.map
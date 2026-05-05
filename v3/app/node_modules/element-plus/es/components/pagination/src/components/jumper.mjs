import { componentSizes } from "../../../../constants/size.mjs";
import { buildProps } from "../../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/pagination/src/components/jumper.ts
const paginationJumperProps = buildProps({ size: {
	type: String,
	values: componentSizes
} });

//#endregion
export { paginationJumperProps };
//# sourceMappingURL=jumper.mjs.map
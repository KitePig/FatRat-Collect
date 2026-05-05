import { withInstall } from "../../utils/vue/install.mjs";
import { defaultProps, segmentedEmits, segmentedProps } from "./src/segmented.mjs";
import segmented_default from "./src/segmented2.mjs";

//#region ../../packages/components/segmented/index.ts
const ElSegmented = withInstall(segmented_default);

//#endregion
export { ElSegmented, ElSegmented as default, defaultProps, segmentedEmits, segmentedProps };
//# sourceMappingURL=index.mjs.map
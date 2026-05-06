import { withInstall } from "../../utils/vue/install.mjs";
import { watermarkProps } from "./src/watermark.mjs";
import watermark_default from "./src/watermark2.mjs";

//#region ../../packages/components/watermark/index.ts
const ElWatermark = withInstall(watermark_default);

//#endregion
export { ElWatermark, ElWatermark as default, watermarkProps };
//# sourceMappingURL=index.mjs.map
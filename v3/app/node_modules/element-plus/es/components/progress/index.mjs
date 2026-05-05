import { withInstall } from "../../utils/vue/install.mjs";
import { progressProps } from "./src/progress.mjs";
import progress_default from "./src/progress2.mjs";

//#region ../../packages/components/progress/index.ts
const ElProgress = withInstall(progress_default);

//#endregion
export { ElProgress, ElProgress as default, progressProps };
//# sourceMappingURL=index.mjs.map
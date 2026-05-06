import { withInstall } from "../../utils/vue/install.mjs";
import { rateEmits, rateProps } from "./src/rate.mjs";
import rate_default from "./src/rate2.mjs";

//#region ../../packages/components/rate/index.ts
const ElRate = withInstall(rate_default);

//#endregion
export { ElRate, ElRate as default, rateEmits, rateProps };
//# sourceMappingURL=index.mjs.map
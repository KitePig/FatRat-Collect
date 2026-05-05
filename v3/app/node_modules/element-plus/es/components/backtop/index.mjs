import { withInstall } from "../../utils/vue/install.mjs";
import { backtopEmits, backtopProps } from "./src/backtop.mjs";
import backtop_default from "./src/backtop2.mjs";

//#region ../../packages/components/backtop/index.ts
const ElBacktop = withInstall(backtop_default);

//#endregion
export { ElBacktop, ElBacktop as default, backtopEmits, backtopProps };
//# sourceMappingURL=index.mjs.map
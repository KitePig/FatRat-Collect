import { withInstall } from "../../utils/vue/install.mjs";
import { selectV2InjectionKey } from "./src/token.mjs";
import select_default from "./src/select.mjs";

//#region ../../packages/components/select-v2/index.ts
const ElSelectV2 = withInstall(select_default);

//#endregion
export { ElSelectV2, ElSelectV2 as default, selectV2InjectionKey };
//# sourceMappingURL=index.mjs.map
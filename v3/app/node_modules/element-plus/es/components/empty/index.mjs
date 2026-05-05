import { withInstall } from "../../utils/vue/install.mjs";
import { emptyProps } from "./src/empty.mjs";
import empty_default from "./src/empty2.mjs";

//#region ../../packages/components/empty/index.ts
const ElEmpty = withInstall(empty_default);

//#endregion
export { ElEmpty, ElEmpty as default, emptyProps };
//# sourceMappingURL=index.mjs.map
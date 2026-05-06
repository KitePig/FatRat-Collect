import { withInstall } from "../../utils/vue/install.mjs";
import { affixEmits, affixProps } from "./src/affix.mjs";
import affix_default from "./src/affix2.mjs";

//#region ../../packages/components/affix/index.ts
const ElAffix = withInstall(affix_default);

//#endregion
export { ElAffix, ElAffix as default, affixEmits, affixProps };
//# sourceMappingURL=index.mjs.map
import { withInstall } from "../../utils/vue/install.mjs";
import { checkTagEmits, checkTagProps } from "./src/check-tag.mjs";
import check_tag_default from "./src/check-tag2.mjs";

//#region ../../packages/components/check-tag/index.ts
const ElCheckTag = withInstall(check_tag_default);

//#endregion
export { ElCheckTag, ElCheckTag as default, checkTagEmits, checkTagProps };
//# sourceMappingURL=index.mjs.map
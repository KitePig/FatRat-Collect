import { withInstall } from "../../utils/vue/install.mjs";
import { inputTagEmits, inputTagProps } from "./src/input-tag.mjs";
import input_tag_default from "./src/input-tag2.mjs";

//#region ../../packages/components/input-tag/index.ts
const ElInputTag = withInstall(input_tag_default);

//#endregion
export { ElInputTag, ElInputTag as default, inputTagEmits, inputTagProps };
//# sourceMappingURL=index.mjs.map
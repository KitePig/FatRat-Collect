import { withInstall } from "../../utils/vue/install.mjs";
import { mentionDefaultProps, mentionEmits, mentionProps } from "./src/mention.mjs";
import mention_default from "./src/mention2.mjs";

//#region ../../packages/components/mention/index.ts
const ElMention = withInstall(mention_default);

//#endregion
export { ElMention, ElMention as default, mentionDefaultProps, mentionEmits, mentionProps };
//# sourceMappingURL=index.mjs.map
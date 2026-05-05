import { withInstall } from "../../utils/vue/install.mjs";
import { linkEmits, linkProps } from "./src/link.mjs";
import link_default from "./src/link2.mjs";

//#region ../../packages/components/link/index.ts
const ElLink = withInstall(link_default);

//#endregion
export { ElLink, ElLink as default, linkEmits, linkProps };
//# sourceMappingURL=index.mjs.map
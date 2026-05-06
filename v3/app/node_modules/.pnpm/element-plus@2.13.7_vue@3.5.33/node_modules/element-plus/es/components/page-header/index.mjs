import { withInstall } from "../../utils/vue/install.mjs";
import { pageHeaderEmits, pageHeaderProps } from "./src/page-header.mjs";
import page_header_default from "./src/page-header2.mjs";

//#region ../../packages/components/page-header/index.ts
const ElPageHeader = withInstall(page_header_default);

//#endregion
export { ElPageHeader, ElPageHeader as default, pageHeaderEmits, pageHeaderProps };
//# sourceMappingURL=index.mjs.map
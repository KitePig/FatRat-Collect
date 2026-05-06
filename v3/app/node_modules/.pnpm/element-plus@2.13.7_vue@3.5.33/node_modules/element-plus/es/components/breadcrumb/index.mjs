import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { breadcrumbProps } from "./src/breadcrumb.mjs";
import { breadcrumbKey } from "./src/constants.mjs";
import breadcrumb_default from "./src/breadcrumb2.mjs";
import { breadcrumbItemProps } from "./src/breadcrumb-item.mjs";
import breadcrumb_item_default from "./src/breadcrumb-item2.mjs";

//#region ../../packages/components/breadcrumb/index.ts
const ElBreadcrumb = withInstall(breadcrumb_default, { BreadcrumbItem: breadcrumb_item_default });
const ElBreadcrumbItem = withNoopInstall(breadcrumb_item_default);

//#endregion
export { ElBreadcrumb, ElBreadcrumb as default, ElBreadcrumbItem, breadcrumbItemProps, breadcrumbKey, breadcrumbProps };
//# sourceMappingURL=index.mjs.map
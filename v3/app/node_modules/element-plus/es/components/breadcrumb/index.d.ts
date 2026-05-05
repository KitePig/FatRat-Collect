import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { BreadcrumbProps, BreadcrumbPropsPublic, breadcrumbProps } from "./src/breadcrumb.js";
import { _default } from "./src/breadcrumb.vue.js";
import { BreadcrumbItemProps, BreadcrumbItemPropsPublic, breadcrumbItemProps } from "./src/breadcrumb-item.js";
import { _default as _default$1 } from "./src/breadcrumb-item.vue.js";
import { breadcrumbKey } from "./src/constants.js";
import { BreadcrumbInstance, BreadcrumbItemInstance } from "./src/instances.js";

//#region ../../packages/components/breadcrumb/index.d.ts
declare const ElBreadcrumb: SFCWithInstall<typeof _default> & {
  BreadcrumbItem: typeof _default$1;
};
declare const ElBreadcrumbItem: SFCWithInstall<typeof _default$1>;
//#endregion
export { type BreadcrumbInstance, type BreadcrumbItemInstance, BreadcrumbItemProps, BreadcrumbItemPropsPublic, BreadcrumbProps, BreadcrumbPropsPublic, ElBreadcrumb, ElBreadcrumb as default, ElBreadcrumbItem, breadcrumbItemProps, breadcrumbKey, breadcrumbProps };
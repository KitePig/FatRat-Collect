import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { ExtractPublicPropTypes } from "vue";
import * as vue_router0 from "vue-router";
import { RouteLocationRaw } from "vue-router";

//#region ../../packages/components/breadcrumb/src/breadcrumb-item.d.ts
interface BreadcrumbItemProps {
  /**
   * @description target route of the link, same as `to` of `vue-router`
   */
  to?: RouteLocationRaw;
  /**
   * @description if `true`, the navigation will not leave a history record
   */
  replace?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `BreadcrumbItemProps` instead.
 */
declare const breadcrumbItemProps: {
  readonly to: EpPropFinalized<(new (...args: any[]) => string | vue_router0.RouteLocationAsRelativeGeneric | vue_router0.RouteLocationAsPathGeneric) | (() => string | vue_router0.RouteLocationAsRelativeGeneric | vue_router0.RouteLocationAsPathGeneric) | (((new (...args: any[]) => string | vue_router0.RouteLocationAsRelativeGeneric | vue_router0.RouteLocationAsPathGeneric) | (() => string | vue_router0.RouteLocationAsRelativeGeneric | vue_router0.RouteLocationAsPathGeneric)) | null)[], unknown, unknown, "", boolean>;
  readonly replace: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `BreadcrumbItemProps` instead.
 */
type BreadcrumbItemPropsPublic = ExtractPublicPropTypes<typeof breadcrumbItemProps>;
//#endregion
export { BreadcrumbItemProps, BreadcrumbItemPropsPublic, breadcrumbItemProps };
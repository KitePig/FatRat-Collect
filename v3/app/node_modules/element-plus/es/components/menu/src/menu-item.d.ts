import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { MenuItemRegistered } from "./types.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";
import * as vue_router0 from "vue-router";
import { RouteLocationRaw } from "vue-router";

//#region ../../packages/components/menu/src/menu-item.d.ts
interface MenuItemProps {
  /**
   * @description unique identification
   * - will be required in the next major version
   * - required: true
   */
  index?: string | null;
  /**
   * @description Vue Router object
   */
  route?: RouteLocationRaw;
  /**
   * @description whether disabled
   */
  disabled?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `MenuItemProps` instead.
 */
declare const menuItemProps: {
  readonly index: EpPropFinalized<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown, null, boolean>;
  readonly route: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | vue_router0.RouteLocationAsRelativeGeneric | vue_router0.RouteLocationAsPathGeneric) | (() => string | vue_router0.RouteLocationAsRelativeGeneric | vue_router0.RouteLocationAsPathGeneric) | (((new (...args: any[]) => string | vue_router0.RouteLocationAsRelativeGeneric | vue_router0.RouteLocationAsPathGeneric) | (() => string | vue_router0.RouteLocationAsRelativeGeneric | vue_router0.RouteLocationAsPathGeneric)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `MenuItemProps` instead.
 */
type MenuItemPropsPublic = ExtractPublicPropTypes<typeof menuItemProps>;
declare const menuItemEmits: {
  click: (item: MenuItemRegistered) => boolean;
};
type MenuItemEmits = typeof menuItemEmits;
//#endregion
export { MenuItemEmits, MenuItemProps, MenuItemPropsPublic, menuItemEmits, menuItemProps };
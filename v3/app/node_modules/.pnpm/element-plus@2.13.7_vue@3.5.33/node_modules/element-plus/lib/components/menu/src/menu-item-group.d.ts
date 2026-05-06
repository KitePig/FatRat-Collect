import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/menu/src/menu-item-group.d.ts
interface MenuItemGroupProps {
  /**
   * @description group title
   */
  title?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `MenuItemGroupProps` instead.
 */
declare const menuItemGroupProps: {
  /**
   * @description group title
   */
  readonly title: StringConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `MenuItemGroupProps` instead.
 */
type MenuItemGroupPropsPublic = ExtractPublicPropTypes<typeof menuItemGroupProps>;
//#endregion
export { MenuItemGroupProps, MenuItemGroupPropsPublic, menuItemGroupProps };
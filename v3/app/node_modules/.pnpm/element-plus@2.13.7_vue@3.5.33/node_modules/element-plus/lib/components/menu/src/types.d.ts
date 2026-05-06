import { MenuProps } from "./menu.js";
import { Ref } from "vue";
import { RouteLocationRaw } from "vue-router";

//#region ../../packages/components/menu/src/types.d.ts
interface MenuItemRegistered {
  index: string;
  indexPath: string[];
  active: boolean;
}
interface MenuItemClicked {
  index: string;
  indexPath: string[];
  route?: RouteLocationRaw;
}
interface MenuProvider {
  openedMenus: string[];
  items: Record<string, MenuItemRegistered>;
  subMenus: Record<string, MenuItemRegistered>;
  activeIndex?: string;
  isMenuPopup: boolean;
  props: MenuProps;
  addMenuItem: (item: MenuItemRegistered) => void;
  removeMenuItem: (item: MenuItemRegistered) => void;
  addSubMenu: (item: MenuItemRegistered) => void;
  removeSubMenu: (item: MenuItemRegistered) => void;
  openMenu: (index: string, indexPath: string[]) => void;
  closeMenu: (index: string, indexPath: string[]) => void;
  handleMenuItemClick: (item: MenuItemClicked) => void;
  handleSubMenuClick: (subMenu: MenuItemRegistered) => void;
}
interface SubMenuProvider {
  addSubMenu: (item: MenuItemRegistered) => void;
  removeSubMenu: (item: MenuItemRegistered) => void;
  handleMouseleave?: (deepDispatch: boolean) => void;
  mouseInChild: Ref<boolean>;
  level: number;
}
//#endregion
export { MenuItemClicked, MenuItemRegistered, MenuProvider, SubMenuProvider };
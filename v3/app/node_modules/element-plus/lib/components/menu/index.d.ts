import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { MenuItemClicked, MenuItemRegistered, MenuProvider, SubMenuProvider } from "./src/types.js";
import { MenuEmits, MenuProps, MenuPropsPublic, _default, menuEmits, menuProps } from "./src/menu.js";
import { MenuItemEmits, MenuItemProps, MenuItemPropsPublic, menuItemEmits, menuItemProps } from "./src/menu-item.js";
import { _default as _default$1 } from "./src/menu-item.vue.js";
import { MenuItemGroupProps, MenuItemGroupPropsPublic, menuItemGroupProps } from "./src/menu-item-group.js";
import { _default as _default$2 } from "./src/menu-item-group.vue.js";
import { SubMenuProps, SubMenuPropsPublic, _default as _default$3, subMenuProps } from "./src/sub-menu.js";
import { MenuInstance, MenuItemGroupInstance, MenuItemInstance, SubMenuInstance } from "./src/instance.js";
import { MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from "./src/tokens.js";

//#region ../../packages/components/menu/index.d.ts
declare const ElMenu: SFCWithInstall<typeof _default> & {
  MenuItem: typeof _default$1;
  MenuItemGroup: typeof _default$2;
  SubMenu: typeof _default$3;
};
declare const ElMenuItem: SFCWithInstall<typeof _default$1>;
declare const ElMenuItemGroup: SFCWithInstall<typeof _default$2>;
declare const ElSubMenu: SFCWithInstall<typeof _default$3>;
//#endregion
export { ElMenu, ElMenu as default, ElMenuItem, ElMenuItemGroup, ElSubMenu, MENU_INJECTION_KEY, MenuEmits, MenuInstance, MenuItemClicked, MenuItemEmits, MenuItemGroupInstance, MenuItemGroupProps, MenuItemGroupPropsPublic, MenuItemInstance, MenuItemProps, MenuItemPropsPublic, MenuItemRegistered, MenuProps, MenuPropsPublic, MenuProvider, SUB_MENU_INJECTION_KEY, SubMenuInstance, SubMenuProps, SubMenuPropsPublic, SubMenuProvider, menuEmits, menuItemEmits, menuItemGroupProps, menuItemProps, menuProps, subMenuProps };
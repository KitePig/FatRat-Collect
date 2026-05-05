import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY } from "./src/tokens.mjs";
import sub_menu_default, { subMenuProps } from "./src/sub-menu.mjs";
import menu_default, { menuEmits, menuProps } from "./src/menu.mjs";
import { menuItemEmits, menuItemProps } from "./src/menu-item.mjs";
import menu_item_default from "./src/menu-item2.mjs";
import { menuItemGroupProps } from "./src/menu-item-group.mjs";
import menu_item_group_default from "./src/menu-item-group2.mjs";

//#region ../../packages/components/menu/index.ts
const ElMenu = withInstall(menu_default, {
	MenuItem: menu_item_default,
	MenuItemGroup: menu_item_group_default,
	SubMenu: sub_menu_default
});
const ElMenuItem = withNoopInstall(menu_item_default);
const ElMenuItemGroup = withNoopInstall(menu_item_group_default);
const ElSubMenu = withNoopInstall(sub_menu_default);

//#endregion
export { ElMenu, ElMenu as default, ElMenuItem, ElMenuItemGroup, ElSubMenu, MENU_INJECTION_KEY, SUB_MENU_INJECTION_KEY, menuEmits, menuItemEmits, menuItemGroupProps, menuItemProps, menuProps, subMenuProps };
//# sourceMappingURL=index.mjs.map
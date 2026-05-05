Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_tokens = require('./src/tokens.js');
const require_sub_menu = require('./src/sub-menu.js');
const require_menu = require('./src/menu.js');
const require_menu_item = require('./src/menu-item.js');
const require_menu_item$1 = require('./src/menu-item2.js');
const require_menu_item_group = require('./src/menu-item-group.js');
const require_menu_item_group$1 = require('./src/menu-item-group2.js');

//#region ../../packages/components/menu/index.ts
const ElMenu = require_install.withInstall(require_menu.default, {
	MenuItem: require_menu_item$1.default,
	MenuItemGroup: require_menu_item_group$1.default,
	SubMenu: require_sub_menu.default
});
const ElMenuItem = require_install.withNoopInstall(require_menu_item$1.default);
const ElMenuItemGroup = require_install.withNoopInstall(require_menu_item_group$1.default);
const ElSubMenu = require_install.withNoopInstall(require_sub_menu.default);

//#endregion
exports.ElMenu = ElMenu;
exports.default = ElMenu;
exports.ElMenuItem = ElMenuItem;
exports.ElMenuItemGroup = ElMenuItemGroup;
exports.ElSubMenu = ElSubMenu;
exports.MENU_INJECTION_KEY = require_tokens.MENU_INJECTION_KEY;
exports.SUB_MENU_INJECTION_KEY = require_tokens.SUB_MENU_INJECTION_KEY;
exports.menuEmits = require_menu.menuEmits;
exports.menuItemEmits = require_menu_item.menuItemEmits;
exports.menuItemGroupProps = require_menu_item_group.menuItemGroupProps;
exports.menuItemProps = require_menu_item.menuItemProps;
exports.menuProps = require_menu.menuProps;
exports.subMenuProps = require_sub_menu.subMenuProps;
//# sourceMappingURL=index.js.map
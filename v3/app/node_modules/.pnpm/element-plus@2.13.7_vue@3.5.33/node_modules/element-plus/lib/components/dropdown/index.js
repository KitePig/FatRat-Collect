Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_dropdown = require('./src/dropdown.js');
const require_tokens = require('./src/tokens.js');
const require_dropdown$1 = require('./src/dropdown2.js');
const require_dropdown_item = require('./src/dropdown-item.js');
const require_dropdown_menu = require('./src/dropdown-menu.js');

//#region ../../packages/components/dropdown/index.ts
const ElDropdown = require_install.withInstall(require_dropdown$1.default, {
	DropdownItem: require_dropdown_item.default,
	DropdownMenu: require_dropdown_menu.default
});
const ElDropdownItem = require_install.withNoopInstall(require_dropdown_item.default);
const ElDropdownMenu = require_install.withNoopInstall(require_dropdown_menu.default);

//#endregion
exports.DROPDOWN_INJECTION_KEY = require_tokens.DROPDOWN_INJECTION_KEY;
exports.DROPDOWN_INSTANCE_INJECTION_KEY = require_tokens.DROPDOWN_INSTANCE_INJECTION_KEY;
exports.ElDropdown = ElDropdown;
exports.default = ElDropdown;
exports.ElDropdownItem = ElDropdownItem;
exports.ElDropdownMenu = ElDropdownMenu;
exports.FIRST_KEYS = require_dropdown.FIRST_KEYS;
exports.FIRST_LAST_KEYS = require_dropdown.FIRST_LAST_KEYS;
exports.LAST_KEYS = require_dropdown.LAST_KEYS;
exports.dropdownItemProps = require_dropdown.dropdownItemProps;
exports.dropdownMenuProps = require_dropdown.dropdownMenuProps;
exports.dropdownProps = require_dropdown.dropdownProps;
//# sourceMappingURL=index.js.map
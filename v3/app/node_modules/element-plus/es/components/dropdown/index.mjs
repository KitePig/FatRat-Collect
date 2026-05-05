import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { FIRST_KEYS, FIRST_LAST_KEYS, LAST_KEYS, dropdownItemProps, dropdownMenuProps, dropdownProps } from "./src/dropdown.mjs";
import { DROPDOWN_INJECTION_KEY, DROPDOWN_INSTANCE_INJECTION_KEY } from "./src/tokens.mjs";
import dropdown_default from "./src/dropdown2.mjs";
import dropdown_item_default from "./src/dropdown-item.mjs";
import dropdown_menu_default from "./src/dropdown-menu.mjs";

//#region ../../packages/components/dropdown/index.ts
const ElDropdown = withInstall(dropdown_default, {
	DropdownItem: dropdown_item_default,
	DropdownMenu: dropdown_menu_default
});
const ElDropdownItem = withNoopInstall(dropdown_item_default);
const ElDropdownMenu = withNoopInstall(dropdown_menu_default);

//#endregion
export { DROPDOWN_INJECTION_KEY, DROPDOWN_INSTANCE_INJECTION_KEY, ElDropdown, ElDropdown as default, ElDropdownItem, ElDropdownMenu, FIRST_KEYS, FIRST_LAST_KEYS, LAST_KEYS, dropdownItemProps, dropdownMenuProps, dropdownProps };
//# sourceMappingURL=index.mjs.map
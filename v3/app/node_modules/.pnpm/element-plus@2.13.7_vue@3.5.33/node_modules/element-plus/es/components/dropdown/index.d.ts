import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { _default } from "./src/dropdown.vue.js";
import { _default as _default$1 } from "./src/dropdown-item.vue.js";
import { _default as _default$2 } from "./src/dropdown-menu.vue.js";
import { FIRST_KEYS, FIRST_LAST_KEYS, IElDropdownInstance, LAST_KEYS, dropdownItemProps, dropdownMenuProps, dropdownProps } from "./src/dropdown.js";
import { DropdownInstance } from "./src/instance.js";
import { DROPDOWN_INJECTION_KEY, DROPDOWN_INSTANCE_INJECTION_KEY, ElDropdownInjectionContext } from "./src/tokens.js";

//#region ../../packages/components/dropdown/index.d.ts
declare const ElDropdown: SFCWithInstall<typeof _default> & {
  DropdownItem: typeof _default$1;
  DropdownMenu: typeof _default$2;
};
declare const ElDropdownItem: SFCWithInstall<typeof _default$1>;
declare const ElDropdownMenu: SFCWithInstall<typeof _default$2>;
//#endregion
export { DROPDOWN_INJECTION_KEY, DROPDOWN_INSTANCE_INJECTION_KEY, DropdownInstance, ElDropdown, ElDropdown as default, ElDropdownInjectionContext, ElDropdownItem, ElDropdownMenu, FIRST_KEYS, FIRST_LAST_KEYS, IElDropdownInstance, LAST_KEYS, dropdownItemProps, dropdownMenuProps, dropdownProps };
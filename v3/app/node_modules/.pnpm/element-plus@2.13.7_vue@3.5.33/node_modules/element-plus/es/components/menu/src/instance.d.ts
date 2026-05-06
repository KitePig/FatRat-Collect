import { _default } from "./menu.js";
import { _default as _default$1 } from "./menu-item.vue.js";
import { _default as _default$2 } from "./menu-item-group.vue.js";
import { _default as _default$3 } from "./sub-menu.js";

//#region ../../packages/components/menu/src/instance.d.ts
type MenuInstance = InstanceType<typeof _default> & {
  open: (index: string) => void;
  close: (index: string) => void;
  handleResize: () => void;
  updateActiveIndex: (index: string) => void;
};
type MenuItemInstance = InstanceType<typeof _default$1> & unknown;
type MenuItemGroupInstance = InstanceType<typeof _default$2> & unknown;
type SubMenuInstance = InstanceType<typeof _default$3> & unknown;
//#endregion
export { MenuInstance, MenuItemGroupInstance, MenuItemInstance, SubMenuInstance };
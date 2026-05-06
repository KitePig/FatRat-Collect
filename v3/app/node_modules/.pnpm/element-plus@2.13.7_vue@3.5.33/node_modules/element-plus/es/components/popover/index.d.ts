import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { PopoverEmits, PopoverInstance, PopoverProps, PopoverPropsPublic, popoverEmits, popoverProps, popoverPropsDefaults } from "./src/popover.js";
import { _default } from "./src/popover.vue.js";
import { _default as _default$1 } from "./src/directive.js";

//#region ../../packages/components/popover/index.d.ts
declare const ElPopoverDirective: SFCWithInstall<typeof _default$1>;
declare const ElPopover: SFCWithInstall<typeof _default> & {
  directive: typeof ElPopoverDirective;
};
//#endregion
export { ElPopover, ElPopover as default, ElPopoverDirective, PopoverEmits, PopoverInstance, PopoverProps, PopoverPropsPublic, popoverEmits, popoverProps, popoverPropsDefaults };
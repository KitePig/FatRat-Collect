import { withInstall, withInstallDirective } from "../../utils/vue/install.mjs";
import { popoverEmits, popoverProps, popoverPropsDefaults } from "./src/popover.mjs";
import popover_default from "./src/popover2.mjs";
import directive_default, { VPopover } from "./src/directive.mjs";

//#region ../../packages/components/popover/index.ts
const ElPopoverDirective = withInstallDirective(directive_default, VPopover);
const ElPopover = withInstall(popover_default, { directive: ElPopoverDirective });

//#endregion
export { ElPopover, ElPopover as default, ElPopoverDirective, popoverEmits, popoverProps, popoverPropsDefaults };
//# sourceMappingURL=index.mjs.map
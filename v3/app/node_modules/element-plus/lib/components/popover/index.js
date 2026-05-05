Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_popover = require('./src/popover.js');
const require_popover$1 = require('./src/popover2.js');
const require_directive = require('./src/directive.js');

//#region ../../packages/components/popover/index.ts
const ElPopoverDirective = require_install.withInstallDirective(require_directive.default, require_directive.VPopover);
const ElPopover = require_install.withInstall(require_popover$1.default, { directive: ElPopoverDirective });

//#endregion
exports.ElPopover = ElPopover;
exports.default = ElPopover;
exports.ElPopoverDirective = ElPopoverDirective;
exports.popoverEmits = require_popover.popoverEmits;
exports.popoverProps = require_popover.popoverProps;
exports.popoverPropsDefaults = require_popover.popoverPropsDefaults;
//# sourceMappingURL=index.js.map
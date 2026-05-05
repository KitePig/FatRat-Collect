Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_item = require('./src/item.js');
const require_use_space = require('./src/use-space.js');
const require_space = require('./src/space.js');

//#region ../../packages/components/space/index.ts
const ElSpace = require_install.withInstall(require_space.default);

//#endregion
exports.ElSpace = ElSpace;
exports.default = ElSpace;
exports.spaceItemProps = require_item.spaceItemProps;
exports.spaceProps = require_space.spaceProps;
exports.useSpace = require_use_space.useSpace;
//# sourceMappingURL=index.js.map
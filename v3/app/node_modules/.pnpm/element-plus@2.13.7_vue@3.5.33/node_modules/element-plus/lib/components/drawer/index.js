Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_drawer = require('./src/drawer.js');
const require_drawer$1 = require('./src/drawer2.js');

//#region ../../packages/components/drawer/index.ts
const ElDrawer = require_install.withInstall(require_drawer$1.default);

//#endregion
exports.ElDrawer = ElDrawer;
exports.default = ElDrawer;
exports.drawerEmits = require_drawer.drawerEmits;
exports.drawerProps = require_drawer.drawerProps;
//# sourceMappingURL=index.js.map
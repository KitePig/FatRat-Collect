Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_link = require('./src/link.js');
const require_link$1 = require('./src/link2.js');

//#region ../../packages/components/link/index.ts
const ElLink = require_install.withInstall(require_link$1.default);

//#endregion
exports.ElLink = ElLink;
exports.default = ElLink;
exports.linkEmits = require_link.linkEmits;
exports.linkProps = require_link.linkProps;
//# sourceMappingURL=index.js.map
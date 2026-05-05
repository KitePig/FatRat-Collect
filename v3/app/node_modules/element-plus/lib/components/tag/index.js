Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_tag = require('./src/tag.js');
const require_tag$1 = require('./src/tag2.js');

//#region ../../packages/components/tag/index.ts
const ElTag = require_install.withInstall(require_tag$1.default);

//#endregion
exports.ElTag = ElTag;
exports.default = ElTag;
exports.tagEmits = require_tag.tagEmits;
exports.tagProps = require_tag.tagProps;
//# sourceMappingURL=index.js.map
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_segmented = require('./src/segmented.js');
const require_segmented$1 = require('./src/segmented2.js');

//#region ../../packages/components/segmented/index.ts
const ElSegmented = require_install.withInstall(require_segmented$1.default);

//#endregion
exports.ElSegmented = ElSegmented;
exports.default = ElSegmented;
exports.defaultProps = require_segmented.defaultProps;
exports.segmentedEmits = require_segmented.segmentedEmits;
exports.segmentedProps = require_segmented.segmentedProps;
//# sourceMappingURL=index.js.map
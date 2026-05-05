Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_watermark = require('./src/watermark.js');
const require_watermark$1 = require('./src/watermark2.js');

//#region ../../packages/components/watermark/index.ts
const ElWatermark = require_install.withInstall(require_watermark$1.default);

//#endregion
exports.ElWatermark = ElWatermark;
exports.default = ElWatermark;
exports.watermarkProps = require_watermark.watermarkProps;
//# sourceMappingURL=index.js.map
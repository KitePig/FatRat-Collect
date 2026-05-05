Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_progress = require('./src/progress.js');
const require_progress$1 = require('./src/progress2.js');

//#region ../../packages/components/progress/index.ts
const ElProgress = require_install.withInstall(require_progress$1.default);

//#endregion
exports.ElProgress = ElProgress;
exports.default = ElProgress;
exports.progressProps = require_progress.progressProps;
//# sourceMappingURL=index.js.map
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_cascader = require('./src/cascader.js');
const require_cascader$1 = require('./src/cascader2.js');

//#region ../../packages/components/cascader/index.ts
const ElCascader = require_install.withInstall(require_cascader$1.default);

//#endregion
exports.ElCascader = ElCascader;
exports.default = ElCascader;
exports.cascaderEmits = require_cascader.cascaderEmits;
exports.cascaderProps = require_cascader.cascaderProps;
//# sourceMappingURL=index.js.map
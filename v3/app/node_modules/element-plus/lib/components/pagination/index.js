Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_constants = require('./src/constants.js');
const require_pagination = require('./src/pagination.js');

//#region ../../packages/components/pagination/index.ts
const ElPagination = require_install.withInstall(require_pagination.default);

//#endregion
exports.ElPagination = ElPagination;
exports.default = ElPagination;
exports.elPaginationKey = require_constants.elPaginationKey;
exports.paginationEmits = require_pagination.paginationEmits;
exports.paginationProps = require_pagination.paginationProps;
//# sourceMappingURL=index.js.map
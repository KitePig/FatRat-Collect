Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_breadcrumb = require('./src/breadcrumb.js');
const require_constants = require('./src/constants.js');
const require_breadcrumb$1 = require('./src/breadcrumb2.js');
const require_breadcrumb_item = require('./src/breadcrumb-item.js');
const require_breadcrumb_item$1 = require('./src/breadcrumb-item2.js');

//#region ../../packages/components/breadcrumb/index.ts
const ElBreadcrumb = require_install.withInstall(require_breadcrumb$1.default, { BreadcrumbItem: require_breadcrumb_item$1.default });
const ElBreadcrumbItem = require_install.withNoopInstall(require_breadcrumb_item$1.default);

//#endregion
exports.ElBreadcrumb = ElBreadcrumb;
exports.default = ElBreadcrumb;
exports.ElBreadcrumbItem = ElBreadcrumbItem;
exports.breadcrumbItemProps = require_breadcrumb_item.breadcrumbItemProps;
exports.breadcrumbKey = require_constants.breadcrumbKey;
exports.breadcrumbProps = require_breadcrumb.breadcrumbProps;
//# sourceMappingURL=index.js.map
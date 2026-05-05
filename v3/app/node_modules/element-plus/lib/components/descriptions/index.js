Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_description = require('./src/description.js');
const require_description$1 = require('./src/description2.js');
const require_description_item = require('./src/description-item.js');

//#region ../../packages/components/descriptions/index.ts
const ElDescriptions = require_install.withInstall(require_description$1.default, { DescriptionsItem: require_description_item.default });
const ElDescriptionsItem = require_install.withNoopInstall(require_description_item.default);

//#endregion
exports.ElDescriptions = ElDescriptions;
exports.default = ElDescriptions;
exports.ElDescriptionsItem = ElDescriptionsItem;
exports.descriptionItemProps = require_description_item.descriptionItemProps;
exports.descriptionProps = require_description.descriptionProps;
//# sourceMappingURL=index.js.map
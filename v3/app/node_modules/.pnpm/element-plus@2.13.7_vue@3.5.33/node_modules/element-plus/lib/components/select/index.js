Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_token = require('./src/token.js');
const require_option = require('./src/option2.js');
const require_select = require('./src/select.js');
const require_option_group = require('./src/option-group.js');
const require_select$1 = require('./src/select2.js');

//#region ../../packages/components/select/index.ts
const ElSelect = require_install.withInstall(require_select$1.default, {
	Option: require_option.default,
	OptionGroup: require_option_group.default
});
const ElOption = require_install.withNoopInstall(require_option.default);
const ElOptionGroup = require_install.withNoopInstall(require_option_group.default);

//#endregion
exports.ElOption = ElOption;
exports.ElOptionGroup = ElOptionGroup;
exports.ElSelect = ElSelect;
exports.default = ElSelect;
exports.selectEmits = require_select.selectEmits;
exports.selectGroupKey = require_token.selectGroupKey;
exports.selectKey = require_token.selectKey;
exports.selectProps = require_select.selectProps;
//# sourceMappingURL=index.js.map
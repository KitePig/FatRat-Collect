Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_radio = require('./src/radio.js');
const require_constants = require('./src/constants.js');
const require_radio$1 = require('./src/radio2.js');
const require_radio_button = require('./src/radio-button.js');
const require_radio_button$1 = require('./src/radio-button2.js');
const require_radio_group = require('./src/radio-group.js');
const require_radio_group$1 = require('./src/radio-group2.js');

//#region ../../packages/components/radio/index.ts
const ElRadio = require_install.withInstall(require_radio$1.default, {
	RadioButton: require_radio_button$1.default,
	RadioGroup: require_radio_group$1.default
});
const ElRadioGroup = require_install.withNoopInstall(require_radio_group$1.default);
const ElRadioButton = require_install.withNoopInstall(require_radio_button$1.default);

//#endregion
exports.ElRadio = ElRadio;
exports.default = ElRadio;
exports.ElRadioButton = ElRadioButton;
exports.ElRadioGroup = ElRadioGroup;
exports.radioButtonProps = require_radio_button.radioButtonProps;
exports.radioButtonPropsDefaults = require_radio_button.radioButtonPropsDefaults;
exports.radioDefaultProps = require_radio_group.radioDefaultProps;
exports.radioEmits = require_radio.radioEmits;
exports.radioGroupEmits = require_radio_group.radioGroupEmits;
exports.radioGroupKey = require_constants.radioGroupKey;
exports.radioGroupProps = require_radio_group.radioGroupProps;
exports.radioGroupPropsDefaults = require_radio_group.radioGroupPropsDefaults;
exports.radioProps = require_radio.radioProps;
exports.radioPropsBase = require_radio.radioPropsBase;
exports.radioPropsDefaults = require_radio.radioPropsDefaults;
//# sourceMappingURL=index.js.map
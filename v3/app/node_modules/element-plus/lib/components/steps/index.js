Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_steps = require('./src/steps.js');
const require_tokens = require('./src/tokens.js');
const require_steps$1 = require('./src/steps2.js');
const require_item = require('./src/item.js');
const require_item$1 = require('./src/item2.js');

//#region ../../packages/components/steps/index.ts
const ElSteps = require_install.withInstall(require_steps$1.default, { Step: require_item$1.default });
const ElStep = require_install.withNoopInstall(require_item$1.default);

//#endregion
exports.ElStep = ElStep;
exports.ElSteps = ElSteps;
exports.default = ElSteps;
exports.STEPS_INJECTION_KEY = require_tokens.STEPS_INJECTION_KEY;
exports.stepProps = require_item.stepProps;
exports.stepsEmits = require_steps.stepsEmits;
exports.stepsProps = require_steps.stepsProps;
//# sourceMappingURL=index.js.map
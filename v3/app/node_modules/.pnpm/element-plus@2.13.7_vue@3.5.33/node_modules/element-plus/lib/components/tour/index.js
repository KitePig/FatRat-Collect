Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_content = require('./src/content.js');
const require_tour = require('./src/tour.js');
const require_tour$1 = require('./src/tour2.js');
const require_step = require('./src/step.js');
const require_step$1 = require('./src/step2.js');

//#region ../../packages/components/tour/index.ts
const ElTour = require_install.withInstall(require_tour$1.default, { TourStep: require_step$1.default });
const ElTourStep = require_install.withNoopInstall(require_step$1.default);

//#endregion
exports.ElTour = ElTour;
exports.default = ElTour;
exports.ElTourStep = ElTourStep;
exports.tourContentEmits = require_content.tourContentEmits;
exports.tourContentProps = require_content.tourContentProps;
exports.tourEmits = require_tour.tourEmits;
exports.tourPlacements = require_content.tourPlacements;
exports.tourProps = require_tour.tourProps;
exports.tourStepEmits = require_step.tourStepEmits;
exports.tourStepProps = require_step.tourStepProps;
exports.tourStrategies = require_content.tourStrategies;
//# sourceMappingURL=index.js.map
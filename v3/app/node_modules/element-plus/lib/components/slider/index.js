Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_constants = require('./src/constants.js');
const require_slider = require('./src/slider.js');
const require_slider$1 = require('./src/slider2.js');

//#region ../../packages/components/slider/index.ts
const ElSlider = require_install.withInstall(require_slider$1.default);

//#endregion
exports.ElSlider = ElSlider;
exports.default = ElSlider;
exports.sliderContextKey = require_constants.sliderContextKey;
exports.sliderEmits = require_slider.sliderEmits;
exports.sliderProps = require_slider.sliderProps;
//# sourceMappingURL=index.js.map
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_scrollbar = require('./src/scrollbar.js');
const require_util = require('./src/util.js');
const require_thumb = require('./src/thumb.js');
const require_constants = require('./src/constants.js');
const require_scrollbar$1 = require('./src/scrollbar2.js');

//#region ../../packages/components/scrollbar/index.ts
const ElScrollbar = require_install.withInstall(require_scrollbar$1.default);

//#endregion
exports.BAR_MAP = require_util.BAR_MAP;
exports.ElScrollbar = ElScrollbar;
exports.default = ElScrollbar;
exports.GAP = require_util.GAP;
exports.renderThumbStyle = require_util.renderThumbStyle;
exports.scrollbarContextKey = require_constants.scrollbarContextKey;
exports.scrollbarEmits = require_scrollbar.scrollbarEmits;
exports.scrollbarProps = require_scrollbar.scrollbarProps;
exports.thumbProps = require_thumb.thumbProps;
//# sourceMappingURL=index.js.map
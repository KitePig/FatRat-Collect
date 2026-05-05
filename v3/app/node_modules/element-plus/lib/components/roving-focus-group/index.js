Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_roving_focus_group = require('./src/roving-focus-group.js');
const require_tokens = require('./src/tokens.js');
const require_utils = require('./src/utils.js');
const require_roving_focus_group$1 = require('./src/roving-focus-group2.js');
const require_roving_focus_item = require('./src/roving-focus-item.js');

//#region ../../packages/components/roving-focus-group/index.ts
var roving_focus_group_default$1 = require_roving_focus_group$1.default;

//#endregion
exports.ElRovingFocusGroup = require_roving_focus_group$1.default;
exports.ElRovingFocusItem = require_roving_focus_item.default;
exports.ROVING_FOCUS_COLLECTION_INJECTION_KEY = require_roving_focus_group.ROVING_FOCUS_COLLECTION_INJECTION_KEY;
exports.ROVING_FOCUS_GROUP_INJECTION_KEY = require_tokens.ROVING_FOCUS_GROUP_INJECTION_KEY;
exports.ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY = require_tokens.ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY;
exports.ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY = require_roving_focus_group.ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY;
exports.default = roving_focus_group_default$1;
exports.focusFirst = require_utils.focusFirst;
exports.getFocusIntent = require_utils.getFocusIntent;
exports.reorderArray = require_utils.reorderArray;
//# sourceMappingURL=index.js.map
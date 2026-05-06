Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_tokens = require('./src/tokens.js');
const require_utils = require('./src/utils.js');
const require_focus_trap = require('./src/focus-trap.js');

//#region ../../packages/components/focus-trap/index.ts
var focus_trap_default$1 = require_focus_trap.default;

//#endregion
exports.ElFocusTrap = require_focus_trap.default;
exports.FOCUSOUT_PREVENTED = require_tokens.FOCUSOUT_PREVENTED;
exports.FOCUSOUT_PREVENTED_OPTS = require_tokens.FOCUSOUT_PREVENTED_OPTS;
exports.FOCUS_AFTER_RELEASED = require_tokens.FOCUS_AFTER_RELEASED;
exports.FOCUS_AFTER_TRAPPED = require_tokens.FOCUS_AFTER_TRAPPED;
exports.FOCUS_AFTER_TRAPPED_OPTS = require_tokens.FOCUS_AFTER_TRAPPED_OPTS;
exports.FOCUS_TRAP_INJECTION_KEY = require_tokens.FOCUS_TRAP_INJECTION_KEY;
exports.ON_RELEASE_FOCUS_EVT = require_tokens.ON_RELEASE_FOCUS_EVT;
exports.ON_TRAP_FOCUS_EVT = require_tokens.ON_TRAP_FOCUS_EVT;
exports.createFocusOutPreventedEvent = require_utils.createFocusOutPreventedEvent;
exports.default = focus_trap_default$1;
exports.focusFirstDescendant = require_utils.focusFirstDescendant;
exports.focusableStack = require_utils.focusableStack;
exports.getEdges = require_utils.getEdges;
exports.getVisibleElement = require_utils.getVisibleElement;
exports.isFocusCausedByUserEvent = require_utils.isFocusCausedByUserEvent;
exports.isHidden = require_utils.isHidden;
exports.obtainAllFocusableElements = require_utils.obtainAllFocusableElements;
exports.tryFocus = require_utils.tryFocus;
exports.useFocusReason = require_utils.useFocusReason;
//# sourceMappingURL=index.js.map
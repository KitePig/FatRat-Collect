Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.js');
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/utils/browser.ts
const isFirefox = () => _vueuse_core.isClient && /firefox/i.test(window.navigator.userAgent);
const isAndroid = () => _vueuse_core.isClient && /android/i.test(window.navigator.userAgent);

//#endregion
exports.isAndroid = isAndroid;
exports.isClient = _vueuse_core.isClient;
exports.isFirefox = isFirefox;
exports.isIOS = _vueuse_core.isIOS;
//# sourceMappingURL=browser.js.map
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.js');
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/utils/raf.ts
const rAF = (fn) => _vueuse_core.isClient ? window.requestAnimationFrame(fn) : setTimeout(fn, 16);
const cAF = (handle) => _vueuse_core.isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle);

//#endregion
exports.cAF = cAF;
exports.rAF = rAF;
//# sourceMappingURL=raf.js.map
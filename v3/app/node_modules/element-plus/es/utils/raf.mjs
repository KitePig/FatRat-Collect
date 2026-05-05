import { isClient } from "./browser.mjs";

//#region ../../packages/utils/raf.ts
const rAF = (fn) => isClient ? window.requestAnimationFrame(fn) : setTimeout(fn, 16);
const cAF = (handle) => isClient ? window.cancelAnimationFrame(handle) : clearTimeout(handle);

//#endregion
export { cAF, rAF };
//# sourceMappingURL=raf.mjs.map
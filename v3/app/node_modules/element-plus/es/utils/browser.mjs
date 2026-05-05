import { isClient, isIOS } from "@vueuse/core";

//#region ../../packages/utils/browser.ts
const isFirefox = () => isClient && /firefox/i.test(window.navigator.userAgent);
const isAndroid = () => isClient && /android/i.test(window.navigator.userAgent);

//#endregion
export { isAndroid, isClient, isFirefox, isIOS };
//# sourceMappingURL=browser.mjs.map
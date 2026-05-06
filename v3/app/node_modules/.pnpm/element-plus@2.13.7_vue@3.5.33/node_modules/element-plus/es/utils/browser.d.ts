import { isClient, isIOS } from "@vueuse/core";

//#region ../../packages/utils/browser.d.ts
declare const isFirefox: () => boolean;
declare const isAndroid: () => boolean;
//#endregion
export { isAndroid, isClient, isFirefox, isIOS };
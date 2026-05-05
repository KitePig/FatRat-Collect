import { ConfigProviderContext } from "./components/config-provider/src/constants.js";
import "./components/config-provider/index.js";
import { App, Plugin } from "vue";

//#region ../../packages/element-plus/make-installer.d.ts
declare const makeInstaller: (components?: Plugin[]) => {
  version: string;
  install: (app: App, options?: ConfigProviderContext) => void;
};
//#endregion
export { makeInstaller };
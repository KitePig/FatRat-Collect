import { ConfigProviderContext } from "./components/config-provider/src/constants.js";
import "./components/index.js";
import * as vue from "vue";

//#region ../../packages/element-plus/defaults.d.ts
declare const _default: {
  version: string;
  install: (app: vue.App, options?: ConfigProviderContext) => void;
};
//#endregion
export { _default };
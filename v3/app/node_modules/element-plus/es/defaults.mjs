import component_default from "./component.mjs";
import { makeInstaller } from "./make-installer.mjs";
import plugin_default from "./plugin.mjs";

//#region ../../packages/element-plus/defaults.ts
var defaults_default = makeInstaller([...component_default, ...plugin_default]);

//#endregion
export { defaults_default as default };
//# sourceMappingURL=defaults.mjs.map
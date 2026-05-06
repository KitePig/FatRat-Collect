import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { _default } from "./src/teleport.vue.js";
import { TeleportInstance, TeleportProps, TeleportPropsPublic, teleportProps } from "./src/teleport.js";

//#region ../../packages/components/teleport/index.d.ts
declare const ElTeleport: SFCWithInstall<typeof _default>;
//#endregion
export { ElTeleport, ElTeleport as default, TeleportInstance, TeleportProps, TeleportPropsPublic, teleportProps };
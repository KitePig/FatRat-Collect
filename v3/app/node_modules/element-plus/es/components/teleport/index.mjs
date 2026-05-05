import { withInstall } from "../../utils/vue/install.mjs";
import { teleportProps } from "./src/teleport.mjs";
import teleport_default from "./src/teleport2.mjs";

//#region ../../packages/components/teleport/index.ts
const ElTeleport = withInstall(teleport_default);

//#endregion
export { ElTeleport, ElTeleport as default, teleportProps };
//# sourceMappingURL=index.mjs.map
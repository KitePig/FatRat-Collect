import { withInstall } from "../../utils/vue/install.mjs";
import { drawerEmits, drawerProps } from "./src/drawer.mjs";
import drawer_default from "./src/drawer2.mjs";

//#region ../../packages/components/drawer/index.ts
const ElDrawer = withInstall(drawer_default);

//#endregion
export { ElDrawer, ElDrawer as default, drawerEmits, drawerProps };
//# sourceMappingURL=index.mjs.map
import { withInstall } from "../../utils/vue/install.mjs";
import { popconfirmEmits, popconfirmProps } from "./src/popconfirm.mjs";
import popconfirm_default from "./src/popconfirm2.mjs";

//#region ../../packages/components/popconfirm/index.ts
const ElPopconfirm = withInstall(popconfirm_default);

//#endregion
export { ElPopconfirm, ElPopconfirm as default, popconfirmEmits, popconfirmProps };
//# sourceMappingURL=index.mjs.map
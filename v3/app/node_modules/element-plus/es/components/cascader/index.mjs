import { withInstall } from "../../utils/vue/install.mjs";
import { cascaderEmits, cascaderProps } from "./src/cascader.mjs";
import cascader_default from "./src/cascader2.mjs";

//#region ../../packages/components/cascader/index.ts
const ElCascader = withInstall(cascader_default);

//#endregion
export { ElCascader, ElCascader as default, cascaderEmits, cascaderProps };
//# sourceMappingURL=index.mjs.map
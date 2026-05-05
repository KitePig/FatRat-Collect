import { withInstall } from "../../utils/vue/install.mjs";
import { CommonProps, DefaultProps, cascaderPanelEmits, cascaderPanelProps, useCascaderConfig } from "./src/config.mjs";
import { CASCADER_PANEL_INJECTION_KEY } from "./src/types.mjs";
import src_default from "./src/index.mjs";

//#region ../../packages/components/cascader-panel/index.ts
const ElCascaderPanel = withInstall(src_default);

//#endregion
export { CASCADER_PANEL_INJECTION_KEY, CommonProps, DefaultProps, ElCascaderPanel, ElCascaderPanel as default, cascaderPanelEmits, cascaderPanelProps, useCascaderConfig };
//# sourceMappingURL=index.mjs.map
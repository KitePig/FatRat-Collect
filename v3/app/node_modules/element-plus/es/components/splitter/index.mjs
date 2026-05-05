import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { splitterEmits, splitterProps } from "./src/splitter.mjs";
import splitter_default from "./src/splitter2.mjs";
import { splitterPanelEmits, splitterPanelProps } from "./src/split-panel.mjs";
import split_panel_default from "./src/split-panel2.mjs";

//#region ../../packages/components/splitter/index.ts
const ElSplitter = withInstall(splitter_default, { SplitPanel: split_panel_default });
const ElSplitterPanel = withNoopInstall(split_panel_default);

//#endregion
export { ElSplitter, ElSplitter as default, ElSplitterPanel, splitterEmits, splitterPanelEmits, splitterPanelProps, splitterProps };
//# sourceMappingURL=index.mjs.map
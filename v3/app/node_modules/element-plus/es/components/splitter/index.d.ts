import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { SplitterEmits, SplitterInstance, SplitterProps, SplitterPropsPublic, splitterEmits, splitterProps } from "./src/splitter.js";
import { _default } from "./src/splitter.vue.js";
import { SplitterPanelEmits, SplitterPanelInstance, SplitterPanelProps, SplitterPanelPropsPublic, splitterPanelEmits, splitterPanelProps } from "./src/split-panel.js";
import { _default as _default$1 } from "./src/split-panel.vue.js";

//#region ../../packages/components/splitter/index.d.ts
declare const ElSplitter: SFCWithInstall<typeof _default> & {
  SplitPanel: typeof _default$1;
};
declare const ElSplitterPanel: SFCWithInstall<typeof _default$1>;
//#endregion
export { ElSplitter, ElSplitter as default, ElSplitterPanel, SplitterEmits, SplitterInstance, SplitterPanelEmits, SplitterPanelInstance, SplitterPanelProps, SplitterPanelPropsPublic, SplitterProps, SplitterPropsPublic, splitterEmits, splitterPanelEmits, splitterPanelProps, splitterProps };
import { SFCWithInstall } from "../../utils/vue/typescript.js";
import { Nullable } from "../../utils/typescript.js";
import "../../utils/index.js";
import { Node } from "./src/node.js";
import { CASCADER_PANEL_INJECTION_KEY, CascaderConfig, CascaderNodePathValue, CascaderNodeValue, CascaderOption, CascaderProps, CascaderValue, ElCascaderPanelContext, ExpandTrigger, LazyLoad, RenderLabel, RenderLabelProps, Resolve, Tag, isDisabled, isLeaf } from "./src/types.js";
import { CascaderMenuInstance, CascaderPanelInstance } from "./src/instance.js";
import { CascaderCommonProps, CascaderPanelProps, CommonProps, DefaultProps, cascaderPanelEmits, cascaderPanelProps, useCascaderConfig } from "./src/config.js";
import { _default } from "./src/index.vue.js";

//#region ../../packages/components/cascader-panel/index.d.ts
declare const ElCascaderPanel: SFCWithInstall<typeof _default>;
//#endregion
export { CASCADER_PANEL_INJECTION_KEY, CascaderCommonProps, CascaderConfig, CascaderMenuInstance, Node as CascaderNode, CascaderNodePathValue, CascaderNodeValue, CascaderOption, CascaderPanelInstance, CascaderPanelProps, CascaderProps, CascaderValue, CommonProps, DefaultProps, ElCascaderPanel, ElCascaderPanel as default, ElCascaderPanelContext, ExpandTrigger, LazyLoad, Nullable, RenderLabel, RenderLabelProps, Resolve, Tag, cascaderPanelEmits, cascaderPanelProps, isDisabled, isLeaf, useCascaderConfig };
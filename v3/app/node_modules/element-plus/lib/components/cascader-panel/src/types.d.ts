import { Nullable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { Node } from "./node.js";
import { InjectionKey, VNode } from "vue";

//#region ../../packages/components/cascader-panel/src/types.d.ts
type CascaderNodeValue = string | number | Record<string, any>;
type CascaderNodePathValue = CascaderNodeValue[];
type CascaderValue = CascaderNodeValue | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[];
type CascaderConfig = Required<CascaderProps>;
type ExpandTrigger = 'click' | 'hover';
type isDisabled = (data: CascaderOption, node: Node) => boolean;
type isLeaf = (data: CascaderOption, node: Node) => boolean;
type Resolve = (dataList?: CascaderOption[]) => void;
type LazyLoad = (node: Node, resolve: Resolve, reject: () => void) => void;
interface RenderLabelProps {
  node: Node;
  data: CascaderOption;
}
type RenderLabel = (props: RenderLabelProps) => VNode | VNode[];
interface CascaderOption extends Record<string, unknown> {
  label?: string;
  value?: CascaderNodeValue;
  children?: CascaderOption[];
  disabled?: boolean;
  leaf?: boolean;
}
interface CascaderProps {
  expandTrigger?: ExpandTrigger;
  multiple?: boolean;
  checkStrictly?: boolean;
  emitPath?: boolean;
  lazy?: boolean;
  lazyLoad?: LazyLoad;
  value?: string;
  label?: string;
  children?: string;
  disabled?: string | isDisabled;
  leaf?: string | isLeaf;
  hoverThreshold?: number;
  checkOnClickNode?: boolean;
  checkOnClickLeaf?: boolean;
  showPrefix?: boolean;
}
interface Tag {
  node?: Node;
  key: number;
  text: string;
  hitState?: boolean;
  closable: boolean;
}
interface ElCascaderPanelContext {
  config: CascaderConfig;
  expandingNode: Node | undefined;
  checkedNodes: Node[];
  isHoverMenu: boolean;
  initialLoaded: boolean;
  renderLabelFn?: RenderLabel;
  lazyLoad: (node?: Node, cb?: (dataList: CascaderOption[]) => void) => void;
  expandNode: (node: Node, silent?: boolean) => void;
  handleCheckChange: (node: Node, checked: boolean, emitClose?: boolean) => void;
}
declare const CASCADER_PANEL_INJECTION_KEY: InjectionKey<ElCascaderPanelContext>;
//#endregion
export { CASCADER_PANEL_INJECTION_KEY, CascaderConfig, CascaderNodePathValue, CascaderNodeValue, CascaderOption, CascaderProps, CascaderValue, ElCascaderPanelContext, ExpandTrigger, LazyLoad, RenderLabel, RenderLabelProps, Resolve, Tag, isDisabled, isLeaf };
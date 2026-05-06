import { TableLayout } from "../table-layout.js";
import { DefaultRow, Table } from "../table/defaults.js";
import { TableBodyProps } from "./defaults.js";
import "../../../../index.js";
import * as vue from "vue";
import { VNode } from "vue";

//#region ../../packages/components/table/src/table-body/index.d.ts
declare const _default: vue.DefineComponent<vue.ExtractPropTypes<{
  store: {
    required: boolean;
    type: vue.PropType<TableBodyProps<any>["store"]>;
  };
  stripe: BooleanConstructor;
  tooltipEffect: StringConstructor;
  tooltipOptions: {
    type: vue.PropType<TableBodyProps<any>["tooltipOptions"]>;
  };
  context: {
    default: () => {};
    type: vue.PropType<TableBodyProps<any>["context"]>;
  };
  rowClassName: vue.PropType<TableBodyProps<any>["rowClassName"]>;
  rowStyle: vue.PropType<TableBodyProps<any>["rowStyle"]>;
  fixed: {
    type: StringConstructor;
    default: string;
  };
  highlight: BooleanConstructor;
}>, {
  ns: {
    namespace: vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  onColumnsChange: (layout: TableLayout<DefaultRow>) => void;
  onScrollableChange: (layout: TableLayout<DefaultRow>) => void;
  wrappedRowRender: (row: any, $index: number) => VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }> | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>[] | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>[][];
  tooltipContent: vue.Ref<string, string>;
  tooltipTrigger: vue.Ref<VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>, VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  store: {
    required: boolean;
    type: vue.PropType<TableBodyProps<any>["store"]>;
  };
  stripe: BooleanConstructor;
  tooltipEffect: StringConstructor;
  tooltipOptions: {
    type: vue.PropType<TableBodyProps<any>["tooltipOptions"]>;
  };
  context: {
    default: () => {};
    type: vue.PropType<TableBodyProps<any>["context"]>;
  };
  rowClassName: vue.PropType<TableBodyProps<any>["rowClassName"]>;
  rowStyle: vue.PropType<TableBodyProps<any>["rowStyle"]>;
  fixed: {
    type: StringConstructor;
    default: string;
  };
  highlight: BooleanConstructor;
}>> & Readonly<{}>, {
  fixed: string;
  context: Table<any>;
  stripe: boolean;
  highlight: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };
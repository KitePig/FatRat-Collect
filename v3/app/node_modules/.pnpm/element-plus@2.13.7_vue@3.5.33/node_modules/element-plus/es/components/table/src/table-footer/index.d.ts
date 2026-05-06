import { TableColumnCtx } from "../table-column/defaults.js";
import { Store } from "../store/index.js";
import { TableLayout } from "../table-layout.js";
import { DefaultRow, Sort, SummaryMethod } from "../table/defaults.js";
import * as vue from "vue";
import { PropType } from "vue";

//#region ../../packages/components/table/src/table-footer/index.d.ts
interface TableFooter<T extends DefaultRow> {
  fixed: string;
  store: Store<T>;
  summaryMethod: SummaryMethod<T>;
  sumText: string;
  border: boolean;
  defaultSort: Sort;
}
declare const _default: vue.DefineComponent<vue.ExtractPropTypes<{
  fixed: {
    type: StringConstructor;
    default: string;
  };
  store: {
    required: true;
    type: PropType<TableFooter<any>["store"]>;
  };
  summaryMethod: PropType<TableFooter<any>["summaryMethod"]>;
  sumText: StringConstructor;
  border: BooleanConstructor;
  defaultSort: {
    type: PropType<TableFooter<any>["defaultSort"]>;
    default: () => {
      prop: string;
      order: string;
    };
  };
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
  onScrollableChange: (layout: TableLayout<any>) => void;
  onColumnsChange: (layout: TableLayout<any>) => void;
  getCellClasses: (columns: TableColumnCtx<any>[], cellIndex: number) => string[];
  getCellStyles: (column: TableColumnCtx<any>, cellIndex: number) => vue.CSSProperties | undefined;
  columns: vue.ComputedRef<TableColumnCtx<DefaultRow>[]>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  fixed: {
    type: StringConstructor;
    default: string;
  };
  store: {
    required: true;
    type: PropType<TableFooter<any>["store"]>;
  };
  summaryMethod: PropType<TableFooter<any>["summaryMethod"]>;
  sumText: StringConstructor;
  border: BooleanConstructor;
  defaultSort: {
    type: PropType<TableFooter<any>["defaultSort"]>;
    default: () => {
      prop: string;
      order: string;
    };
  };
}>> & Readonly<{}>, {
  fixed: string;
  border: boolean;
  defaultSort: Sort;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { TableFooter, _default as default };
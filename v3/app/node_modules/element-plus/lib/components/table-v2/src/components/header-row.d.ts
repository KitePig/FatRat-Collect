import { ColumnCellsType, KeyType } from "../types.js";
import { AnyColumn } from "../common.js";
import { TableV2HeaderRowProps } from "../header-row.js";
import * as vue from "vue";
import { CSSProperties } from "vue";
import * as vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/table-v2/src/components/header-row.d.ts
declare const TableV2HeaderRow: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly class: StringConstructor;
  readonly columns: {
    readonly type: vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columnsStyles: {
    readonly type: vue.PropType<Record<KeyType, CSSProperties>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerIndex: NumberConstructor;
  readonly style: {
    readonly type: vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => vue_jsx_runtime0.JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly class: StringConstructor;
  readonly columns: {
    readonly type: vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columnsStyles: {
    readonly type: vue.PropType<Record<KeyType, CSSProperties>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerIndex: NumberConstructor;
  readonly style: {
    readonly type: vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type TableV2HeaderRowCellRendererParams = {
  columns: TableV2HeaderRowProps['columns'];
  column: TableV2HeaderRowProps['columns'][number];
  columnIndex: number;
  headerIndex: number;
  style: CSSProperties;
};
type TableV2HeaderRowRendererParams = {
  cells: ColumnCellsType;
  columns: TableV2HeaderRowProps['columns'];
  headerIndex: number;
};
//#endregion
export { TableV2HeaderRow, TableV2HeaderRowCellRendererParams, TableV2HeaderRowRendererParams };
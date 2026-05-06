import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import "../../../../utils/index.js";
import { KeyType } from "../types.js";
import { AnyColumn } from "../common.js";
import { RowEventHandlers, RowExpandHandler, RowHeightChangeHandler, RowHoverHandler, TableV2RowProps } from "../row.js";
import * as vue from "vue";
import { CSSProperties, VNode } from "vue";
import * as vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/table-v2/src/components/row.d.ts
declare const TableV2Row: vue.DefineComponent<vue.ExtractPropTypes<{
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
  readonly depth: NumberConstructor;
  readonly expandColumnKey: StringConstructor;
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly isScrolling: BooleanConstructor;
  readonly onRowExpand: {
    readonly type: vue.PropType<RowExpandHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHover: {
    readonly type: vue.PropType<RowHoverHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHeightChange: {
    readonly type: vue.PropType<RowHeightChangeHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowData: {
    readonly type: vue.PropType<any>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowEventHandlers: {
    readonly type: vue.PropType<RowEventHandlers>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowIndex: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
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
  readonly depth: NumberConstructor;
  readonly expandColumnKey: StringConstructor;
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly isScrolling: BooleanConstructor;
  readonly onRowExpand: {
    readonly type: vue.PropType<RowExpandHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHover: {
    readonly type: vue.PropType<RowHoverHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHeightChange: {
    readonly type: vue.PropType<RowHeightChangeHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowData: {
    readonly type: vue.PropType<any>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowEventHandlers: {
    readonly type: vue.PropType<RowEventHandlers>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowIndex: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly style: {
    readonly type: vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  readonly rowKey: EpPropMergeType<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown>;
  readonly estimatedRowHeight: number;
  readonly isScrolling: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type TableV2RowCellRenderParam = {
  column: TableV2RowProps['columns'][number];
  columns: TableV2RowProps['columns'];
  columnIndex: number;
  depth: number;
  style: CSSProperties;
  rowData: any;
  rowIndex: number;
  isScrolling: boolean;
  expandIconProps?: {
    rowData: any;
    rowIndex: number;
    onExpand: (expand: boolean) => void;
  };
};
type TableV2RowSlotProps = {
  cells: VNode[];
  columns: TableV2RowProps['columns'];
  depth: number;
  style: TableV2RowProps['style'];
  rowData: any;
  rowIndex: number;
  isScrolling: boolean;
};
//#endregion
export { TableV2Row, TableV2RowCellRenderParam, TableV2RowSlotProps };
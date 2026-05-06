import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { Alignment } from "../../virtual-list/src/types.js";
import { SortOrder } from "./constants.js";
import { DataGetter, KeyType, SortBy, SortState, TableV2CustomizedHeaderSlotParam } from "./types.js";
import { AnyColumn } from "./common.js";
import { RowEventHandlers, RowExpandHandler } from "./row.js";
import { onRowRenderedParams } from "./grid.js";
import { ColumnSortHandler, ExpandedRowsChangeHandler, ExtraCellPropGetter, HeaderClassNameGetter, RowClassNameGetter } from "./table.js";
import "./composables/use-scrollbar.js";
import { TableV2HeaderRowCellRendererParams } from "./components/header-row.js";
import { TableV2RowCellRenderParam, TableV2RowSlotProps } from "./components/row.js";
import "./components/index.js";
import "../../../index.js";
import * as vue from "vue";
import { CSSProperties, SlotsType } from "vue";
import * as vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/table-v2/src/table-v2.d.ts
type TableV2Slots = {
  row?: (props: TableV2RowSlotProps) => any;
  cell?: (props: TableV2RowCellRenderParam) => any;
  header?: (props: TableV2CustomizedHeaderSlotParam) => any;
  'header-cell'?: (props: TableV2HeaderRowCellRendererParams) => any;
  footer?: () => any;
  empty?: () => any;
  overlay?: () => any;
};
declare const TableV2: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly headerClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HeaderClassNameGetter<any>) | (() => string | HeaderClassNameGetter<any>) | (((new (...args: any[]) => string | HeaderClassNameGetter<any>) | (() => string | HeaderClassNameGetter<any>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerProps: {
    readonly type: vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerCellProps: {
    readonly type: vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerHeight: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown, 50, boolean>;
  readonly footerHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly rowClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | RowClassNameGetter<any>) | (() => string | RowClassNameGetter<any>) | (((new (...args: any[]) => string | RowClassNameGetter<any>) | (() => string | RowClassNameGetter<any>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowProps: {
    readonly type: vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 50, boolean>;
  readonly cellProps: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => Record<string, any> | ExtraCellPropGetter<any>) | (() => Record<string, any> | ExtraCellPropGetter<any>) | (((new (...args: any[]) => Record<string, any> | ExtraCellPropGetter<any>) | (() => Record<string, any> | ExtraCellPropGetter<any>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columns: {
    readonly type: vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly data: {
    readonly type: vue.PropType<any[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly dataGetter: {
    readonly type: vue.PropType<DataGetter<any>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fixedData: {
    readonly type: vue.PropType<any[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly expandColumnKey: StringConstructor;
  readonly expandedRowKeys: EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | (((new (...args: any[]) => KeyType[]) | (() => KeyType[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly defaultExpandedRowKeys: EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | (((new (...args: any[]) => KeyType[]) | (() => KeyType[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly class: StringConstructor;
  readonly fixed: BooleanConstructor;
  readonly style: {
    readonly type: vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly width: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly maxHeight: NumberConstructor;
  readonly useIsScrolling: BooleanConstructor;
  readonly indentSize: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly iconSize: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly hScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly vScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly sortBy: EpPropFinalized<(new (...args: any[]) => SortBy) | (() => SortBy) | (((new (...args: any[]) => SortBy) | (() => SortBy)) | null)[], unknown, unknown, () => {
    key: KeyType;
    order: SortOrder;
  }, boolean>;
  readonly sortState: EpPropFinalized<(new (...args: any[]) => SortState) | (() => SortState) | (((new (...args: any[]) => SortState) | (() => SortState)) | null)[], unknown, unknown, undefined, boolean>;
  readonly onColumnSort: {
    readonly type: vue.PropType<ColumnSortHandler<any>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onExpandedRowsChange: {
    readonly type: vue.PropType<ExpandedRowsChangeHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onEndReached: {
    readonly type: vue.PropType<(remainDistance: number) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowExpand: {
    readonly type: vue.PropType<RowExpandHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onScroll: {
    readonly type: vue.PropType<(...args: any[]) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowsRendered: {
    readonly type: vue.PropType<(params: onRowRenderedParams) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowEventHandlers: {
    readonly type: vue.PropType<RowEventHandlers>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => vue_jsx_runtime0.JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly headerClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HeaderClassNameGetter<any>) | (() => string | HeaderClassNameGetter<any>) | (((new (...args: any[]) => string | HeaderClassNameGetter<any>) | (() => string | HeaderClassNameGetter<any>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerProps: {
    readonly type: vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerCellProps: {
    readonly type: vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerHeight: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown, 50, boolean>;
  readonly footerHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly rowClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | RowClassNameGetter<any>) | (() => string | RowClassNameGetter<any>) | (((new (...args: any[]) => string | RowClassNameGetter<any>) | (() => string | RowClassNameGetter<any>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowProps: {
    readonly type: vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 50, boolean>;
  readonly cellProps: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => Record<string, any> | ExtraCellPropGetter<any>) | (() => Record<string, any> | ExtraCellPropGetter<any>) | (((new (...args: any[]) => Record<string, any> | ExtraCellPropGetter<any>) | (() => Record<string, any> | ExtraCellPropGetter<any>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columns: {
    readonly type: vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly data: {
    readonly type: vue.PropType<any[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly dataGetter: {
    readonly type: vue.PropType<DataGetter<any>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fixedData: {
    readonly type: vue.PropType<any[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly expandColumnKey: StringConstructor;
  readonly expandedRowKeys: EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | (((new (...args: any[]) => KeyType[]) | (() => KeyType[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly defaultExpandedRowKeys: EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | (((new (...args: any[]) => KeyType[]) | (() => KeyType[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly class: StringConstructor;
  readonly fixed: BooleanConstructor;
  readonly style: {
    readonly type: vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly width: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly maxHeight: NumberConstructor;
  readonly useIsScrolling: BooleanConstructor;
  readonly indentSize: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly iconSize: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly hScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly vScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly sortBy: EpPropFinalized<(new (...args: any[]) => SortBy) | (() => SortBy) | (((new (...args: any[]) => SortBy) | (() => SortBy)) | null)[], unknown, unknown, () => {
    key: KeyType;
    order: SortOrder;
  }, boolean>;
  readonly sortState: EpPropFinalized<(new (...args: any[]) => SortState) | (() => SortState) | (((new (...args: any[]) => SortState) | (() => SortState)) | null)[], unknown, unknown, undefined, boolean>;
  readonly onColumnSort: {
    readonly type: vue.PropType<ColumnSortHandler<any>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onExpandedRowsChange: {
    readonly type: vue.PropType<ExpandedRowsChangeHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onEndReached: {
    readonly type: vue.PropType<(remainDistance: number) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowExpand: {
    readonly type: vue.PropType<RowExpandHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onScroll: {
    readonly type: vue.PropType<(...args: any[]) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowsRendered: {
    readonly type: vue.PropType<(params: onRowRenderedParams) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowEventHandlers: {
    readonly type: vue.PropType<RowEventHandlers>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  readonly fixed: boolean;
  readonly scrollbarAlwaysOn: boolean;
  readonly rowKey: EpPropMergeType<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown>;
  readonly headerHeight: EpPropMergeType<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown>;
  readonly sortBy: SortBy;
  readonly estimatedRowHeight: number;
  readonly useIsScrolling: boolean;
  readonly rowHeight: number;
  readonly hScrollbarSize: number;
  readonly vScrollbarSize: number;
  readonly cache: number;
  readonly footerHeight: number;
  readonly indentSize: number;
  readonly iconSize: number;
  readonly sortState: SortState;
  readonly expandedRowKeys: KeyType[];
  readonly defaultExpandedRowKeys: KeyType[];
}, SlotsType<TableV2Slots>, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type TableV2Instance = InstanceType<typeof TableV2> & {
  /**
   * @description scroll to a given position
   * @params params {{ scrollLeft?: number, scrollTop?: number }} where to scroll to.
   */
  scrollTo: (param: {
    scrollLeft?: number;
    scrollTop?: number;
  }) => void;
  /**
   * @description scroll to a given position horizontally
   * @params scrollLeft {Number} where to scroll to.
   */
  scrollToLeft: (scrollLeft: number) => void;
  /**
   * @description scroll to a given position vertically
   * @params scrollTop { Number } where to scroll to.
   */
  scrollToTop: (scrollTop: number) => void;
  /**
   * @description scroll to a given row
   * @params row {Number} which row to scroll to
   * @params strategy {ScrollStrategy} use what strategy to scroll to
   */
  scrollToRow(row: number, strategy?: Alignment): void;
};
//#endregion
export { TableV2, TableV2Instance };
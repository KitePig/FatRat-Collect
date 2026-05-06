import { TableOverflowTooltipFormatter, TableOverflowTooltipOptions } from "../util.js";
import { Store } from "../store/index.js";
import { DefaultRow, TableSortOrder } from "../table/defaults.js";
import { ComponentInternalInstance, PropType, Ref, VNode } from "vue";

//#region ../../packages/components/table/src/table-column/defaults.d.ts
type CI<T extends DefaultRow> = {
  column: TableColumnCtx<T>;
  $index: number;
  store: Store<T>;
  _self: any;
};
type Filters = {
  text: string;
  value: string;
}[];
type FilterMethods<T extends DefaultRow> = (value: string, row: T, column: TableColumnCtx<T>) => void;
type TableColumnCtx<T extends DefaultRow = DefaultRow> = {
  id: string;
  realWidth: number | null;
  type: string;
  label: string;
  className: string;
  labelClassName: string;
  property: string;
  prop: string;
  width?: string | number;
  minWidth: string | number;
  renderHeader: (data: CI<T>) => VNode;
  sortable: boolean | string;
  sortMethod: (a: T, b: T) => number;
  sortBy: string | ((row: T, index: number, array?: T[]) => string) | string[];
  resizable: boolean;
  columnKey: string;
  rawColumnKey: string;
  align: string;
  headerAlign: string;
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions;
  tooltipFormatter?: TableOverflowTooltipFormatter<T>;
  fixed: boolean | string;
  formatter: (row: T, column: TableColumnCtx<T>, cellValue: any, index: number) => VNode | string;
  selectable: (row: T, index: number) => boolean;
  reserveSelection: boolean;
  filterMethod: FilterMethods<T>;
  filteredValue: string[];
  filters: Filters;
  filterPlacement: string;
  filterMultiple: boolean;
  filterClassName: string;
  index: number | ((index: number) => number);
  sortOrders: (TableSortOrder | null)[];
  renderCell: (data: any) => VNode | VNode[];
  colSpan: number;
  rowSpan: number;
  children?: TableColumnCtx<T>[];
  level: number;
  filterable: boolean | FilterMethods<T> | Filters;
  order: TableSortOrder | null;
  isColumnGroup: boolean;
  isSubColumn: boolean;
  columns: TableColumnCtx<T>[];
  getColumnIndex: () => number;
  no: number;
  filterOpened?: boolean;
  renderFilterIcon?: (scope: any) => VNode;
  renderExpand?: (scope: any) => VNode;
};
//#endregion
export { type TableColumnCtx };
import { ComponentSize } from "../../../../constants/size.js";
import { Nullable } from "../../../../utils/typescript.js";
import "../../../../utils/index.js";
import { TableOverflowTooltipFormatter, TableOverflowTooltipOptions } from "../util.js";
import { TableColumnCtx } from "../table-column/defaults.js";
import { Store } from "../store/index.js";
import { TableLayout } from "../table-layout.js";
import { CSSProperties, ComponentInternalInstance, PropType, Ref, StyleValue, VNode } from "vue";

//#region ../../packages/components/table/src/table/defaults.d.ts
type DefaultRow = Record<PropertyKey, any>;
interface TableRefs {
  tableWrapper: HTMLElement;
  headerWrapper: HTMLElement;
  footerWrapper: HTMLElement;
  fixedBodyWrapper: HTMLElement;
  rightFixedBodyWrapper: HTMLElement;
  bodyWrapper: HTMLElement;
  appendWrapper: HTMLElement;
  [key: string]: any;
}
interface TableState {
  isGroup: Ref<boolean>;
  resizeState: Ref<{
    width: any;
    height: any;
  }>;
  doLayout: () => void;
  debouncedUpdateLayout: () => void;
}
interface TreeProps {
  hasChildren?: string;
  children?: string;
  checkStrictly?: boolean;
}
type HoverState<T extends DefaultRow> = Nullable<{
  cell: HTMLElement;
  column: TableColumnCtx<T>;
  row: T;
}>;
type RIS<T extends DefaultRow> = {
  row: T;
  $index: number;
  store: Store<T>;
  expanded: boolean;
};
type RenderExpanded<T extends DefaultRow> = ({
  row,
  $index,
  store,
  expanded
}: RIS<T>) => VNode[] | undefined;
type SummaryMethod<T extends DefaultRow> = (data: {
  columns: TableColumnCtx<T>[];
  data: T[];
}) => (string | VNode)[];
interface Table<T extends DefaultRow = any> extends ComponentInternalInstance {
  $ready: boolean;
  hoverState?: HoverState<T> | null;
  renderExpanded: RenderExpanded<T>;
  store: Store<T>;
  layout: TableLayout<T>;
  refs: TableRefs;
  tableId: string;
  state: TableState;
}
type ColumnCls<T> = string | ((data: {
  row: T;
  rowIndex: number;
}) => string);
type ColumnStyle<T> = CSSProperties | ((data: {
  row: T;
  rowIndex: number;
}) => CSSProperties);
type CellCls<T extends DefaultRow> = string | ((data: {
  row: T;
  rowIndex: number;
  column: TableColumnCtx<T>;
  columnIndex: number;
}) => string);
type CellStyle<T extends DefaultRow> = CSSProperties | ((data: {
  row: T;
  rowIndex: number;
  column: TableColumnCtx<T>;
  columnIndex: number;
}) => CSSProperties);
type Layout = 'fixed' | 'auto';
interface TableProps<T extends DefaultRow> {
  data: T[];
  size?: ComponentSize;
  width?: string | number;
  height?: string | number;
  maxHeight?: string | number;
  fit?: boolean;
  stripe?: boolean;
  border?: boolean;
  rowKey?: string | ((row: T) => string);
  context?: Table<T>;
  showHeader?: boolean;
  showSummary?: boolean;
  sumText?: string;
  summaryMethod?: SummaryMethod<T>;
  rowClassName?: ColumnCls<T>;
  rowStyle?: ColumnStyle<T>;
  cellClassName?: CellCls<T>;
  cellStyle?: CellStyle<T>;
  headerRowClassName?: ColumnCls<T>;
  headerRowStyle?: ColumnStyle<T>;
  headerCellClassName?: CellCls<T>;
  headerCellStyle?: CellStyle<T>;
  highlightCurrentRow?: boolean;
  currentRowKey?: string | number;
  emptyText?: string;
  expandRowKeys?: Array<string>;
  defaultExpandAll?: boolean;
  rowExpandable?: (row: T, index: number) => boolean;
  defaultSort?: Sort;
  tooltipEffect?: string;
  tooltipOptions?: TableOverflowTooltipOptions;
  spanMethod?: (data: {
    row: T;
    rowIndex: number;
    column: TableColumnCtx<T>;
    columnIndex: number;
  }) => number[] | {
    rowspan: number;
    colspan: number;
  } | undefined;
  selectOnIndeterminate?: boolean;
  indent?: number;
  treeProps?: TreeProps;
  lazy?: boolean;
  load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void;
  className?: string;
  style?: StyleValue;
  tableLayout?: Layout;
  scrollbarAlwaysOn?: boolean;
  flexible?: boolean;
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions;
  tooltipFormatter?: TableOverflowTooltipFormatter<T>;
  appendFilterPanelTo?: string;
  scrollbarTabindex?: number | string;
  nativeScrollbar?: boolean;
}
type TableTooltipData<T extends DefaultRow> = Parameters<TableOverflowTooltipFormatter<T>>[0];
type TableSortOrder = 'ascending' | 'descending';
interface Sort {
  prop: string;
  order: TableSortOrder;
  init?: any;
  silent?: any;
}
interface Filter<T extends DefaultRow> {
  column: TableColumnCtx<T>;
  values: string[];
  silent: any;
}
interface TreeNode {
  expanded?: boolean;
  loading?: boolean;
  noLazyChildren?: boolean;
  indent?: number;
  level?: number;
  display?: boolean;
}
interface RenderRowData<T extends DefaultRow> {
  store: Store<T>;
  _self: Table<T>;
  column: TableColumnCtx<T>;
  row: T;
  $index: number;
  cellIndex: number;
  treeNode?: TreeNode;
  expanded: boolean;
}
interface TableConfigContext {
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions;
  tooltipEffect?: string;
  tooltipOptions?: TableOverflowTooltipOptions;
  tooltipFormatter?: TableOverflowTooltipFormatter<any>;
}
//#endregion
export { type CellCls, type CellStyle, type ColumnCls, type ColumnStyle, type DefaultRow, type Filter, type RenderExpanded, type RenderRowData, type Sort, type SummaryMethod, type Table, type TableConfigContext, type TableProps, type TableRefs, type TableSortOrder, type TableTooltipData, type TreeNode, type TreeProps };
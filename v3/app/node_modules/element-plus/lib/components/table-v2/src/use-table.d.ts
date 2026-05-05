import { Alignment } from "../../virtual-list/src/types.js";
import { Alignment as Alignment$1, AnyColumns, CellRenderer, ClassNameGetter, FixedDirection, HeaderCellRenderer, HeaderClassGetter, KeyType } from "./types.js";
import { RowExpandParams, RowHeightChangedParams, RowHoverParams } from "./row.js";
import { onRowRenderedParams } from "./grid.js";
import { TableV2Props } from "./table.js";
import { TableGridInstance } from "./table-grid.js";
import { ScrollPos } from "./composables/use-scrollbar.js";
import "./composables/index.js";
import "../../../index.js";
import * as vue from "vue";

//#region ../../packages/components/table-v2/src/use-table.d.ts
declare function useTable(props: TableV2Props): {
  columns: vue.ComputedRef<{
    key: KeyType;
    align?: Alignment$1;
    class?: string | ClassNameGetter<any> | undefined;
    dataKey?: KeyType;
    fixed?: true | FixedDirection;
    flexGrow?: vue.CSSProperties["flexGrow"];
    flexShrink?: vue.CSSProperties["flexShrink"];
    title?: string;
    hidden?: boolean;
    headerClass?: string | HeaderClassGetter<any> | undefined;
    maxWidth?: number;
    minWidth?: number;
    style?: vue.CSSProperties;
    sortable?: boolean;
    width: number;
    cellRenderer?: CellRenderer<any> | undefined;
    headerCellRenderer?: HeaderCellRenderer<any> | undefined;
  }[]>;
  containerRef: vue.Ref<any, any>;
  mainTableRef: vue.Ref<TableGridInstance | undefined, TableGridInstance | undefined>;
  leftTableRef: vue.Ref<TableGridInstance | undefined, TableGridInstance | undefined>;
  rightTableRef: vue.Ref<TableGridInstance | undefined, TableGridInstance | undefined>;
  isDynamic: vue.ComputedRef<boolean>;
  isResetting: vue.ShallowRef<boolean, boolean>;
  isScrolling: vue.ShallowRef<boolean, boolean>;
  hasFixedColumns: vue.ComputedRef<number>;
  columnsStyles: vue.ComputedRef<Record<KeyType, vue.CSSProperties>>;
  columnsTotalWidth: vue.ComputedRef<number>;
  data: vue.ComputedRef<any[]>;
  expandedRowKeys: vue.Ref<KeyType[], KeyType[]>;
  depthMap: vue.Ref<Record<KeyType, number>, Record<KeyType, number>>;
  fixedColumnsOnLeft: vue.ComputedRef<{
    key: KeyType;
    align?: Alignment$1;
    class?: string | ClassNameGetter<any> | undefined;
    dataKey?: KeyType;
    fixed?: true | FixedDirection;
    flexGrow?: vue.CSSProperties["flexGrow"];
    flexShrink?: vue.CSSProperties["flexShrink"];
    title?: string;
    hidden?: boolean;
    headerClass?: string | HeaderClassGetter<any> | undefined;
    maxWidth?: number;
    minWidth?: number;
    style?: vue.CSSProperties;
    sortable?: boolean;
    width: number;
    cellRenderer?: CellRenderer<any> | undefined;
    headerCellRenderer?: HeaderCellRenderer<any> | undefined;
  }[]>;
  fixedColumnsOnRight: vue.ComputedRef<{
    key: KeyType;
    align?: Alignment$1;
    class?: string | ClassNameGetter<any> | undefined;
    dataKey?: KeyType;
    fixed?: true | FixedDirection;
    flexGrow?: vue.CSSProperties["flexGrow"];
    flexShrink?: vue.CSSProperties["flexShrink"];
    title?: string;
    hidden?: boolean;
    headerClass?: string | HeaderClassGetter<any> | undefined;
    maxWidth?: number;
    minWidth?: number;
    style?: vue.CSSProperties;
    sortable?: boolean;
    width: number;
    cellRenderer?: CellRenderer<any> | undefined;
    headerCellRenderer?: HeaderCellRenderer<any> | undefined;
  }[]>;
  mainColumns: vue.ComputedRef<AnyColumns>;
  bodyWidth: vue.ComputedRef<number>;
  emptyStyle: vue.ComputedRef<vue.CSSProperties>;
  rootStyle: vue.ComputedRef<vue.CSSProperties>;
  footerHeight: vue.ComputedRef<vue.CSSProperties>;
  mainTableHeight: vue.ComputedRef<number>;
  fixedTableHeight: vue.ComputedRef<number>;
  leftTableWidth: vue.ComputedRef<number>;
  rightTableWidth: vue.ComputedRef<number>;
  showEmpty: vue.ComputedRef<boolean>;
  getRowHeight: (rowIndex: number) => number;
  onColumnSorted: (e: MouseEvent) => void;
  onRowHovered: ({
    hovered,
    rowKey
  }: RowHoverParams) => void;
  onRowExpanded: ({
    expanded,
    rowData,
    rowIndex,
    rowKey
  }: RowExpandParams) => void;
  onRowsRendered: (params: onRowRenderedParams) => void;
  onRowHeightChange: ({
    rowKey,
    height,
    rowIndex
  }: RowHeightChangedParams, fixedDir: FixedDirection) => void;
  scrollTo: (params: ScrollPos) => void;
  scrollToLeft: (scrollLeft: number) => void;
  scrollToTop: (scrollTop: number) => void;
  scrollToRow: (row: number, strategy?: Alignment) => void;
  onScroll: (params: ScrollPos) => void;
  onVerticalScroll: ({
    scrollTop
  }: ScrollPos) => void;
};
type UseTableReturn = ReturnType<typeof useTable>;
//#endregion
export { UseTableReturn };
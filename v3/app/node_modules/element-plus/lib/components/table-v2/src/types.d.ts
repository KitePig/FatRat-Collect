import { ColumnAlignment } from "../../../constants/column-alignment.js";
import { FixedDir, SortOrder } from "./constants.js";
import { CSSProperties, FunctionalComponent, RendererElement, RendererNode, VNode } from "vue";

//#region ../../packages/components/table-v2/src/types.d.ts
type Alignment = ColumnAlignment;
type FixedDirection = FixedDir;
type KeyType = string | number | symbol;
/**
 * Param types
 */
type CellRendererParams<T> = {
  cellData: T;
} & RowCommonParams & ColumnCommonParams<T>;
type ColumnCommonParams<T> = {
  columns: Column<T>[];
  column: Column<T>;
  columnIndex: number;
};
type HeaderCellRendererParams<T> = {
  headerIndex: number;
} & ColumnCommonParams<T>;
type RowCommonParams = {
  rowData: any;
  rowIndex: number;
};
type ClassNameGetterParams<T> = {
  cellData: T;
} & RowCommonParams & ColumnCommonParams<T>;
type DataGetterParams<T> = {
  columns: Column<T>[];
  column: Column<T>;
  columnIndex: number;
} & RowCommonParams;
type DataGetter<T> = (params: DataGetterParams<T>) => T;
type ClassNameGetter<T> = (params: ClassNameGetterParams<T>) => string;
type HeaderClassGetter<T> = (params: ColumnCommonParams<T> & {
  headerIndex: number;
}) => string;
/**
 * Renderer/Getter types
 */
type CellRenderer<T> = (params: CellRendererParams<T>) => VNode;
type HeaderCellRenderer<T> = (params: HeaderCellRendererParams<T>) => VNode;
type Column<T = any> = {
  /**
   * Attributes
   */
  align?: Alignment;
  class?: string | ClassNameGetter<T>;
  key?: KeyType;
  dataKey?: KeyType;
  fixed?: true | FixedDirection;
  flexGrow?: CSSProperties['flexGrow'];
  flexShrink?: CSSProperties['flexShrink'];
  title?: string;
  hidden?: boolean;
  headerClass?: HeaderClassGetter<T> | string;
  maxWidth?: number;
  minWidth?: number;
  style?: CSSProperties;
  sortable?: boolean;
  width: number;
  /**
   * Renderers
   */
  cellRenderer?: CellRenderer<T>;
  headerCellRenderer?: HeaderCellRenderer<T>;
  /**
   * Extendable sections
   */
  [key: string]: any;
};
type Columns<T> = Column<T>[];
type AnyColumns = Columns<any>;
type SortBy = {
  key: KeyType;
  order: SortOrder;
};
type SortState = {
  [key: KeyType]: SortOrder;
};
type CustomizedCellsType = VNode<RendererNode, RendererElement, {
  [key: string]: any;
}>[];
type DefaultCellsType = VNode<RendererNode, RendererElement, {
  [key: string]: any;
}>[][];
type ColumnCellsType = DefaultCellsType | CustomizedCellsType;
type TableV2CustomizedHeaderSlotParam<T = any> = {
  cells: VNode[];
  columns: Columns<T>;
  headerIndex: number;
};
//#endregion
export { Alignment, AnyColumns, CellRenderer, ClassNameGetter, Column, ColumnCellsType, ColumnCommonParams, Columns, DataGetter, FixedDirection, HeaderCellRenderer, HeaderClassGetter, KeyType, RowCommonParams, SortBy, SortState, TableV2CustomizedHeaderSlotParam };
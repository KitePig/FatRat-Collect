import { BACKWARD, FORWARD } from "./defaults.js";
import { CSSProperties, ComponentInternalInstance, Ref } from "vue";

//#region ../../packages/components/virtual-list/src/types.d.ts
type Instance = ComponentInternalInstance;
type Alignment = 'auto' | 'smart' | 'center' | 'start' | 'end';
type ItemSize = (idx: number) => number;
type Direction = 'ltr' | 'rtl';
type LayoutDirection = 'horizontal' | 'vertical';
type RTLOffsetType = 'negative' | 'positive-descending' | 'positive-ascending';
type ItemProps<T> = {
  data: T;
  style: CSSProperties;
  scrolling?: boolean;
  index: number;
};
type ListItem = {
  offset: number;
  size: number;
};
type ListCache = {
  items: Record<string, ListItem>;
  estimatedItemSize: number;
  lastVisitedIndex: number;
  clearCacheAfterIndex: (idx: number, forceUpdate?: boolean) => void;
};
type GridCache = {
  column: Record<string, ListItem>;
  row: Record<string, ListItem>;
  estimatedColumnWidth: number;
  estimatedRowHeight: number;
  lastVisitedColumnIndex: number;
  lastVisitedRowIndex: number;
};
type ScrollDir = 'forwards' | 'backwards';
type ListItemSizer<T, P extends InitListCacheFunc<T>> = (props: T, index: number, cache: ReturnType<P>) => number;
type GetEstimatedTotalSize<T, P extends InitCacheFunc<T, GridCache | ListCache>> = (props: T, cache: ReturnType<P>) => number;
type GetOffset<T, P extends InitListCacheFunc<T>> = (props: T, idx: number, alignment: Alignment, offset: number, cache: ReturnType<P>) => number;
type GetStartIndexForOffset<T, P extends InitCacheFunc<T, GridCache | ListCache>> = (props: T, offset: number, cache: ReturnType<P>) => number;
type GetStopIndexForStartIndex<T, P extends InitCacheFunc<T, GridCache | ListCache>> = (props: T, startIndex: number, scrollOffset: number, cache: ReturnType<P>) => number;
type PropValidator<T> = (props: T) => void;
type InitCacheFunc<T, P> = (props: T, cache: Instance) => P;
type InitListCacheFunc<T> = InitCacheFunc<T, ListCache>;
type InitGridCacheFunc<T> = InitCacheFunc<T, GridCache>;
type ListConstructorProps<T, P extends InitListCacheFunc<T> = InitListCacheFunc<T>> = {
  name?: string;
  getItemOffset: ListItemSizer<T, P>;
  getEstimatedTotalSize: GetEstimatedTotalSize<T, P>;
  getItemSize: ListItemSizer<T, P>;
  getOffset: GetOffset<T, P>;
  getStartIndexForOffset: GetStartIndexForOffset<T, P>;
  getStopIndexForStartIndex: GetStopIndexForStartIndex<T, P>;
  initCache: P;
  clearCache: boolean;
  validateProps: PropValidator<T>;
};
type ExposesStates = {
  isScrolling: boolean;
  updateRequested: boolean;
};
type SharedExposes = {
  windowRef: Ref<HTMLElement>;
  innerRef: Ref<HTMLElement>;
  getItemStyleCache: (_: any, __: any, ___: any) => CSSProperties;
};
type ListExposes = {
  scrollTo: (offset: number) => void;
  scrollToItem: (idx: number, alignment?: Alignment) => void;
  states: {
    scrollDir: Direction;
    scrollOffset: number;
  } & ExposesStates;
} & SharedExposes;
type GridExposes = {
  states: {
    scrollLeft: number;
    scrollTop: number;
    xAxisScrollDir: Direction;
    yAxisScrollDir: Direction;
  } & ExposesStates;
  touchStartX: Ref<number>;
  touchStartY: Ref<number>;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  scrollTo: (props: {
    scrollLeft: number;
    scrollTop: number;
  }) => void;
  scrollToItem: (columnIndex?: number, rowIndex?: number, alignment?: Alignment) => void;
} & SharedExposes;
type ScrollbarExpose = {
  onMouseUp: () => void;
};
type GetGridOffset<T, P extends InitGridCacheFunc<T>> = (props: T, index: number, alignment: Alignment, offset: number, cache: ReturnType<P>, scrollbarWidth: number) => number;
type GetPosition<T, P extends InitGridCacheFunc<T>> = (props: T, index: number, cache: ReturnType<P>) => [number, number];
type GridConstructorProps<T, P extends InitGridCacheFunc<T> = InitGridCacheFunc<T>> = {
  name?: string;
  getColumnOffset: GetGridOffset<T, P>;
  getColumnPosition: GetPosition<T, P>;
  getColumnStartIndexForOffset: GetStartIndexForOffset<T, P>;
  getColumnStopIndexForStartIndex: GetStopIndexForStartIndex<T, P>;
  getEstimatedTotalHeight: GetEstimatedTotalSize<T, P>;
  getEstimatedTotalWidth: GetEstimatedTotalSize<T, P>;
  getRowOffset: GetGridOffset<T, P>;
  getRowPosition: GetPosition<T, P>;
  getRowStartIndexForOffset: GetStartIndexForOffset<T, P>;
  getRowStopIndexForStartIndex: GetStopIndexForStartIndex<T, P>;
  initCache: P;
  injectToInstance?: (instance: Instance, cache: Ref<ReturnType<P>>) => void;
  clearCache: boolean;
  validateProps: PropValidator<T>;
};
/**
 * Instance methods and emits
 */
type GridDefaultSlotParams = {
  columnIndex: number;
  rowIndex: number;
  data: any;
  key: number | string;
  isScrolling?: boolean;
  style: CSSProperties;
};
type GridItemRenderedEvtParams = {
  columnCacheStart: number;
  columnCacheEnd: number;
  rowCacheStart: number;
  rowCacheEnd: number;
  columnVisibleStart: number;
  columnVisibleEnd: number;
  rowVisibleStart: number;
  rowVisibleEnd: number;
};
type GridScrollOptions = {
  scrollLeft?: number;
  scrollTop?: number;
};
type GridItemKeyGetter = <T extends {
  [key: string | number]: any;
}>(args: {
  columnIndex: number;
  data: T;
  rowIndex: number;
}) => string | number;
type Dir = typeof FORWARD | typeof BACKWARD;
interface GridStates {
  isScrolling: boolean;
  scrollLeft: number;
  scrollTop: number;
  updateRequested: boolean;
  xAxisScrollDir: Dir;
  yAxisScrollDir: Dir;
}
//#endregion
export { Alignment, Direction, ExposesStates, GetEstimatedTotalSize, GetGridOffset, GetOffset, GetPosition, GetStartIndexForOffset, GetStopIndexForStartIndex, GridCache, GridConstructorProps, GridDefaultSlotParams, GridExposes, GridItemKeyGetter, GridItemRenderedEvtParams, GridScrollOptions, GridStates, InitCacheFunc, InitGridCacheFunc, InitListCacheFunc, Instance, ItemProps, ItemSize, LayoutDirection, ListCache, ListConstructorProps, ListExposes, ListItem, ListItemSizer, PropValidator, RTLOffsetType, ScrollDir, ScrollbarExpose, SharedExposes };
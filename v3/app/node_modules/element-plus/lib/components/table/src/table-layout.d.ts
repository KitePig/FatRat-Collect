import { TableColumnCtx } from "./table-column/defaults.js";
import { Store } from "./store/index.js";
import { TableHeader } from "./table-header/index.js";
import { DefaultRow, Table } from "./table/defaults.js";
import { Ref } from "vue";

//#region ../../packages/components/table/src/table-layout.d.ts
declare class TableLayout<T extends DefaultRow> {
  observers: TableHeader[];
  table: Table<T>;
  store: Store<T>;
  columns: TableColumnCtx<T>[];
  fit: boolean;
  showHeader: boolean;
  height: Ref<null | number>;
  scrollX: Ref<boolean>;
  scrollY: Ref<boolean>;
  bodyWidth: Ref<null | number>;
  fixedWidth: Ref<null | number>;
  rightFixedWidth: Ref<null | number>;
  tableHeight: Ref<null | number>;
  headerHeight: Ref<null | number>;
  appendHeight: Ref<null | number>;
  footerHeight: Ref<null | number>;
  gutterWidth: number;
  constructor(options: Record<string, any>);
  updateScrollY(): boolean;
  setHeight(value: string | number | null, prop?: string): void;
  setMaxHeight(value: string | number | null): void;
  getFlattenColumns(): TableColumnCtx<T>[];
  updateElsHeight(): void;
  headerDisplayNone(elm: HTMLElement): boolean;
  updateColumnsWidth(): void;
  addObserver(observer: TableHeader): void;
  removeObserver(observer: TableHeader): void;
  notifyObservers(event: string): void;
}
//#endregion
export { TableLayout };
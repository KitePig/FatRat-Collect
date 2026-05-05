import { Alignment } from "../../../virtual-list/src/types.js";
import "../../../virtual-list/index.js";
import { TableV2Props } from "../table.js";
import { TableGridInstance } from "../table-grid.js";
import { Ref } from "vue";

//#region ../../packages/components/table-v2/src/composables/use-scrollbar.d.ts
type ScrollPos = {
  scrollLeft: number;
  scrollTop: number;
};
type GridInstanceRef = Ref<TableGridInstance | undefined>;
type UseScrollBarProps = {
  mainTableRef: GridInstanceRef;
  leftTableRef: GridInstanceRef;
  rightTableRef: GridInstanceRef;
  onMaybeEndReached: () => void;
};
declare const useScrollbar: (props: TableV2Props, {
  mainTableRef,
  leftTableRef,
  rightTableRef,
  onMaybeEndReached
}: UseScrollBarProps) => {
  scrollPos: Ref<{
    scrollLeft: number;
    scrollTop: number;
  }, ScrollPos | {
    scrollLeft: number;
    scrollTop: number;
  }>;
  scrollTo: (params: ScrollPos) => void;
  scrollToLeft: (scrollLeft: number) => void;
  scrollToTop: (scrollTop: number) => void;
  scrollToRow: (row: number, strategy?: Alignment) => void;
  onScroll: (params: ScrollPos) => void;
  onVerticalScroll: ({
    scrollTop
  }: ScrollPos) => void;
};
//#endregion
export { ScrollPos, useScrollbar };
import { TableV2Props } from "../table.js";
import { UseColumnsReturn } from "./use-columns.js";
import { CSSProperties, ComputedRef } from "vue";

//#region ../../packages/components/table-v2/src/composables/use-styles.d.ts
type UseStyleProps = {
  columnsTotalWidth: UseColumnsReturn['columnsTotalWidth'];
  fixedColumnsOnLeft: UseColumnsReturn['fixedColumnsOnLeft'];
  fixedColumnsOnRight: UseColumnsReturn['fixedColumnsOnRight'];
  rowsHeight: ComputedRef<number>;
};
declare const useStyles: (props: TableV2Props, {
  columnsTotalWidth,
  rowsHeight,
  fixedColumnsOnLeft,
  fixedColumnsOnRight
}: UseStyleProps) => {
  bodyWidth: ComputedRef<number>;
  fixedTableHeight: ComputedRef<number>;
  mainTableHeight: ComputedRef<number>;
  leftTableWidth: ComputedRef<number>;
  rightTableWidth: ComputedRef<number>;
  windowHeight: ComputedRef<number>;
  footerHeight: ComputedRef<CSSProperties>;
  emptyStyle: ComputedRef<CSSProperties>;
  rootStyle: ComputedRef<CSSProperties>;
  headerHeight: ComputedRef<number>;
};
type UseStyleReturn = ReturnType<typeof useStyles>;
//#endregion
export { UseStyleReturn, useStyles };
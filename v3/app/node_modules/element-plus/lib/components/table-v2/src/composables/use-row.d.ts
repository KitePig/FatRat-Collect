import { UseNamespaceReturn } from "../../../../hooks/use-namespace/index.js";
import "../../../../hooks/index.js";
import { FixedDirection, KeyType } from "../types.js";
import { RowExpandParams, RowHeightChangedParams, RowHoverParams } from "../row.js";
import { onRowRenderedParams } from "../grid.js";
import { TableV2Props } from "../table.js";
import { TableGridInstance } from "../table-grid.js";
import * as vue from "vue";
import { ComponentInternalInstance, Ref, ShallowRef } from "vue";

//#region ../../packages/components/table-v2/src/composables/use-row.d.ts
type Heights = Record<KeyType, number>;
type GridInstanceRef = Ref<TableGridInstance | undefined>;
type UseRowProps = {
  mainTableRef: GridInstanceRef;
  leftTableRef: GridInstanceRef;
  rightTableRef: GridInstanceRef;
  tableInstance: ComponentInternalInstance;
  ns: UseNamespaceReturn;
  isScrolling: ShallowRef<boolean>;
};
declare const useRow: (props: TableV2Props, {
  mainTableRef,
  leftTableRef,
  rightTableRef,
  tableInstance,
  ns,
  isScrolling
}: UseRowProps) => {
  expandedRowKeys: Ref<KeyType[], KeyType[]>;
  lastRenderedRowIndex: Ref<number, number>;
  isDynamic: vue.ComputedRef<boolean>;
  isResetting: ShallowRef<boolean, boolean>;
  rowHeights: Ref<Heights, Heights>;
  resetAfterIndex: (index: number, forceUpdate?: boolean) => void;
  onRowExpanded: ({
    expanded,
    rowData,
    rowIndex,
    rowKey
  }: RowExpandParams) => void;
  onRowHovered: ({
    hovered,
    rowKey
  }: RowHoverParams) => void;
  onRowsRendered: (params: onRowRenderedParams) => void;
  onRowHeightChange: ({
    rowKey,
    height,
    rowIndex
  }: RowHeightChangedParams, fixedDir: FixedDirection) => void;
};
type UseRowReturn = ReturnType<typeof useRow>;
//#endregion
export { UseRowReturn, useRow };
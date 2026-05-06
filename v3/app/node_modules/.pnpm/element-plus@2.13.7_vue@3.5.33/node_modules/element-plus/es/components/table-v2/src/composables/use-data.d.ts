import { KeyType } from "../types.js";
import { TableV2Props } from "../table.js";
import { UseRowReturn } from "./use-row.js";
import * as vue from "vue";

//#region ../../packages/components/table-v2/src/composables/use-data.d.ts
type UseDataProps = {
  expandedRowKeys: UseRowReturn['expandedRowKeys'];
  lastRenderedRowIndex: UseRowReturn['lastRenderedRowIndex'];
  resetAfterIndex: UseRowReturn['resetAfterIndex'];
};
declare const useData: (props: TableV2Props, {
  expandedRowKeys,
  lastRenderedRowIndex,
  resetAfterIndex
}: UseDataProps) => {
  data: vue.ComputedRef<any[]>;
  depthMap: vue.Ref<Record<KeyType, number>, Record<KeyType, number>>;
};
type UseDataReturn = ReturnType<typeof useData>;
//#endregion
export { UseDataReturn, useData };
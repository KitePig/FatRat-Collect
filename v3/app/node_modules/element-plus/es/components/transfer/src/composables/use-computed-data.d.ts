import { TransferDataItem, TransferProps } from "../transfer.js";
import * as vue from "vue";

//#region ../../packages/components/transfer/src/composables/use-computed-data.d.ts
declare const useComputedData: <T extends TransferDataItem = TransferDataItem>(props: Required<Omit<TransferProps<T>, "filterPlaceholder" | "filterMethod" | "renderContent">>) => {
  sourceData: vue.ComputedRef<T[]>;
  targetData: vue.ComputedRef<T[]>;
};
//#endregion
export { useComputedData };
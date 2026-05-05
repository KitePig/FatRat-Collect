import { TransferCheckedState, TransferDataItem, TransferEmits, TransferProps } from "../transfer.js";
import { SetupContext } from "vue";

//#region ../../packages/components/transfer/src/composables/use-move.d.ts
declare const useMove: <T extends TransferDataItem = TransferDataItem>(props: Required<Omit<TransferProps<T>, "filterPlaceholder" | "filterMethod" | "renderContent">>, checkedState: TransferCheckedState, emit: SetupContext<TransferEmits>["emit"]) => {
  addToLeft: () => void;
  addToRight: () => void;
};
//#endregion
export { useMove };
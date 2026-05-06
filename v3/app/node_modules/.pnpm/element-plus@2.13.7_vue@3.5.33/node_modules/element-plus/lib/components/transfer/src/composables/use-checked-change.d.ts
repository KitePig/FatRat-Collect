import { TransferCheckedState, TransferEmits, TransferKey } from "../transfer.js";
import { SetupContext } from "vue";

//#region ../../packages/components/transfer/src/composables/use-checked-change.d.ts
declare const useCheckedChange: (checkedState: TransferCheckedState, emit: SetupContext<TransferEmits>["emit"]) => {
  onSourceCheckedChange: (val: TransferKey[], movedKeys?: TransferKey[]) => void;
  onTargetCheckedChange: (val: TransferKey[], movedKeys?: TransferKey[]) => void;
};
//#endregion
export { useCheckedChange };
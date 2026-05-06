import { CheckboxValueType } from "../../../checkbox/src/checkbox.js";
import "../../../checkbox/index.js";
import { TransferDataItem } from "../transfer.js";
import { TransferPanelEmits, TransferPanelProps, TransferPanelState } from "../transfer-panel.js";
import * as vue from "vue";
import { SetupContext } from "vue";

//#region ../../packages/components/transfer/src/composables/use-check.d.ts
declare const useCheck: <T extends TransferDataItem = TransferDataItem>(props: Required<Pick<TransferPanelProps<T>, "data" | "format" | "defaultChecked" | "props">> & {
  filterMethod: TransferPanelProps<T>["filterMethod"];
}, panelState: TransferPanelState, emit: SetupContext<TransferPanelEmits>["emit"]) => {
  filteredData: vue.ComputedRef<T[]>;
  checkableData: vue.ComputedRef<T[]>;
  checkedSummary: vue.ComputedRef<string>;
  isIndeterminate: vue.ComputedRef<boolean>;
  updateAllChecked: () => void;
  handleAllCheckedChange: (value: CheckboxValueType) => void;
};
//#endregion
export { useCheck };
import "../../../utils/index.js";
import { TransferDataItem, TransferFormat, TransferKey, TransferPropsAlias } from "./transfer.js";
import { _default } from "./transfer-panel.vue.js";
import { ComponentInstance, ExtractPublicPropTypes, VNode } from "vue";
import { ComponentExposed } from "vue-component-type-helpers";

//#region ../../packages/components/transfer/src/transfer-panel.d.ts
interface TransferPanelState {
  checked: TransferKey[];
  allChecked: boolean;
  query: string;
  checkChangeByUser: boolean;
}
interface TransferPanelProps<T extends TransferDataItem = TransferDataItem> {
  data?: T[];
  optionRender?: (option: T) => VNode | VNode[];
  placeholder?: string;
  title?: string;
  filterable?: boolean;
  format?: TransferFormat;
  filterMethod?: (query: string, item: T) => boolean;
  defaultChecked?: TransferKey[];
  props?: TransferPropsAlias;
}
declare const transferPanelEmits: {
  "checked-change": (value: TransferKey[], movedKeys?: TransferKey[]) => boolean;
};
type TransferPanelEmits = typeof transferPanelEmits;
type TransferPanelInstance = ComponentInstance<typeof _default> & ComponentExposed<typeof _default>;
//#endregion
export { TransferPanelEmits, TransferPanelInstance, TransferPanelProps, TransferPanelState };
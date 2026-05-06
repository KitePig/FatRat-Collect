import { TransferPropsAlias } from "../transfer.js";
import * as vue from "vue";

//#region ../../packages/components/transfer/src/composables/use-props-alias.d.ts
declare const usePropsAlias: (props: {
  props?: TransferPropsAlias;
}) => vue.ComputedRef<{
  label: string;
  key: string;
  disabled: string;
}>;
//#endregion
export { usePropsAlias };
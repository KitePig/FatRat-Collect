import "../../../utils/index.js";
import "./form-item.js";
import "./types.js";
import * as vue from "vue";

//#region ../../packages/components/form/src/utils.d.ts
declare function useFormLabelWidth(): {
  autoLabelWidth: vue.ComputedRef<string>;
  registerLabelWidth: (val: number, oldVal: number) => void;
  deregisterLabelWidth: (val: number) => void;
};
//#endregion
export { useFormLabelWidth };
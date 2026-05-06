import { SelectInstance } from "../../select/src/select.js";
import "../../select/index.js";
import { TreeInstance } from "../../tree/src/instance.js";
import "../../tree/index.js";

//#region ../../packages/components/tree-select/src/instance.d.ts
type TreeSelectInstance = {
  treeRef: TreeInstance;
  selectRef: SelectInstance;
};
//#endregion
export { TreeSelectInstance };
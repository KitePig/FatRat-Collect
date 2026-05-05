import "./index.js";
import { TreeNode } from "../table/defaults.js";
import "vue";

//#region ../../packages/components/table/src/store/tree.d.ts
interface TreeData extends TreeNode {
  children?: string[];
  lazy?: boolean;
  loaded?: boolean;
}
//#endregion
export { TreeData };
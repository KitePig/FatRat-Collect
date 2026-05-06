import "./tree-store.js";
import { Node } from "./node.js";
import "../tree.js";
import "../tree.type.js";
import { InjectionKey, Ref, SetupContext } from "vue";

//#region ../../packages/components/tree/src/model/useDragNode.d.ts
interface TreeNode {
  node: Node;
  $el?: HTMLElement;
}
interface DragOptions {
  event: DragEvent;
  treeNode: TreeNode;
}
interface DragEvents {
  treeNodeDragStart: (options: DragOptions) => void;
  treeNodeDragOver: (options: DragOptions) => void;
  treeNodeDragEnd: (event: DragEvent) => void;
}
//#endregion
export { DragEvents, TreeNode };
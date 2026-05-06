//#region ../../packages/utils/vue/global-node.d.ts
declare function createGlobalNode(id?: string): HTMLDivElement;
declare function removeGlobalNode(el: HTMLElement): void;
declare function changeGlobalNodesTarget(el: HTMLElement): void;
//#endregion
export { changeGlobalNodesTarget, createGlobalNode, removeGlobalNode };
import { Ref, VNode } from "vue";

//#region ../../packages/hooks/use-teleport/index.d.ts
declare const useTeleport: (contentRenderer: () => VNode, appendToBody: Ref<boolean>) => {
  isTeleportVisible: Ref<boolean, boolean>;
  showTeleport: () => void;
  hideTeleport: () => void;
  renderTeleport: () => void;
};
//#endregion
export { useTeleport };
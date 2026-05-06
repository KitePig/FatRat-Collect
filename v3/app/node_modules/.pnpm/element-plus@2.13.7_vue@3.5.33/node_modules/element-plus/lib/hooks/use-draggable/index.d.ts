import { ComputedRef, Ref } from "vue";

//#region ../../packages/hooks/use-draggable/index.d.ts
declare const useDraggable: (targetRef: Ref<HTMLElement | undefined>, dragRef: Ref<HTMLElement | undefined>, draggable: ComputedRef<boolean>, overflow?: ComputedRef<boolean>) => {
  isDragging: Ref<boolean, boolean>;
  resetPosition: () => void;
  updatePosition: () => void;
};
//#endregion
export { useDraggable };
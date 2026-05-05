import { PanelItemState } from "../type.js";
import { ComputedRef, Ref } from "vue";

//#region ../../packages/components/splitter/src/hooks/useResize.d.ts
declare function useResize(panels: Ref<PanelItemState[]>, containerSize: ComputedRef<number>, pxSizes: ComputedRef<number[]>, lazy: Ref<boolean>): {
  lazyOffset: Ref<number, number>;
  onMoveStart: (index: number) => void;
  onMoving: (index: number, offset: number) => void;
  onMoveEnd: () => void;
  movingIndex: Ref<{
    index: number;
    confirmed: boolean;
  } | null, {
    index: number;
    confirmed: boolean;
  } | {
    index: number;
    confirmed: boolean;
  } | null>;
  onCollapse: (index: number, type: "start" | "end") => void;
};
//#endregion
export { useResize };
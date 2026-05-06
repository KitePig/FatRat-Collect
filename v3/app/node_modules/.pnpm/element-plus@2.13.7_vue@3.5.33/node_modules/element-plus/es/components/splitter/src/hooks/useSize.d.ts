import { PanelItemState } from "../type.js";
import { ComputedRef, Ref } from "vue";

//#region ../../packages/components/splitter/src/hooks/useSize.d.ts
declare function getPct(str: string): number;
declare function getPx(str: string): number;
declare function isPct(itemSize: string | number | undefined): itemSize is string;
declare function isPx(itemSize: string | number | undefined): itemSize is string;
declare function useSize(panels: Ref<PanelItemState[]>, containerSize: ComputedRef<number>): {
  percentSizes: Ref<number[], number[]>;
  pxSizes: ComputedRef<number[]>;
};
//#endregion
export { getPct, getPx, isPct, isPx, useSize };
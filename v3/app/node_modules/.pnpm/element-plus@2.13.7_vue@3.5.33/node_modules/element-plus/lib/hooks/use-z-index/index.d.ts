import * as vue from "vue";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/hooks/use-z-index/index.d.ts
interface ElZIndexInjectionContext {
  current: number;
}
declare const defaultInitialZIndex = 2000;
declare const ZINDEX_INJECTION_KEY: InjectionKey<ElZIndexInjectionContext>;
declare const zIndexContextKey: InjectionKey<Ref<number | undefined>>;
declare const useZIndex: (zIndexOverrides?: Ref<number>) => {
  initialZIndex: vue.ComputedRef<number>;
  currentZIndex: vue.ComputedRef<number>;
  nextZIndex: () => number;
};
type UseZIndexReturn = ReturnType<typeof useZIndex>;
//#endregion
export { ElZIndexInjectionContext, UseZIndexReturn, ZINDEX_INJECTION_KEY, defaultInitialZIndex, useZIndex, zIndexContextKey };
import { ComputedRef } from "vue";

//#region ../../packages/hooks/use-attrs/index.d.ts
interface Params {
  excludeListeners?: boolean;
  excludeKeys?: ComputedRef<string[]>;
}
declare const useAttrs: (params?: Params) => ComputedRef<Record<string, unknown>>;
//#endregion
export { useAttrs };
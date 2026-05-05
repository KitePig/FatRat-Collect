import * as vue from "vue";

//#region ../../packages/components/virtual-list/src/hooks/use-cache.d.ts
declare const useCache: <T>() => vue.ComputedRef<(_: any, __: any, ___: any) => Record<string, T>>;
//#endregion
export { useCache };
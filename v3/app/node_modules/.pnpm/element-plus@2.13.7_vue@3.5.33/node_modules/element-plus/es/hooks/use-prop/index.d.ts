import { ComputedRef } from "vue";

//#region ../../packages/hooks/use-prop/index.d.ts
declare const useProp: <T>(name: string) => ComputedRef<T | undefined>;
//#endregion
export { useProp };
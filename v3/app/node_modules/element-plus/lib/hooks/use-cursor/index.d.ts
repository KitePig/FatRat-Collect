import { ShallowRef } from "vue";

//#region ../../packages/hooks/use-cursor/index.d.ts
declare function useCursor(input: ShallowRef<HTMLInputElement | undefined>): [() => void, () => void];
//#endregion
export { useCursor };
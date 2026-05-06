import { Ref } from "vue";

//#region ../../packages/hooks/use-prevent-global/index.d.ts
declare const usePreventGlobal: <E extends keyof DocumentEventMap>(indicator: Ref<boolean>, evt: E, cb: (e: DocumentEventMap[E]) => boolean) => void;
//#endregion
export { usePreventGlobal };
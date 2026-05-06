import { Ref } from "vue";

//#region ../../packages/hooks/use-focus/index.d.ts
declare const useFocus: (el: Ref<{
  focus: () => void;
} | null>) => {
  focus: () => void;
};
//#endregion
export { useFocus };
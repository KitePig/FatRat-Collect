import * as vue from "vue";

//#region ../../packages/hooks/use-popper-container/index.d.ts
declare const usePopperContainerId: () => {
  id: vue.ComputedRef<string>;
  selector: vue.ComputedRef<string>;
};
declare const usePopperContainer: () => {
  id: vue.ComputedRef<string>;
  selector: vue.ComputedRef<string>;
};
//#endregion
export { usePopperContainer, usePopperContainerId };
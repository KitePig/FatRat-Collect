import { ComputedRef, InjectionKey, WritableComputedRef } from "vue";

//#region ../../packages/components/pagination/src/constants.d.ts
interface ElPaginationContext {
  currentPage?: WritableComputedRef<number>;
  pageCount?: ComputedRef<number>;
  disabled?: ComputedRef<boolean>;
  changeEvent?: (val: number) => void;
  handleSizeChange?: (val: number) => void;
}
declare const elPaginationKey: InjectionKey<ElPaginationContext>;
//#endregion
export { ElPaginationContext, elPaginationKey };
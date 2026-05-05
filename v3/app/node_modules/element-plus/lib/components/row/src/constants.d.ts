import { ComputedRef, InjectionKey } from "vue";

//#region ../../packages/components/row/src/constants.d.ts
interface RowContext {
  gutter: ComputedRef<number>;
}
declare const rowContextKey: InjectionKey<RowContext>;
//#endregion
export { rowContextKey };
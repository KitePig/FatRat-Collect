import { InjectionKey } from "vue";

//#region ../../packages/components/scrollbar/src/constants.d.ts
interface ScrollbarContext {
  scrollbarElement: HTMLDivElement | undefined;
  wrapElement: HTMLDivElement | undefined;
}
declare const scrollbarContextKey: InjectionKey<ScrollbarContext>;
//#endregion
export { ScrollbarContext, scrollbarContextKey };
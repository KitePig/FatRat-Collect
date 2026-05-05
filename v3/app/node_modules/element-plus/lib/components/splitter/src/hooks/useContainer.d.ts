import * as vue from "vue";
import { Ref } from "vue";

//#region ../../packages/components/splitter/src/hooks/useContainer.d.ts
declare function useContainer(layout: Ref<'horizontal' | 'vertical'>): {
  containerEl: Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
  containerSize: vue.ComputedRef<number>;
};
//#endregion
export { useContainer };
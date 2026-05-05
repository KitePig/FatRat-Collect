import * as vue from "vue";

//#region ../../packages/hooks/use-composition/index.d.ts
interface UseCompositionOptions {
  afterComposition: (event: CompositionEvent) => void;
  emit?: ((event: 'compositionstart', evt: CompositionEvent) => void) & ((event: 'compositionupdate', evt: CompositionEvent) => void) & ((event: 'compositionend', evt: CompositionEvent) => void);
}
declare function useComposition({
  afterComposition,
  emit
}: UseCompositionOptions): {
  isComposing: vue.Ref<boolean, boolean>;
  handleComposition: (event: CompositionEvent) => void;
  handleCompositionStart: (event: CompositionEvent) => void;
  handleCompositionUpdate: (event: CompositionEvent) => void;
  handleCompositionEnd: (event: CompositionEvent) => void;
};
//#endregion
export { useComposition };
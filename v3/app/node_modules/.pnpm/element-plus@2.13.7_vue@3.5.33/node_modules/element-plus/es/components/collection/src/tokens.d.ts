import { Ref } from "vue";

//#region ../../packages/components/collection/src/tokens.d.ts
type CollectionItem<T = Record<string, any>> = {
  ref: HTMLElement | null;
} & T;
type ElCollectionInjectionContext = {
  itemMap: Map<HTMLElement, CollectionItem>;
  getItems: <T>() => CollectionItem<T>[];
  collectionRef: Ref<HTMLElement | undefined>;
};
type ElCollectionItemInjectionContext = {
  collectionItemRef: Ref<HTMLElement | undefined>;
};
//#endregion
export { CollectionItem, ElCollectionInjectionContext, ElCollectionItemInjectionContext };
import { CarouselItemProps } from "./carousel-item.js";
import { InjectionKey, Ref, VNode } from "vue";

//#region ../../packages/components/carousel/src/constants.d.ts
type CarouselItemStates = {
  hover: boolean;
  translate: number;
  scale: number;
  active: boolean;
  ready: boolean;
  inStage: boolean;
  animating: boolean;
};
type CarouselItemContext = {
  props: Required<CarouselItemProps>;
  states: CarouselItemStates;
  uid: number;
  getVnode: () => VNode;
  translateItem: (index: number, activeIndex: number, oldIndex?: number) => void;
};
type CarouselContext = {
  root: Ref<HTMLElement | undefined>;
  items: Ref<CarouselItemContext[]>;
  isCardType: Ref<boolean>;
  isVertical: Ref<boolean>;
  loop: boolean;
  cardScale: number;
  addItem: (item: CarouselItemContext) => void;
  removeItem: (item: CarouselItemContext) => void;
  setActiveItem: (index: number) => void;
  setContainerHeight: (height: number) => void;
};
declare const carouselContextKey: InjectionKey<CarouselContext>;
declare const CAROUSEL_ITEM_NAME = "ElCarouselItem";
//#endregion
export { CAROUSEL_ITEM_NAME, CarouselContext, CarouselItemContext, CarouselItemStates, carouselContextKey };
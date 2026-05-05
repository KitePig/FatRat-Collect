import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { CarouselEmits, CarouselProps, CarouselPropsPublic, carouselEmits, carouselProps } from "./src/carousel.js";
import { _default } from "./src/carousel.vue.js";
import { CarouselItemProps, CarouselItemPropsPublic, carouselItemProps } from "./src/carousel-item.js";
import { _default as _default$1 } from "./src/carousel-item.vue.js";
import { CAROUSEL_ITEM_NAME, CarouselContext, CarouselItemContext, CarouselItemStates, carouselContextKey } from "./src/constants.js";
import { CarouselInstance, CarouselItemInstance } from "./src/instance.js";

//#region ../../packages/components/carousel/index.d.ts
declare const ElCarousel: SFCWithInstall<typeof _default> & {
  CarouselItem: typeof _default$1;
};
declare const ElCarouselItem: SFCWithInstall<typeof _default$1>;
//#endregion
export { CAROUSEL_ITEM_NAME, CarouselContext, CarouselEmits, type CarouselInstance, CarouselItemContext, type CarouselItemInstance, CarouselItemProps, CarouselItemPropsPublic, CarouselItemStates, CarouselProps, CarouselPropsPublic, ElCarousel, ElCarousel as default, ElCarouselItem, carouselContextKey, carouselEmits, carouselItemProps, carouselProps };
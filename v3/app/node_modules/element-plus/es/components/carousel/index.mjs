import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { carouselEmits, carouselProps } from "./src/carousel.mjs";
import { CAROUSEL_ITEM_NAME, carouselContextKey } from "./src/constants.mjs";
import carousel_default from "./src/carousel2.mjs";
import { carouselItemProps } from "./src/carousel-item.mjs";
import carousel_item_default from "./src/carousel-item2.mjs";

//#region ../../packages/components/carousel/index.ts
const ElCarousel = withInstall(carousel_default, { CarouselItem: carousel_item_default });
const ElCarouselItem = withNoopInstall(carousel_item_default);

//#endregion
export { CAROUSEL_ITEM_NAME, ElCarousel, ElCarousel as default, ElCarouselItem, carouselContextKey, carouselEmits, carouselItemProps, carouselProps };
//# sourceMappingURL=index.mjs.map
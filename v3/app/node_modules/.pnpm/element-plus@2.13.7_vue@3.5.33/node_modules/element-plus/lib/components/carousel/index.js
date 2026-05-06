Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_carousel = require('./src/carousel.js');
const require_constants = require('./src/constants.js');
const require_carousel$1 = require('./src/carousel2.js');
const require_carousel_item = require('./src/carousel-item.js');
const require_carousel_item$1 = require('./src/carousel-item2.js');

//#region ../../packages/components/carousel/index.ts
const ElCarousel = require_install.withInstall(require_carousel$1.default, { CarouselItem: require_carousel_item$1.default });
const ElCarouselItem = require_install.withNoopInstall(require_carousel_item$1.default);

//#endregion
exports.CAROUSEL_ITEM_NAME = require_constants.CAROUSEL_ITEM_NAME;
exports.ElCarousel = ElCarousel;
exports.default = ElCarousel;
exports.ElCarouselItem = ElCarouselItem;
exports.carouselContextKey = require_constants.carouselContextKey;
exports.carouselEmits = require_carousel.carouselEmits;
exports.carouselItemProps = require_carousel_item.carouselItemProps;
exports.carouselProps = require_carousel.carouselProps;
//# sourceMappingURL=index.js.map
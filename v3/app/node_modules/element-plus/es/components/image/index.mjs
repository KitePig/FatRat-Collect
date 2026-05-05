import { withInstall } from "../../utils/vue/install.mjs";
import { imageEmits, imageProps } from "./src/image.mjs";
import image_default from "./src/image2.mjs";

//#region ../../packages/components/image/index.ts
const ElImage = withInstall(image_default);

//#endregion
export { ElImage, ElImage as default, imageEmits, imageProps };
//# sourceMappingURL=index.mjs.map
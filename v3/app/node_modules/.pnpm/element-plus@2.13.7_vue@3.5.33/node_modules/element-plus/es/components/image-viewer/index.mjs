import { withInstall } from "../../utils/vue/install.mjs";
import { imageViewerEmits, imageViewerProps } from "./src/image-viewer.mjs";
import image_viewer_default from "./src/image-viewer2.mjs";

//#region ../../packages/components/image-viewer/index.ts
const ElImageViewer = withInstall(image_viewer_default);

//#endregion
export { ElImageViewer, ElImageViewer as default, imageViewerEmits, imageViewerProps };
//# sourceMappingURL=index.mjs.map
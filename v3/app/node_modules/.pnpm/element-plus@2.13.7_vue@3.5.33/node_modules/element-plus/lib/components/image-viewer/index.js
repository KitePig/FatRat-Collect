Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_image_viewer = require('./src/image-viewer.js');
const require_image_viewer$1 = require('./src/image-viewer2.js');

//#region ../../packages/components/image-viewer/index.ts
const ElImageViewer = require_install.withInstall(require_image_viewer$1.default);

//#endregion
exports.ElImageViewer = ElImageViewer;
exports.default = ElImageViewer;
exports.imageViewerEmits = require_image_viewer.imageViewerEmits;
exports.imageViewerProps = require_image_viewer.imageViewerProps;
//# sourceMappingURL=index.js.map
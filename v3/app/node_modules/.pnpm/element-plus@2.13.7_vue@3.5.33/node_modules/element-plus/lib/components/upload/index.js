Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_upload = require('./src/upload.js');
const require_constants = require('./src/constants.js');
const require_upload_list = require('./src/upload-list.js');
const require_upload_content = require('./src/upload-content.js');
const require_upload_dragger = require('./src/upload-dragger.js');
const require_upload$1 = require('./src/upload2.js');

//#region ../../packages/components/upload/index.ts
const ElUpload = require_install.withInstall(require_upload$1.default);

//#endregion
exports.ElUpload = ElUpload;
exports.default = ElUpload;
exports.genFileId = require_upload.genFileId;
exports.uploadBaseProps = require_upload.uploadBaseProps;
exports.uploadBasePropsDefaults = require_upload.uploadBasePropsDefaults;
exports.uploadContentProps = require_upload_content.uploadContentProps;
exports.uploadContentPropsDefaults = require_upload_content.uploadContentPropsDefaults;
exports.uploadContextKey = require_constants.uploadContextKey;
exports.uploadDraggerEmits = require_upload_dragger.uploadDraggerEmits;
exports.uploadDraggerProps = require_upload_dragger.uploadDraggerProps;
exports.uploadListEmits = require_upload_list.uploadListEmits;
exports.uploadListProps = require_upload_list.uploadListProps;
exports.uploadListTypes = require_upload.uploadListTypes;
exports.uploadProps = require_upload.uploadProps;
exports.uploadPropsDefaults = require_upload.uploadPropsDefaults;
//# sourceMappingURL=index.js.map
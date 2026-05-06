import { withInstall } from "../../utils/vue/install.mjs";
import { genFileId, uploadBaseProps, uploadBasePropsDefaults, uploadListTypes, uploadProps, uploadPropsDefaults } from "./src/upload.mjs";
import { uploadContextKey } from "./src/constants.mjs";
import { uploadListEmits, uploadListProps } from "./src/upload-list.mjs";
import { uploadContentProps, uploadContentPropsDefaults } from "./src/upload-content.mjs";
import { uploadDraggerEmits, uploadDraggerProps } from "./src/upload-dragger.mjs";
import upload_default from "./src/upload2.mjs";

//#region ../../packages/components/upload/index.ts
const ElUpload = withInstall(upload_default);

//#endregion
export { ElUpload, ElUpload as default, genFileId, uploadBaseProps, uploadBasePropsDefaults, uploadContentProps, uploadContentPropsDefaults, uploadContextKey, uploadDraggerEmits, uploadDraggerProps, uploadListEmits, uploadListProps, uploadListTypes, uploadProps, uploadPropsDefaults };
//# sourceMappingURL=index.mjs.map
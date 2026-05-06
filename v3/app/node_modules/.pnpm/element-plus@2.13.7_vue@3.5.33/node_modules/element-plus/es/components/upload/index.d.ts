import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { Crossorigin, ListType, UploadBaseProps, UploadData, UploadFile, UploadFiles, UploadHooks, UploadInstance, UploadProgressEvent, UploadProps, UploadPropsPublic, UploadRawFile, UploadRequestHandler, UploadRequestOptions, UploadStatus, UploadUserFile, genFileId, uploadBaseProps, uploadBasePropsDefaults, uploadListTypes, uploadProps, uploadPropsDefaults } from "./src/upload.js";
import { _default } from "./src/upload.vue.js";
import { UploadContentInstance, UploadContentProps, UploadContentPropsPublic, uploadContentProps, uploadContentPropsDefaults } from "./src/upload-content.js";
import { UploadListEmits, UploadListInstance, UploadListProps, UploadListPropsPublic, uploadListEmits, uploadListProps } from "./src/upload-list.js";
import { UploadDraggerEmits, UploadDraggerInstance, UploadDraggerProps, UploadDraggerPropsPublic, uploadDraggerEmits, uploadDraggerProps } from "./src/upload-dragger.js";
import { UploadContext, uploadContextKey } from "./src/constants.js";

//#region ../../packages/components/upload/index.d.ts
declare const ElUpload: SFCWithInstall<typeof _default>;
//#endregion
export { Crossorigin, ElUpload, ElUpload as default, ListType, UploadBaseProps, UploadContentInstance, UploadContentProps, UploadContentPropsPublic, UploadContext, UploadData, UploadDraggerEmits, UploadDraggerInstance, UploadDraggerProps, UploadDraggerPropsPublic, UploadFile, UploadFiles, UploadHooks, UploadInstance, UploadListEmits, UploadListInstance, UploadListProps, UploadListPropsPublic, UploadProgressEvent, UploadProps, UploadPropsPublic, UploadRawFile, UploadRequestHandler, UploadRequestOptions, UploadStatus, UploadUserFile, genFileId, uploadBaseProps, uploadBasePropsDefaults, uploadContentProps, uploadContentPropsDefaults, uploadContextKey, uploadDraggerEmits, uploadDraggerProps, uploadListEmits, uploadListProps, uploadListTypes, uploadProps, uploadPropsDefaults };
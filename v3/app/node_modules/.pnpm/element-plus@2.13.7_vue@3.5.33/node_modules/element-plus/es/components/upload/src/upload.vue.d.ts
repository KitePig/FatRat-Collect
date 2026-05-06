import { Awaitable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { ListType, UploadData, UploadFile, UploadHooks, UploadProps, UploadRawFile, UploadRequestHandler, UploadStatus, UploadUserFile } from "./upload.js";
import * as vue from "vue";

//#region ../../packages/components/upload/src/upload.vue.d.ts
declare var __VLS_10: {
    file: UploadFile;
    index: number;
  }, __VLS_21: {}, __VLS_23: {}, __VLS_33: {}, __VLS_35: {}, __VLS_37: {}, __VLS_39: {}, __VLS_50: {
    file: UploadFile;
    index: number;
  };
type __VLS_Slots = {} & {
  file?: (props: typeof __VLS_10) => any;
} & {
  trigger?: (props: typeof __VLS_21) => any;
} & {
  default?: (props: typeof __VLS_23) => any;
} & {
  trigger?: (props: typeof __VLS_33) => any;
} & {
  default?: (props: typeof __VLS_35) => any;
} & {
  default?: (props: typeof __VLS_37) => any;
} & {
  tip?: (props: typeof __VLS_39) => any;
} & {
  file?: (props: typeof __VLS_50) => any;
};
declare const __VLS_base: vue.DefineComponent<UploadProps, {
  /** @description cancel upload request */abort: (file?: UploadFile) => void; /** @description upload the file list manually */
  submit: () => void; /** @description clear the file list  */
  clearFiles: (states?: UploadStatus[]) => void; /** @description select the file manually */
  handleStart: (rawFile: UploadRawFile) => void; /** @description remove the file manually */
  handleRemove: (file: UploadFile | UploadRawFile) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<UploadProps> & Readonly<{}>, {
  onChange: UploadHooks["onChange"];
  disabled: boolean;
  name: string;
  onError: UploadHooks["onError"];
  onProgress: UploadHooks["onProgress"];
  data: Awaitable<UploadData> | ((rawFile: UploadRawFile) => Awaitable<UploadData>);
  beforeUpload: UploadHooks["beforeUpload"];
  onRemove: UploadHooks["onRemove"];
  onPreview: UploadHooks["onPreview"];
  onSuccess: UploadHooks["onSuccess"];
  onExceed: UploadHooks["onExceed"];
  action: string;
  method: string;
  showFileList: boolean;
  accept: string;
  fileList: UploadUserFile[];
  autoUpload: boolean;
  listType: ListType;
  httpRequest: UploadRequestHandler;
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };
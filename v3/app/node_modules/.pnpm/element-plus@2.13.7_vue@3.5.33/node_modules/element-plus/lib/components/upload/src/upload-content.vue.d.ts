import { Awaitable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { UploadAjaxError } from "./ajax.js";
import { ListType, UploadData, UploadFile, UploadHooks, UploadProgressEvent, UploadRawFile, UploadRequestHandler, UploadUserFile } from "./upload.js";
import { UploadContentProps } from "./upload-content.js";
import * as vue from "vue";

//#region ../../packages/components/upload/src/upload-content.vue.d.ts
declare var __VLS_9: {}, __VLS_11: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_9) => any;
} & {
  default?: (props: typeof __VLS_11) => any;
};
declare const __VLS_base: vue.DefineComponent<UploadContentProps, {
  abort: (file?: UploadFile) => void;
  upload: (rawFile: UploadRawFile) => Promise<void>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<UploadContentProps> & Readonly<{}>, {
  disabled: boolean;
  name: string;
  onError: (err: UploadAjaxError, rawFile: UploadRawFile) => void;
  onProgress: (evt: UploadProgressEvent, rawFile: UploadRawFile) => void;
  data: Awaitable<UploadData> | ((rawFile: UploadRawFile) => Awaitable<UploadData>);
  beforeUpload: UploadHooks["beforeUpload"];
  onRemove: (file: UploadFile | UploadRawFile) => void;
  onSuccess: (response: any, rawFile: UploadRawFile) => unknown;
  onExceed: UploadHooks["onExceed"];
  action: string;
  method: string;
  showFileList: boolean;
  accept: string;
  fileList: UploadUserFile[];
  autoUpload: boolean;
  listType: ListType;
  httpRequest: UploadRequestHandler;
  onStart: (rawFile: UploadRawFile) => void;
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
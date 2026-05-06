import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Awaitable, Mutable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { UploadAjaxError } from "./ajax.js";
import { _default } from "./upload.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/upload/src/upload.d.ts
/**
 * @deprecated Removed after 3.0.0, Use `UploadProps` instead.
 */
declare const uploadListTypes: readonly ["text", "picture", "picture-card"];
declare const genFileId: () => number;
type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail';
interface UploadProgressEvent extends ProgressEvent {
  percent: number;
}
interface UploadRequestOptions {
  action: string;
  method: string;
  data: Record<string, string | Blob | [string | Blob, string] | string[]>;
  filename: string;
  file: UploadRawFile;
  headers: Headers | Record<string, string | number | null | undefined>;
  onError: (evt: UploadAjaxError) => void;
  onProgress: (evt: UploadProgressEvent) => void;
  onSuccess: (response: any) => void;
  withCredentials: boolean;
}
interface UploadFile {
  name: string;
  percentage?: number;
  status: UploadStatus;
  size?: number;
  response?: unknown;
  uid: number;
  url?: string;
  raw?: UploadRawFile;
}
type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> & Partial<Pick<UploadFile, 'status' | 'uid'>>;
type UploadFiles = UploadFile[];
interface UploadRawFile extends File {
  uid: number;
  isDirectory?: boolean;
}
type UploadRequestHandler = (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>;
interface UploadHooks {
  beforeUpload: (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>;
  beforeRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>;
  onRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onChange: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onPreview: (uploadFile: UploadFile) => void;
  onSuccess: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onProgress: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onError: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  onExceed: (files: File[], uploadFiles: UploadUserFile[]) => void;
}
type UploadData = Mutable<Record<string, any>>;
type ListType = 'text' | 'picture' | 'picture-card';
type Crossorigin = 'anonymous' | 'use-credentials' | '';
interface UploadBaseProps {
  /**
   * @description request URL
   */
  action?: string;
  /**
   * @description request headers
   */
  headers?: Headers | Record<string, any>;
  /**
   * @description set upload request method
   */
  method?: string;
  /**
   * @description additions options of request
   */
  data?: Awaitable<UploadData> | ((rawFile: UploadRawFile) => Awaitable<UploadData>);
  /**
   * @description whether uploading multiple files is permitted
   */
  multiple?: boolean;
  /**
   * @description key name for uploaded file
   */
  name?: string;
  /**
   * @description whether to activate drag and drop mode
   */
  drag?: boolean;
  /**
   * @description whether cookies are sent
   */
  withCredentials?: boolean;
  /**
   * @description whether to show the uploaded file list
   */
  showFileList?: boolean;
  /**
   * @description accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept), will not work when `thumbnail-mode === true`
   */
  accept?: string;
  /**
   * @description default uploaded files
   */
  fileList?: UploadUserFile[];
  /**
   * @description whether to auto upload file
   */
  autoUpload?: boolean;
  /**
   * @description type of file list
   */
  listType?: ListType;
  /**
   * @description override default xhr behavior, allowing you to implement your own upload-file's request
   */
  httpRequest?: UploadRequestHandler;
  /**
   * @description whether to disable upload
   */
  disabled?: boolean;
  /**
   * @description maximum number of uploads allowed
   */
  limit?: number;
  /**
   * @description whether to support uploading directory
   */
  directory?: boolean;
}
interface UploadProps extends UploadBaseProps {
  /**
   * @description hook function before uploading with the file to be uploaded as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, uploading will be aborted
   */
  beforeUpload?: UploadHooks['beforeUpload'];
  /**
   * @description hook function before removing a file with the file and file list as its parameters. If `false` is returned or a `Promise` is returned and then is rejected, removing will be aborted
   */
  beforeRemove?: UploadHooks['beforeRemove'];
  /**
   * @description hook function when files are removed
   */
  onRemove?: UploadHooks['onRemove'];
  /**
   * @description hook function when select file or upload file success or upload file fail
   */
  onChange?: UploadHooks['onChange'];
  /**
   * @description hook function when clicking the uploaded files
   */
  onPreview?: UploadHooks['onPreview'];
  /**
   * @description hook function when uploaded successfully
   */
  onSuccess?: UploadHooks['onSuccess'];
  /**
   * @description hook function when some progress occurs
   */
  onProgress?: UploadHooks['onProgress'];
  /**
   * @description hook function when some errors occurs
   */
  onError?: UploadHooks['onError'];
  /**
   * @description hook function when limit is exceeded
   */
  onExceed?: UploadHooks['onExceed'];
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin?: Crossorigin;
}
/**
 * @deprecated Removed after 3.0.0, Use `UploadBaseProps` instead.
 */
declare const uploadBaseProps: {
  readonly action: EpPropFinalized<StringConstructor, unknown, unknown, "#", boolean>;
  readonly headers: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers) | (((new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly method: EpPropFinalized<StringConstructor, unknown, unknown, "post", boolean>;
  readonly data: EpPropFinalized<(new (...args: any[]) => Mutable<Record<string, any>> | Promise<Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => Awaitable<UploadData>)) | (() => Awaitable<Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => Awaitable<UploadData>)) | (((new (...args: any[]) => Mutable<Record<string, any>> | Promise<Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => Awaitable<UploadData>)) | (() => Awaitable<Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => Awaitable<UploadData>))) | null)[], unknown, unknown, () => Mutable<{}>, boolean>;
  readonly multiple: BooleanConstructor;
  readonly name: EpPropFinalized<StringConstructor, unknown, unknown, "file", boolean>;
  readonly drag: BooleanConstructor;
  readonly withCredentials: BooleanConstructor;
  readonly showFileList: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly accept: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly fileList: EpPropFinalized<(new (...args: any[]) => UploadUserFile[]) | (() => UploadUserFile[]) | (((new (...args: any[]) => UploadUserFile[]) | (() => UploadUserFile[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly autoUpload: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly listType: EpPropFinalized<StringConstructor, "text" | "picture" | "picture-card", unknown, "text", boolean>;
  readonly httpRequest: EpPropFinalized<(new (...args: any[]) => UploadRequestHandler) | (() => UploadRequestHandler) | {
    (): UploadRequestHandler;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => UploadRequestHandler) | (() => UploadRequestHandler) | {
    (): UploadRequestHandler;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, UploadRequestHandler, boolean>;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly limit: NumberConstructor;
  readonly directory: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `UploadProps` instead.
 */
declare const uploadProps: {
  readonly beforeUpload: EpPropFinalized<(new (...args: any[]) => (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>) | (() => (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>) | {
    (): (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>) | (() => (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>) | {
    (): (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly beforeRemove: {
    readonly type: vue.PropType<(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRemove: EpPropFinalized<(new (...args: any[]) => (uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onChange: EpPropFinalized<(new (...args: any[]) => (uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onPreview: EpPropFinalized<(new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
    (): (uploadFile: UploadFile) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
    (): (uploadFile: UploadFile) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onSuccess: EpPropFinalized<(new (...args: any[]) => (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onProgress: EpPropFinalized<(new (...args: any[]) => (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onError: EpPropFinalized<(new (...args: any[]) => (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | (() => (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void) | {
    (): (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onExceed: EpPropFinalized<(new (...args: any[]) => (files: File[], uploadFiles: UploadUserFile[]) => void) | (() => (files: File[], uploadFiles: UploadUserFile[]) => void) | {
    (): (files: File[], uploadFiles: UploadUserFile[]) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (files: File[], uploadFiles: UploadUserFile[]) => void) | (() => (files: File[], uploadFiles: UploadUserFile[]) => void) | {
    (): (files: File[], uploadFiles: UploadUserFile[]) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly crossorigin: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => "" | "anonymous" | "use-credentials") | (((new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => "" | "anonymous" | "use-credentials")) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly action: EpPropFinalized<StringConstructor, unknown, unknown, "#", boolean>;
  readonly headers: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers) | (((new (...args: any[]) => Record<string, any> | Headers) | (() => Record<string, any> | Headers)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly method: EpPropFinalized<StringConstructor, unknown, unknown, "post", boolean>;
  readonly data: EpPropFinalized<(new (...args: any[]) => Mutable<Record<string, any>> | Promise<Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => Awaitable<UploadData>)) | (() => Awaitable<Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => Awaitable<UploadData>)) | (((new (...args: any[]) => Mutable<Record<string, any>> | Promise<Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => Awaitable<UploadData>)) | (() => Awaitable<Mutable<Record<string, any>>> | ((rawFile: UploadRawFile) => Awaitable<UploadData>))) | null)[], unknown, unknown, () => Mutable<{}>, boolean>;
  readonly multiple: BooleanConstructor;
  readonly name: EpPropFinalized<StringConstructor, unknown, unknown, "file", boolean>;
  readonly drag: BooleanConstructor;
  readonly withCredentials: BooleanConstructor;
  readonly showFileList: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly accept: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly fileList: EpPropFinalized<(new (...args: any[]) => UploadUserFile[]) | (() => UploadUserFile[]) | (((new (...args: any[]) => UploadUserFile[]) | (() => UploadUserFile[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly autoUpload: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly listType: EpPropFinalized<StringConstructor, "text" | "picture" | "picture-card", unknown, "text", boolean>;
  readonly httpRequest: EpPropFinalized<(new (...args: any[]) => UploadRequestHandler) | (() => UploadRequestHandler) | {
    (): UploadRequestHandler;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => UploadRequestHandler) | (() => UploadRequestHandler) | {
    (): UploadRequestHandler;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, UploadRequestHandler, boolean>;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly limit: NumberConstructor;
  readonly directory: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `UploadProps` instead.
 */
type UploadPropsPublic = ExtractPublicPropTypes<typeof uploadProps>;
type UploadInstance = InstanceType<typeof _default> & unknown;
declare const uploadBasePropsDefaults: {
  readonly action: "#";
  readonly method: "post";
  readonly data: () => Mutable<{}>;
  readonly name: "file";
  readonly showFileList: true;
  readonly accept: "";
  readonly fileList: () => never[];
  readonly autoUpload: true;
  readonly listType: "text";
  readonly httpRequest: UploadRequestHandler;
  readonly disabled: undefined;
};
declare const uploadPropsDefaults: {
  readonly beforeUpload: () => void;
  readonly onRemove: () => void;
  readonly onChange: () => void;
  readonly onPreview: () => void;
  readonly onSuccess: () => void;
  readonly onProgress: () => void;
  readonly onError: () => void;
  readonly onExceed: () => void;
  readonly action: "#";
  readonly method: "post";
  readonly data: () => Mutable<{}>;
  readonly name: "file";
  readonly showFileList: true;
  readonly accept: "";
  readonly fileList: () => never[];
  readonly autoUpload: true;
  readonly listType: "text";
  readonly httpRequest: UploadRequestHandler;
  readonly disabled: undefined;
};
//#endregion
export { Crossorigin, ListType, UploadBaseProps, UploadData, UploadFile, UploadFiles, UploadHooks, UploadInstance, UploadProgressEvent, UploadProps, UploadPropsPublic, UploadRawFile, UploadRequestHandler, UploadRequestOptions, UploadStatus, UploadUserFile, genFileId, uploadBaseProps, uploadBasePropsDefaults, uploadListTypes, uploadProps, uploadPropsDefaults };
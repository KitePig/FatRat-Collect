import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Awaitable, Mutable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { UploadAjaxError } from "./ajax.js";
import { UploadBaseProps, UploadData, UploadFile, UploadHooks, UploadProgressEvent, UploadRawFile, UploadRequestHandler, UploadUserFile } from "./upload.js";
import { _default } from "./upload-content.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/upload/src/upload-content.d.ts
interface UploadContentProps extends UploadBaseProps {
  beforeUpload?: UploadHooks['beforeUpload'];
  onRemove?: (file: UploadFile | UploadRawFile) => void;
  onStart?: (rawFile: UploadRawFile) => void;
  onSuccess?: (response: any, rawFile: UploadRawFile) => unknown;
  onProgress?: (evt: UploadProgressEvent, rawFile: UploadRawFile) => void;
  onError?: (err: UploadAjaxError, rawFile: UploadRawFile) => void;
  onExceed?: UploadHooks['onExceed'];
}
/**
 * @deprecated Removed after 3.0.0, Use `UploadContentProps` instead.
 */
declare const uploadContentProps: {
  readonly beforeUpload: EpPropFinalized<(new (...args: any[]) => (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>) | (() => (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>) | {
    (): (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>) | (() => (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>) | {
    (): (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onRemove: EpPropFinalized<(new (...args: any[]) => (file: UploadFile | UploadRawFile) => void) | (() => (file: UploadFile | UploadRawFile) => void) | {
    (): (file: UploadFile | UploadRawFile) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (file: UploadFile | UploadRawFile) => void) | (() => (file: UploadFile | UploadRawFile) => void) | {
    (): (file: UploadFile | UploadRawFile) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onStart: EpPropFinalized<(new (...args: any[]) => (rawFile: UploadRawFile) => void) | (() => (rawFile: UploadRawFile) => void) | {
    (): (rawFile: UploadRawFile) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (rawFile: UploadRawFile) => void) | (() => (rawFile: UploadRawFile) => void) | {
    (): (rawFile: UploadRawFile) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onSuccess: EpPropFinalized<(new (...args: any[]) => (response: any, rawFile: UploadRawFile) => unknown) | (() => (response: any, rawFile: UploadRawFile) => unknown) | {
    (): (response: any, rawFile: UploadRawFile) => unknown;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (response: any, rawFile: UploadRawFile) => unknown) | (() => (response: any, rawFile: UploadRawFile) => unknown) | {
    (): (response: any, rawFile: UploadRawFile) => unknown;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onProgress: EpPropFinalized<(new (...args: any[]) => (evt: UploadProgressEvent, rawFile: UploadRawFile) => void) | (() => (evt: UploadProgressEvent, rawFile: UploadRawFile) => void) | {
    (): (evt: UploadProgressEvent, rawFile: UploadRawFile) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (evt: UploadProgressEvent, rawFile: UploadRawFile) => void) | (() => (evt: UploadProgressEvent, rawFile: UploadRawFile) => void) | {
    (): (evt: UploadProgressEvent, rawFile: UploadRawFile) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly onError: EpPropFinalized<(new (...args: any[]) => (err: UploadAjaxError, rawFile: UploadRawFile) => void) | (() => (err: UploadAjaxError, rawFile: UploadRawFile) => void) | {
    (): (err: UploadAjaxError, rawFile: UploadRawFile) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (err: UploadAjaxError, rawFile: UploadRawFile) => void) | (() => (err: UploadAjaxError, rawFile: UploadRawFile) => void) | {
    (): (err: UploadAjaxError, rawFile: UploadRawFile) => void;
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
 * @deprecated Removed after 3.0.0, Use `UploadContentProps` instead.
 */
type UploadContentPropsPublic = ExtractPublicPropTypes<typeof uploadContentProps>;
type UploadContentInstance = InstanceType<typeof _default> & unknown;
declare const uploadContentPropsDefaults: {
  readonly beforeUpload: () => void;
  readonly onRemove: () => void;
  readonly onStart: () => void;
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
export { UploadContentInstance, UploadContentProps, UploadContentPropsPublic, uploadContentProps, uploadContentPropsDefaults };
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { Crossorigin, ListType, UploadFile, UploadFiles, UploadHooks } from "./upload.js";
import { _default } from "./upload-list.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/upload/src/upload-list.d.ts
interface UploadListProps {
  files?: UploadFiles;
  disabled?: boolean;
  handlePreview?: UploadHooks['onPreview'];
  listType?: ListType;
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin?: Crossorigin;
}
/**
 * @deprecated Removed after 3.0.0, Use `UploadListProps` instead.
 */
declare const uploadListProps: {
  readonly files: EpPropFinalized<(new (...args: any[]) => UploadFiles) | (() => UploadFiles) | (((new (...args: any[]) => UploadFiles) | (() => UploadFiles)) | null)[], unknown, unknown, () => never[], boolean>;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly handlePreview: EpPropFinalized<(new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
    (): (uploadFile: UploadFile) => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (uploadFile: UploadFile) => void) | (() => (uploadFile: UploadFile) => void) | {
    (): (uploadFile: UploadFile) => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => void, boolean>;
  readonly listType: EpPropFinalized<StringConstructor, "text" | "picture" | "picture-card", unknown, "text", boolean>;
  readonly crossorigin: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => "" | "anonymous" | "use-credentials") | (((new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => "" | "anonymous" | "use-credentials")) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `UploadListProps` instead.
 */
type UploadListPropsPublic = ExtractPublicPropTypes<typeof uploadListProps>;
declare const uploadListEmits: {
  remove: (file: UploadFile) => boolean;
};
type UploadListEmits = typeof uploadListEmits;
type UploadListInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { UploadListEmits, UploadListInstance, UploadListProps, UploadListPropsPublic, uploadListEmits, uploadListProps };
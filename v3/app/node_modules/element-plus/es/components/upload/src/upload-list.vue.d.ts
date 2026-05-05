import { ListType, UploadFile, UploadFiles, UploadHooks } from "./upload.js";
import { UploadListProps } from "./upload-list.js";
import * as vue from "vue";

//#region ../../packages/components/upload/src/upload-list.vue.d.ts
declare var __VLS_8: {
    file: UploadFile;
    index: number;
  }, __VLS_84: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_8) => any;
} & {
  append?: (props: typeof __VLS_84) => any;
};
declare const __VLS_base: vue.DefineComponent<UploadListProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  remove: (file: UploadFile) => void;
}, string, vue.PublicProps, Readonly<UploadListProps> & Readonly<{
  onRemove?: ((file: UploadFile) => any) | undefined;
}>, {
  disabled: boolean;
  listType: ListType;
  files: UploadFiles;
  handlePreview: UploadHooks["onPreview"];
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
import { InjectionKey, Ref } from "vue";

//#region ../../packages/components/upload/src/constants.d.ts
interface UploadContext {
  accept: Ref<string>;
}
declare const uploadContextKey: InjectionKey<UploadContext>;
//#endregion
export { UploadContext, uploadContextKey };
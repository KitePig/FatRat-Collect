import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./upload-dragger.vue.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/upload/src/upload-dragger.d.ts
interface UploadDraggerProps {
  disabled?: boolean;
  directory?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `UploadDraggerProps` instead.
 */
declare const uploadDraggerProps: {
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly directory: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `UploadDraggerProps` instead.
 */
type UploadDraggerPropsPublic = ExtractPublicPropTypes<typeof uploadDraggerProps>;
declare const uploadDraggerEmits: {
  file: (file: File[]) => boolean;
};
type UploadDraggerEmits = typeof uploadDraggerEmits;
type UploadDraggerInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { UploadDraggerEmits, UploadDraggerInstance, UploadDraggerProps, UploadDraggerPropsPublic, uploadDraggerEmits, uploadDraggerProps };
import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./check-tag.vue.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/check-tag/src/check-tag.d.ts
interface CheckTagProps {
  /**
   * @description is checked
   */
  checked?: boolean;
  /**
   * @description whether the check-tag is disabled
   */
  disabled?: boolean;
  /**
   * @description type of Tag
   */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
}
/**
 * @deprecated Removed after 3.0.0, Use `CheckTagProps` instead.
 */
declare const checkTagProps: {
  readonly checked: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly type: EpPropFinalized<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown, "primary", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `CheckTagProps` instead.
 */
type CheckTagPropsPublic = ExtractPublicPropTypes<typeof checkTagProps>;
declare const checkTagEmits: {
  'update:checked': (value: boolean) => boolean;
  change: (value: boolean) => boolean;
};
type CheckTagEmits = typeof checkTagEmits;
type CheckTagInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { CheckTagEmits, CheckTagInstance, CheckTagProps, CheckTagPropsPublic, checkTagEmits, checkTagProps };
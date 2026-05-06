import { TypeComponentsMap } from "../../../utils/vue/icon.js";
import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/alert/src/alert.d.ts
declare const alertEffects: readonly ["light", "dark"];
interface AlertProps {
  /**
   * @description alert title.
   */
  title?: string;
  /**
   * @description descriptive text.
   */
  description?: string;
  /**
   * @description alert type.
   */
  type?: keyof typeof TypeComponentsMap;
  /**
   * @description whether alert can be dismissed.
   */
  closable?: boolean;
  /**
   * @description text for replacing x button
   */
  closeText?: string;
  /**
   * @description whether show icon
   */
  showIcon?: boolean;
  /**
   * @description should content be placed in center.
   */
  center?: boolean;
  /**
   * @description theme style
   */
  effect?: 'light' | 'dark';
}
/**
 * @deprecated Removed after 3.0.0, Use `AlertProps` instead.
 */
declare const alertProps: {
  readonly title: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly description: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly type: EpPropFinalized<StringConstructor, "error" | "info" | "primary" | "success" | "warning", unknown, "info", boolean>;
  readonly closable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly closeText: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly showIcon: BooleanConstructor;
  readonly center: BooleanConstructor;
  readonly effect: EpPropFinalized<StringConstructor, "light" | "dark", unknown, "light", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `AlertProps` instead.
 */
type AlertPropsPublic = ExtractPublicPropTypes<typeof alertProps>;
declare const alertEmits: {
  close: (evt: MouseEvent) => boolean;
};
type AlertEmits = typeof alertEmits;
//#endregion
export { AlertEmits, AlertProps, AlertPropsPublic, alertEffects, alertEmits, alertProps };
import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./result.vue.js";
import { Component, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/result/src/result.d.ts
declare const IconMap: {
  readonly primary: "icon-primary";
  readonly success: "icon-success";
  readonly warning: "icon-warning";
  readonly error: "icon-error";
  readonly info: "icon-info";
};
declare const IconComponentMap: Record<(typeof IconMap)[keyof typeof IconMap], Component>;
interface ResultProps {
  /**
   * @description title of result
   */
  title?: string;
  /**
   * @description sub title of result
   */
  subTitle?: string;
  /**
   * @description icon type of result
   */
  icon?: 'primary' | 'success' | 'warning' | 'info' | 'error';
}
/**
 * @deprecated Removed after 3.0.0, Use `ResultProps` instead.
 */
declare const resultProps: {
  readonly title: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly subTitle: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly icon: EpPropFinalized<StringConstructor, "error" | "info" | "primary" | "success" | "warning", unknown, "info", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `ResultProps` instead.
 */
type ResultPropsPublic = ExtractPublicPropTypes<typeof resultProps>;
type ResultInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { IconComponentMap, IconMap, ResultInstance, ResultProps, ResultPropsPublic, resultProps };
import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/breadcrumb/src/breadcrumb.d.ts
interface BreadcrumbProps {
  /**
   * @description separator character
   */
  separator?: string;
  /**
   * @description icon component of icon separator
   */
  separatorIcon?: IconPropType;
}
/**
 * @deprecated Removed after 3.0.0, Use `BreadcrumbProps` instead.
 */
declare const breadcrumbProps: {
  readonly separator: EpPropFinalized<StringConstructor, unknown, unknown, "/", boolean>;
  readonly separatorIcon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `BreadcrumbProps` instead.
 */
type BreadcrumbPropsPublic = ExtractPublicPropTypes<typeof breadcrumbProps>;
//#endregion
export { BreadcrumbProps, BreadcrumbPropsPublic, breadcrumbProps };
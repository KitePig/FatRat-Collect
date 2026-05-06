import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./page-header.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/page-header/src/page-header.d.ts
interface PageHeaderProps {
  /**
   * @description icon component of page header
   */
  icon?: IconPropType;
  /**
   * @description main title of page header
   */
  title?: string;
  /**
   * @description content of page header
   */
  content?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `PageHeaderProps` instead.
 */
declare const pageHeaderProps: {
  readonly icon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly title: StringConstructor;
  readonly content: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `PageHeaderProps` instead.
 */
type PageHeaderPropsPublic = ExtractPublicPropTypes<typeof pageHeaderProps>;
declare const pageHeaderEmits: {
  back: () => boolean;
};
type PageHeaderEmits = typeof pageHeaderEmits;
type PageHeaderInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { PageHeaderEmits, PageHeaderInstance, PageHeaderProps, PageHeaderPropsPublic, pageHeaderEmits, pageHeaderProps };
import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { CollapseActiveName } from "./collapse.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/collapse/src/collapse-item.d.ts
interface CollapseItemProps {
  /**
   * @description title of the panel
   */
  title?: string;
  /**
   * @description unique identification of the panel
   */
  name?: CollapseActiveName;
  /**
   * @description icon of the collapse item
   */
  icon?: IconPropType;
  /**
   * @description disable the collapse item
   */
  disabled?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `CollapseItemProps` instead.
 */
declare const collapseItemProps: {
  readonly title: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly name: EpPropFinalized<(new (...args: any[]) => string | number) | (() => CollapseActiveName) | (((new (...args: any[]) => string | number) | (() => CollapseActiveName)) | null)[], unknown, unknown, undefined, boolean>;
  readonly icon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `CollapseItemProps` instead.
 */
type CollapseItemPropsPublic = ExtractPublicPropTypes<typeof collapseItemProps>;
//#endregion
export { CollapseItemProps, CollapseItemPropsPublic, collapseItemProps };
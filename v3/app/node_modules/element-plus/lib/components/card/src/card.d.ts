import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, InjectionKey, StyleValue } from "vue";

//#region ../../packages/components/card/src/card.d.ts
interface CardProps {
  /**
   * @description title of the card. Also accepts a DOM passed by `slot#header`
   */
  header?: string;
  /**
   * @description content of footer. Also accepts a DOM passed by `slot#footer`
   */
  footer?: string;
  /**
   * @description CSS style of card body
   */
  bodyStyle?: StyleValue;
  /**
   * @description custom class name of card header
   */
  headerClass?: string;
  /**
   * @description custom class name of card body
   */
  bodyClass?: string;
  /**
   * @description custom class name of card footer
   */
  footerClass?: string;
  /**
   * @description when to show card shadows
   */
  shadow?: 'always' | 'hover' | 'never';
}
/**
 * @deprecated Removed after 3.0.0, Use `CardProps` instead.
 */
declare const cardProps: {
  readonly header: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly footer: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly bodyStyle: EpPropFinalized<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown, "", boolean>;
  readonly headerClass: StringConstructor;
  readonly bodyClass: StringConstructor;
  readonly footerClass: StringConstructor;
  readonly shadow: EpPropFinalized<StringConstructor, "always" | "never" | "hover", unknown, undefined, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `CardProps` instead.
 */
type CardPropsPublic = ExtractPublicPropTypes<typeof cardProps>;
interface CardConfigContext {
  shadow?: CardProps['shadow'];
}
declare const cardContextKey: InjectionKey<CardConfigContext>;
//#endregion
export { CardConfigContext, CardProps, CardPropsPublic, cardContextKey, cardProps };
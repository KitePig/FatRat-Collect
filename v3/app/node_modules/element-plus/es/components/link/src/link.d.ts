import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./link.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, PropType } from "vue";

//#region ../../packages/components/link/src/link.d.ts
interface LinkProps {
  /**
   * @description type
   */
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default';
  /**
   * @description when underlines should appear
   */
  underline?: boolean | 'always' | 'never' | 'hover';
  /**
   * @description whether the component is disabled
   */
  disabled?: boolean;
  /**
   * @description same as native hyperlink's `href`
   */
  href?: string;
  /**
   * @description same as native hyperlink's `target`
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & NonNullable<unknown>);
  /**
   * @description icon component
   */
  icon?: IconPropType;
}
/**
 * @deprecated Removed after 3.0.0, Use `LinkProps` instead.
 */
declare const linkProps: {
  readonly type: EpPropFinalized<StringConstructor, "default" | "info" | "primary" | "success" | "warning" | "danger", unknown, undefined, boolean>;
  readonly underline: EpPropFinalized<readonly [BooleanConstructor, StringConstructor], boolean | "always" | "never" | "hover", unknown, undefined, boolean>;
  readonly disabled: BooleanConstructor;
  readonly href: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly target: EpPropFinalized<(new (...args: any[]) => string) | (() => string) | (((new (...args: any[]) => string) | (() => string)) | null)[], unknown, unknown, "_self", boolean>;
  readonly icon: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `LinkProps` instead.
 */
type LinkPropsPublic = ExtractPublicPropTypes<typeof linkProps>;
declare const linkEmits: {
  click: (evt: MouseEvent) => boolean;
};
type LinkEmits = typeof linkEmits;
type LinkInstance = InstanceType<typeof _default> & unknown;
interface LinkConfigContext {
  type?: LinkProps['type'];
  underline?: LinkProps['underline'];
}
//#endregion
export { LinkConfigContext, LinkEmits, LinkInstance, LinkProps, LinkPropsPublic, linkEmits, linkProps };
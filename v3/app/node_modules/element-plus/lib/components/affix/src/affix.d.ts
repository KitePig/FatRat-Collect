import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ZIndexType } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { _default } from "./affix.vue.js";
import { ExtractPublicPropTypes } from "vue";
import * as csstype from "csstype";

//#region ../../packages/components/affix/src/affix.d.ts
interface AffixProps {
  /**
   * @description affix element zIndex value
   * */
  zIndex?: ZIndexType;
  /**
   * @description target container. (CSS selector)
   */
  target?: string;
  /**
   * @description offset distance
   * */
  offset?: number;
  /**
   * @description position of affix
   * */
  position?: 'top' | 'bottom';
  /**
   * @description whether affix element is teleported, if `true` it will be teleported to where `append-to` sets
   * */
  teleported?: boolean;
  /**
   * @description which element the affix element appends to
   * */
  appendTo?: string | HTMLElement;
}
/**
 * @deprecated Removed after 3.0.0, Use `AffixProps` instead.
 */
declare const affixProps: {
  readonly zIndex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => csstype.Property.ZIndex | undefined) | (((new (...args: any[]) => string | number) | (() => csstype.Property.ZIndex | undefined)) | null)[], unknown, unknown, 100, boolean>;
  readonly target: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly position: EpPropFinalized<StringConstructor, "top" | "bottom", unknown, "top", boolean>;
  readonly teleported: BooleanConstructor;
  readonly appendTo: EpPropFinalized<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown, "body", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `AffixProps` instead.
 */
type AffixPropsPublic = ExtractPublicPropTypes<typeof affixProps>;
declare const affixEmits: {
  scroll: ({
    scrollTop,
    fixed
  }: {
    scrollTop: number;
    fixed: boolean;
  }) => boolean;
  change: (fixed: boolean) => boolean;
};
type AffixEmits = typeof affixEmits;
type AffixInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { AffixEmits, AffixInstance, AffixProps, AffixPropsPublic, affixEmits, affixProps };
import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { Mutable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { _default } from "./col.vue.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/col/src/col.d.ts
type ColSizeObject = {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
};
type ColSize = number | ColSizeObject;
interface ColProps {
  /**
   * @description custom element tag
   */
  tag?: string;
  /**
   * @description number of column the grid spans
   */
  span?: number;
  /**
   * @description number of spacing on the left side of the grid
   */
  offset?: number;
  /**
   * @description number of columns that grid moves to the left
   */
  pull?: number;
  /**
   * @description number of columns that grid moves to the right
   */
  push?: number;
  /**
   * @description `<768px` Responsive columns or column props object
   */
  xs?: ColSize;
  /**
   * @description `≥768px` Responsive columns or column props object
   */
  sm?: ColSize;
  /**
   * @description `≥992px` Responsive columns or column props object
   */
  md?: ColSize;
  /**
   * @description `≥1200px` Responsive columns or column props object
   */
  lg?: ColSize;
  /**
   * @description `≥1920px` Responsive columns or column props object
   */
  xl?: ColSize;
}
/**
 * @deprecated Removed after 3.0.0, Use `ColProps` instead.
 */
declare const colProps: {
  readonly tag: EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
  readonly span: EpPropFinalized<NumberConstructor, unknown, unknown, 24, boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly pull: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly push: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly xs: EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | (((new (...args: any[]) => number | ColSizeObject) | (() => ColSize)) | null)[], unknown, unknown, () => Mutable<{}>, boolean>;
  readonly sm: EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | (((new (...args: any[]) => number | ColSizeObject) | (() => ColSize)) | null)[], unknown, unknown, () => Mutable<{}>, boolean>;
  readonly md: EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | (((new (...args: any[]) => number | ColSizeObject) | (() => ColSize)) | null)[], unknown, unknown, () => Mutable<{}>, boolean>;
  readonly lg: EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | (((new (...args: any[]) => number | ColSizeObject) | (() => ColSize)) | null)[], unknown, unknown, () => Mutable<{}>, boolean>;
  readonly xl: EpPropFinalized<(new (...args: any[]) => number | ColSizeObject) | (() => ColSize) | (((new (...args: any[]) => number | ColSizeObject) | (() => ColSize)) | null)[], unknown, unknown, () => Mutable<{}>, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `ColProps` instead.
 */
type ColPropsPublic = ExtractPublicPropTypes<typeof colProps>;
type ColInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { ColInstance, ColProps, ColPropsPublic, ColSize, ColSizeObject, colProps };
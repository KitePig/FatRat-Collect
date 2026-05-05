import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/empty/src/empty.d.ts
interface EmptyProps {
  /**
   * @description image URL of empty
   */
  image?: string;
  /**
   * @description image size (width) of empty
   */
  imageSize?: number;
  /**
   * @description description of empty
   */
  description?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `EmptyProps` instead.
 */
declare const emptyProps: {
  readonly image: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly imageSize: NumberConstructor;
  readonly description: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `EmptyProps` instead.
 */
type EmptyPropsPublic = ExtractPublicPropTypes<typeof emptyProps>;
//#endregion
export { EmptyProps, EmptyPropsPublic, emptyProps };
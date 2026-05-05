import { _default } from "./thumb.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/scrollbar/src/thumb.d.ts
interface ThumbProps {
  vertical?: boolean;
  size?: string;
  move?: number;
  ratio: number;
  always?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `ThumbProps` instead.
 */
declare const thumbProps: {
  readonly vertical: BooleanConstructor;
  readonly size: StringConstructor;
  readonly move: NumberConstructor;
  readonly ratio: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly always: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `ThumbProps` instead.
 */
type ThumbPropsPublic = ExtractPublicPropTypes<typeof thumbProps>;
type ThumbInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { ThumbInstance, ThumbProps, ThumbPropsPublic, thumbProps };
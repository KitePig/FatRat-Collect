import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/table-v2/src/auto-resizer.d.ts
type AutoResizeHandler = (event: {
  height: number;
  width: number;
}) => void;
declare const autoResizerProps: {
  readonly disableWidth: BooleanConstructor;
  readonly disableHeight: BooleanConstructor;
  readonly onResize: {
    readonly type: vue.PropType<AutoResizeHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type AutoResizerProps = ExtractPropTypes<typeof autoResizerProps>;
type AutoResizerPropsPublic = ExtractPublicPropTypes<typeof autoResizerProps>;
//#endregion
export { AutoResizerProps, AutoResizerPropsPublic, autoResizerProps };
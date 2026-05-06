import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import * as csstype from "csstype";

//#region ../../packages/components/overlay/src/overlay.d.ts
declare const overlayProps: {
  readonly mask: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly customMaskEvent: BooleanConstructor;
  readonly overlayClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | string[] | Record<string, boolean>) | (() => string | string[] | Record<string, boolean>) | (((new (...args: any[]) => string | string[] | Record<string, boolean>) | (() => string | string[] | Record<string, boolean>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly zIndex: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | number) | (() => csstype.Property.ZIndex | undefined) | (((new (...args: any[]) => string | number) | (() => csstype.Property.ZIndex | undefined)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type OverlayProps = ExtractPropTypes<typeof overlayProps>;
type OverlayPropsPublic = ExtractPublicPropTypes<typeof overlayProps>;
declare const overlayEmits: {
  click: (evt: MouseEvent) => boolean;
};
type OverlayEmits = typeof overlayEmits;
//#endregion
export { OverlayEmits, OverlayProps, OverlayPropsPublic, overlayEmits, overlayProps };
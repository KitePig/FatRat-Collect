import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/slider/src/marker.d.ts
declare const sliderMarkerProps: {
  readonly mark: EpPropFinalized<(new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  }) | (((new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  })) | null)[], unknown, unknown, undefined, boolean>;
};
type SliderMarkerProps = ExtractPropTypes<typeof sliderMarkerProps>;
//#endregion
export { SliderMarkerProps };
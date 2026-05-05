import { ObjectDirective } from "vue";
import { NormalizedWheelEvent } from "normalize-wheel-es";

//#region ../../packages/directives/mousewheel/index.d.ts
declare const SCOPE = "_Mousewheel";
interface WheelElement extends HTMLElement {
  [SCOPE]: null | {
    wheelHandler?: (event: WheelEvent) => void;
  };
}
type MousewheelCallback = (e: WheelEvent, normalized: NormalizedWheelEvent) => void;
declare const Mousewheel: ObjectDirective<WheelElement, MousewheelCallback>;
//#endregion
export { MousewheelCallback, SCOPE, WheelElement, Mousewheel as default };
import { TimelineProps } from "./timeline.js";
import { Slots } from "vue";

//#region ../../packages/components/timeline/src/tokens.d.ts
interface TimelineProvider {
  props: TimelineProps;
  slots: Slots;
}
declare const TIMELINE_INJECTION_KEY = "timeline";
//#endregion
export { TIMELINE_INJECTION_KEY, TimelineProvider };
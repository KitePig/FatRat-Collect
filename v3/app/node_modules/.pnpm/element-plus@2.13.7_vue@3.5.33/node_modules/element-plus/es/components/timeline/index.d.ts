import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { Timeline, TimelineInstance, TimelineProps, TimelinePropsPublic, timelineProps } from "./src/timeline.js";
import { TimelineItemInstance, TimelineItemProps, TimelineItemPropsPublic, timelineItemProps } from "./src/timeline-item.js";
import { _default } from "./src/timeline-item.vue.js";
import { TIMELINE_INJECTION_KEY, TimelineProvider } from "./src/tokens.js";

//#region ../../packages/components/timeline/index.d.ts
declare const ElTimeline: SFCWithInstall<typeof Timeline> & {
  TimelineItem: typeof _default;
};
declare const ElTimelineItem: SFCWithInstall<typeof _default>;
//#endregion
export { ElTimeline, ElTimeline as default, ElTimelineItem, TIMELINE_INJECTION_KEY, TimelineInstance, TimelineItemInstance, TimelineItemProps, TimelineItemPropsPublic, TimelineProps, TimelinePropsPublic, TimelineProvider, timelineItemProps, timelineProps };
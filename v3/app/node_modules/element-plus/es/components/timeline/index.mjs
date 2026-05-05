import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { TIMELINE_INJECTION_KEY } from "./src/tokens.mjs";
import Timeline, { timelineProps } from "./src/timeline.mjs";
import { timelineItemProps } from "./src/timeline-item.mjs";
import timeline_item_default from "./src/timeline-item2.mjs";

//#region ../../packages/components/timeline/index.ts
const ElTimeline = withInstall(Timeline, { TimelineItem: timeline_item_default });
const ElTimelineItem = withNoopInstall(timeline_item_default);

//#endregion
export { ElTimeline, ElTimeline as default, ElTimelineItem, TIMELINE_INJECTION_KEY, timelineItemProps, timelineProps };
//# sourceMappingURL=index.mjs.map
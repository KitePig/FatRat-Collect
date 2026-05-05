Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_tokens = require('./src/tokens.js');
const require_timeline = require('./src/timeline.js');
const require_timeline_item = require('./src/timeline-item.js');
const require_timeline_item$1 = require('./src/timeline-item2.js');

//#region ../../packages/components/timeline/index.ts
const ElTimeline = require_install.withInstall(require_timeline.default, { TimelineItem: require_timeline_item$1.default });
const ElTimelineItem = require_install.withNoopInstall(require_timeline_item$1.default);

//#endregion
exports.ElTimeline = ElTimeline;
exports.default = ElTimeline;
exports.ElTimelineItem = ElTimelineItem;
exports.TIMELINE_INJECTION_KEY = require_tokens.TIMELINE_INJECTION_KEY;
exports.timelineItemProps = require_timeline_item.timelineItemProps;
exports.timelineProps = require_timeline.timelineProps;
//# sourceMappingURL=index.js.map
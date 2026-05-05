Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_vnode = require('../../../utils/vue/vnode.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_tokens = require('./tokens.js');
let vue = require("vue");

//#region ../../packages/components/timeline/src/timeline.ts
const timelineProps = require_runtime$1.buildProps({
	mode: {
		type: String,
		values: [
			"start",
			"alternate",
			"alternate-reverse",
			"end"
		],
		default: "start"
	},
	reverse: Boolean
});
const Timeline = (0, vue.defineComponent)({
	name: "ElTimeline",
	props: timelineProps,
	setup(props, { slots }) {
		const ns = require_index.useNamespace("timeline");
		(0, vue.provide)(require_tokens.TIMELINE_INJECTION_KEY, {
			props,
			slots
		});
		const timelineKls = (0, vue.computed)(() => [ns.b(), ns.is(props.mode)]);
		return () => {
			const children = require_vnode.flattedChildren(slots.default?.() ?? []);
			return (0, vue.h)("ul", { class: timelineKls.value }, props.reverse ? children.reverse() : children);
		};
	}
});

//#endregion
exports.default = Timeline;
exports.timelineProps = timelineProps;
//# sourceMappingURL=timeline.js.map
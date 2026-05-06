import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { flattedChildren } from "../../../utils/vue/vnode.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { TIMELINE_INJECTION_KEY } from "./tokens.mjs";
import { computed, defineComponent, h, provide } from "vue";

//#region ../../packages/components/timeline/src/timeline.ts
const timelineProps = buildProps({
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
const Timeline = defineComponent({
	name: "ElTimeline",
	props: timelineProps,
	setup(props, { slots }) {
		const ns = useNamespace("timeline");
		provide(TIMELINE_INJECTION_KEY, {
			props,
			slots
		});
		const timelineKls = computed(() => [ns.b(), ns.is(props.mode)]);
		return () => {
			const children = flattedChildren(slots.default?.() ?? []);
			return h("ul", { class: timelineKls.value }, props.reverse ? children.reverse() : children);
		};
	}
});

//#endregion
export { Timeline as default, timelineProps };
//# sourceMappingURL=timeline.mjs.map
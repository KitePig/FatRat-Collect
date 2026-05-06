import { cAF, rAF } from "../../../../utils/raf.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { BAR_MAP } from "../../../scrollbar/src/util.mjs";
import { HORIZONTAL, SCROLLBAR_MIN_SIZE, ScrollbarDirKey } from "../defaults.mjs";
import { virtualizedScrollbarProps } from "../props.mjs";
import { renderThumbStyle } from "../utils.mjs";
import { computed, defineComponent, h, onBeforeUnmount, reactive, ref, unref, watch, withModifiers } from "vue";

//#region ../../packages/components/virtual-list/src/components/scrollbar.ts
const ScrollBar = defineComponent({
	name: "ElVirtualScrollBar",
	props: virtualizedScrollbarProps,
	emits: [
		"scroll",
		"start-move",
		"stop-move"
	],
	setup(props, { emit }) {
		const GAP = computed(() => props.startGap + props.endGap);
		const nsVirtualScrollbar = useNamespace("virtual-scrollbar");
		const nsScrollbar = useNamespace("scrollbar");
		const trackRef = ref();
		const thumbRef = ref();
		let frameHandle = null;
		let onselectstartStore = null;
		const state = reactive({
			isDragging: false,
			traveled: 0
		});
		const bar = computed(() => BAR_MAP[props.layout]);
		const trackSize = computed(() => props.clientSize - unref(GAP));
		const trackStyle = computed(() => ({
			position: "absolute",
			width: `${HORIZONTAL === props.layout ? trackSize.value : props.scrollbarSize}px`,
			height: `${HORIZONTAL === props.layout ? props.scrollbarSize : trackSize.value}px`,
			[ScrollbarDirKey[props.layout]]: "2px",
			right: "2px",
			bottom: "2px",
			borderRadius: "4px"
		}));
		const thumbSize = computed(() => {
			const ratio = props.ratio;
			if (ratio >= 100) return Number.POSITIVE_INFINITY;
			if (ratio >= 50) return ratio * trackSize.value / 100;
			const SCROLLBAR_MAX_SIZE = trackSize.value / 3;
			return Math.floor(Math.min(Math.max(ratio * trackSize.value / 100, SCROLLBAR_MIN_SIZE), SCROLLBAR_MAX_SIZE));
		});
		const thumbStyle = computed(() => {
			if (!Number.isFinite(thumbSize.value)) return { display: "none" };
			const thumb = `${thumbSize.value}px`;
			return renderThumbStyle({
				bar: bar.value,
				size: thumb,
				move: state.traveled
			}, props.layout);
		});
		const totalSteps = computed(() => Math.ceil(props.clientSize - thumbSize.value - unref(GAP)));
		const attachEvents = () => {
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
			const thumbEl = unref(thumbRef);
			if (!thumbEl) return;
			onselectstartStore = document.onselectstart;
			document.onselectstart = () => false;
			thumbEl.addEventListener("touchmove", onMouseMove, { passive: true });
			thumbEl.addEventListener("touchend", onMouseUp);
		};
		const detachEvents = () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
			document.onselectstart = onselectstartStore;
			onselectstartStore = null;
			const thumbEl = unref(thumbRef);
			if (!thumbEl) return;
			thumbEl.removeEventListener("touchmove", onMouseMove);
			thumbEl.removeEventListener("touchend", onMouseUp);
		};
		const onThumbMouseDown = (e) => {
			e.stopImmediatePropagation();
			if (e.ctrlKey || [1, 2].includes(e.button)) return;
			state.isDragging = true;
			state[bar.value.axis] = e.currentTarget[bar.value.offset] - (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction]);
			emit("start-move");
			attachEvents();
		};
		const onMouseUp = () => {
			state.isDragging = false;
			state[bar.value.axis] = 0;
			emit("stop-move");
			detachEvents();
		};
		const onMouseMove = (e) => {
			const { isDragging } = state;
			if (!isDragging) return;
			if (!thumbRef.value || !trackRef.value) return;
			const prevPage = state[bar.value.axis];
			if (!prevPage) return;
			cAF(frameHandle);
			/**
			*  +--------------+                                   +--------------+
			*  |              -  <--------- thumb.offsetTop       |              |
			*  |             |+|             <--+                 |              |
			*  |              -                 |                 |              |
			*  |   Content    |                 |                 |              |
			*  |              |                 |                 |              |
			*  |              |                 |                 |              |
			*  |              |                 |                 |              -
			*  |              |                 +-->              |             |+|
			*  |              |                                   |              -
			*  +--------------+                                   +--------------+
			*/
			const distance = (trackRef.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1 - (thumbRef.value[bar.value.offset] - prevPage);
			frameHandle = rAF(() => {
				state.traveled = Math.max(0, Math.min(distance, totalSteps.value));
				emit("scroll", distance, totalSteps.value);
			});
		};
		const clickTrackHandler = (e) => {
			const distance = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) - thumbRef.value[bar.value.offset] / 2;
			state.traveled = Math.max(0, Math.min(distance, totalSteps.value));
			emit("scroll", distance, totalSteps.value);
		};
		watch(() => props.scrollFrom, (v) => {
			if (state.isDragging) return;
			/**
			*  this is simply mapping the current scrollbar offset
			*
			*  formula 1:
			*    v = scrollOffset / (estimatedTotalSize - clientSize)
			*    traveled = v * (clientSize - thumbSize - GAP) --> v * totalSteps
			*
			*  formula 2:
			*    traveled = (v * clientSize) / (clientSize / totalSteps) --> (v * clientSize) * (totalSteps / clientSize) --> v * totalSteps
			*/
			state.traveled = Math.ceil(v * totalSteps.value);
		});
		onBeforeUnmount(() => {
			detachEvents();
		});
		return () => {
			return h("div", {
				role: "presentation",
				ref: trackRef,
				class: [
					nsVirtualScrollbar.b(),
					props.class,
					(props.alwaysOn || state.isDragging) && "always-on"
				],
				style: trackStyle.value,
				onMousedown: withModifiers(clickTrackHandler, ["stop", "prevent"]),
				onTouchstartPrevent: onThumbMouseDown
			}, h("div", {
				ref: thumbRef,
				class: nsScrollbar.e("thumb"),
				style: thumbStyle.value,
				onMousedown: onThumbMouseDown
			}, []));
		};
	}
});

//#endregion
export { ScrollBar as default };
//# sourceMappingURL=scrollbar.mjs.map
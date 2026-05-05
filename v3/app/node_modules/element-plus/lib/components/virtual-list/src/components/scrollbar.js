Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_raf = require('../../../../utils/raf.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_util = require('../../../scrollbar/src/util.js');
const require_defaults = require('../defaults.js');
const require_props = require('../props.js');
const require_utils = require('../utils.js');
let vue = require("vue");

//#region ../../packages/components/virtual-list/src/components/scrollbar.ts
const ScrollBar = (0, vue.defineComponent)({
	name: "ElVirtualScrollBar",
	props: require_props.virtualizedScrollbarProps,
	emits: [
		"scroll",
		"start-move",
		"stop-move"
	],
	setup(props, { emit }) {
		const GAP = (0, vue.computed)(() => props.startGap + props.endGap);
		const nsVirtualScrollbar = require_index.useNamespace("virtual-scrollbar");
		const nsScrollbar = require_index.useNamespace("scrollbar");
		const trackRef = (0, vue.ref)();
		const thumbRef = (0, vue.ref)();
		let frameHandle = null;
		let onselectstartStore = null;
		const state = (0, vue.reactive)({
			isDragging: false,
			traveled: 0
		});
		const bar = (0, vue.computed)(() => require_util.BAR_MAP[props.layout]);
		const trackSize = (0, vue.computed)(() => props.clientSize - (0, vue.unref)(GAP));
		const trackStyle = (0, vue.computed)(() => ({
			position: "absolute",
			width: `${require_defaults.HORIZONTAL === props.layout ? trackSize.value : props.scrollbarSize}px`,
			height: `${require_defaults.HORIZONTAL === props.layout ? props.scrollbarSize : trackSize.value}px`,
			[require_defaults.ScrollbarDirKey[props.layout]]: "2px",
			right: "2px",
			bottom: "2px",
			borderRadius: "4px"
		}));
		const thumbSize = (0, vue.computed)(() => {
			const ratio = props.ratio;
			if (ratio >= 100) return Number.POSITIVE_INFINITY;
			if (ratio >= 50) return ratio * trackSize.value / 100;
			const SCROLLBAR_MAX_SIZE = trackSize.value / 3;
			return Math.floor(Math.min(Math.max(ratio * trackSize.value / 100, require_defaults.SCROLLBAR_MIN_SIZE), SCROLLBAR_MAX_SIZE));
		});
		const thumbStyle = (0, vue.computed)(() => {
			if (!Number.isFinite(thumbSize.value)) return { display: "none" };
			const thumb = `${thumbSize.value}px`;
			return require_utils.renderThumbStyle({
				bar: bar.value,
				size: thumb,
				move: state.traveled
			}, props.layout);
		});
		const totalSteps = (0, vue.computed)(() => Math.ceil(props.clientSize - thumbSize.value - (0, vue.unref)(GAP)));
		const attachEvents = () => {
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
			const thumbEl = (0, vue.unref)(thumbRef);
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
			const thumbEl = (0, vue.unref)(thumbRef);
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
			require_raf.cAF(frameHandle);
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
			frameHandle = require_raf.rAF(() => {
				state.traveled = Math.max(0, Math.min(distance, totalSteps.value));
				emit("scroll", distance, totalSteps.value);
			});
		};
		const clickTrackHandler = (e) => {
			const distance = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) - thumbRef.value[bar.value.offset] / 2;
			state.traveled = Math.max(0, Math.min(distance, totalSteps.value));
			emit("scroll", distance, totalSteps.value);
		};
		(0, vue.watch)(() => props.scrollFrom, (v) => {
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
		(0, vue.onBeforeUnmount)(() => {
			detachEvents();
		});
		return () => {
			return (0, vue.h)("div", {
				role: "presentation",
				ref: trackRef,
				class: [
					nsVirtualScrollbar.b(),
					props.class,
					(props.alwaysOn || state.isDragging) && "always-on"
				],
				style: trackStyle.value,
				onMousedown: (0, vue.withModifiers)(clickTrackHandler, ["stop", "prevent"]),
				onTouchstartPrevent: onThumbMouseDown
			}, (0, vue.h)("div", {
				ref: thumbRef,
				class: nsScrollbar.e("thumb"),
				style: thumbStyle.value,
				onMousedown: onThumbMouseDown
			}, []));
		};
	}
});

//#endregion
exports.default = ScrollBar;
//# sourceMappingURL=scrollbar.js.map
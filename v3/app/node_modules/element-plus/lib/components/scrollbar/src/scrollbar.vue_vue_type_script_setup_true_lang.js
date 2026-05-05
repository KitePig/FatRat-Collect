const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_style = require('../../../utils/dom/style.js');
const require_numbers = require('../../../utils/numbers.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_scrollbar = require('./scrollbar.js');
const require_constants = require('./constants.js');
const require_bar = require('./bar2.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/scrollbar/src/scrollbar.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["tabindex"];
const COMPONENT_NAME = "ElScrollbar";
var scrollbar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "scrollbar",
	props: require_scrollbar.scrollbarProps,
	emits: require_scrollbar.scrollbarEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("scrollbar");
		let stopResizeObserver = void 0;
		let stopWrapResizeObserver = void 0;
		let stopResizeListener = void 0;
		let wrapScrollTop = 0;
		let wrapScrollLeft = 0;
		let direction = "";
		const distanceScrollState = {
			bottom: false,
			top: false,
			right: false,
			left: false
		};
		const scrollbarRef = (0, vue.ref)();
		const wrapRef = (0, vue.ref)();
		const resizeRef = (0, vue.ref)();
		const barRef = (0, vue.ref)();
		const wrapStyle = (0, vue.computed)(() => {
			const style = {};
			const height = require_style.addUnit(props.height);
			const maxHeight = require_style.addUnit(props.maxHeight);
			if (height) style.height = height;
			if (maxHeight) style.maxHeight = maxHeight;
			return [props.wrapStyle, style];
		});
		const wrapKls = (0, vue.computed)(() => {
			return [
				props.wrapClass,
				ns.e("wrap"),
				{ [ns.em("wrap", "hidden-default")]: !props.native }
			];
		});
		const resizeKls = (0, vue.computed)(() => {
			return [ns.e("view"), props.viewClass];
		});
		const shouldSkipDirection = (direction) => {
			return distanceScrollState[direction] ?? false;
		};
		const DIRECTION_PAIRS = {
			top: "bottom",
			bottom: "top",
			left: "right",
			right: "left"
		};
		const updateTriggerStatus = (arrivedStates) => {
			const oppositeDirection = DIRECTION_PAIRS[direction];
			if (!oppositeDirection) return;
			const arrived = arrivedStates[direction];
			const oppositeArrived = arrivedStates[oppositeDirection];
			if (arrived && !distanceScrollState[direction]) distanceScrollState[direction] = true;
			if (!oppositeArrived && distanceScrollState[oppositeDirection]) distanceScrollState[oppositeDirection] = false;
		};
		const handleScroll = () => {
			if (wrapRef.value) {
				barRef.value?.handleScroll(wrapRef.value);
				const prevTop = wrapScrollTop;
				const prevLeft = wrapScrollLeft;
				wrapScrollTop = wrapRef.value.scrollTop;
				wrapScrollLeft = wrapRef.value.scrollLeft;
				const arrivedStates = {
					bottom: !require_numbers.isGreaterThan(wrapRef.value.scrollHeight - props.distance, wrapRef.value.clientHeight + wrapScrollTop),
					top: wrapScrollTop <= props.distance && prevTop !== 0,
					right: !require_numbers.isGreaterThan(wrapRef.value.scrollWidth - props.distance, wrapRef.value.clientWidth + wrapScrollLeft) && prevLeft !== wrapScrollLeft,
					left: wrapScrollLeft <= props.distance && prevLeft !== 0
				};
				emit("scroll", {
					scrollTop: wrapScrollTop,
					scrollLeft: wrapScrollLeft
				});
				if (prevTop !== wrapScrollTop) direction = wrapScrollTop > prevTop ? "bottom" : "top";
				if (prevLeft !== wrapScrollLeft) direction = wrapScrollLeft > prevLeft ? "right" : "left";
				if (props.distance > 0) {
					if (shouldSkipDirection(direction)) return;
					updateTriggerStatus(arrivedStates);
				}
				if (arrivedStates[direction]) emit("end-reached", direction);
			}
		};
		function scrollTo(arg1, arg2) {
			if ((0, _vue_shared.isObject)(arg1)) wrapRef.value.scrollTo(arg1);
			else if (require_types.isNumber(arg1) && require_types.isNumber(arg2)) wrapRef.value.scrollTo(arg1, arg2);
		}
		const setScrollTop = (value) => {
			if (!require_types.isNumber(value)) {
				require_error.debugWarn(COMPONENT_NAME, "value must be a number");
				return;
			}
			wrapRef.value.scrollTop = value;
		};
		const setScrollLeft = (value) => {
			if (!require_types.isNumber(value)) {
				require_error.debugWarn(COMPONENT_NAME, "value must be a number");
				return;
			}
			wrapRef.value.scrollLeft = value;
		};
		const update = () => {
			barRef.value?.update();
			distanceScrollState[direction] = false;
			if (wrapRef.value) barRef.value?.handleScroll(wrapRef.value);
		};
		(0, vue.watch)(() => props.noresize, (noresize) => {
			if (noresize) {
				stopResizeObserver?.();
				stopWrapResizeObserver?.();
				stopResizeListener?.();
			} else {
				({stop: stopResizeObserver} = (0, _vueuse_core.useResizeObserver)(resizeRef, update));
				({stop: stopWrapResizeObserver} = (0, _vueuse_core.useResizeObserver)(wrapRef, update));
				stopResizeListener = (0, _vueuse_core.useEventListener)("resize", update);
			}
		}, { immediate: true });
		(0, vue.watch)(() => [props.maxHeight, props.height], () => {
			if (!props.native) (0, vue.nextTick)(() => {
				update();
			});
		});
		(0, vue.provide)(require_constants.scrollbarContextKey, (0, vue.reactive)({
			scrollbarElement: scrollbarRef,
			wrapElement: wrapRef
		}));
		(0, vue.onActivated)(() => {
			if (wrapRef.value) {
				wrapRef.value.scrollTop = wrapScrollTop;
				wrapRef.value.scrollLeft = wrapScrollLeft;
			}
		});
		(0, vue.onMounted)(() => {
			if (!props.native) (0, vue.nextTick)(() => {
				update();
			});
		});
		(0, vue.onUpdated)(() => update());
		__expose({
			wrapRef,
			update,
			scrollTo,
			setScrollTop,
			setScrollLeft,
			handleScroll
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "scrollbarRef",
				ref: scrollbarRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b())
			}, [(0, vue.createElementVNode)("div", {
				ref_key: "wrapRef",
				ref: wrapRef,
				class: (0, vue.normalizeClass)(wrapKls.value),
				style: (0, vue.normalizeStyle)(wrapStyle.value),
				tabindex: __props.tabindex,
				onScroll: handleScroll
			}, [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.tag), {
				id: __props.id,
				ref_key: "resizeRef",
				ref: resizeRef,
				class: (0, vue.normalizeClass)(resizeKls.value),
				style: (0, vue.normalizeStyle)(__props.viewStyle),
				role: __props.role,
				"aria-label": __props.ariaLabel,
				"aria-orientation": __props.ariaOrientation
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"class",
				"style",
				"role",
				"aria-label",
				"aria-orientation"
			]))], 46, _hoisted_1), !__props.native ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_bar.default, {
				key: 0,
				ref_key: "barRef",
				ref: barRef,
				always: __props.always,
				"min-size": __props.minSize
			}, null, 8, ["always", "min-size"])) : (0, vue.createCommentVNode)("v-if", true)], 2);
		};
	}
});

//#endregion
exports.default = scrollbar_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=scrollbar.vue_vue_type_script_setup_true_lang.js.map
import { isNumber, isObject } from "../../../utils/types.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { addUnit } from "../../../utils/dom/style.mjs";
import { isGreaterThan } from "../../../utils/numbers.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { scrollbarEmits, scrollbarProps } from "./scrollbar.mjs";
import { scrollbarContextKey } from "./constants.mjs";
import bar_default from "./bar2.mjs";
import { useEventListener, useResizeObserver } from "@vueuse/core";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, nextTick, normalizeClass, normalizeStyle, onActivated, onMounted, onUpdated, openBlock, provide, reactive, ref, renderSlot, resolveDynamicComponent, unref, watch, withCtx } from "vue";

//#region ../../packages/components/scrollbar/src/scrollbar.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["tabindex"];
const COMPONENT_NAME = "ElScrollbar";
var scrollbar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "scrollbar",
	props: scrollbarProps,
	emits: scrollbarEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("scrollbar");
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
		const scrollbarRef = ref();
		const wrapRef = ref();
		const resizeRef = ref();
		const barRef = ref();
		const wrapStyle = computed(() => {
			const style = {};
			const height = addUnit(props.height);
			const maxHeight = addUnit(props.maxHeight);
			if (height) style.height = height;
			if (maxHeight) style.maxHeight = maxHeight;
			return [props.wrapStyle, style];
		});
		const wrapKls = computed(() => {
			return [
				props.wrapClass,
				ns.e("wrap"),
				{ [ns.em("wrap", "hidden-default")]: !props.native }
			];
		});
		const resizeKls = computed(() => {
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
					bottom: !isGreaterThan(wrapRef.value.scrollHeight - props.distance, wrapRef.value.clientHeight + wrapScrollTop),
					top: wrapScrollTop <= props.distance && prevTop !== 0,
					right: !isGreaterThan(wrapRef.value.scrollWidth - props.distance, wrapRef.value.clientWidth + wrapScrollLeft) && prevLeft !== wrapScrollLeft,
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
			if (isObject(arg1)) wrapRef.value.scrollTo(arg1);
			else if (isNumber(arg1) && isNumber(arg2)) wrapRef.value.scrollTo(arg1, arg2);
		}
		const setScrollTop = (value) => {
			if (!isNumber(value)) {
				debugWarn(COMPONENT_NAME, "value must be a number");
				return;
			}
			wrapRef.value.scrollTop = value;
		};
		const setScrollLeft = (value) => {
			if (!isNumber(value)) {
				debugWarn(COMPONENT_NAME, "value must be a number");
				return;
			}
			wrapRef.value.scrollLeft = value;
		};
		const update = () => {
			barRef.value?.update();
			distanceScrollState[direction] = false;
			if (wrapRef.value) barRef.value?.handleScroll(wrapRef.value);
		};
		watch(() => props.noresize, (noresize) => {
			if (noresize) {
				stopResizeObserver?.();
				stopWrapResizeObserver?.();
				stopResizeListener?.();
			} else {
				({stop: stopResizeObserver} = useResizeObserver(resizeRef, update));
				({stop: stopWrapResizeObserver} = useResizeObserver(wrapRef, update));
				stopResizeListener = useEventListener("resize", update);
			}
		}, { immediate: true });
		watch(() => [props.maxHeight, props.height], () => {
			if (!props.native) nextTick(() => {
				update();
			});
		});
		provide(scrollbarContextKey, reactive({
			scrollbarElement: scrollbarRef,
			wrapElement: wrapRef
		}));
		onActivated(() => {
			if (wrapRef.value) {
				wrapRef.value.scrollTop = wrapScrollTop;
				wrapRef.value.scrollLeft = wrapScrollLeft;
			}
		});
		onMounted(() => {
			if (!props.native) nextTick(() => {
				update();
			});
		});
		onUpdated(() => update());
		__expose({
			wrapRef,
			update,
			scrollTo,
			setScrollTop,
			setScrollLeft,
			handleScroll
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "scrollbarRef",
				ref: scrollbarRef,
				class: normalizeClass(unref(ns).b())
			}, [createElementVNode("div", {
				ref_key: "wrapRef",
				ref: wrapRef,
				class: normalizeClass(wrapKls.value),
				style: normalizeStyle(wrapStyle.value),
				tabindex: __props.tabindex,
				onScroll: handleScroll
			}, [(openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
				id: __props.id,
				ref_key: "resizeRef",
				ref: resizeRef,
				class: normalizeClass(resizeKls.value),
				style: normalizeStyle(__props.viewStyle),
				role: __props.role,
				"aria-label": __props.ariaLabel,
				"aria-orientation": __props.ariaOrientation
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"class",
				"style",
				"role",
				"aria-label",
				"aria-orientation"
			]))], 46, _hoisted_1), !__props.native ? (openBlock(), createBlock(bar_default, {
				key: 0,
				ref_key: "barRef",
				ref: barRef,
				always: __props.always,
				"min-size": __props.minSize
			}, null, 8, ["always", "min-size"])) : createCommentVNode("v-if", true)], 2);
		};
	}
});

//#endregion
export { scrollbar_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=scrollbar.vue_vue_type_script_setup_true_lang.mjs.map
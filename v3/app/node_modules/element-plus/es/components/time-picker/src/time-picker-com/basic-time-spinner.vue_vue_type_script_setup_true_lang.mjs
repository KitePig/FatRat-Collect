import { CHANGE_EVENT } from "../../../../constants/event.mjs";
import { isNumber } from "../../../../utils/types.mjs";
import { rAF } from "../../../../utils/raf.mjs";
import { getStyle } from "../../../../utils/dom/style.mjs";
import { vRepeatClick } from "../../../../directives/repeat-click/index.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../../icon/index.mjs";
import { ElScrollbar } from "../../../scrollbar/index.mjs";
import { DEFAULT_FORMATS_TIME, PICKER_BASE_INJECTION_KEY, timeUnits } from "../constants.mjs";
import { buildTimeList } from "../utils.mjs";
import { getTimeLists } from "../composables/use-time-picker.mjs";
import { basicTimeSpinnerProps } from "../props/basic-time-spinner.mjs";
import { debounce } from "lodash-unified";
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, inject, nextTick, normalizeClass, onMounted, openBlock, ref, renderList, toDisplayString, unref, watch, withCtx, withDirectives } from "vue";

//#region ../../packages/components/time-picker/src/time-picker-com/basic-time-spinner.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["onMouseenter"];
var basic_time_spinner_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "basic-time-spinner",
	props: basicTimeSpinnerProps,
	emits: [
		CHANGE_EVENT,
		"select-range",
		"set-option"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { isRange, format, saveOnBlur } = inject(PICKER_BASE_INJECTION_KEY).props;
		const emit = __emit;
		const ns = useNamespace("time");
		const { getHoursList, getMinutesList, getSecondsList } = getTimeLists(props.disabledHours, props.disabledMinutes, props.disabledSeconds);
		let isScrolling = false;
		const ignoreScroll = {
			hours: false,
			minutes: false,
			seconds: false
		};
		const currentScrollbar = ref();
		const listRefsMap = {
			hours: ref(),
			minutes: ref(),
			seconds: ref()
		};
		const spinnerItems = computed(() => {
			return props.showSeconds ? timeUnits : timeUnits.slice(0, 2);
		});
		const timePartials = computed(() => {
			const { spinnerDate } = props;
			return {
				hours: spinnerDate.hour(),
				minutes: spinnerDate.minute(),
				seconds: spinnerDate.second()
			};
		});
		const timeList = computed(() => {
			const { hours, minutes } = unref(timePartials);
			const { role, spinnerDate } = props;
			const compare = !isRange ? spinnerDate : void 0;
			return {
				hours: getHoursList(role, compare),
				minutes: getMinutesList(hours, role, compare),
				seconds: getSecondsList(hours, minutes, role, compare)
			};
		});
		const arrowControlTimeList = computed(() => {
			const { hours, minutes, seconds } = unref(timePartials);
			return {
				hours: buildTimeList(hours, 23),
				minutes: buildTimeList(minutes, 59),
				seconds: buildTimeList(seconds, 59)
			};
		});
		const debouncedResetScroll = debounce((type) => {
			isScrolling = false;
			adjustCurrentSpinner(type);
		}, 200);
		const getAmPmFlag = (hour) => {
			if (!!!props.amPmMode) return "";
			const isCapital = props.amPmMode === "A";
			let content = hour < 12 ? " am" : " pm";
			if (isCapital) content = content.toUpperCase();
			return content;
		};
		const emitSelectRange = (type) => {
			let range = [0, 0];
			const actualFormat = format || DEFAULT_FORMATS_TIME;
			const hourIndex = actualFormat.indexOf("HH");
			const minuteIndex = actualFormat.indexOf("mm");
			const secondIndex = actualFormat.indexOf("ss");
			switch (type) {
				case "hours":
					if (hourIndex !== -1) range = [hourIndex, hourIndex + 2];
					break;
				case "minutes":
					if (minuteIndex !== -1) range = [minuteIndex, minuteIndex + 2];
					break;
				case "seconds":
					if (secondIndex !== -1) range = [secondIndex, secondIndex + 2];
					break;
			}
			const [left, right] = range;
			emit("select-range", left, right);
			currentScrollbar.value = type;
		};
		const adjustCurrentSpinner = (type) => {
			adjustSpinner(type, unref(timePartials)[type]);
		};
		const adjustSpinners = () => {
			adjustCurrentSpinner("hours");
			adjustCurrentSpinner("minutes");
			adjustCurrentSpinner("seconds");
		};
		const getScrollbarElement = (el) => el.querySelector(`.${ns.namespace.value}-scrollbar__wrap`);
		const adjustSpinner = (type, value) => {
			if (props.arrowControl) return;
			const scrollbar = unref(listRefsMap[type]);
			if (scrollbar && scrollbar.$el) {
				if (!saveOnBlur) {
					ignoreScroll[type] = true;
					rAF(() => {
						ignoreScroll[type] = false;
					});
				}
				getScrollbarElement(scrollbar.$el).scrollTop = Math.max(0, value * typeItemHeight(type));
			}
		};
		const typeItemHeight = (type) => {
			const listItem = unref(listRefsMap[type])?.$el.querySelector("li");
			if (listItem) return Number.parseFloat(getStyle(listItem, "height")) || 0;
			return 0;
		};
		const onIncrement = () => {
			scrollDown(1);
		};
		const onDecrement = () => {
			scrollDown(-1);
		};
		const scrollDown = (step) => {
			if (!currentScrollbar.value) emitSelectRange("hours");
			const label = currentScrollbar.value;
			const now = unref(timePartials)[label];
			const next = findNextUnDisabled(label, now, step, currentScrollbar.value === "hours" ? 24 : 60);
			modifyDateField(label, next);
			adjustSpinner(label, next);
			nextTick(() => emitSelectRange(label));
		};
		const findNextUnDisabled = (type, now, step, total) => {
			let next = (now + step + total) % total;
			const list = unref(timeList)[type];
			while (list[next] && next !== now) next = (next + step + total) % total;
			return next;
		};
		const modifyDateField = (type, value) => {
			if (unref(timeList)[type][value]) return;
			const { hours, minutes, seconds } = unref(timePartials);
			let changeTo;
			switch (type) {
				case "hours":
					changeTo = props.spinnerDate.hour(value).minute(minutes).second(seconds);
					break;
				case "minutes":
					changeTo = props.spinnerDate.hour(hours).minute(value).second(seconds);
					break;
				case "seconds":
					changeTo = props.spinnerDate.hour(hours).minute(minutes).second(value);
					break;
			}
			emit(CHANGE_EVENT, changeTo);
		};
		const handleClick = (type, { value, disabled }) => {
			if (!disabled) {
				modifyDateField(type, value);
				emitSelectRange(type);
				adjustSpinner(type, value);
			}
		};
		const handleScroll = (type) => {
			if (!saveOnBlur && ignoreScroll[type]) return;
			const scrollbar = unref(listRefsMap[type]);
			if (!scrollbar) return;
			isScrolling = true;
			debouncedResetScroll(type);
			modifyDateField(type, Math.min(Math.round((getScrollbarElement(scrollbar.$el).scrollTop - (scrollBarHeight(type) * .5 - 10) / typeItemHeight(type) + 3) / typeItemHeight(type)), type === "hours" ? 23 : 59));
		};
		const scrollBarHeight = (type) => {
			return unref(listRefsMap[type]).$el.offsetHeight;
		};
		const bindScrollEvent = () => {
			const bindFunction = (type) => {
				const scrollbar = unref(listRefsMap[type]);
				if (scrollbar && scrollbar.$el) getScrollbarElement(scrollbar.$el).onscroll = () => {
					handleScroll(type);
				};
			};
			bindFunction("hours");
			bindFunction("minutes");
			bindFunction("seconds");
		};
		onMounted(() => {
			nextTick(() => {
				!props.arrowControl && bindScrollEvent();
				adjustSpinners();
				if (props.role === "start") emitSelectRange("hours");
			});
		});
		const setRef = (scrollbar, type) => {
			listRefsMap[type].value = scrollbar ?? void 0;
		};
		emit("set-option", [`${props.role}_scrollDown`, scrollDown]);
		emit("set-option", [`${props.role}_emitSelectRange`, emitSelectRange]);
		watch(() => props.spinnerDate, () => {
			if (isScrolling) return;
			adjustSpinners();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass([unref(ns).b("spinner"), { "has-seconds": _ctx.showSeconds }]) }, [!_ctx.arrowControl ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(spinnerItems.value, (item) => {
				return openBlock(), createBlock(unref(ElScrollbar), {
					key: item,
					ref_for: true,
					ref: (scrollbar) => setRef(scrollbar, item),
					class: normalizeClass(unref(ns).be("spinner", "wrapper")),
					"wrap-style": "max-height: inherit;",
					"view-class": unref(ns).be("spinner", "list"),
					noresize: "",
					tag: "ul",
					onMouseenter: ($event) => emitSelectRange(item),
					onMousemove: ($event) => adjustCurrentSpinner(item)
				}, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(timeList.value[item], (disabled, key) => {
						return openBlock(), createElementBlock("li", {
							key,
							class: normalizeClass([
								unref(ns).be("spinner", "item"),
								unref(ns).is("active", key === timePartials.value[item]),
								unref(ns).is("disabled", disabled)
							]),
							onClick: ($event) => handleClick(item, {
								value: key,
								disabled
							})
						}, [item === "hours" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(("0" + (_ctx.amPmMode ? key % 12 || 12 : key)).slice(-2)) + toDisplayString(getAmPmFlag(key)), 1)], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(("0" + key).slice(-2)), 1)], 64))], 10, _hoisted_1);
					}), 128))]),
					_: 2
				}, 1032, [
					"class",
					"view-class",
					"onMouseenter",
					"onMousemove"
				]);
			}), 128)) : createCommentVNode("v-if", true), _ctx.arrowControl ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(spinnerItems.value, (item) => {
				return openBlock(), createElementBlock("div", {
					key: item,
					class: normalizeClass([unref(ns).be("spinner", "wrapper"), unref(ns).is("arrow")]),
					onMouseenter: ($event) => emitSelectRange(item)
				}, [
					withDirectives((openBlock(), createBlock(unref(ElIcon), { class: normalizeClass(["arrow-up", unref(ns).be("spinner", "arrow")]) }, {
						default: withCtx(() => [createVNode(unref(ArrowUp))]),
						_: 1
					}, 8, ["class"])), [[unref(vRepeatClick), onDecrement]]),
					withDirectives((openBlock(), createBlock(unref(ElIcon), { class: normalizeClass(["arrow-down", unref(ns).be("spinner", "arrow")]) }, {
						default: withCtx(() => [createVNode(unref(ArrowDown))]),
						_: 1
					}, 8, ["class"])), [[unref(vRepeatClick), onIncrement]]),
					createElementVNode("ul", { class: normalizeClass(unref(ns).be("spinner", "list")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(arrowControlTimeList.value[item], (time, key) => {
						return openBlock(), createElementBlock("li", {
							key,
							class: normalizeClass([
								unref(ns).be("spinner", "item"),
								unref(ns).is("active", time === timePartials.value[item]),
								unref(ns).is("disabled", timeList.value[item][time])
							])
						}, [unref(isNumber)(time) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [item === "hours" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(("0" + (_ctx.amPmMode ? time % 12 || 12 : time)).slice(-2)) + toDisplayString(getAmPmFlag(time)), 1)], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(("0" + time).slice(-2)), 1)], 64))], 64)) : createCommentVNode("v-if", true)], 2);
					}), 128))], 2)
				], 42, _hoisted_2);
			}), 128)) : createCommentVNode("v-if", true)], 2);
		};
	}
});

//#endregion
export { basic_time_spinner_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=basic-time-spinner.vue_vue_type_script_setup_true_lang.mjs.map
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../../constants/event.js');
const require_types = require('../../../../utils/types.js');
const require_raf = require('../../../../utils/raf.js');
const require_style = require('../../../../utils/dom/style.js');
const require_index = require('../../../../directives/repeat-click/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../icon/index.js');
const require_index$3 = require('../../../scrollbar/index.js');
const require_constants = require('../constants.js');
const require_utils = require('../utils.js');
const require_use_time_picker = require('../composables/use-time-picker.js');
const require_basic_time_spinner = require('../props/basic-time-spinner.js');
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/time-picker/src/time-picker-com/basic-time-spinner.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["onMouseenter"];
var basic_time_spinner_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	__name: "basic-time-spinner",
	props: require_basic_time_spinner.basicTimeSpinnerProps,
	emits: [
		require_event.CHANGE_EVENT,
		"select-range",
		"set-option"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { isRange, format, saveOnBlur } = (0, vue.inject)(require_constants.PICKER_BASE_INJECTION_KEY).props;
		const emit = __emit;
		const ns = require_index$1.useNamespace("time");
		const { getHoursList, getMinutesList, getSecondsList } = require_use_time_picker.getTimeLists(props.disabledHours, props.disabledMinutes, props.disabledSeconds);
		let isScrolling = false;
		const ignoreScroll = {
			hours: false,
			minutes: false,
			seconds: false
		};
		const currentScrollbar = (0, vue.ref)();
		const listRefsMap = {
			hours: (0, vue.ref)(),
			minutes: (0, vue.ref)(),
			seconds: (0, vue.ref)()
		};
		const spinnerItems = (0, vue.computed)(() => {
			return props.showSeconds ? require_constants.timeUnits : require_constants.timeUnits.slice(0, 2);
		});
		const timePartials = (0, vue.computed)(() => {
			const { spinnerDate } = props;
			return {
				hours: spinnerDate.hour(),
				minutes: spinnerDate.minute(),
				seconds: spinnerDate.second()
			};
		});
		const timeList = (0, vue.computed)(() => {
			const { hours, minutes } = (0, vue.unref)(timePartials);
			const { role, spinnerDate } = props;
			const compare = !isRange ? spinnerDate : void 0;
			return {
				hours: getHoursList(role, compare),
				minutes: getMinutesList(hours, role, compare),
				seconds: getSecondsList(hours, minutes, role, compare)
			};
		});
		const arrowControlTimeList = (0, vue.computed)(() => {
			const { hours, minutes, seconds } = (0, vue.unref)(timePartials);
			return {
				hours: require_utils.buildTimeList(hours, 23),
				minutes: require_utils.buildTimeList(minutes, 59),
				seconds: require_utils.buildTimeList(seconds, 59)
			};
		});
		const debouncedResetScroll = (0, lodash_unified.debounce)((type) => {
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
			const actualFormat = format || require_constants.DEFAULT_FORMATS_TIME;
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
			adjustSpinner(type, (0, vue.unref)(timePartials)[type]);
		};
		const adjustSpinners = () => {
			adjustCurrentSpinner("hours");
			adjustCurrentSpinner("minutes");
			adjustCurrentSpinner("seconds");
		};
		const getScrollbarElement = (el) => el.querySelector(`.${ns.namespace.value}-scrollbar__wrap`);
		const adjustSpinner = (type, value) => {
			if (props.arrowControl) return;
			const scrollbar = (0, vue.unref)(listRefsMap[type]);
			if (scrollbar && scrollbar.$el) {
				if (!saveOnBlur) {
					ignoreScroll[type] = true;
					require_raf.rAF(() => {
						ignoreScroll[type] = false;
					});
				}
				getScrollbarElement(scrollbar.$el).scrollTop = Math.max(0, value * typeItemHeight(type));
			}
		};
		const typeItemHeight = (type) => {
			const listItem = (0, vue.unref)(listRefsMap[type])?.$el.querySelector("li");
			if (listItem) return Number.parseFloat(require_style.getStyle(listItem, "height")) || 0;
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
			const now = (0, vue.unref)(timePartials)[label];
			const next = findNextUnDisabled(label, now, step, currentScrollbar.value === "hours" ? 24 : 60);
			modifyDateField(label, next);
			adjustSpinner(label, next);
			(0, vue.nextTick)(() => emitSelectRange(label));
		};
		const findNextUnDisabled = (type, now, step, total) => {
			let next = (now + step + total) % total;
			const list = (0, vue.unref)(timeList)[type];
			while (list[next] && next !== now) next = (next + step + total) % total;
			return next;
		};
		const modifyDateField = (type, value) => {
			if ((0, vue.unref)(timeList)[type][value]) return;
			const { hours, minutes, seconds } = (0, vue.unref)(timePartials);
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
			emit(require_event.CHANGE_EVENT, changeTo);
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
			const scrollbar = (0, vue.unref)(listRefsMap[type]);
			if (!scrollbar) return;
			isScrolling = true;
			debouncedResetScroll(type);
			modifyDateField(type, Math.min(Math.round((getScrollbarElement(scrollbar.$el).scrollTop - (scrollBarHeight(type) * .5 - 10) / typeItemHeight(type) + 3) / typeItemHeight(type)), type === "hours" ? 23 : 59));
		};
		const scrollBarHeight = (type) => {
			return (0, vue.unref)(listRefsMap[type]).$el.offsetHeight;
		};
		const bindScrollEvent = () => {
			const bindFunction = (type) => {
				const scrollbar = (0, vue.unref)(listRefsMap[type]);
				if (scrollbar && scrollbar.$el) getScrollbarElement(scrollbar.$el).onscroll = () => {
					handleScroll(type);
				};
			};
			bindFunction("hours");
			bindFunction("minutes");
			bindFunction("seconds");
		};
		(0, vue.onMounted)(() => {
			(0, vue.nextTick)(() => {
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
		(0, vue.watch)(() => props.spinnerDate, () => {
			if (isScrolling) return;
			adjustSpinners();
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b("spinner"), { "has-seconds": _ctx.showSeconds }]) }, [!_ctx.arrowControl ? ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, (0, vue.renderList)(spinnerItems.value, (item) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElScrollbar), {
					key: item,
					ref_for: true,
					ref: (scrollbar) => setRef(scrollbar, item),
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("spinner", "wrapper")),
					"wrap-style": "max-height: inherit;",
					"view-class": (0, vue.unref)(ns).be("spinner", "list"),
					noresize: "",
					tag: "ul",
					onMouseenter: ($event) => emitSelectRange(item),
					onMousemove: ($event) => adjustCurrentSpinner(item)
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(timeList.value[item], (disabled, key) => {
						return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
							key,
							class: (0, vue.normalizeClass)([
								(0, vue.unref)(ns).be("spinner", "item"),
								(0, vue.unref)(ns).is("active", key === timePartials.value[item]),
								(0, vue.unref)(ns).is("disabled", disabled)
							]),
							onClick: ($event) => handleClick(item, {
								value: key,
								disabled
							})
						}, [item === "hours" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createTextVNode)((0, vue.toDisplayString)(("0" + (_ctx.amPmMode ? key % 12 || 12 : key)).slice(-2)) + (0, vue.toDisplayString)(getAmPmFlag(key)), 1)], 64)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, [(0, vue.createTextVNode)((0, vue.toDisplayString)(("0" + key).slice(-2)), 1)], 64))], 10, _hoisted_1);
					}), 128))]),
					_: 2
				}, 1032, [
					"class",
					"view-class",
					"onMouseenter",
					"onMousemove"
				]);
			}), 128)) : (0, vue.createCommentVNode)("v-if", true), _ctx.arrowControl ? ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, (0, vue.renderList)(spinnerItems.value, (item) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: item,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).be("spinner", "wrapper"), (0, vue.unref)(ns).is("arrow")]),
					onMouseenter: ($event) => emitSelectRange(item)
				}, [
					(0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), { class: (0, vue.normalizeClass)(["arrow-up", (0, vue.unref)(ns).be("spinner", "arrow")]) }, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowUp))]),
						_: 1
					}, 8, ["class"])), [[(0, vue.unref)(require_index.vRepeatClick), onDecrement]]),
					(0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), { class: (0, vue.normalizeClass)(["arrow-down", (0, vue.unref)(ns).be("spinner", "arrow")]) }, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowDown))]),
						_: 1
					}, 8, ["class"])), [[(0, vue.unref)(require_index.vRepeatClick), onIncrement]]),
					(0, vue.createElementVNode)("ul", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("spinner", "list")) }, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(arrowControlTimeList.value[item], (time, key) => {
						return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
							key,
							class: (0, vue.normalizeClass)([
								(0, vue.unref)(ns).be("spinner", "item"),
								(0, vue.unref)(ns).is("active", time === timePartials.value[item]),
								(0, vue.unref)(ns).is("disabled", timeList.value[item][time])
							])
						}, [(0, vue.unref)(require_types.isNumber)(time) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [item === "hours" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createTextVNode)((0, vue.toDisplayString)(("0" + (_ctx.amPmMode ? time % 12 || 12 : time)).slice(-2)) + (0, vue.toDisplayString)(getAmPmFlag(time)), 1)], 64)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, [(0, vue.createTextVNode)((0, vue.toDisplayString)(("0" + time).slice(-2)), 1)], 64))], 64)) : (0, vue.createCommentVNode)("v-if", true)], 2);
					}), 128))], 2)
				], 42, _hoisted_2);
			}), 128)) : (0, vue.createCommentVNode)("v-if", true)], 2);
		};
	}
});

//#endregion
exports.default = basic_time_spinner_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=basic-time-spinner.vue_vue_type_script_setup_true_lang.js.map
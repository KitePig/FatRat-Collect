const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../icon/index.js');
const require_index$2 = require('../../button/index.js');
const require_helper = require('./helper.js');
const require_step = require('./step.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/tour/src/step.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
var step_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTourStep",
	__name: "step",
	props: require_step.tourStepProps,
	emits: require_step.tourStepEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { Close } = require_icon.CloseComponents;
		const { t } = require_index.useLocale();
		const { currentStep, current, total, showClose, closeIcon, mergedType, ns, slots: tourSlots, updateModelValue, onClose: tourOnClose, onFinish: tourOnFinish, onChange } = (0, vue.inject)(require_helper.tourKey);
		(0, vue.watch)(props, (val) => {
			currentStep.value = val;
		}, { immediate: true });
		const mergedShowClose = (0, vue.computed)(() => props.showClose ?? showClose.value);
		const mergedCloseIcon = (0, vue.computed)(() => props.closeIcon ?? closeIcon.value ?? Close);
		const filterButtonProps = (btnProps) => {
			if (!btnProps) return;
			return (0, lodash_unified.omit)(btnProps, ["children", "onClick"]);
		};
		const onPrev = () => {
			current.value -= 1;
			if (props.prevButtonProps?.onClick) props.prevButtonProps?.onClick();
			onChange();
		};
		const onNext = () => {
			if (current.value >= total.value - 1) onFinish();
			else current.value += 1;
			if (props.nextButtonProps?.onClick) props.nextButtonProps.onClick();
			onChange();
		};
		const onFinish = () => {
			onClose();
			tourOnFinish();
		};
		const onClose = () => {
			updateModelValue(false);
			tourOnClose();
			emit("close");
		};
		const handleKeydown = (e) => {
			if (e.target?.isContentEditable) return;
			switch (require_event.getEventCode(e)) {
				case require_aria.EVENT_CODE.left:
					e.preventDefault();
					current.value > 0 && onPrev();
					break;
				case require_aria.EVENT_CODE.right:
					e.preventDefault();
					onNext();
					break;
			}
		};
		(0, vue.onMounted)(() => {
			window.addEventListener("keydown", handleKeydown);
		});
		(0, vue.onBeforeUnmount)(() => {
			window.removeEventListener("keydown", handleKeydown);
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [
				mergedShowClose.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
					key: 0,
					"aria-label": (0, vue.unref)(t)("el.tour.close"),
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("closebtn")),
					type: "button",
					onClick: onClose
				}, [(0, vue.createVNode)((0, vue.unref)(require_index$1.ElIcon), { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("close")) }, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(mergedCloseIcon.value)))]),
					_: 1
				}, 8, ["class"])], 10, _hoisted_1)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("header", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("header"), { "show-close": (0, vue.unref)(showClose) }]) }, [(0, vue.renderSlot)(_ctx.$slots, "header", {}, () => [(0, vue.createElementVNode)("span", {
					role: "heading",
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title"))
				}, (0, vue.toDisplayString)(__props.title), 3)])], 2),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("body")) }, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(__props.description), 1)])], 2),
				(0, vue.createElementVNode)("footer", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("footer")) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b("indicators")) }, [(0, vue.unref)(tourSlots).indicators ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)((0, vue.unref)(tourSlots).indicators), {
					key: 0,
					current: (0, vue.unref)(current),
					total: (0, vue.unref)(total)
				}, null, 8, ["current", "total"])) : ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, (0, vue.renderList)((0, vue.unref)(total), (item, index) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
						key: item,
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b("indicator"), (0, vue.unref)(ns).is("active", index === (0, vue.unref)(current))])
					}, null, 2);
				}), 128))], 2), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b("buttons")) }, [(0, vue.unref)(current) > 0 ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElButton), (0, vue.mergeProps)({
					key: 0,
					size: "small",
					type: (0, vue.unref)(mergedType)
				}, filterButtonProps(__props.prevButtonProps), { onClick: onPrev }), {
					default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.prevButtonProps?.children ?? (0, vue.unref)(t)("el.tour.previous")), 1)]),
					_: 1
				}, 16, ["type"])) : (0, vue.createCommentVNode)("v-if", true), (0, vue.unref)(current) <= (0, vue.unref)(total) - 1 ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElButton), (0, vue.mergeProps)({
					key: 1,
					size: "small",
					type: (0, vue.unref)(mergedType) === "primary" ? "default" : "primary"
				}, filterButtonProps(__props.nextButtonProps), { onClick: onNext }), {
					default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.nextButtonProps?.children ?? ((0, vue.unref)(current) === (0, vue.unref)(total) - 1 ? (0, vue.unref)(t)("el.tour.finish") : (0, vue.unref)(t)("el.tour.next"))), 1)]),
					_: 1
				}, 16, ["type"])) : (0, vue.createCommentVNode)("v-if", true)], 2)], 2)
			], 64);
		};
	}
});

//#endregion
exports.default = step_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=step.vue_vue_type_script_setup_true_lang.js.map
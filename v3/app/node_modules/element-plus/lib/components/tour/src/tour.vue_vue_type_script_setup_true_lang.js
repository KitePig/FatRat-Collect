const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../teleport/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../hooks/use-z-index/index.js');
const require_tour = require('./tour.js');
const require_helper = require('./helper.js');
const require_mask = require('./mask2.js');
const require_content = require('./content2.js');
const require_steps = require('./steps.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/tour/src/tour.vue?vue&type=script&setup=true&lang.ts
var tour_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTour",
	inheritAttrs: false,
	__name: "tour",
	props: require_tour.tourProps,
	emits: require_tour.tourEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index$1.useNamespace("tour");
		const total = (0, vue.ref)(0);
		const currentStep = (0, vue.ref)();
		const current = (0, _vueuse_core.useVModel)(props, "current", emit, { passive: true });
		const currentTarget = (0, vue.computed)(() => currentStep.value?.target);
		const kls = (0, vue.computed)(() => [ns.b(), mergedType.value === "primary" ? ns.m("primary") : ""]);
		const mergedPlacement = (0, vue.computed)(() => currentStep.value?.placement || props.placement);
		const mergedContentStyle = (0, vue.computed)(() => currentStep.value?.contentStyle ?? props.contentStyle);
		const mergedMask = (0, vue.computed)(() => currentStep.value?.mask ?? props.mask);
		const mergedShowMask = (0, vue.computed)(() => !!mergedMask.value && props.modelValue);
		const mergedMaskStyle = (0, vue.computed)(() => require_types.isBoolean(mergedMask.value) ? void 0 : mergedMask.value);
		const mergedShowArrow = (0, vue.computed)(() => !!currentTarget.value && (currentStep.value?.showArrow ?? props.showArrow));
		const mergedScrollIntoViewOptions = (0, vue.computed)(() => currentStep.value?.scrollIntoViewOptions ?? props.scrollIntoViewOptions);
		const mergedType = (0, vue.computed)(() => currentStep.value?.type ?? props.type);
		const { nextZIndex } = require_index$2.useZIndex();
		const nowZIndex = nextZIndex();
		const mergedZIndex = (0, vue.computed)(() => props.zIndex ?? nowZIndex);
		const { mergedPosInfo: pos, triggerTarget } = require_helper.useTarget(currentTarget, (0, vue.toRef)(props, "modelValue"), (0, vue.toRef)(props, "gap"), mergedMask, mergedScrollIntoViewOptions);
		(0, vue.watch)(() => props.modelValue, (val) => {
			if (!val) current.value = 0;
		});
		const onEscClose = () => {
			if (props.closeOnPressEscape) {
				emit(require_event.UPDATE_MODEL_EVENT, false);
				emit("close", current.value);
			}
		};
		const onUpdateTotal = (val) => {
			total.value = val;
		};
		const slots = (0, vue.useSlots)();
		(0, vue.provide)(require_helper.tourKey, {
			currentStep,
			current,
			total,
			showClose: (0, vue.toRef)(props, "showClose"),
			closeIcon: (0, vue.toRef)(props, "closeIcon"),
			mergedType,
			ns,
			slots,
			updateModelValue(modelValue) {
				emit(require_event.UPDATE_MODEL_EVENT, modelValue);
			},
			onClose() {
				emit("close", current.value);
			},
			onFinish() {
				emit("finish");
			},
			onChange() {
				emit(require_event.CHANGE_EVENT, current.value);
			}
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, null, [
				(0, vue.createVNode)((0, vue.unref)(require_index.ElTeleport), { to: __props.appendTo }, {
					default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", (0, vue.mergeProps)({ class: kls.value }, _ctx.$attrs), [(0, vue.createVNode)(require_mask.default, {
						visible: mergedShowMask.value,
						fill: mergedMaskStyle.value?.color,
						style: (0, vue.normalizeStyle)(mergedMaskStyle.value?.style),
						pos: (0, vue.unref)(pos),
						"z-index": mergedZIndex.value,
						"target-area-clickable": __props.targetAreaClickable
					}, null, 8, [
						"visible",
						"fill",
						"style",
						"pos",
						"z-index",
						"target-area-clickable"
					]), __props.modelValue ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_content.default, {
						key: (0, vue.unref)(current),
						reference: (0, vue.unref)(triggerTarget),
						placement: mergedPlacement.value,
						"show-arrow": mergedShowArrow.value,
						"z-index": mergedZIndex.value,
						style: (0, vue.normalizeStyle)(mergedContentStyle.value),
						onClose: onEscClose
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(require_steps.default), {
							current: (0, vue.unref)(current),
							onUpdateTotal
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
							_: 3
						}, 8, ["current"])]),
						_: 3
					}, 8, [
						"reference",
						"placement",
						"show-arrow",
						"z-index",
						"style"
					])) : (0, vue.createCommentVNode)("v-if", true)], 16)]),
					_: 3
				}, 8, ["to"]),
				(0, vue.createCommentVNode)(" just for IDE "),
				(0, vue.createCommentVNode)("v-if", true)
			], 64);
		};
	}
});

//#endregion
exports.default = tour_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=tour.vue_vue_type_script_setup_true_lang.js.map
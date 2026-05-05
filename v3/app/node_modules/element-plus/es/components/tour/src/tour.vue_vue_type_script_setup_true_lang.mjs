import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean } from "../../../utils/types.mjs";
import { ElTeleport } from "../../teleport/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useZIndex } from "../../../hooks/use-z-index/index.mjs";
import { tourEmits, tourProps } from "./tour.mjs";
import { tourKey, useTarget } from "./helper.mjs";
import mask_default from "./mask2.mjs";
import content_default from "./content2.mjs";
import steps_default from "./steps.mjs";
import { useVModel } from "@vueuse/core";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, mergeProps, normalizeStyle, openBlock, provide, ref, renderSlot, toRef, unref, useSlots, watch, withCtx } from "vue";

//#region ../../packages/components/tour/src/tour.vue?vue&type=script&setup=true&lang.ts
var tour_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTour",
	inheritAttrs: false,
	__name: "tour",
	props: tourProps,
	emits: tourEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("tour");
		const total = ref(0);
		const currentStep = ref();
		const current = useVModel(props, "current", emit, { passive: true });
		const currentTarget = computed(() => currentStep.value?.target);
		const kls = computed(() => [ns.b(), mergedType.value === "primary" ? ns.m("primary") : ""]);
		const mergedPlacement = computed(() => currentStep.value?.placement || props.placement);
		const mergedContentStyle = computed(() => currentStep.value?.contentStyle ?? props.contentStyle);
		const mergedMask = computed(() => currentStep.value?.mask ?? props.mask);
		const mergedShowMask = computed(() => !!mergedMask.value && props.modelValue);
		const mergedMaskStyle = computed(() => isBoolean(mergedMask.value) ? void 0 : mergedMask.value);
		const mergedShowArrow = computed(() => !!currentTarget.value && (currentStep.value?.showArrow ?? props.showArrow));
		const mergedScrollIntoViewOptions = computed(() => currentStep.value?.scrollIntoViewOptions ?? props.scrollIntoViewOptions);
		const mergedType = computed(() => currentStep.value?.type ?? props.type);
		const { nextZIndex } = useZIndex();
		const nowZIndex = nextZIndex();
		const mergedZIndex = computed(() => props.zIndex ?? nowZIndex);
		const { mergedPosInfo: pos, triggerTarget } = useTarget(currentTarget, toRef(props, "modelValue"), toRef(props, "gap"), mergedMask, mergedScrollIntoViewOptions);
		watch(() => props.modelValue, (val) => {
			if (!val) current.value = 0;
		});
		const onEscClose = () => {
			if (props.closeOnPressEscape) {
				emit(UPDATE_MODEL_EVENT, false);
				emit("close", current.value);
			}
		};
		const onUpdateTotal = (val) => {
			total.value = val;
		};
		const slots = useSlots();
		provide(tourKey, {
			currentStep,
			current,
			total,
			showClose: toRef(props, "showClose"),
			closeIcon: toRef(props, "closeIcon"),
			mergedType,
			ns,
			slots,
			updateModelValue(modelValue) {
				emit(UPDATE_MODEL_EVENT, modelValue);
			},
			onClose() {
				emit("close", current.value);
			},
			onFinish() {
				emit("finish");
			},
			onChange() {
				emit(CHANGE_EVENT, current.value);
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createVNode(unref(ElTeleport), { to: __props.appendTo }, {
					default: withCtx(() => [createElementVNode("div", mergeProps({ class: kls.value }, _ctx.$attrs), [createVNode(mask_default, {
						visible: mergedShowMask.value,
						fill: mergedMaskStyle.value?.color,
						style: normalizeStyle(mergedMaskStyle.value?.style),
						pos: unref(pos),
						"z-index": mergedZIndex.value,
						"target-area-clickable": __props.targetAreaClickable
					}, null, 8, [
						"visible",
						"fill",
						"style",
						"pos",
						"z-index",
						"target-area-clickable"
					]), __props.modelValue ? (openBlock(), createBlock(content_default, {
						key: unref(current),
						reference: unref(triggerTarget),
						placement: mergedPlacement.value,
						"show-arrow": mergedShowArrow.value,
						"z-index": mergedZIndex.value,
						style: normalizeStyle(mergedContentStyle.value),
						onClose: onEscClose
					}, {
						default: withCtx(() => [createVNode(unref(steps_default), {
							current: unref(current),
							onUpdateTotal
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 8, ["current"])]),
						_: 3
					}, 8, [
						"reference",
						"placement",
						"show-arrow",
						"z-index",
						"style"
					])) : createCommentVNode("v-if", true)], 16)]),
					_: 3
				}, 8, ["to"]),
				createCommentVNode(" just for IDE "),
				createCommentVNode("v-if", true)
			], 64);
		};
	}
});

//#endregion
export { tour_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=tour.vue_vue_type_script_setup_true_lang.mjs.map
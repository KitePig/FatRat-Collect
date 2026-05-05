import { EVENT_CODE } from "../../../constants/aria.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { CloseComponents } from "../../../utils/vue/icon.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElButton } from "../../button/index.mjs";
import { tourKey } from "./helper.mjs";
import { tourStepEmits, tourStepProps } from "./step.mjs";
import { omit } from "lodash-unified";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, inject, mergeProps, normalizeClass, onBeforeUnmount, onMounted, openBlock, renderList, renderSlot, resolveDynamicComponent, toDisplayString, unref, watch, withCtx } from "vue";

//#region ../../packages/components/tour/src/step.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
var step_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTourStep",
	__name: "step",
	props: tourStepProps,
	emits: tourStepEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { Close } = CloseComponents;
		const { t } = useLocale();
		const { currentStep, current, total, showClose, closeIcon, mergedType, ns, slots: tourSlots, updateModelValue, onClose: tourOnClose, onFinish: tourOnFinish, onChange } = inject(tourKey);
		watch(props, (val) => {
			currentStep.value = val;
		}, { immediate: true });
		const mergedShowClose = computed(() => props.showClose ?? showClose.value);
		const mergedCloseIcon = computed(() => props.closeIcon ?? closeIcon.value ?? Close);
		const filterButtonProps = (btnProps) => {
			if (!btnProps) return;
			return omit(btnProps, ["children", "onClick"]);
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
			switch (getEventCode(e)) {
				case EVENT_CODE.left:
					e.preventDefault();
					current.value > 0 && onPrev();
					break;
				case EVENT_CODE.right:
					e.preventDefault();
					onNext();
					break;
			}
		};
		onMounted(() => {
			window.addEventListener("keydown", handleKeydown);
		});
		onBeforeUnmount(() => {
			window.removeEventListener("keydown", handleKeydown);
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				mergedShowClose.value ? (openBlock(), createElementBlock("button", {
					key: 0,
					"aria-label": unref(t)("el.tour.close"),
					class: normalizeClass(unref(ns).e("closebtn")),
					type: "button",
					onClick: onClose
				}, [createVNode(unref(ElIcon), { class: normalizeClass(unref(ns).e("close")) }, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(mergedCloseIcon.value)))]),
					_: 1
				}, 8, ["class"])], 10, _hoisted_1)) : createCommentVNode("v-if", true),
				createElementVNode("header", { class: normalizeClass([unref(ns).e("header"), { "show-close": unref(showClose) }]) }, [renderSlot(_ctx.$slots, "header", {}, () => [createElementVNode("span", {
					role: "heading",
					class: normalizeClass(unref(ns).e("title"))
				}, toDisplayString(__props.title), 3)])], 2),
				createElementVNode("div", { class: normalizeClass(unref(ns).e("body")) }, [renderSlot(_ctx.$slots, "default", {}, () => [createElementVNode("span", null, toDisplayString(__props.description), 1)])], 2),
				createElementVNode("footer", { class: normalizeClass(unref(ns).e("footer")) }, [createElementVNode("div", { class: normalizeClass(unref(ns).b("indicators")) }, [unref(tourSlots).indicators ? (openBlock(), createBlock(resolveDynamicComponent(unref(tourSlots).indicators), {
					key: 0,
					current: unref(current),
					total: unref(total)
				}, null, 8, ["current", "total"])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(total), (item, index) => {
					return openBlock(), createElementBlock("span", {
						key: item,
						class: normalizeClass([unref(ns).b("indicator"), unref(ns).is("active", index === unref(current))])
					}, null, 2);
				}), 128))], 2), createElementVNode("div", { class: normalizeClass(unref(ns).b("buttons")) }, [unref(current) > 0 ? (openBlock(), createBlock(unref(ElButton), mergeProps({
					key: 0,
					size: "small",
					type: unref(mergedType)
				}, filterButtonProps(__props.prevButtonProps), { onClick: onPrev }), {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.prevButtonProps?.children ?? unref(t)("el.tour.previous")), 1)]),
					_: 1
				}, 16, ["type"])) : createCommentVNode("v-if", true), unref(current) <= unref(total) - 1 ? (openBlock(), createBlock(unref(ElButton), mergeProps({
					key: 1,
					size: "small",
					type: unref(mergedType) === "primary" ? "default" : "primary"
				}, filterButtonProps(__props.nextButtonProps), { onClick: onNext }), {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.nextButtonProps?.children ?? (unref(current) === unref(total) - 1 ? unref(t)("el.tour.finish") : unref(t)("el.tour.next"))), 1)]),
					_: 1
				}, 16, ["type"])) : createCommentVNode("v-if", true)], 2)], 2)
			], 64);
		};
	}
});

//#endregion
export { step_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=step.vue_vue_type_script_setup_true_lang.mjs.map
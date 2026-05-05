import { focusElement } from "../../../utils/dom/aria.mjs";
import { composeEventHandlers } from "../../../utils/dom/event.mjs";
import { castArray } from "../../../utils/arrays.mjs";
import { ElTeleport } from "../../teleport/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { usePopperContainerId } from "../../../hooks/use-popper-container/index.mjs";
import content_default from "../../popper/src/content2.mjs";
import { useTooltipContentProps } from "./content.mjs";
import { TOOLTIP_INJECTION_KEY } from "./constants.mjs";
import { isTriggerType } from "./utils.mjs";
import { computedEager, onClickOutside } from "@vueuse/core";
import { Transition, computed, createBlock, createCommentVNode, createVNode, defineComponent, inject, mergeProps, onBeforeUnmount, openBlock, ref, renderSlot, unref, vShow, watch, withCtx, withDirectives } from "vue";

//#region ../../packages/components/tooltip/src/content.vue?vue&type=script&setup=true&lang.ts
var content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTooltipContent",
	inheritAttrs: false,
	__name: "content",
	props: useTooltipContentProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { selector } = usePopperContainerId();
		const ns = useNamespace("tooltip");
		const contentRef = ref();
		const popperContentRef = computedEager(() => contentRef.value?.popperContentRef);
		let stopHandle;
		const { controlled, id, open, trigger, onClose, onOpen, onShow, onHide, onBeforeShow, onBeforeHide } = inject(TOOLTIP_INJECTION_KEY, void 0);
		const transitionClass = computed(() => {
			return props.transition || `${ns.namespace.value}-fade-in-linear`;
		});
		const persistentRef = computed(() => {
			return props.persistent;
		});
		onBeforeUnmount(() => {
			stopHandle?.();
		});
		const shouldRender = computed(() => {
			return unref(persistentRef) ? true : unref(open);
		});
		const shouldShow = computed(() => {
			return props.disabled ? false : unref(open);
		});
		const appendTo = computed(() => {
			return props.appendTo || selector.value;
		});
		const contentStyle = computed(() => props.style ?? {});
		const ariaHidden = ref(true);
		const onTransitionLeave = () => {
			onHide();
			isFocusInsideContent() && focusElement(document.body, { preventScroll: true });
			ariaHidden.value = true;
		};
		const stopWhenControlled = () => {
			if (unref(controlled)) return true;
		};
		const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
			if (props.enterable && isTriggerType(unref(trigger), "hover")) onOpen();
		});
		const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
			if (isTriggerType(unref(trigger), "hover")) onClose();
		});
		const onBeforeEnter = () => {
			contentRef.value?.updatePopper?.();
			onBeforeShow?.();
		};
		const onBeforeLeave = () => {
			onBeforeHide?.();
		};
		const onAfterShow = () => {
			onShow();
		};
		const onBlur = () => {
			if (!props.virtualTriggering) onClose();
		};
		const isFocusInsideContent = (event) => {
			const popperContent = contentRef.value?.popperContentRef;
			const activeElement = event?.relatedTarget || document.activeElement;
			return popperContent?.contains(activeElement);
		};
		watch(() => unref(open), (val) => {
			if (!val) stopHandle?.();
			else {
				ariaHidden.value = false;
				stopHandle = onClickOutside(popperContentRef, () => {
					if (unref(controlled)) return;
					if (castArray(unref(trigger)).every((item) => {
						return item !== "hover" && item !== "focus";
					})) onClose();
				}, { detectIframe: true });
			}
		}, { flush: "post" });
		__expose({
			contentRef,
			isFocusInsideContent
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ElTeleport), {
				disabled: !__props.teleported,
				to: appendTo.value
			}, {
				default: withCtx(() => [shouldRender.value || !ariaHidden.value ? (openBlock(), createBlock(Transition, {
					key: 0,
					name: transitionClass.value,
					appear: !persistentRef.value,
					onAfterLeave: onTransitionLeave,
					onBeforeEnter,
					onAfterEnter: onAfterShow,
					onBeforeLeave,
					persisted: ""
				}, {
					default: withCtx(() => [withDirectives(createVNode(unref(content_default), mergeProps({
						id: unref(id),
						ref_key: "contentRef",
						ref: contentRef
					}, _ctx.$attrs, {
						"aria-label": __props.ariaLabel,
						"aria-hidden": ariaHidden.value,
						"boundaries-padding": __props.boundariesPadding,
						"fallback-placements": __props.fallbackPlacements,
						"gpu-acceleration": __props.gpuAcceleration,
						offset: __props.offset,
						placement: __props.placement,
						"popper-options": __props.popperOptions,
						"arrow-offset": __props.arrowOffset,
						strategy: __props.strategy,
						effect: __props.effect,
						enterable: __props.enterable,
						pure: __props.pure,
						"popper-class": __props.popperClass,
						"popper-style": [__props.popperStyle, contentStyle.value],
						"reference-el": __props.referenceEl,
						"trigger-target-el": __props.triggerTargetEl,
						visible: shouldShow.value,
						"z-index": __props.zIndex,
						loop: __props.loop,
						onMouseenter: unref(onContentEnter),
						onMouseleave: unref(onContentLeave),
						onBlur,
						onClose: unref(onClose)
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, [
						"id",
						"aria-label",
						"aria-hidden",
						"boundaries-padding",
						"fallback-placements",
						"gpu-acceleration",
						"offset",
						"placement",
						"popper-options",
						"arrow-offset",
						"strategy",
						"effect",
						"enterable",
						"pure",
						"popper-class",
						"popper-style",
						"reference-el",
						"trigger-target-el",
						"visible",
						"z-index",
						"loop",
						"onMouseenter",
						"onMouseleave",
						"onClose"
					]), [[vShow, shouldShow.value]])]),
					_: 3
				}, 8, ["name", "appear"])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, ["disabled", "to"]);
		};
	}
});

//#endregion
export { content_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=content.vue_vue_type_script_setup_true_lang.mjs.map
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../utils/dom/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_arrays = require('../../../utils/arrays.js');
const require_index = require('../../teleport/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../hooks/use-popper-container/index.js');
const require_content = require('../../popper/src/content2.js');
const require_content$1 = require('./content.js');
const require_constants = require('./constants.js');
const require_utils = require('./utils.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/tooltip/src/content.vue?vue&type=script&setup=true&lang.ts
var content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTooltipContent",
	inheritAttrs: false,
	__name: "content",
	props: require_content$1.useTooltipContentProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { selector } = require_index$2.usePopperContainerId();
		const ns = require_index$1.useNamespace("tooltip");
		const contentRef = (0, vue.ref)();
		const popperContentRef = (0, _vueuse_core.computedEager)(() => contentRef.value?.popperContentRef);
		let stopHandle;
		const { controlled, id, open, trigger, onClose, onOpen, onShow, onHide, onBeforeShow, onBeforeHide } = (0, vue.inject)(require_constants.TOOLTIP_INJECTION_KEY, void 0);
		const transitionClass = (0, vue.computed)(() => {
			return props.transition || `${ns.namespace.value}-fade-in-linear`;
		});
		const persistentRef = (0, vue.computed)(() => {
			if (process.env.NODE_ENV === "test") {
				if (!process.env.RUN_TEST_WITH_PERSISTENT) return true;
			}
			return props.persistent;
		});
		(0, vue.onBeforeUnmount)(() => {
			stopHandle?.();
		});
		const shouldRender = (0, vue.computed)(() => {
			return (0, vue.unref)(persistentRef) ? true : (0, vue.unref)(open);
		});
		const shouldShow = (0, vue.computed)(() => {
			return props.disabled ? false : (0, vue.unref)(open);
		});
		const appendTo = (0, vue.computed)(() => {
			return props.appendTo || selector.value;
		});
		const contentStyle = (0, vue.computed)(() => props.style ?? {});
		const ariaHidden = (0, vue.ref)(true);
		const onTransitionLeave = () => {
			onHide();
			isFocusInsideContent() && require_aria.focusElement(document.body, { preventScroll: true });
			ariaHidden.value = true;
		};
		const stopWhenControlled = () => {
			if ((0, vue.unref)(controlled)) return true;
		};
		const onContentEnter = require_event.composeEventHandlers(stopWhenControlled, () => {
			if (props.enterable && require_utils.isTriggerType((0, vue.unref)(trigger), "hover")) onOpen();
		});
		const onContentLeave = require_event.composeEventHandlers(stopWhenControlled, () => {
			if (require_utils.isTriggerType((0, vue.unref)(trigger), "hover")) onClose();
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
		(0, vue.watch)(() => (0, vue.unref)(open), (val) => {
			if (!val) stopHandle?.();
			else {
				ariaHidden.value = false;
				stopHandle = (0, _vueuse_core.onClickOutside)(popperContentRef, () => {
					if ((0, vue.unref)(controlled)) return;
					if (require_arrays.castArray((0, vue.unref)(trigger)).every((item) => {
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
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index.ElTeleport), {
				disabled: !__props.teleported,
				to: appendTo.value
			}, {
				default: (0, vue.withCtx)(() => [shouldRender.value || !ariaHidden.value ? ((0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
					key: 0,
					name: transitionClass.value,
					appear: !persistentRef.value,
					onAfterLeave: onTransitionLeave,
					onBeforeEnter,
					onAfterEnter: onAfterShow,
					onBeforeLeave,
					persisted: ""
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_content.default), (0, vue.mergeProps)({
						id: (0, vue.unref)(id),
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
						onMouseenter: (0, vue.unref)(onContentEnter),
						onMouseleave: (0, vue.unref)(onContentLeave),
						onBlur,
						onClose: (0, vue.unref)(onClose)
					}), {
						default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
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
					]), [[vue.vShow, shouldShow.value]])]),
					_: 3
				}, 8, ["name", "appear"])) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 3
			}, 8, ["disabled", "to"]);
		};
	}
});

//#endregion
exports.default = content_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=content.vue_vue_type_script_setup_true_lang.js.map
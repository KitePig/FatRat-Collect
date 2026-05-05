const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-id/index.js');
const require_index$2 = require('../../../hooks/use-popper-container/index.js');
const require_index$3 = require('../../../hooks/use-delayed-toggle/index.js');
const require_arrow = require('../../popper/src/arrow2.js');
const require_index$4 = require('../../popper/index.js');
const require_tooltip = require('./tooltip.js');
const require_constants = require('./constants.js');
const require_trigger = require('./trigger2.js');
const require_content = require('./content2.js');
let vue = require("vue");

//#region ../../packages/components/tooltip/src/tooltip.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { key: 1 };
var tooltip_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTooltip",
	__name: "tooltip",
	props: require_tooltip.useTooltipProps,
	emits: require_tooltip.tooltipEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		require_index$2.usePopperContainer();
		const ns = require_index.useNamespace("tooltip");
		const id = require_index$1.useId();
		const popperRef = (0, vue.ref)();
		const contentRef = (0, vue.ref)();
		const updatePopper = () => {
			const popperComponent = (0, vue.unref)(popperRef);
			if (popperComponent) popperComponent.popperInstanceRef?.update();
		};
		const open = (0, vue.ref)(false);
		const toggleReason = (0, vue.ref)();
		const { show, hide, hasUpdateHandler } = require_tooltip.useTooltipModelToggle({
			indicator: open,
			toggleReason
		});
		const { onOpen, onClose } = require_index$3.useDelayedToggle({
			showAfter: (0, vue.toRef)(props, "showAfter"),
			hideAfter: (0, vue.toRef)(props, "hideAfter"),
			autoClose: (0, vue.toRef)(props, "autoClose"),
			open: show,
			close: hide
		});
		const controlled = (0, vue.computed)(() => require_types.isBoolean(props.visible) && !hasUpdateHandler.value);
		const kls = (0, vue.computed)(() => {
			return [ns.b(), props.popperClass];
		});
		(0, vue.provide)(require_constants.TOOLTIP_INJECTION_KEY, {
			controlled,
			id,
			open: (0, vue.readonly)(open),
			trigger: (0, vue.toRef)(props, "trigger"),
			onOpen,
			onClose,
			onToggle: (event) => {
				if ((0, vue.unref)(open)) onClose(event);
				else onOpen(event);
			},
			onShow: () => {
				emit("show", toggleReason.value);
			},
			onHide: () => {
				emit("hide", toggleReason.value);
			},
			onBeforeShow: () => {
				emit("before-show", toggleReason.value);
			},
			onBeforeHide: () => {
				emit("before-hide", toggleReason.value);
			},
			updatePopper
		});
		(0, vue.watch)(() => props.disabled, (disabled) => {
			if (disabled && open.value) open.value = false;
			if (!disabled && require_types.isBoolean(props.visible)) open.value = props.visible;
		});
		const isFocusInsideContent = (event) => {
			return contentRef.value?.isFocusInsideContent(event);
		};
		(0, vue.onDeactivated)(() => open.value && hide());
		(0, vue.onBeforeUnmount)(() => {
			toggleReason.value = void 0;
		});
		__expose({
			popperRef,
			contentRef,
			isFocusInsideContent,
			updatePopper,
			onOpen,
			onClose,
			hide
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$4.ElPopper), {
				ref_key: "popperRef",
				ref: popperRef,
				role: __props.role
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createVNode)(require_trigger.default, {
					disabled: __props.disabled,
					trigger: __props.trigger,
					"trigger-keys": __props.triggerKeys,
					"virtual-ref": __props.virtualRef,
					"virtual-triggering": __props.virtualTriggering,
					"focus-on-target": __props.focusOnTarget
				}, {
					default: (0, vue.withCtx)(() => [_ctx.$slots.default ? (0, vue.renderSlot)(_ctx.$slots, "default", { key: 0 }) : (0, vue.createCommentVNode)("v-if", true)]),
					_: 3
				}, 8, [
					"disabled",
					"trigger",
					"trigger-keys",
					"virtual-ref",
					"virtual-triggering",
					"focus-on-target"
				]), (0, vue.createVNode)(require_content.default, {
					ref_key: "contentRef",
					ref: contentRef,
					"aria-label": __props.ariaLabel,
					"boundaries-padding": __props.boundariesPadding,
					content: __props.content,
					disabled: __props.disabled,
					effect: __props.effect,
					enterable: __props.enterable,
					"fallback-placements": __props.fallbackPlacements,
					"hide-after": __props.hideAfter,
					"gpu-acceleration": __props.gpuAcceleration,
					offset: __props.offset,
					persistent: __props.persistent,
					"popper-class": kls.value,
					"popper-style": __props.popperStyle,
					placement: __props.placement,
					"popper-options": __props.popperOptions,
					"arrow-offset": __props.arrowOffset,
					pure: __props.pure,
					"raw-content": __props.rawContent,
					"reference-el": __props.referenceEl,
					"trigger-target-el": __props.triggerTargetEl,
					"show-after": __props.showAfter,
					strategy: __props.strategy,
					teleported: __props.teleported,
					transition: __props.transition,
					"virtual-triggering": __props.virtualTriggering,
					"z-index": __props.zIndex,
					"append-to": __props.appendTo,
					loop: __props.loop
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "content", {}, () => [__props.rawContent ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
						key: 0,
						innerHTML: __props.content
					}, null, 8, _hoisted_1)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_2, (0, vue.toDisplayString)(__props.content), 1))]), __props.showArrow ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_arrow.default), { key: 0 })) : (0, vue.createCommentVNode)("v-if", true)]),
					_: 3
				}, 8, [
					"aria-label",
					"boundaries-padding",
					"content",
					"disabled",
					"effect",
					"enterable",
					"fallback-placements",
					"hide-after",
					"gpu-acceleration",
					"offset",
					"persistent",
					"popper-class",
					"popper-style",
					"placement",
					"popper-options",
					"arrow-offset",
					"pure",
					"raw-content",
					"reference-el",
					"trigger-target-el",
					"show-after",
					"strategy",
					"teleported",
					"transition",
					"virtual-triggering",
					"z-index",
					"append-to",
					"loop"
				])]),
				_: 3
			}, 8, ["role"]);
		};
	}
});

//#endregion
exports.default = tooltip_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=tooltip.vue_vue_type_script_setup_true_lang.js.map
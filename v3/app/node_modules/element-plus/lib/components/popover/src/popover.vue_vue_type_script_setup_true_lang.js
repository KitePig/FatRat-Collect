const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../tooltip/index.js');
const require_popover = require('./popover.js');
let vue = require("vue");

//#region ../../packages/components/popover/src/popover.vue?vue&type=script&setup=true&lang.ts
const updateEventKeyRaw = `onUpdate:visible`;
var popover_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPopover",
	__name: "popover",
	props: require_popover.popoverProps,
	emits: require_popover.popoverEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const onUpdateVisible = (0, vue.computed)(() => {
			return props[updateEventKeyRaw];
		});
		const ns = require_index.useNamespace("popover");
		const tooltipRef = (0, vue.ref)();
		const popperRef = (0, vue.computed)(() => {
			return (0, vue.unref)(tooltipRef)?.popperRef;
		});
		const style = (0, vue.computed)(() => {
			return [{ width: require_style.addUnit(props.width) }, props.popperStyle];
		});
		const kls = (0, vue.computed)(() => {
			return [
				ns.b(),
				props.popperClass,
				{ [ns.m("plain")]: !!props.content }
			];
		});
		const gpuAcceleration = (0, vue.computed)(() => {
			return props.transition === `${ns.namespace.value}-fade-in-linear`;
		});
		const hide = () => {
			tooltipRef.value?.hide();
		};
		const beforeEnter = () => {
			emit("before-enter");
		};
		const beforeLeave = () => {
			emit("before-leave");
		};
		const afterEnter = () => {
			emit("after-enter");
		};
		const afterLeave = () => {
			emit("update:visible", false);
			emit("after-leave");
		};
		__expose({
			popperRef,
			hide
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElTooltip), (0, vue.mergeProps)({
				ref_key: "tooltipRef",
				ref: tooltipRef
			}, _ctx.$attrs, {
				trigger: __props.trigger,
				"trigger-keys": __props.triggerKeys,
				placement: __props.placement,
				disabled: __props.disabled,
				visible: __props.visible,
				transition: __props.transition,
				"popper-options": __props.popperOptions,
				tabindex: __props.tabindex,
				content: __props.content,
				offset: __props.offset,
				"show-after": __props.showAfter,
				"hide-after": __props.hideAfter,
				"auto-close": __props.autoClose,
				"show-arrow": __props.showArrow,
				"aria-label": __props.title,
				effect: __props.effect,
				enterable: __props.enterable,
				"popper-class": kls.value,
				"popper-style": style.value,
				teleported: __props.teleported,
				"append-to": __props.appendTo,
				persistent: __props.persistent,
				"gpu-acceleration": gpuAcceleration.value,
				"onUpdate:visible": onUpdateVisible.value,
				onBeforeShow: beforeEnter,
				onBeforeHide: beforeLeave,
				onShow: afterEnter,
				onHide: afterLeave
			}), {
				content: (0, vue.withCtx)(() => [__props.title ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title")),
					role: "title"
				}, (0, vue.toDisplayString)(__props.title), 3)) : (0, vue.createCommentVNode)("v-if", true), (0, vue.renderSlot)(_ctx.$slots, "default", { hide }, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.content), 1)])]),
				default: (0, vue.withCtx)(() => [_ctx.$slots.reference ? (0, vue.renderSlot)(_ctx.$slots, "reference", { key: 0 }) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 3
			}, 16, [
				"trigger",
				"trigger-keys",
				"placement",
				"disabled",
				"visible",
				"transition",
				"popper-options",
				"tabindex",
				"content",
				"offset",
				"show-after",
				"hide-after",
				"auto-close",
				"show-arrow",
				"aria-label",
				"effect",
				"enterable",
				"popper-class",
				"popper-style",
				"teleported",
				"append-to",
				"persistent",
				"gpu-acceleration",
				"onUpdate:visible"
			]);
		};
	}
});

//#endregion
exports.default = popover_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=popover.vue_vue_type_script_setup_true_lang.js.map
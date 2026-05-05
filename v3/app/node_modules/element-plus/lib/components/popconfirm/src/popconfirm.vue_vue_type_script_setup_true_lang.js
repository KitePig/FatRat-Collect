const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../icon/index.js');
const require_index$3 = require('../../tooltip/index.js');
const require_index$4 = require('../../button/index.js');
const require_popconfirm = require('./popconfirm.js');
let vue = require("vue");

//#region ../../packages/components/popconfirm/src/popconfirm.vue?vue&type=script&setup=true&lang.ts
var popconfirm_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPopconfirm",
	__name: "popconfirm",
	props: require_popconfirm.popconfirmProps,
	emits: require_popconfirm.popconfirmEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("popconfirm");
		const tooltipRef = (0, vue.ref)();
		const rootRef = (0, vue.ref)();
		const popperRef = (0, vue.computed)(() => {
			return (0, vue.unref)(tooltipRef)?.popperRef;
		});
		const showPopper = () => {
			rootRef.value?.focus?.();
		};
		const hidePopper = () => {
			tooltipRef.value?.onClose?.();
		};
		const style = (0, vue.computed)(() => {
			return { width: require_style.addUnit(props.width) };
		});
		const confirm = (e) => {
			emit("confirm", e);
			hidePopper();
		};
		const cancel = (e) => {
			emit("cancel", e);
			hidePopper();
		};
		const finalConfirmButtonText = (0, vue.computed)(() => props.confirmButtonText || t("el.popconfirm.confirmButtonText"));
		const finalCancelButtonText = (0, vue.computed)(() => props.cancelButtonText || t("el.popconfirm.cancelButtonText"));
		__expose({
			popperRef,
			hide: hidePopper
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElTooltip), (0, vue.mergeProps)({
				ref_key: "tooltipRef",
				ref: tooltipRef,
				trigger: "click",
				effect: __props.effect
			}, _ctx.$attrs, {
				"virtual-triggering": __props.virtualTriggering,
				"virtual-ref": __props.virtualRef,
				"popper-class": `${(0, vue.unref)(ns).namespace.value}-popover`,
				"popper-style": style.value,
				teleported: __props.teleported,
				"fallback-placements": [
					"bottom",
					"top",
					"right",
					"left"
				],
				"hide-after": __props.hideAfter,
				persistent: __props.persistent,
				loop: "",
				onShow: showPopper
			}), {
				content: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
					ref_key: "rootRef",
					ref: rootRef,
					tabindex: "-1",
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).b())
				}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("main")) }, [!__props.hideIcon && __props.icon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("icon")),
					style: (0, vue.normalizeStyle)({ color: __props.iconColor })
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.icon)))]),
					_: 1
				}, 8, ["class", "style"])) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createTextVNode)(" " + (0, vue.toDisplayString)(__props.title), 1)], 2), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("action")) }, [(0, vue.renderSlot)(_ctx.$slots, "actions", {
					confirm,
					cancel
				}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$4.ElButton), {
					size: "small",
					type: __props.cancelButtonType === "text" ? "" : __props.cancelButtonType,
					text: __props.cancelButtonType === "text",
					onClick: cancel
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)(finalCancelButtonText.value), 1)]),
					_: 1
				}, 8, ["type", "text"]), (0, vue.createVNode)((0, vue.unref)(require_index$4.ElButton), {
					size: "small",
					type: __props.confirmButtonType === "text" ? "" : __props.confirmButtonType,
					text: __props.confirmButtonType === "text",
					onClick: confirm
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)(finalConfirmButtonText.value), 1)]),
					_: 1
				}, 8, ["type", "text"])])], 2)], 2)]),
				default: (0, vue.withCtx)(() => [_ctx.$slots.reference ? (0, vue.renderSlot)(_ctx.$slots, "reference", { key: 0 }) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 3
			}, 16, [
				"effect",
				"virtual-triggering",
				"virtual-ref",
				"popper-class",
				"popper-style",
				"teleported",
				"hide-after",
				"persistent"
			]);
		};
	}
});

//#endregion
exports.default = popconfirm_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=popconfirm.vue_vue_type_script_setup_true_lang.js.map
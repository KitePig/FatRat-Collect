import { addUnit } from "../../../utils/dom/style.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { ElButton } from "../../button/index.mjs";
import { popconfirmEmits, popconfirmProps } from "./popconfirm.mjs";
import { computed, createBlock, createCommentVNode, createElementVNode, createTextVNode, createVNode, defineComponent, mergeProps, normalizeClass, normalizeStyle, openBlock, ref, renderSlot, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";

//#region ../../packages/components/popconfirm/src/popconfirm.vue?vue&type=script&setup=true&lang.ts
var popconfirm_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPopconfirm",
	__name: "popconfirm",
	props: popconfirmProps,
	emits: popconfirmEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = useLocale();
		const ns = useNamespace("popconfirm");
		const tooltipRef = ref();
		const rootRef = ref();
		const popperRef = computed(() => {
			return unref(tooltipRef)?.popperRef;
		});
		const showPopper = () => {
			rootRef.value?.focus?.();
		};
		const hidePopper = () => {
			tooltipRef.value?.onClose?.();
		};
		const style = computed(() => {
			return { width: addUnit(props.width) };
		});
		const confirm = (e) => {
			emit("confirm", e);
			hidePopper();
		};
		const cancel = (e) => {
			emit("cancel", e);
			hidePopper();
		};
		const finalConfirmButtonText = computed(() => props.confirmButtonText || t("el.popconfirm.confirmButtonText"));
		const finalCancelButtonText = computed(() => props.cancelButtonText || t("el.popconfirm.cancelButtonText"));
		__expose({
			popperRef,
			hide: hidePopper
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ElTooltip), mergeProps({
				ref_key: "tooltipRef",
				ref: tooltipRef,
				trigger: "click",
				effect: __props.effect
			}, _ctx.$attrs, {
				"virtual-triggering": __props.virtualTriggering,
				"virtual-ref": __props.virtualRef,
				"popper-class": `${unref(ns).namespace.value}-popover`,
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
				content: withCtx(() => [createElementVNode("div", {
					ref_key: "rootRef",
					ref: rootRef,
					tabindex: "-1",
					class: normalizeClass(unref(ns).b())
				}, [createElementVNode("div", { class: normalizeClass(unref(ns).e("main")) }, [!__props.hideIcon && __props.icon ? (openBlock(), createBlock(unref(ElIcon), {
					key: 0,
					class: normalizeClass(unref(ns).e("icon")),
					style: normalizeStyle({ color: __props.iconColor })
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.icon)))]),
					_: 1
				}, 8, ["class", "style"])) : createCommentVNode("v-if", true), createTextVNode(" " + toDisplayString(__props.title), 1)], 2), createElementVNode("div", { class: normalizeClass(unref(ns).e("action")) }, [renderSlot(_ctx.$slots, "actions", {
					confirm,
					cancel
				}, () => [createVNode(unref(ElButton), {
					size: "small",
					type: __props.cancelButtonType === "text" ? "" : __props.cancelButtonType,
					text: __props.cancelButtonType === "text",
					onClick: cancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(finalCancelButtonText.value), 1)]),
					_: 1
				}, 8, ["type", "text"]), createVNode(unref(ElButton), {
					size: "small",
					type: __props.confirmButtonType === "text" ? "" : __props.confirmButtonType,
					text: __props.confirmButtonType === "text",
					onClick: confirm
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(finalConfirmButtonText.value), 1)]),
					_: 1
				}, 8, ["type", "text"])])], 2)], 2)]),
				default: withCtx(() => [_ctx.$slots.reference ? renderSlot(_ctx.$slots, "reference", { key: 0 }) : createCommentVNode("v-if", true)]),
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
export { popconfirm_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=popconfirm.vue_vue_type_script_setup_true_lang.mjs.map
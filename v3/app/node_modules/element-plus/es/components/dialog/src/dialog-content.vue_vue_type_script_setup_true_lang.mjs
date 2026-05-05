import { CloseComponents } from "../../../utils/vue/icon.mjs";
import { composeRefs } from "../../../utils/vue/refs.mjs";
import { useDraggable } from "../../../hooks/use-draggable/index.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { FOCUS_TRAP_INJECTION_KEY } from "../../focus-trap/src/tokens.mjs";
import { dialogContentEmits, dialogContentProps } from "./dialog-content.mjs";
import { dialogInjectionKey } from "./constants.mjs";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, inject, normalizeClass, normalizeStyle, openBlock, renderSlot, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";

//#region ../../packages/components/dialog/src/dialog-content.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-level"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["id"];
var dialog_content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElDialogContent",
	__name: "dialog-content",
	props: dialogContentProps,
	emits: dialogContentEmits,
	setup(__props, { expose: __expose }) {
		const { t } = useLocale();
		const { Close } = CloseComponents;
		const props = __props;
		const { dialogRef, headerRef, bodyId, ns, style } = inject(dialogInjectionKey);
		const { focusTrapRef } = inject(FOCUS_TRAP_INJECTION_KEY);
		const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
		const draggable = computed(() => !!props.draggable);
		const { resetPosition, updatePosition, isDragging } = useDraggable(dialogRef, headerRef, draggable, computed(() => !!props.overflow));
		const dialogKls = computed(() => [
			ns.b(),
			ns.is("fullscreen", props.fullscreen),
			ns.is("draggable", draggable.value),
			ns.is("dragging", isDragging.value),
			ns.is("align-center", !!props.alignCenter),
			{ [ns.m("center")]: props.center }
		]);
		__expose({
			resetPosition,
			updatePosition
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref: unref(composedDialogRef),
				class: normalizeClass(dialogKls.value),
				style: normalizeStyle(unref(style)),
				tabindex: "-1"
			}, [
				createElementVNode("header", {
					ref_key: "headerRef",
					ref: headerRef,
					class: normalizeClass([
						unref(ns).e("header"),
						__props.headerClass,
						{ "show-close": __props.showClose }
					])
				}, [renderSlot(_ctx.$slots, "header", {}, () => [createElementVNode("span", {
					role: "heading",
					"aria-level": __props.ariaLevel,
					class: normalizeClass(unref(ns).e("title"))
				}, toDisplayString(__props.title), 11, _hoisted_1)]), __props.showClose ? (openBlock(), createElementBlock("button", {
					key: 0,
					"aria-label": unref(t)("el.dialog.close"),
					class: normalizeClass(unref(ns).e("headerbtn")),
					type: "button",
					onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
				}, [createVNode(unref(ElIcon), { class: normalizeClass(unref(ns).e("close")) }, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.closeIcon || unref(Close))))]),
					_: 1
				}, 8, ["class"])], 10, _hoisted_2)) : createCommentVNode("v-if", true)], 2),
				createElementVNode("div", {
					id: unref(bodyId),
					class: normalizeClass([unref(ns).e("body"), __props.bodyClass])
				}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_3),
				_ctx.$slots.footer ? (openBlock(), createElementBlock("footer", {
					key: 0,
					class: normalizeClass([unref(ns).e("footer"), __props.footerClass])
				}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("v-if", true)
			], 6);
		};
	}
});

//#endregion
export { dialog_content_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=dialog-content.vue_vue_type_script_setup_true_lang.mjs.map
import { ElTeleport } from "../../teleport/index.mjs";
import { useDeprecated } from "../../../hooks/use-deprecated/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useSameTarget } from "../../../hooks/use-same-target/index.mjs";
import focus_trap_default from "../../focus-trap/index.mjs";
import { dialogEmits, dialogProps } from "./dialog.mjs";
import { ElOverlay } from "../../overlay/index.mjs";
import { dialogInjectionKey } from "./constants.mjs";
import dialog_content_default from "./dialog-content2.mjs";
import { useDialog } from "./use-dialog.mjs";
import { Transition, computed, createBlock, createCommentVNode, createElementVNode, createSlots, createVNode, defineComponent, mergeProps, normalizeClass, normalizeStyle, openBlock, provide, ref, renderSlot, unref, useSlots, vShow, withCtx, withDirectives } from "vue";

//#region ../../packages/components/dialog/src/dialog.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"aria-label",
	"aria-labelledby",
	"aria-describedby"
];
var dialog_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElDialog",
	inheritAttrs: false,
	__name: "dialog",
	props: dialogProps,
	emits: dialogEmits,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const slots = useSlots();
		useDeprecated({
			scope: "el-dialog",
			from: "the title slot",
			replacement: "the header slot",
			version: "3.0.0",
			ref: "https://element-plus.org/en-US/component/dialog.html#slots"
		}, computed(() => !!slots.title));
		const ns = useNamespace("dialog");
		const dialogRef = ref();
		const headerRef = ref();
		const dialogContentRef = ref();
		const { visible, titleId, bodyId, style, overlayDialogStyle, rendered, transitionConfig, zIndex, _draggable, _alignCenter, _overflow, penetrable, handleClose, onModalClick, onOpenAutoFocus, onCloseAutoFocus, onCloseRequested, onFocusoutPrevented, bringToFront, closing } = useDialog(props, dialogRef);
		provide(dialogInjectionKey, {
			dialogRef,
			headerRef,
			bodyId,
			ns,
			rendered,
			style
		});
		const overlayEvent = useSameTarget(onModalClick);
		const resetPosition = () => {
			dialogContentRef.value?.resetPosition();
		};
		__expose({
			visible,
			dialogContentRef,
			resetPosition,
			handleClose
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ElTeleport), {
				to: __props.appendTo,
				disabled: __props.appendTo !== "body" ? false : !__props.appendToBody
			}, {
				default: withCtx(() => [createVNode(Transition, mergeProps(unref(transitionConfig), { persisted: "" }), {
					default: withCtx(() => [withDirectives(createVNode(unref(ElOverlay), {
						"custom-mask-event": "",
						mask: __props.modal,
						"overlay-class": [
							__props.modalClass ?? "",
							`${unref(ns).namespace.value}-modal-dialog`,
							unref(ns).is("penetrable", unref(penetrable))
						],
						"z-index": unref(zIndex)
					}, {
						default: withCtx(() => [createElementVNode("div", {
							role: "dialog",
							"aria-modal": "true",
							"aria-label": __props.title || void 0,
							"aria-labelledby": !__props.title ? unref(titleId) : void 0,
							"aria-describedby": unref(bodyId),
							class: normalizeClass([`${unref(ns).namespace.value}-overlay-dialog`, unref(ns).is("closing", unref(closing))]),
							style: normalizeStyle(unref(overlayDialogStyle)),
							onClick: _cache[0] || (_cache[0] = (...args) => unref(overlayEvent).onClick && unref(overlayEvent).onClick(...args)),
							onMousedown: _cache[1] || (_cache[1] = (...args) => unref(overlayEvent).onMousedown && unref(overlayEvent).onMousedown(...args)),
							onMouseup: _cache[2] || (_cache[2] = (...args) => unref(overlayEvent).onMouseup && unref(overlayEvent).onMouseup(...args))
						}, [createVNode(unref(focus_trap_default), {
							loop: "",
							trapped: unref(visible),
							"focus-start-el": "container",
							onFocusAfterTrapped: unref(onOpenAutoFocus),
							onFocusAfterReleased: unref(onCloseAutoFocus),
							onFocusoutPrevented: unref(onFocusoutPrevented),
							onReleaseRequested: unref(onCloseRequested)
						}, {
							default: withCtx(() => [unref(rendered) ? (openBlock(), createBlock(dialog_content_default, mergeProps({
								key: 0,
								ref_key: "dialogContentRef",
								ref: dialogContentRef
							}, _ctx.$attrs, {
								center: __props.center,
								"align-center": unref(_alignCenter),
								"close-icon": __props.closeIcon,
								draggable: unref(_draggable),
								overflow: unref(_overflow),
								fullscreen: __props.fullscreen,
								"header-class": __props.headerClass,
								"body-class": __props.bodyClass,
								"footer-class": __props.footerClass,
								"show-close": __props.showClose,
								title: __props.title,
								"aria-level": __props.headerAriaLevel,
								onClose: unref(handleClose),
								onMousedown: unref(bringToFront)
							}), createSlots({
								header: withCtx(() => [!_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
									key: 0,
									close: unref(handleClose),
									titleId: unref(titleId),
									titleClass: unref(ns).e("title")
								}) : renderSlot(_ctx.$slots, "title", { key: 1 })]),
								default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
								_: 2
							}, [_ctx.$slots.footer ? {
								name: "footer",
								fn: withCtx(() => [renderSlot(_ctx.$slots, "footer")]),
								key: "0"
							} : void 0]), 1040, [
								"center",
								"align-center",
								"close-icon",
								"draggable",
								"overflow",
								"fullscreen",
								"header-class",
								"body-class",
								"footer-class",
								"show-close",
								"title",
								"aria-level",
								"onClose",
								"onMousedown"
							])) : createCommentVNode("v-if", true)]),
							_: 3
						}, 8, [
							"trapped",
							"onFocusAfterTrapped",
							"onFocusAfterReleased",
							"onFocusoutPrevented",
							"onReleaseRequested"
						])], 46, _hoisted_1)]),
						_: 3
					}, 8, [
						"mask",
						"overlay-class",
						"z-index"
					]), [[vShow, unref(visible)]])]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["to", "disabled"]);
		};
	}
});

//#endregion
export { dialog_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=dialog.vue_vue_type_script_setup_true_lang.mjs.map
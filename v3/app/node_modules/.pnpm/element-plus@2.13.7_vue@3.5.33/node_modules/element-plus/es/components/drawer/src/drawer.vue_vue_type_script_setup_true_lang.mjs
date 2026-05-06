import { ElTeleport } from "../../teleport/index.mjs";
import { useDeprecated } from "../../../hooks/use-deprecated/index.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import focus_trap_default from "../../focus-trap/index.mjs";
import { ElOverlay } from "../../overlay/index.mjs";
import { useDialog } from "../../dialog/src/use-dialog.mjs";
import { drawerEmits, drawerProps } from "./drawer.mjs";
import { useResizable } from "./composables/useResizable.mjs";
import { Close } from "@element-plus/icons-vue";
import { Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, mergeProps, normalizeClass, normalizeStyle, openBlock, ref, renderSlot, toDisplayString, unref, useSlots, vShow, withCtx, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/drawer/src/drawer.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"aria-label",
	"aria-labelledby",
	"aria-describedby"
];
const _hoisted_2 = ["id", "aria-level"];
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = ["id"];
var drawer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElDrawer",
	inheritAttrs: false,
	__name: "drawer",
	props: drawerProps,
	emits: drawerEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = useSlots();
		useDeprecated({
			scope: "el-drawer",
			from: "the title slot",
			replacement: "the header slot",
			version: "3.0.0",
			ref: "https://element-plus.org/en-US/component/drawer.html#slots"
		}, computed(() => !!slots.title));
		const drawerRef = ref();
		const focusStartRef = ref();
		const draggerRef = ref();
		const ns = useNamespace("drawer");
		const { t } = useLocale();
		const { afterEnter, afterLeave, beforeLeave, visible, rendered, titleId, bodyId, zIndex, onModalClick, onOpenAutoFocus, onCloseAutoFocus, onFocusoutPrevented, onCloseRequested, handleClose } = useDialog(props, drawerRef);
		const { isHorizontal, size, isResizing } = useResizable(props, draggerRef, emit);
		const penetrable = computed(() => props.modalPenetrable && !props.modal);
		__expose({
			handleClose,
			afterEnter,
			afterLeave
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ElTeleport), {
				to: __props.appendTo,
				disabled: __props.appendTo !== "body" ? false : !__props.appendToBody
			}, {
				default: withCtx(() => [createVNode(Transition, {
					name: unref(ns).b("fade"),
					onAfterEnter: unref(afterEnter),
					onAfterLeave: unref(afterLeave),
					onBeforeLeave: unref(beforeLeave),
					persisted: ""
				}, {
					default: withCtx(() => [withDirectives(createVNode(unref(ElOverlay), {
						mask: __props.modal,
						"overlay-class": [
							unref(ns).is("drawer"),
							__props.modalClass ?? "",
							`${unref(ns).namespace.value}-modal-drawer`,
							unref(ns).is("penetrable", penetrable.value)
						],
						"z-index": unref(zIndex),
						onClick: unref(onModalClick)
					}, {
						default: withCtx(() => [createVNode(unref(focus_trap_default), {
							loop: "",
							trapped: unref(visible),
							"focus-trap-el": drawerRef.value,
							"focus-start-el": focusStartRef.value,
							onFocusAfterTrapped: unref(onOpenAutoFocus),
							onFocusAfterReleased: unref(onCloseAutoFocus),
							onFocusoutPrevented: unref(onFocusoutPrevented),
							onReleaseRequested: unref(onCloseRequested)
						}, {
							default: withCtx(() => [createElementVNode("div", mergeProps({
								ref_key: "drawerRef",
								ref: drawerRef,
								"aria-modal": "true",
								"aria-label": __props.title || void 0,
								"aria-labelledby": !__props.title ? unref(titleId) : void 0,
								"aria-describedby": unref(bodyId)
							}, _ctx.$attrs, {
								class: [
									unref(ns).b(),
									__props.direction,
									unref(visible) && "open",
									unref(ns).is("dragging", unref(isResizing))
								],
								style: { [unref(isHorizontal) ? "width" : "height"]: unref(size) },
								role: "dialog",
								onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"]))
							}), [
								createElementVNode("span", {
									ref_key: "focusStartRef",
									ref: focusStartRef,
									class: normalizeClass(unref(ns).e("sr-focus")),
									tabindex: "-1"
								}, null, 2),
								__props.withHeader ? (openBlock(), createElementBlock("header", {
									key: 0,
									class: normalizeClass([unref(ns).e("header"), __props.headerClass])
								}, [!_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
									key: 0,
									close: unref(handleClose),
									titleId: unref(titleId),
									titleClass: unref(ns).e("title")
								}, () => [createElementVNode("span", {
									id: unref(titleId),
									role: "heading",
									"aria-level": __props.headerAriaLevel,
									class: normalizeClass(unref(ns).e("title"))
								}, toDisplayString(__props.title), 11, _hoisted_2)]) : renderSlot(_ctx.$slots, "title", { key: 1 }, () => [createCommentVNode(" DEPRECATED SLOT ")]), __props.showClose ? (openBlock(), createElementBlock("button", {
									key: 2,
									"aria-label": unref(t)("el.drawer.close"),
									class: normalizeClass(unref(ns).e("close-btn")),
									type: "button",
									onClick: _cache[0] || (_cache[0] = (...args) => unref(handleClose) && unref(handleClose)(...args))
								}, [createVNode(unref(ElIcon), { class: normalizeClass(unref(ns).e("close")) }, {
									default: withCtx(() => [createVNode(unref(Close))]),
									_: 1
								}, 8, ["class"])], 10, _hoisted_3)) : createCommentVNode("v-if", true)], 2)) : createCommentVNode("v-if", true),
								unref(rendered) ? (openBlock(), createElementBlock("div", {
									key: 1,
									id: unref(bodyId),
									class: normalizeClass([unref(ns).e("body"), __props.bodyClass])
								}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_4)) : createCommentVNode("v-if", true),
								_ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
									key: 2,
									class: normalizeClass([unref(ns).e("footer"), __props.footerClass])
								}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("v-if", true),
								__props.resizable ? (openBlock(), createElementBlock("div", {
									key: 3,
									ref_key: "draggerRef",
									ref: draggerRef,
									style: normalizeStyle({ zIndex: unref(zIndex) }),
									class: normalizeClass(unref(ns).e("dragger"))
								}, null, 6)) : createCommentVNode("v-if", true)
							], 16, _hoisted_1)]),
							_: 3
						}, 8, [
							"trapped",
							"focus-trap-el",
							"focus-start-el",
							"onFocusAfterTrapped",
							"onFocusAfterReleased",
							"onFocusoutPrevented",
							"onReleaseRequested"
						])]),
						_: 3
					}, 8, [
						"mask",
						"overlay-class",
						"z-index",
						"onClick"
					]), [[vShow, unref(visible)]])]),
					_: 3
				}, 8, [
					"name",
					"onAfterEnter",
					"onAfterLeave",
					"onBeforeLeave"
				])]),
				_: 3
			}, 8, ["to", "disabled"]);
		};
	}
});

//#endregion
export { drawer_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=drawer.vue_vue_type_script_setup_true_lang.mjs.map
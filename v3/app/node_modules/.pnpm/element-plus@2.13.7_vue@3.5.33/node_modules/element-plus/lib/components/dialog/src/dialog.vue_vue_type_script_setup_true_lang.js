const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../teleport/index.js');
const require_index$1 = require('../../../hooks/use-deprecated/index.js');
const require_index$2 = require('../../../hooks/use-namespace/index.js');
const require_index$3 = require('../../../hooks/use-same-target/index.js');
const require_index$4 = require('../../focus-trap/index.js');
const require_dialog = require('./dialog.js');
const require_index$5 = require('../../overlay/index.js');
const require_constants = require('./constants.js');
const require_dialog_content = require('./dialog-content2.js');
const require_use_dialog = require('./use-dialog.js');
let vue = require("vue");

//#region ../../packages/components/dialog/src/dialog.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"aria-label",
	"aria-labelledby",
	"aria-describedby"
];
var dialog_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElDialog",
	inheritAttrs: false,
	__name: "dialog",
	props: require_dialog.dialogProps,
	emits: require_dialog.dialogEmits,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const slots = (0, vue.useSlots)();
		require_index$1.useDeprecated({
			scope: "el-dialog",
			from: "the title slot",
			replacement: "the header slot",
			version: "3.0.0",
			ref: "https://element-plus.org/en-US/component/dialog.html#slots"
		}, (0, vue.computed)(() => !!slots.title));
		const ns = require_index$2.useNamespace("dialog");
		const dialogRef = (0, vue.ref)();
		const headerRef = (0, vue.ref)();
		const dialogContentRef = (0, vue.ref)();
		const { visible, titleId, bodyId, style, overlayDialogStyle, rendered, transitionConfig, zIndex, _draggable, _alignCenter, _overflow, penetrable, handleClose, onModalClick, onOpenAutoFocus, onCloseAutoFocus, onCloseRequested, onFocusoutPrevented, bringToFront, closing } = require_use_dialog.useDialog(props, dialogRef);
		(0, vue.provide)(require_constants.dialogInjectionKey, {
			dialogRef,
			headerRef,
			bodyId,
			ns,
			rendered,
			style
		});
		const overlayEvent = require_index$3.useSameTarget(onModalClick);
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
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index.ElTeleport), {
				to: __props.appendTo,
				disabled: __props.appendTo !== "body" ? false : !__props.appendToBody
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createVNode)(vue.Transition, (0, vue.mergeProps)((0, vue.unref)(transitionConfig), { persisted: "" }), {
					default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_index$5.ElOverlay), {
						"custom-mask-event": "",
						mask: __props.modal,
						"overlay-class": [
							__props.modalClass ?? "",
							`${(0, vue.unref)(ns).namespace.value}-modal-dialog`,
							(0, vue.unref)(ns).is("penetrable", (0, vue.unref)(penetrable))
						],
						"z-index": (0, vue.unref)(zIndex)
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
							role: "dialog",
							"aria-modal": "true",
							"aria-label": __props.title || void 0,
							"aria-labelledby": !__props.title ? (0, vue.unref)(titleId) : void 0,
							"aria-describedby": (0, vue.unref)(bodyId),
							class: (0, vue.normalizeClass)([`${(0, vue.unref)(ns).namespace.value}-overlay-dialog`, (0, vue.unref)(ns).is("closing", (0, vue.unref)(closing))]),
							style: (0, vue.normalizeStyle)((0, vue.unref)(overlayDialogStyle)),
							onClick: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(overlayEvent).onClick && (0, vue.unref)(overlayEvent).onClick(...args)),
							onMousedown: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(overlayEvent).onMousedown && (0, vue.unref)(overlayEvent).onMousedown(...args)),
							onMouseup: _cache[2] || (_cache[2] = (...args) => (0, vue.unref)(overlayEvent).onMouseup && (0, vue.unref)(overlayEvent).onMouseup(...args))
						}, [(0, vue.createVNode)((0, vue.unref)(require_index$4.default), {
							loop: "",
							trapped: (0, vue.unref)(visible),
							"focus-start-el": "container",
							onFocusAfterTrapped: (0, vue.unref)(onOpenAutoFocus),
							onFocusAfterReleased: (0, vue.unref)(onCloseAutoFocus),
							onFocusoutPrevented: (0, vue.unref)(onFocusoutPrevented),
							onReleaseRequested: (0, vue.unref)(onCloseRequested)
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.unref)(rendered) ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_dialog_content.default, (0, vue.mergeProps)({
								key: 0,
								ref_key: "dialogContentRef",
								ref: dialogContentRef
							}, _ctx.$attrs, {
								center: __props.center,
								"align-center": (0, vue.unref)(_alignCenter),
								"close-icon": __props.closeIcon,
								draggable: (0, vue.unref)(_draggable),
								overflow: (0, vue.unref)(_overflow),
								fullscreen: __props.fullscreen,
								"header-class": __props.headerClass,
								"body-class": __props.bodyClass,
								"footer-class": __props.footerClass,
								"show-close": __props.showClose,
								title: __props.title,
								"aria-level": __props.headerAriaLevel,
								onClose: (0, vue.unref)(handleClose),
								onMousedown: (0, vue.unref)(bringToFront)
							}), (0, vue.createSlots)({
								header: (0, vue.withCtx)(() => [!_ctx.$slots.title ? (0, vue.renderSlot)(_ctx.$slots, "header", {
									key: 0,
									close: (0, vue.unref)(handleClose),
									titleId: (0, vue.unref)(titleId),
									titleClass: (0, vue.unref)(ns).e("title")
								}) : (0, vue.renderSlot)(_ctx.$slots, "title", { key: 1 })]),
								default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
								_: 2
							}, [_ctx.$slots.footer ? {
								name: "footer",
								fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "footer")]),
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
							])) : (0, vue.createCommentVNode)("v-if", true)]),
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
					]), [[vue.vShow, (0, vue.unref)(visible)]])]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["to", "disabled"]);
		};
	}
});

//#endregion
exports.default = dialog_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=dialog.vue_vue_type_script_setup_true_lang.js.map
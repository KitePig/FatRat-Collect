const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../teleport/index.js');
const require_index$1 = require('../../../hooks/use-deprecated/index.js');
const require_index$2 = require('../../../hooks/use-locale/index.js');
const require_index$3 = require('../../../hooks/use-namespace/index.js');
const require_index$4 = require('../../icon/index.js');
const require_index$5 = require('../../focus-trap/index.js');
const require_index$6 = require('../../overlay/index.js');
const require_use_dialog = require('../../dialog/src/use-dialog.js');
const require_drawer = require('./drawer.js');
const require_useResizable = require('./composables/useResizable.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/drawer/src/drawer.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"aria-label",
	"aria-labelledby",
	"aria-describedby"
];
const _hoisted_2 = ["id", "aria-level"];
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = ["id"];
var drawer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElDrawer",
	inheritAttrs: false,
	__name: "drawer",
	props: require_drawer.drawerProps,
	emits: require_drawer.drawerEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = (0, vue.useSlots)();
		require_index$1.useDeprecated({
			scope: "el-drawer",
			from: "the title slot",
			replacement: "the header slot",
			version: "3.0.0",
			ref: "https://element-plus.org/en-US/component/drawer.html#slots"
		}, (0, vue.computed)(() => !!slots.title));
		const drawerRef = (0, vue.ref)();
		const focusStartRef = (0, vue.ref)();
		const draggerRef = (0, vue.ref)();
		const ns = require_index$3.useNamespace("drawer");
		const { t } = require_index$2.useLocale();
		const { afterEnter, afterLeave, beforeLeave, visible, rendered, titleId, bodyId, zIndex, onModalClick, onOpenAutoFocus, onCloseAutoFocus, onFocusoutPrevented, onCloseRequested, handleClose } = require_use_dialog.useDialog(props, drawerRef);
		const { isHorizontal, size, isResizing } = require_useResizable.useResizable(props, draggerRef, emit);
		const penetrable = (0, vue.computed)(() => props.modalPenetrable && !props.modal);
		__expose({
			handleClose,
			afterEnter,
			afterLeave
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index.ElTeleport), {
				to: __props.appendTo,
				disabled: __props.appendTo !== "body" ? false : !__props.appendToBody
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createVNode)(vue.Transition, {
					name: (0, vue.unref)(ns).b("fade"),
					onAfterEnter: (0, vue.unref)(afterEnter),
					onAfterLeave: (0, vue.unref)(afterLeave),
					onBeforeLeave: (0, vue.unref)(beforeLeave),
					persisted: ""
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_index$6.ElOverlay), {
						mask: __props.modal,
						"overlay-class": [
							(0, vue.unref)(ns).is("drawer"),
							__props.modalClass ?? "",
							`${(0, vue.unref)(ns).namespace.value}-modal-drawer`,
							(0, vue.unref)(ns).is("penetrable", penetrable.value)
						],
						"z-index": (0, vue.unref)(zIndex),
						onClick: (0, vue.unref)(onModalClick)
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(require_index$5.default), {
							loop: "",
							trapped: (0, vue.unref)(visible),
							"focus-trap-el": drawerRef.value,
							"focus-start-el": focusStartRef.value,
							onFocusAfterTrapped: (0, vue.unref)(onOpenAutoFocus),
							onFocusAfterReleased: (0, vue.unref)(onCloseAutoFocus),
							onFocusoutPrevented: (0, vue.unref)(onFocusoutPrevented),
							onReleaseRequested: (0, vue.unref)(onCloseRequested)
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", (0, vue.mergeProps)({
								ref_key: "drawerRef",
								ref: drawerRef,
								"aria-modal": "true",
								"aria-label": __props.title || void 0,
								"aria-labelledby": !__props.title ? (0, vue.unref)(titleId) : void 0,
								"aria-describedby": (0, vue.unref)(bodyId)
							}, _ctx.$attrs, {
								class: [
									(0, vue.unref)(ns).b(),
									__props.direction,
									(0, vue.unref)(visible) && "open",
									(0, vue.unref)(ns).is("dragging", (0, vue.unref)(isResizing))
								],
								style: { [(0, vue.unref)(isHorizontal) ? "width" : "height"]: (0, vue.unref)(size) },
								role: "dialog",
								onClick: _cache[1] || (_cache[1] = (0, vue.withModifiers)(() => {}, ["stop"]))
							}), [
								(0, vue.createElementVNode)("span", {
									ref_key: "focusStartRef",
									ref: focusStartRef,
									class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("sr-focus")),
									tabindex: "-1"
								}, null, 2),
								__props.withHeader ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("header", {
									key: 0,
									class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("header"), __props.headerClass])
								}, [!_ctx.$slots.title ? (0, vue.renderSlot)(_ctx.$slots, "header", {
									key: 0,
									close: (0, vue.unref)(handleClose),
									titleId: (0, vue.unref)(titleId),
									titleClass: (0, vue.unref)(ns).e("title")
								}, () => [(0, vue.createElementVNode)("span", {
									id: (0, vue.unref)(titleId),
									role: "heading",
									"aria-level": __props.headerAriaLevel,
									class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title"))
								}, (0, vue.toDisplayString)(__props.title), 11, _hoisted_2)]) : (0, vue.renderSlot)(_ctx.$slots, "title", { key: 1 }, () => [(0, vue.createCommentVNode)(" DEPRECATED SLOT ")]), __props.showClose ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
									key: 2,
									"aria-label": (0, vue.unref)(t)("el.drawer.close"),
									class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("close-btn")),
									type: "button",
									onClick: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleClose) && (0, vue.unref)(handleClose)(...args))
								}, [(0, vue.createVNode)((0, vue.unref)(require_index$4.ElIcon), { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("close")) }, {
									default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Close))]),
									_: 1
								}, 8, ["class"])], 10, _hoisted_3)) : (0, vue.createCommentVNode)("v-if", true)], 2)) : (0, vue.createCommentVNode)("v-if", true),
								(0, vue.unref)(rendered) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
									key: 1,
									id: (0, vue.unref)(bodyId),
									class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("body"), __props.bodyClass])
								}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 10, _hoisted_4)) : (0, vue.createCommentVNode)("v-if", true),
								_ctx.$slots.footer ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
									key: 2,
									class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("footer"), __props.footerClass])
								}, [(0, vue.renderSlot)(_ctx.$slots, "footer")], 2)) : (0, vue.createCommentVNode)("v-if", true),
								__props.resizable ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
									key: 3,
									ref_key: "draggerRef",
									ref: draggerRef,
									style: (0, vue.normalizeStyle)({ zIndex: (0, vue.unref)(zIndex) }),
									class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("dragger"))
								}, null, 6)) : (0, vue.createCommentVNode)("v-if", true)
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
					]), [[vue.vShow, (0, vue.unref)(visible)]])]),
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
exports.default = drawer_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=drawer.vue_vue_type_script_setup_true_lang.js.map
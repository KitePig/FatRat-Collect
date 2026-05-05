const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_refs = require('../../../utils/vue/refs.js');
const require_index = require('../../../hooks/use-draggable/index.js');
const require_index$1 = require('../../../hooks/use-locale/index.js');
const require_index$2 = require('../../icon/index.js');
const require_tokens = require('../../focus-trap/src/tokens.js');
const require_dialog_content = require('./dialog-content.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/dialog/src/dialog-content.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-level"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["id"];
var dialog_content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElDialogContent",
	__name: "dialog-content",
	props: require_dialog_content.dialogContentProps,
	emits: require_dialog_content.dialogContentEmits,
	setup(__props, { expose: __expose }) {
		const { t } = require_index$1.useLocale();
		const { Close } = require_icon.CloseComponents;
		const props = __props;
		const { dialogRef, headerRef, bodyId, ns, style } = (0, vue.inject)(require_constants.dialogInjectionKey);
		const { focusTrapRef } = (0, vue.inject)(require_tokens.FOCUS_TRAP_INJECTION_KEY);
		const composedDialogRef = require_refs.composeRefs(focusTrapRef, dialogRef);
		const draggable = (0, vue.computed)(() => !!props.draggable);
		const { resetPosition, updatePosition, isDragging } = require_index.useDraggable(dialogRef, headerRef, draggable, (0, vue.computed)(() => !!props.overflow));
		const dialogKls = (0, vue.computed)(() => [
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref: (0, vue.unref)(composedDialogRef),
				class: (0, vue.normalizeClass)(dialogKls.value),
				style: (0, vue.normalizeStyle)((0, vue.unref)(style)),
				tabindex: "-1"
			}, [
				(0, vue.createElementVNode)("header", {
					ref_key: "headerRef",
					ref: headerRef,
					class: (0, vue.normalizeClass)([
						(0, vue.unref)(ns).e("header"),
						__props.headerClass,
						{ "show-close": __props.showClose }
					])
				}, [(0, vue.renderSlot)(_ctx.$slots, "header", {}, () => [(0, vue.createElementVNode)("span", {
					role: "heading",
					"aria-level": __props.ariaLevel,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title"))
				}, (0, vue.toDisplayString)(__props.title), 11, _hoisted_1)]), __props.showClose ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
					key: 0,
					"aria-label": (0, vue.unref)(t)("el.dialog.close"),
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("headerbtn")),
					type: "button",
					onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
				}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("close")) }, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.closeIcon || (0, vue.unref)(Close))))]),
					_: 1
				}, 8, ["class"])], 10, _hoisted_2)) : (0, vue.createCommentVNode)("v-if", true)], 2),
				(0, vue.createElementVNode)("div", {
					id: (0, vue.unref)(bodyId),
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("body"), __props.bodyClass])
				}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 10, _hoisted_3),
				_ctx.$slots.footer ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("footer", {
					key: 0,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("footer"), __props.footerClass])
				}, [(0, vue.renderSlot)(_ctx.$slots, "footer")], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 6);
		};
	}
});

//#endregion
exports.default = dialog_content_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=dialog-content.vue_vue_type_script_setup_true_lang.js.map
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_index_vue_vue_type_script_lang = require('./index.vue_vue_type_script_lang.js');
let vue = require("vue");

//#region ../../packages/components/message-box/src/index.vue
const _hoisted_1 = ["aria-label", "aria-describedby"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["id"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_icon = (0, vue.resolveComponent)("el-icon");
	const _component_el_input = (0, vue.resolveComponent)("el-input");
	const _component_el_button = (0, vue.resolveComponent)("el-button");
	const _component_el_focus_trap = (0, vue.resolveComponent)("el-focus-trap");
	const _component_el_overlay = (0, vue.resolveComponent)("el-overlay");
	return (0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
		name: "fade-in-linear",
		onAfterLeave: _cache[11] || (_cache[11] = ($event) => _ctx.$emit("vanish")),
		persisted: ""
	}, {
		default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createVNode)(_component_el_overlay, {
			"z-index": _ctx.zIndex,
			"overlay-class": [_ctx.ns.is("message-box"), _ctx.modalClass],
			mask: _ctx.modal
		}, {
			default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
				role: "dialog",
				"aria-label": _ctx.title,
				"aria-modal": "true",
				"aria-describedby": !_ctx.showInput ? _ctx.contentId : void 0,
				class: (0, vue.normalizeClass)(`${_ctx.ns.namespace.value}-overlay-message-box`),
				onClick: _cache[8] || (_cache[8] = (...args) => _ctx.overlayEvent.onClick && _ctx.overlayEvent.onClick(...args)),
				onMousedown: _cache[9] || (_cache[9] = (...args) => _ctx.overlayEvent.onMousedown && _ctx.overlayEvent.onMousedown(...args)),
				onMouseup: _cache[10] || (_cache[10] = (...args) => _ctx.overlayEvent.onMouseup && _ctx.overlayEvent.onMouseup(...args))
			}, [(0, vue.createVNode)(_component_el_focus_trap, {
				loop: "",
				trapped: _ctx.visible,
				"focus-trap-el": _ctx.rootRef,
				"focus-start-el": _ctx.focusStartRef,
				onReleaseRequested: _ctx.onCloseRequested
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
					ref: "rootRef",
					class: (0, vue.normalizeClass)([
						_ctx.ns.b(),
						_ctx.customClass,
						_ctx.ns.is("draggable", _ctx.draggable),
						_ctx.ns.is("dragging", _ctx.isDragging),
						{ [_ctx.ns.m("center")]: _ctx.center }
					]),
					style: (0, vue.normalizeStyle)(_ctx.customStyle),
					tabindex: "-1",
					onClick: _cache[7] || (_cache[7] = (0, vue.withModifiers)(() => {}, ["stop"]))
				}, [
					_ctx.title !== null && _ctx.title !== void 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						ref: "headerRef",
						class: (0, vue.normalizeClass)([_ctx.ns.e("header"), { "show-close": _ctx.showClose }])
					}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(_ctx.ns.e("title")) }, [_ctx.iconComponent && _ctx.center ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_icon, {
						key: 0,
						class: (0, vue.normalizeClass)([_ctx.ns.e("status"), _ctx.typeClass])
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.iconComponent)))]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(_ctx.title), 1)], 2), _ctx.showClose ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
						key: 0,
						type: "button",
						class: (0, vue.normalizeClass)(_ctx.ns.e("headerbtn")),
						"aria-label": _ctx.t("el.messagebox.close"),
						onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel")),
						onKeydown: _cache[1] || (_cache[1] = (0, vue.withKeys)((0, vue.withModifiers)(($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel"), ["prevent"]), ["enter"]))
					}, [(0, vue.createVNode)(_component_el_icon, { class: (0, vue.normalizeClass)(_ctx.ns.e("close")) }, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.closeIcon || "close")))]),
						_: 1
					}, 8, ["class"])], 42, _hoisted_2)) : (0, vue.createCommentVNode)("v-if", true)], 2)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createElementVNode)("div", {
						id: _ctx.contentId,
						class: (0, vue.normalizeClass)(_ctx.ns.e("content"))
					}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(_ctx.ns.e("container")) }, [_ctx.iconComponent && !_ctx.center && _ctx.hasMessage ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_icon, {
						key: 0,
						class: (0, vue.normalizeClass)([_ctx.ns.e("status"), _ctx.typeClass])
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.iconComponent)))]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true), _ctx.hasMessage ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 1,
						class: (0, vue.normalizeClass)(_ctx.ns.e("message"))
					}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [!_ctx.dangerouslyUseHTMLString ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.showInput ? "label" : "p"), {
						key: 0,
						for: _ctx.showInput ? _ctx.inputId : void 0,
						textContent: (0, vue.toDisplayString)(_ctx.message)
					}, null, 8, ["for", "textContent"])) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.showInput ? "label" : "p"), {
						key: 1,
						for: _ctx.showInput ? _ctx.inputId : void 0,
						innerHTML: _ctx.message
					}, null, 8, ["for", "innerHTML"]))])], 2)) : (0, vue.createCommentVNode)("v-if", true)], 2), (0, vue.withDirectives)((0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(_ctx.ns.e("input")) }, [(0, vue.createVNode)(_component_el_input, {
						id: _ctx.inputId,
						ref: "inputRef",
						modelValue: _ctx.inputValue,
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputValue = $event),
						type: _ctx.inputType,
						placeholder: _ctx.inputPlaceholder,
						"aria-invalid": _ctx.validateError,
						class: (0, vue.normalizeClass)({ invalid: _ctx.validateError }),
						onKeydown: (0, vue.withKeys)(_ctx.handleInputEnter, ["enter"])
					}, null, 8, [
						"id",
						"modelValue",
						"type",
						"placeholder",
						"aria-invalid",
						"class",
						"onKeydown"
					]), (0, vue.createElementVNode)("div", {
						class: (0, vue.normalizeClass)(_ctx.ns.e("errormsg")),
						style: (0, vue.normalizeStyle)({ visibility: !!_ctx.editorErrorMessage ? "visible" : "hidden" })
					}, (0, vue.toDisplayString)(_ctx.editorErrorMessage), 7)], 2), [[vue.vShow, _ctx.showInput]])], 10, _hoisted_3),
					(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(_ctx.ns.e("btns")) }, [_ctx.showCancelButton ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_button, {
						key: 0,
						type: _ctx.cancelButtonType === "text" ? "" : _ctx.cancelButtonType,
						text: _ctx.cancelButtonType === "text",
						loading: _ctx.cancelButtonLoading,
						"loading-icon": _ctx.cancelButtonLoadingIcon,
						class: (0, vue.normalizeClass)([_ctx.cancelButtonClass]),
						round: _ctx.roundButton,
						size: _ctx.btnSize,
						onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleAction("cancel")),
						onKeydown: _cache[4] || (_cache[4] = (0, vue.withKeys)((0, vue.withModifiers)(($event) => _ctx.handleAction("cancel"), ["prevent"]), ["enter"]))
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)(_ctx.cancelButtonText || _ctx.t("el.messagebox.cancel")), 1)]),
						_: 1
					}, 8, [
						"type",
						"text",
						"loading",
						"loading-icon",
						"class",
						"round",
						"size"
					])) : (0, vue.createCommentVNode)("v-if", true), (0, vue.withDirectives)((0, vue.createVNode)(_component_el_button, {
						ref: "confirmRef",
						type: _ctx.confirmButtonType === "text" ? "" : _ctx.confirmButtonType,
						text: _ctx.confirmButtonType === "text",
						loading: _ctx.confirmButtonLoading,
						"loading-icon": _ctx.confirmButtonLoadingIcon,
						class: (0, vue.normalizeClass)([_ctx.confirmButtonClasses]),
						round: _ctx.roundButton,
						disabled: _ctx.confirmButtonDisabled,
						size: _ctx.btnSize,
						onClick: _cache[5] || (_cache[5] = ($event) => _ctx.handleAction("confirm")),
						onKeydown: _cache[6] || (_cache[6] = (0, vue.withKeys)((0, vue.withModifiers)(($event) => _ctx.handleAction("confirm"), ["prevent"]), ["enter"]))
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)(_ctx.confirmButtonText || _ctx.t("el.messagebox.confirm")), 1)]),
						_: 1
					}, 8, [
						"type",
						"text",
						"loading",
						"loading-icon",
						"class",
						"round",
						"disabled",
						"size"
					]), [[vue.vShow, _ctx.showConfirmButton]])], 2)
				], 6)]),
				_: 3
			}, 8, [
				"trapped",
				"focus-trap-el",
				"focus-start-el",
				"onReleaseRequested"
			])], 42, _hoisted_1)]),
			_: 3
		}, 8, [
			"z-index",
			"overlay-class",
			"mask"
		]), [[vue.vShow, _ctx.visible]])]),
		_: 3
	});
}
var src_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_index_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = src_default;
//# sourceMappingURL=index.js.map
import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import dropdown_vue_vue_type_script_lang_default from "./dropdown.vue_vue_type_script_lang.mjs";
import { createBlock, createCommentVNode, createElementBlock, createSlots, createVNode, mergeProps, normalizeClass, openBlock, renderSlot, resolveComponent, withCtx } from "vue";

//#region ../../packages/components/dropdown/src/dropdown.vue
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_roving_focus_group = resolveComponent("el-roving-focus-group");
	const _component_el_scrollbar = resolveComponent("el-scrollbar");
	const _component_el_only_child = resolveComponent("el-only-child");
	const _component_el_tooltip = resolveComponent("el-tooltip");
	const _component_el_button = resolveComponent("el-button");
	const _component_arrow_down = resolveComponent("arrow-down");
	const _component_el_icon = resolveComponent("el-icon");
	const _component_el_button_group = resolveComponent("el-button-group");
	return openBlock(), createElementBlock("div", { class: normalizeClass([_ctx.ns.b(), _ctx.ns.is("disabled", _ctx.disabled)]) }, [createVNode(_component_el_tooltip, {
		ref: "popperRef",
		role: _ctx.role,
		effect: _ctx.effect,
		"fallback-placements": ["bottom", "top"],
		"popper-options": _ctx.popperOptions,
		"gpu-acceleration": false,
		placement: _ctx.placement,
		"popper-class": [_ctx.ns.e("popper"), _ctx.popperClass],
		"popper-style": _ctx.popperStyle,
		trigger: _ctx.trigger,
		"trigger-keys": _ctx.triggerKeys,
		"trigger-target-el": _ctx.contentRef,
		"show-arrow": _ctx.showArrow,
		"show-after": _ctx.trigger === "hover" ? _ctx.showTimeout : 0,
		"hide-after": _ctx.trigger === "hover" ? _ctx.hideTimeout : 0,
		"virtual-ref": _ctx.virtualRef ?? _ctx.triggeringElementRef,
		"virtual-triggering": _ctx.virtualTriggering || _ctx.splitButton,
		disabled: _ctx.disabled,
		transition: `${_ctx.ns.namespace.value}-zoom-in-top`,
		teleported: _ctx.teleported,
		"append-to": _ctx.appendTo,
		pure: "",
		"focus-on-target": "",
		persistent: _ctx.persistent,
		onBeforeShow: _ctx.handleBeforeShowTooltip,
		onShow: _ctx.handleShowTooltip,
		onBeforeHide: _ctx.handleBeforeHideTooltip
	}, createSlots({
		content: withCtx(() => [createVNode(_component_el_scrollbar, {
			ref: "scrollbar",
			"wrap-style": _ctx.wrapStyle,
			tag: "div",
			"view-class": _ctx.ns.e("list")
		}, {
			default: withCtx(() => [createVNode(_component_el_roving_focus_group, {
				loop: _ctx.loop,
				"current-tab-id": _ctx.currentTabId,
				orientation: "horizontal",
				onCurrentTabIdChange: _ctx.handleCurrentTabIdChange
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "dropdown")]),
				_: 3
			}, 8, [
				"loop",
				"current-tab-id",
				"onCurrentTabIdChange"
			])]),
			_: 3
		}, 8, ["wrap-style", "view-class"])]),
		_: 2
	}, [!_ctx.splitButton ? {
		name: "default",
		fn: withCtx(() => [createVNode(_component_el_only_child, {
			id: _ctx.triggerId,
			ref: "triggeringElementRef",
			role: "button",
			tabindex: _ctx.tabindex
		}, {
			default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
			_: 3
		}, 8, ["id", "tabindex"])]),
		key: "0"
	} : void 0]), 1032, [
		"role",
		"effect",
		"popper-options",
		"placement",
		"popper-class",
		"popper-style",
		"trigger",
		"trigger-keys",
		"trigger-target-el",
		"show-arrow",
		"show-after",
		"hide-after",
		"virtual-ref",
		"virtual-triggering",
		"disabled",
		"transition",
		"teleported",
		"append-to",
		"persistent",
		"onBeforeShow",
		"onShow",
		"onBeforeHide"
	]), _ctx.splitButton ? (openBlock(), createBlock(_component_el_button_group, { key: 0 }, {
		default: withCtx(() => [createVNode(_component_el_button, mergeProps({ ref: "referenceElementRef" }, _ctx.buttonProps, {
			size: _ctx.dropdownSize,
			type: _ctx.type,
			disabled: _ctx.disabled,
			tabindex: _ctx.tabindex,
			onClick: _ctx.handlerMainButtonClick
		}), {
			default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
			_: 3
		}, 16, [
			"size",
			"type",
			"disabled",
			"tabindex",
			"onClick"
		]), createVNode(_component_el_button, mergeProps({
			id: _ctx.triggerId,
			ref: "triggeringElementRef"
		}, _ctx.buttonProps, {
			role: "button",
			size: _ctx.dropdownSize,
			type: _ctx.type,
			class: _ctx.ns.e("caret-button"),
			disabled: _ctx.disabled,
			tabindex: _ctx.tabindex,
			"aria-label": _ctx.t("el.dropdown.toggleDropdown")
		}), {
			default: withCtx(() => [createVNode(_component_el_icon, { class: normalizeClass(_ctx.ns.e("icon")) }, {
				default: withCtx(() => [createVNode(_component_arrow_down)]),
				_: 1
			}, 8, ["class"])]),
			_: 1
		}, 16, [
			"id",
			"size",
			"type",
			"class",
			"disabled",
			"tabindex",
			"aria-label"
		])]),
		_: 3
	})) : createCommentVNode("v-if", true)], 2);
}
var dropdown_default = /* @__PURE__ */ _plugin_vue_export_helper_default(dropdown_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { dropdown_default as default };
//# sourceMappingURL=dropdown2.mjs.map
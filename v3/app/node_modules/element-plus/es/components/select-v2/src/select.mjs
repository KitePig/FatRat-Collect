import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import select_vue_vue_type_script_lang_default from "./select.vue_vue_type_script_lang.mjs";
import { Fragment, createBlock, createCommentVNode, createElementBlock, createElementVNode, createSlots, createTextVNode, createVNode, guardReactiveProps, normalizeClass, normalizeProps, normalizeStyle, openBlock, renderList, renderSlot, resolveComponent, resolveDirective, resolveDynamicComponent, toDisplayString, vShow, withCtx, withDirectives, withKeys, withModifiers } from "vue";

//#region ../../packages/components/select-v2/src/select.vue
const _hoisted_1 = [
	"id",
	"value",
	"autocomplete",
	"tabindex",
	"aria-expanded",
	"aria-label",
	"disabled",
	"aria-controls",
	"aria-activedescendant",
	"readonly",
	"name"
];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_tag = resolveComponent("el-tag");
	const _component_el_tooltip = resolveComponent("el-tooltip");
	const _component_el_icon = resolveComponent("el-icon");
	const _component_el_select_menu = resolveComponent("el-select-menu");
	const _directive_click_outside = resolveDirective("click-outside");
	return withDirectives((openBlock(), createElementBlock("div", {
		ref: "selectRef",
		class: normalizeClass([_ctx.nsSelect.b(), _ctx.nsSelect.m(_ctx.selectSize)]),
		onMouseenter: _cache[15] || (_cache[15] = ($event) => _ctx.states.inputHovering = true),
		onMouseleave: _cache[16] || (_cache[16] = ($event) => _ctx.states.inputHovering = false)
	}, [createVNode(_component_el_tooltip, {
		ref: "tooltipRef",
		visible: _ctx.dropdownMenuVisible,
		teleported: _ctx.teleported,
		"popper-class": [_ctx.nsSelect.e("popper"), _ctx.popperClass],
		"popper-style": _ctx.popperStyle,
		"gpu-acceleration": false,
		"stop-popper-mouse-event": false,
		"popper-options": _ctx.popperOptions,
		"fallback-placements": _ctx.fallbackPlacements,
		effect: _ctx.effect,
		placement: _ctx.placement,
		pure: "",
		transition: `${_ctx.nsSelect.namespace.value}-zoom-in-top`,
		trigger: "click",
		persistent: _ctx.persistent,
		"append-to": _ctx.appendTo,
		"show-arrow": _ctx.showArrow,
		offset: _ctx.offset,
		onBeforeShow: _ctx.handleMenuEnter,
		onHide: _cache[14] || (_cache[14] = ($event) => _ctx.states.isBeforeHide = false)
	}, {
		default: withCtx(() => [createElementVNode("div", {
			ref: "wrapperRef",
			class: normalizeClass([
				_ctx.nsSelect.e("wrapper"),
				_ctx.nsSelect.is("focused", _ctx.isFocused),
				_ctx.nsSelect.is("hovering", _ctx.states.inputHovering),
				_ctx.nsSelect.is("filterable", _ctx.filterable),
				_ctx.nsSelect.is("disabled", _ctx.selectDisabled)
			]),
			onClick: _cache[11] || (_cache[11] = withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["prevent"]))
		}, [
			_ctx.$slots.prefix ? (openBlock(), createElementBlock("div", {
				key: 0,
				ref: "prefixRef",
				class: normalizeClass(_ctx.nsSelect.e("prefix"))
			}, [renderSlot(_ctx.$slots, "prefix")], 2)) : createCommentVNode("v-if", true),
			createElementVNode("div", {
				ref: "selectionRef",
				class: normalizeClass([_ctx.nsSelect.e("selection"), _ctx.nsSelect.is("near", _ctx.multiple && !_ctx.$slots.prefix && !!_ctx.modelValue.length)])
			}, [
				_ctx.multiple ? renderSlot(_ctx.$slots, "tag", {
					key: 0,
					data: _ctx.states.cachedOptions,
					deleteTag: _ctx.deleteTag,
					selectDisabled: _ctx.selectDisabled
				}, () => [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.showTagList, (item) => {
					return openBlock(), createElementBlock("div", {
						key: _ctx.getValueKey(_ctx.getValue(item)),
						class: normalizeClass(_ctx.nsSelect.e("selected-item"))
					}, [createVNode(_component_el_tag, {
						closable: !_ctx.selectDisabled && !_ctx.getDisabled(item),
						size: _ctx.collapseTagSize,
						type: _ctx.tagType,
						effect: _ctx.tagEffect,
						"disable-transitions": "",
						style: normalizeStyle(_ctx.tagStyle),
						onClose: ($event) => _ctx.deleteTag($event, item)
					}, {
						default: withCtx(() => [createElementVNode("span", { class: normalizeClass(_ctx.nsSelect.e("tags-text")) }, [renderSlot(_ctx.$slots, "label", {
							index: _ctx.getIndex(item),
							label: _ctx.getLabel(item),
							value: _ctx.getValue(item)
						}, () => [createTextVNode(toDisplayString(_ctx.getLabel(item)), 1)])], 2)]),
						_: 2
					}, 1032, [
						"closable",
						"size",
						"type",
						"effect",
						"style",
						"onClose"
					])], 2);
				}), 128)), _ctx.collapseTags && _ctx.states.cachedOptions.length > _ctx.maxCollapseTags ? (openBlock(), createBlock(_component_el_tooltip, {
					key: 0,
					ref: "tagTooltipRef",
					disabled: _ctx.dropdownMenuVisible || !_ctx.collapseTagsTooltip,
					"fallback-placements": _ctx.tagTooltip?.fallbackPlacements ?? [
						"bottom",
						"top",
						"right",
						"left"
					],
					effect: _ctx.tagTooltip?.effect ?? _ctx.effect,
					placement: _ctx.tagTooltip?.placement ?? "bottom",
					"popper-class": _ctx.tagTooltip?.popperClass ?? _ctx.popperClass,
					"popper-style": _ctx.tagTooltip?.popperStyle ?? _ctx.popperStyle,
					teleported: _ctx.tagTooltip?.teleported ?? _ctx.teleported,
					"append-to": _ctx.tagTooltip?.appendTo ?? _ctx.appendTo,
					"popper-options": _ctx.tagTooltip?.popperOptions ?? _ctx.popperOptions,
					transition: _ctx.tagTooltip?.transition,
					"show-after": _ctx.tagTooltip?.showAfter,
					"hide-after": _ctx.tagTooltip?.hideAfter,
					"auto-close": _ctx.tagTooltip?.autoClose,
					offset: _ctx.tagTooltip?.offset
				}, {
					default: withCtx(() => [createElementVNode("div", {
						ref: "collapseItemRef",
						class: normalizeClass(_ctx.nsSelect.e("selected-item"))
					}, [createVNode(_component_el_tag, {
						closable: false,
						size: _ctx.collapseTagSize,
						type: _ctx.tagType,
						effect: _ctx.tagEffect,
						style: normalizeStyle(_ctx.collapseTagStyle),
						"disable-transitions": ""
					}, {
						default: withCtx(() => [createElementVNode("span", { class: normalizeClass(_ctx.nsSelect.e("tags-text")) }, " + " + toDisplayString(_ctx.states.cachedOptions.length - _ctx.maxCollapseTags), 3)]),
						_: 1
					}, 8, [
						"size",
						"type",
						"effect",
						"style"
					])], 2)]),
					content: withCtx(() => [createElementVNode("div", {
						ref: "tagMenuRef",
						class: normalizeClass(_ctx.nsSelect.e("selection"))
					}, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.collapseTagList, (selected) => {
						return openBlock(), createElementBlock("div", {
							key: _ctx.getValueKey(_ctx.getValue(selected)),
							class: normalizeClass(_ctx.nsSelect.e("selected-item"))
						}, [createVNode(_component_el_tag, {
							class: "in-tooltip",
							closable: !_ctx.selectDisabled && !_ctx.getDisabled(selected),
							size: _ctx.collapseTagSize,
							type: _ctx.tagType,
							effect: _ctx.tagEffect,
							"disable-transitions": "",
							onClose: ($event) => _ctx.deleteTag($event, selected)
						}, {
							default: withCtx(() => [createElementVNode("span", { class: normalizeClass(_ctx.nsSelect.e("tags-text")) }, [renderSlot(_ctx.$slots, "label", {
								index: _ctx.getIndex(selected),
								label: _ctx.getLabel(selected),
								value: _ctx.getValue(selected)
							}, () => [createTextVNode(toDisplayString(_ctx.getLabel(selected)), 1)])], 2)]),
							_: 2
						}, 1032, [
							"closable",
							"size",
							"type",
							"effect",
							"onClose"
						])], 2);
					}), 128))], 2)]),
					_: 3
				}, 8, [
					"disabled",
					"fallback-placements",
					"effect",
					"placement",
					"popper-class",
					"popper-style",
					"teleported",
					"append-to",
					"popper-options",
					"transition",
					"show-after",
					"hide-after",
					"auto-close",
					"offset"
				])) : createCommentVNode("v-if", true)]) : createCommentVNode("v-if", true),
				createElementVNode("div", { class: normalizeClass([
					_ctx.nsSelect.e("selected-item"),
					_ctx.nsSelect.e("input-wrapper"),
					_ctx.nsSelect.is("hidden", !_ctx.filterable || _ctx.selectDisabled || !_ctx.states.inputValue && !_ctx.isFocused)
				]) }, [createElementVNode("input", {
					id: _ctx.inputId,
					ref: "inputRef",
					value: _ctx.states.inputValue,
					style: normalizeStyle(_ctx.inputStyle),
					autocomplete: _ctx.autocomplete,
					tabindex: _ctx.tabindex,
					"aria-autocomplete": "none",
					"aria-haspopup": "listbox",
					autocapitalize: "off",
					"aria-expanded": _ctx.expanded,
					"aria-label": _ctx.ariaLabel,
					class: normalizeClass([_ctx.nsSelect.e("input"), _ctx.nsSelect.is(_ctx.selectSize)]),
					disabled: _ctx.selectDisabled,
					role: "combobox",
					"aria-controls": _ctx.contentId,
					"aria-activedescendant": _ctx.states.hoveringIndex >= 0 ? `${_ctx.contentId}-${_ctx.states.hoveringIndex}` : "",
					readonly: !_ctx.filterable,
					spellcheck: "false",
					type: "text",
					name: _ctx.name,
					onInput: _cache[0] || (_cache[0] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
					onChange: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
					onCompositionstart: _cache[2] || (_cache[2] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
					onCompositionupdate: _cache[3] || (_cache[3] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
					onCompositionend: _cache[4] || (_cache[4] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
					onKeydown: [
						_cache[5] || (_cache[5] = withKeys(withModifiers(($event) => _ctx.onKeyboardNavigate("backward"), ["stop", "prevent"]), ["up"])),
						_cache[6] || (_cache[6] = withKeys(withModifiers(($event) => _ctx.onKeyboardNavigate("forward"), ["stop", "prevent"]), ["down"])),
						_cache[7] || (_cache[7] = withKeys(withModifiers((...args) => _ctx.onKeyboardSelect && _ctx.onKeyboardSelect(...args), ["stop", "prevent"]), ["enter"])),
						_cache[8] || (_cache[8] = withKeys(withModifiers((...args) => _ctx.handleEsc && _ctx.handleEsc(...args), ["stop", "prevent"]), ["esc"])),
						_cache[9] || (_cache[9] = withKeys(withModifiers((...args) => _ctx.handleDel && _ctx.handleDel(...args), ["stop"]), ["delete"]))
					],
					onClick: _cache[10] || (_cache[10] = withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["stop"]))
				}, null, 46, _hoisted_1), _ctx.filterable ? (openBlock(), createElementBlock("span", {
					key: 0,
					ref: "calculatorRef",
					"aria-hidden": "true",
					class: normalizeClass(_ctx.nsSelect.e("input-calculator")),
					textContent: toDisplayString(_ctx.states.inputValue)
				}, null, 10, _hoisted_2)) : createCommentVNode("v-if", true)], 2),
				_ctx.shouldShowPlaceholder ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass([
						_ctx.nsSelect.e("selected-item"),
						_ctx.nsSelect.e("placeholder"),
						_ctx.nsSelect.is("transparent", !_ctx.hasModelValue || _ctx.expanded && !_ctx.states.inputValue)
					])
				}, [_ctx.hasModelValue ? renderSlot(_ctx.$slots, "label", {
					key: 0,
					index: _ctx.allOptionsValueMap.get(_ctx.modelValue)?.index ?? -1,
					label: _ctx.currentPlaceholder,
					value: _ctx.modelValue
				}, () => [createElementVNode("span", null, toDisplayString(_ctx.currentPlaceholder), 1)]) : (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(_ctx.currentPlaceholder), 1))], 2)) : createCommentVNode("v-if", true)
			], 2),
			createElementVNode("div", {
				ref: "suffixRef",
				class: normalizeClass(_ctx.nsSelect.e("suffix"))
			}, [
				_ctx.iconComponent ? withDirectives((openBlock(), createBlock(_component_el_icon, {
					key: 0,
					class: normalizeClass([
						_ctx.nsSelect.e("caret"),
						_ctx.nsInput.e("icon"),
						_ctx.iconReverse
					])
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.iconComponent)))]),
					_: 1
				}, 8, ["class"])), [[vShow, !_ctx.showClearBtn]]) : createCommentVNode("v-if", true),
				_ctx.showClearBtn && _ctx.clearIcon ? (openBlock(), createBlock(_component_el_icon, {
					key: 1,
					class: normalizeClass([
						_ctx.nsSelect.e("caret"),
						_ctx.nsInput.e("icon"),
						_ctx.nsSelect.e("clear")
					]),
					onClick: withModifiers(_ctx.handleClear, ["prevent", "stop"])
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.clearIcon)))]),
					_: 1
				}, 8, ["class", "onClick"])) : createCommentVNode("v-if", true),
				_ctx.validateState && _ctx.validateIcon && _ctx.needStatusIcon ? (openBlock(), createBlock(_component_el_icon, {
					key: 2,
					class: normalizeClass([
						_ctx.nsInput.e("icon"),
						_ctx.nsInput.e("validateIcon"),
						_ctx.nsInput.is("loading", _ctx.validateState === "validating")
					])
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.validateIcon)))]),
					_: 1
				}, 8, ["class"])) : createCommentVNode("v-if", true)
			], 2)
		], 2)]),
		content: withCtx(() => [createVNode(_component_el_select_menu, {
			id: _ctx.contentId,
			ref: "menuRef",
			data: _ctx.filteredOptions,
			width: _ctx.popperSize - _ctx.BORDER_HORIZONTAL_WIDTH,
			"hovering-index": _ctx.states.hoveringIndex,
			"scrollbar-always-on": _ctx.scrollbarAlwaysOn,
			"aria-label": _ctx.ariaLabel
		}, createSlots({
			default: withCtx((scope) => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(scope)))]),
			_: 2
		}, [
			_ctx.$slots.header ? {
				name: "header",
				fn: withCtx(() => [createElementVNode("div", {
					class: normalizeClass(_ctx.nsSelect.be("dropdown", "header")),
					onClick: _cache[12] || (_cache[12] = withModifiers(() => {}, ["stop"]))
				}, [renderSlot(_ctx.$slots, "header")], 2)]),
				key: "0"
			} : void 0,
			_ctx.$slots.loading && _ctx.loading ? {
				name: "loading",
				fn: withCtx(() => [createElementVNode("div", { class: normalizeClass(_ctx.nsSelect.be("dropdown", "loading")) }, [renderSlot(_ctx.$slots, "loading")], 2)]),
				key: "1"
			} : _ctx.loading || _ctx.filteredOptions.length === 0 ? {
				name: "empty",
				fn: withCtx(() => [createElementVNode("div", { class: normalizeClass(_ctx.nsSelect.be("dropdown", "empty")) }, [renderSlot(_ctx.$slots, "empty", {}, () => [createElementVNode("span", null, toDisplayString(_ctx.emptyText), 1)])], 2)]),
				key: "2"
			} : void 0,
			_ctx.$slots.footer ? {
				name: "footer",
				fn: withCtx(() => [createElementVNode("div", {
					class: normalizeClass(_ctx.nsSelect.be("dropdown", "footer")),
					onClick: _cache[13] || (_cache[13] = withModifiers(() => {}, ["stop"]))
				}, [renderSlot(_ctx.$slots, "footer")], 2)]),
				key: "3"
			} : void 0
		]), 1032, [
			"id",
			"data",
			"width",
			"hovering-index",
			"scrollbar-always-on",
			"aria-label"
		])]),
		_: 3
	}, 8, [
		"visible",
		"teleported",
		"popper-class",
		"popper-style",
		"popper-options",
		"fallback-placements",
		"effect",
		"placement",
		"transition",
		"persistent",
		"append-to",
		"show-arrow",
		"offset",
		"onBeforeShow"
	])], 34)), [[
		_directive_click_outside,
		_ctx.handleClickOutside,
		_ctx.popperRef
	]]);
}
var select_default = /* @__PURE__ */ _plugin_vue_export_helper_default(select_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { select_default as default };
//# sourceMappingURL=select.mjs.map
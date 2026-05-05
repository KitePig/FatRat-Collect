import _plugin_vue_export_helper_default from "../../../_virtual/_plugin-vue_export-helper.mjs";
import select_vue_vue_type_script_lang_default from "./select.vue_vue_type_script_lang.mjs";
import { Fragment, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, mergeProps, normalizeClass, normalizeStyle, openBlock, renderList, renderSlot, resolveComponent, resolveDirective, resolveDynamicComponent, toDisplayString, toHandlerKey, vShow, withCtx, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/select/src/select.vue
const _hoisted_1 = [
	"id",
	"value",
	"name",
	"disabled",
	"autocomplete",
	"tabindex",
	"readonly",
	"aria-activedescendant",
	"aria-controls",
	"aria-expanded",
	"aria-label"
];
const _hoisted_2 = ["textContent"];
const _hoisted_3 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_el_tag = resolveComponent("el-tag");
	const _component_el_tooltip = resolveComponent("el-tooltip");
	const _component_el_icon = resolveComponent("el-icon");
	const _component_el_option = resolveComponent("el-option");
	const _component_el_option_group = resolveComponent("el-option-group");
	const _component_el_options = resolveComponent("el-options");
	const _component_el_scrollbar = resolveComponent("el-scrollbar");
	const _component_el_select_menu = resolveComponent("el-select-menu");
	const _directive_click_outside = resolveDirective("click-outside");
	return withDirectives((openBlock(), createElementBlock("div", mergeProps({
		ref: "selectRef",
		class: [_ctx.nsSelect.b(), _ctx.nsSelect.m(_ctx.selectSize)]
	}, { [toHandlerKey(_ctx.mouseEnterEventName)]: _cache[11] || (_cache[11] = ($event) => _ctx.states.inputHovering = true) }, { onMouseleave: _cache[12] || (_cache[12] = ($event) => _ctx.states.inputHovering = false) }), [createVNode(_component_el_tooltip, {
		ref: "tooltipRef",
		visible: _ctx.dropdownMenuVisible,
		placement: _ctx.placement,
		teleported: _ctx.teleported,
		"popper-class": [_ctx.nsSelect.e("popper"), _ctx.popperClass],
		"popper-style": _ctx.popperStyle,
		"popper-options": _ctx.popperOptions,
		"fallback-placements": _ctx.fallbackPlacements,
		effect: _ctx.effect,
		pure: "",
		trigger: "click",
		transition: `${_ctx.nsSelect.namespace.value}-zoom-in-top`,
		"stop-popper-mouse-event": false,
		"gpu-acceleration": false,
		persistent: _ctx.persistent,
		"append-to": _ctx.appendTo,
		"show-arrow": _ctx.showArrow,
		offset: _ctx.offset,
		onBeforeShow: _ctx.handleMenuEnter,
		onHide: _cache[10] || (_cache[10] = ($event) => _ctx.states.isBeforeHide = false)
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
			onClick: _cache[7] || (_cache[7] = withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["prevent"]))
		}, [
			_ctx.$slots.prefix ? (openBlock(), createElementBlock("div", {
				key: 0,
				ref: "prefixRef",
				class: normalizeClass(_ctx.nsSelect.e("prefix"))
			}, [renderSlot(_ctx.$slots, "prefix")], 2)) : createCommentVNode("v-if", true),
			createElementVNode("div", {
				ref: "selectionRef",
				class: normalizeClass([_ctx.nsSelect.e("selection"), _ctx.nsSelect.is("near", _ctx.multiple && !_ctx.$slots.prefix && !!_ctx.states.selected.length)])
			}, [
				_ctx.multiple ? renderSlot(_ctx.$slots, "tag", {
					key: 0,
					data: _ctx.states.selected,
					deleteTag: _ctx.deleteTag,
					selectDisabled: _ctx.selectDisabled
				}, () => [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.showTagList, (item) => {
					return openBlock(), createElementBlock("div", {
						key: _ctx.getValueKey(item),
						class: normalizeClass(_ctx.nsSelect.e("selected-item"))
					}, [createVNode(_component_el_tag, {
						closable: !_ctx.selectDisabled && !item.isDisabled,
						size: _ctx.collapseTagSize,
						type: _ctx.tagType,
						effect: _ctx.tagEffect,
						"disable-transitions": "",
						style: normalizeStyle(_ctx.tagStyle),
						onClose: ($event) => _ctx.deleteTag($event, item)
					}, {
						default: withCtx(() => [createElementVNode("span", { class: normalizeClass(_ctx.nsSelect.e("tags-text")) }, [renderSlot(_ctx.$slots, "label", {
							index: item.index,
							label: item.currentLabel,
							value: item.value
						}, () => [createTextVNode(toDisplayString(item.currentLabel), 1)])], 2)]),
						_: 2
					}, 1032, [
						"closable",
						"size",
						"type",
						"effect",
						"style",
						"onClose"
					])], 2);
				}), 128)), _ctx.collapseTags && _ctx.states.selected.length > _ctx.maxCollapseTags ? (openBlock(), createBlock(_component_el_tooltip, {
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
						"disable-transitions": "",
						style: normalizeStyle(_ctx.collapseTagStyle)
					}, {
						default: withCtx(() => [createElementVNode("span", { class: normalizeClass(_ctx.nsSelect.e("tags-text")) }, " + " + toDisplayString(_ctx.states.selected.length - _ctx.maxCollapseTags), 3)]),
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
					}, [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.collapseTagList, (item) => {
						return openBlock(), createElementBlock("div", {
							key: _ctx.getValueKey(item),
							class: normalizeClass(_ctx.nsSelect.e("selected-item"))
						}, [createVNode(_component_el_tag, {
							class: "in-tooltip",
							closable: !_ctx.selectDisabled && !item.isDisabled,
							size: _ctx.collapseTagSize,
							type: _ctx.tagType,
							effect: _ctx.tagEffect,
							"disable-transitions": "",
							onClose: ($event) => _ctx.deleteTag($event, item)
						}, {
							default: withCtx(() => [createElementVNode("span", { class: normalizeClass(_ctx.nsSelect.e("tags-text")) }, [renderSlot(_ctx.$slots, "label", {
								index: item.index,
								label: item.currentLabel,
								value: item.value
							}, () => [createTextVNode(toDisplayString(item.currentLabel), 1)])], 2)]),
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
					type: "text",
					name: _ctx.name,
					class: normalizeClass([_ctx.nsSelect.e("input"), _ctx.nsSelect.is(_ctx.selectSize)]),
					disabled: _ctx.selectDisabled,
					autocomplete: _ctx.autocomplete,
					style: normalizeStyle(_ctx.inputStyle),
					tabindex: _ctx.tabindex,
					role: "combobox",
					readonly: !_ctx.filterable,
					spellcheck: "false",
					"aria-activedescendant": _ctx.hoverOption?.id || "",
					"aria-controls": _ctx.contentId,
					"aria-expanded": _ctx.dropdownMenuVisible,
					"aria-label": _ctx.ariaLabel,
					"aria-autocomplete": "none",
					"aria-haspopup": "listbox",
					onKeydown: _cache[0] || (_cache[0] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args)),
					onCompositionstart: _cache[1] || (_cache[1] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
					onCompositionupdate: _cache[2] || (_cache[2] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
					onCompositionend: _cache[3] || (_cache[3] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
					onInput: _cache[4] || (_cache[4] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
					onChange: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"])),
					onClick: _cache[6] || (_cache[6] = withModifiers((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["stop"]))
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
					index: _ctx.getOption(_ctx.modelValue).index,
					label: _ctx.currentPlaceholder,
					value: _ctx.modelValue
				}, () => [createElementVNode("span", null, toDisplayString(_ctx.currentPlaceholder), 1)]) : (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(_ctx.currentPlaceholder), 1))], 2)) : createCommentVNode("v-if", true)
			], 2),
			createElementVNode("div", {
				ref: "suffixRef",
				class: normalizeClass(_ctx.nsSelect.e("suffix"))
			}, [
				_ctx.iconComponent && !_ctx.showClearBtn ? (openBlock(), createBlock(_component_el_icon, {
					key: 0,
					class: normalizeClass([
						_ctx.nsSelect.e("caret"),
						_ctx.nsSelect.e("icon"),
						_ctx.iconReverse
					])
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.iconComponent)))]),
					_: 1
				}, 8, ["class"])) : createCommentVNode("v-if", true),
				_ctx.showClearBtn && _ctx.clearIcon ? (openBlock(), createBlock(_component_el_icon, {
					key: 1,
					class: normalizeClass([
						_ctx.nsSelect.e("caret"),
						_ctx.nsSelect.e("icon"),
						_ctx.nsSelect.e("clear")
					]),
					onClick: _ctx.handleClearClick
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
		content: withCtx(() => [createVNode(_component_el_select_menu, { ref: "menuRef" }, {
			default: withCtx(() => [
				_ctx.$slots.header ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(_ctx.nsSelect.be("dropdown", "header")),
					onClick: _cache[8] || (_cache[8] = withModifiers(() => {}, ["stop"]))
				}, [renderSlot(_ctx.$slots, "header")], 2)) : createCommentVNode("v-if", true),
				withDirectives(createVNode(_component_el_scrollbar, {
					id: _ctx.contentId,
					ref: "scrollbarRef",
					tag: "ul",
					"wrap-class": _ctx.nsSelect.be("dropdown", "wrap"),
					"view-class": _ctx.nsSelect.be("dropdown", "list"),
					class: normalizeClass([_ctx.nsSelect.is("empty", _ctx.filteredOptionsCount === 0)]),
					role: "listbox",
					"aria-label": _ctx.ariaLabel,
					"aria-orientation": "vertical",
					onScroll: _ctx.popupScroll
				}, {
					default: withCtx(() => [_ctx.showNewOption ? (openBlock(), createBlock(_component_el_option, {
						key: 0,
						value: _ctx.states.inputValue,
						created: true
					}, null, 8, ["value"])) : createCommentVNode("v-if", true), createVNode(_component_el_options, null, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (option, index) => {
							return openBlock(), createElementBlock(Fragment, { key: index }, [_ctx.getOptions(option)?.length ? (openBlock(), createBlock(_component_el_option_group, {
								key: 0,
								label: _ctx.getLabel(option),
								disabled: _ctx.getDisabled(option)
							}, {
								default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getOptions(option), (item) => {
									return openBlock(), createBlock(_component_el_option, mergeProps({ key: _ctx.getValue(item) }, { ref_for: true }, _ctx.getOptionProps(item)), null, 16);
								}), 128))]),
								_: 2
							}, 1032, ["label", "disabled"])) : (openBlock(), createBlock(_component_el_option, mergeProps({
								key: 1,
								ref_for: true
							}, _ctx.getOptionProps(option)), null, 16))], 64);
						}), 128))])]),
						_: 3
					})]),
					_: 3
				}, 8, [
					"id",
					"wrap-class",
					"view-class",
					"class",
					"aria-label",
					"onScroll"
				]), [[vShow, _ctx.states.options.size > 0 && !_ctx.loading]]),
				_ctx.$slots.loading && _ctx.loading ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(_ctx.nsSelect.be("dropdown", "loading"))
				}, [renderSlot(_ctx.$slots, "loading")], 2)) : _ctx.loading || _ctx.filteredOptionsCount === 0 ? (openBlock(), createElementBlock("div", {
					key: 2,
					class: normalizeClass(_ctx.nsSelect.be("dropdown", "empty"))
				}, [renderSlot(_ctx.$slots, "empty", {}, () => [createElementVNode("span", null, toDisplayString(_ctx.emptyText), 1)])], 2)) : createCommentVNode("v-if", true),
				_ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
					key: 3,
					class: normalizeClass(_ctx.nsSelect.be("dropdown", "footer")),
					onClick: _cache[9] || (_cache[9] = withModifiers(() => {}, ["stop"]))
				}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("v-if", true)
			]),
			_: 3
		}, 512)]),
		_: 3
	}, 8, [
		"visible",
		"placement",
		"teleported",
		"popper-class",
		"popper-style",
		"popper-options",
		"fallback-placements",
		"effect",
		"transition",
		"persistent",
		"append-to",
		"show-arrow",
		"offset",
		"onBeforeShow"
	])], 16)), [[
		_directive_click_outside,
		_ctx.handleClickOutside,
		_ctx.popperRef
	]]);
}
var select_default = /* @__PURE__ */ _plugin_vue_export_helper_default(select_vue_vue_type_script_lang_default, [["render", _sfc_render]]);

//#endregion
export { select_default as default };
//# sourceMappingURL=select2.mjs.map
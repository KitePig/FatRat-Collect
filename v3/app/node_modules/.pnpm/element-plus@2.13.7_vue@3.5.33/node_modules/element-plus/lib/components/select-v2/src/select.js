Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require__plugin_vue_export_helper = require('../../../_virtual/_plugin-vue_export-helper.js');
const require_select_vue_vue_type_script_lang = require('./select.vue_vue_type_script_lang.js');
let vue = require("vue");

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
	const _component_el_tag = (0, vue.resolveComponent)("el-tag");
	const _component_el_tooltip = (0, vue.resolveComponent)("el-tooltip");
	const _component_el_icon = (0, vue.resolveComponent)("el-icon");
	const _component_el_select_menu = (0, vue.resolveComponent)("el-select-menu");
	const _directive_click_outside = (0, vue.resolveDirective)("click-outside");
	return (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
		ref: "selectRef",
		class: (0, vue.normalizeClass)([_ctx.nsSelect.b(), _ctx.nsSelect.m(_ctx.selectSize)]),
		onMouseenter: _cache[15] || (_cache[15] = ($event) => _ctx.states.inputHovering = true),
		onMouseleave: _cache[16] || (_cache[16] = ($event) => _ctx.states.inputHovering = false)
	}, [(0, vue.createVNode)(_component_el_tooltip, {
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
		default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
			ref: "wrapperRef",
			class: (0, vue.normalizeClass)([
				_ctx.nsSelect.e("wrapper"),
				_ctx.nsSelect.is("focused", _ctx.isFocused),
				_ctx.nsSelect.is("hovering", _ctx.states.inputHovering),
				_ctx.nsSelect.is("filterable", _ctx.filterable),
				_ctx.nsSelect.is("disabled", _ctx.selectDisabled)
			]),
			onClick: _cache[11] || (_cache[11] = (0, vue.withModifiers)((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["prevent"]))
		}, [
			_ctx.$slots.prefix ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				ref: "prefixRef",
				class: (0, vue.normalizeClass)(_ctx.nsSelect.e("prefix"))
			}, [(0, vue.renderSlot)(_ctx.$slots, "prefix")], 2)) : (0, vue.createCommentVNode)("v-if", true),
			(0, vue.createElementVNode)("div", {
				ref: "selectionRef",
				class: (0, vue.normalizeClass)([_ctx.nsSelect.e("selection"), _ctx.nsSelect.is("near", _ctx.multiple && !_ctx.$slots.prefix && !!_ctx.modelValue.length)])
			}, [
				_ctx.multiple ? (0, vue.renderSlot)(_ctx.$slots, "tag", {
					key: 0,
					data: _ctx.states.cachedOptions,
					deleteTag: _ctx.deleteTag,
					selectDisabled: _ctx.selectDisabled
				}, () => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(_ctx.showTagList, (item) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: _ctx.getValueKey(_ctx.getValue(item)),
						class: (0, vue.normalizeClass)(_ctx.nsSelect.e("selected-item"))
					}, [(0, vue.createVNode)(_component_el_tag, {
						closable: !_ctx.selectDisabled && !_ctx.getDisabled(item),
						size: _ctx.collapseTagSize,
						type: _ctx.tagType,
						effect: _ctx.tagEffect,
						"disable-transitions": "",
						style: (0, vue.normalizeStyle)(_ctx.tagStyle),
						onClose: ($event) => _ctx.deleteTag($event, item)
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)(_ctx.nsSelect.e("tags-text")) }, [(0, vue.renderSlot)(_ctx.$slots, "label", {
							index: _ctx.getIndex(item),
							label: _ctx.getLabel(item),
							value: _ctx.getValue(item)
						}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(_ctx.getLabel(item)), 1)])], 2)]),
						_: 2
					}, 1032, [
						"closable",
						"size",
						"type",
						"effect",
						"style",
						"onClose"
					])], 2);
				}), 128)), _ctx.collapseTags && _ctx.states.cachedOptions.length > _ctx.maxCollapseTags ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_tooltip, {
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
					default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
						ref: "collapseItemRef",
						class: (0, vue.normalizeClass)(_ctx.nsSelect.e("selected-item"))
					}, [(0, vue.createVNode)(_component_el_tag, {
						closable: false,
						size: _ctx.collapseTagSize,
						type: _ctx.tagType,
						effect: _ctx.tagEffect,
						style: (0, vue.normalizeStyle)(_ctx.collapseTagStyle),
						"disable-transitions": ""
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)(_ctx.nsSelect.e("tags-text")) }, " + " + (0, vue.toDisplayString)(_ctx.states.cachedOptions.length - _ctx.maxCollapseTags), 3)]),
						_: 1
					}, 8, [
						"size",
						"type",
						"effect",
						"style"
					])], 2)]),
					content: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
						ref: "tagMenuRef",
						class: (0, vue.normalizeClass)(_ctx.nsSelect.e("selection"))
					}, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(_ctx.collapseTagList, (selected) => {
						return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
							key: _ctx.getValueKey(_ctx.getValue(selected)),
							class: (0, vue.normalizeClass)(_ctx.nsSelect.e("selected-item"))
						}, [(0, vue.createVNode)(_component_el_tag, {
							class: "in-tooltip",
							closable: !_ctx.selectDisabled && !_ctx.getDisabled(selected),
							size: _ctx.collapseTagSize,
							type: _ctx.tagType,
							effect: _ctx.tagEffect,
							"disable-transitions": "",
							onClose: ($event) => _ctx.deleteTag($event, selected)
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)(_ctx.nsSelect.e("tags-text")) }, [(0, vue.renderSlot)(_ctx.$slots, "label", {
								index: _ctx.getIndex(selected),
								label: _ctx.getLabel(selected),
								value: _ctx.getValue(selected)
							}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(_ctx.getLabel(selected)), 1)])], 2)]),
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
				])) : (0, vue.createCommentVNode)("v-if", true)]) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([
					_ctx.nsSelect.e("selected-item"),
					_ctx.nsSelect.e("input-wrapper"),
					_ctx.nsSelect.is("hidden", !_ctx.filterable || _ctx.selectDisabled || !_ctx.states.inputValue && !_ctx.isFocused)
				]) }, [(0, vue.createElementVNode)("input", {
					id: _ctx.inputId,
					ref: "inputRef",
					value: _ctx.states.inputValue,
					style: (0, vue.normalizeStyle)(_ctx.inputStyle),
					autocomplete: _ctx.autocomplete,
					tabindex: _ctx.tabindex,
					"aria-autocomplete": "none",
					"aria-haspopup": "listbox",
					autocapitalize: "off",
					"aria-expanded": _ctx.expanded,
					"aria-label": _ctx.ariaLabel,
					class: (0, vue.normalizeClass)([_ctx.nsSelect.e("input"), _ctx.nsSelect.is(_ctx.selectSize)]),
					disabled: _ctx.selectDisabled,
					role: "combobox",
					"aria-controls": _ctx.contentId,
					"aria-activedescendant": _ctx.states.hoveringIndex >= 0 ? `${_ctx.contentId}-${_ctx.states.hoveringIndex}` : "",
					readonly: !_ctx.filterable,
					spellcheck: "false",
					type: "text",
					name: _ctx.name,
					onInput: _cache[0] || (_cache[0] = (...args) => _ctx.onInput && _ctx.onInput(...args)),
					onChange: _cache[1] || (_cache[1] = (0, vue.withModifiers)(() => {}, ["stop"])),
					onCompositionstart: _cache[2] || (_cache[2] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
					onCompositionupdate: _cache[3] || (_cache[3] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
					onCompositionend: _cache[4] || (_cache[4] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
					onKeydown: [
						_cache[5] || (_cache[5] = (0, vue.withKeys)((0, vue.withModifiers)(($event) => _ctx.onKeyboardNavigate("backward"), ["stop", "prevent"]), ["up"])),
						_cache[6] || (_cache[6] = (0, vue.withKeys)((0, vue.withModifiers)(($event) => _ctx.onKeyboardNavigate("forward"), ["stop", "prevent"]), ["down"])),
						_cache[7] || (_cache[7] = (0, vue.withKeys)((0, vue.withModifiers)((...args) => _ctx.onKeyboardSelect && _ctx.onKeyboardSelect(...args), ["stop", "prevent"]), ["enter"])),
						_cache[8] || (_cache[8] = (0, vue.withKeys)((0, vue.withModifiers)((...args) => _ctx.handleEsc && _ctx.handleEsc(...args), ["stop", "prevent"]), ["esc"])),
						_cache[9] || (_cache[9] = (0, vue.withKeys)((0, vue.withModifiers)((...args) => _ctx.handleDel && _ctx.handleDel(...args), ["stop"]), ["delete"]))
					],
					onClick: _cache[10] || (_cache[10] = (0, vue.withModifiers)((...args) => _ctx.toggleMenu && _ctx.toggleMenu(...args), ["stop"]))
				}, null, 46, _hoisted_1), _ctx.filterable ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 0,
					ref: "calculatorRef",
					"aria-hidden": "true",
					class: (0, vue.normalizeClass)(_ctx.nsSelect.e("input-calculator")),
					textContent: (0, vue.toDisplayString)(_ctx.states.inputValue)
				}, null, 10, _hoisted_2)) : (0, vue.createCommentVNode)("v-if", true)], 2),
				_ctx.shouldShowPlaceholder ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)([
						_ctx.nsSelect.e("selected-item"),
						_ctx.nsSelect.e("placeholder"),
						_ctx.nsSelect.is("transparent", !_ctx.hasModelValue || _ctx.expanded && !_ctx.states.inputValue)
					])
				}, [_ctx.hasModelValue ? (0, vue.renderSlot)(_ctx.$slots, "label", {
					key: 0,
					index: _ctx.allOptionsValueMap.get(_ctx.modelValue)?.index ?? -1,
					label: _ctx.currentPlaceholder,
					value: _ctx.modelValue
				}, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(_ctx.currentPlaceholder), 1)]) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_3, (0, vue.toDisplayString)(_ctx.currentPlaceholder), 1))], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2),
			(0, vue.createElementVNode)("div", {
				ref: "suffixRef",
				class: (0, vue.normalizeClass)(_ctx.nsSelect.e("suffix"))
			}, [
				_ctx.iconComponent ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_icon, {
					key: 0,
					class: (0, vue.normalizeClass)([
						_ctx.nsSelect.e("caret"),
						_ctx.nsInput.e("icon"),
						_ctx.iconReverse
					])
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.iconComponent)))]),
					_: 1
				}, 8, ["class"])), [[vue.vShow, !_ctx.showClearBtn]]) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.showClearBtn && _ctx.clearIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_icon, {
					key: 1,
					class: (0, vue.normalizeClass)([
						_ctx.nsSelect.e("caret"),
						_ctx.nsInput.e("icon"),
						_ctx.nsSelect.e("clear")
					]),
					onClick: (0, vue.withModifiers)(_ctx.handleClear, ["prevent", "stop"])
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.clearIcon)))]),
					_: 1
				}, 8, ["class", "onClick"])) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.validateState && _ctx.validateIcon && _ctx.needStatusIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)(_component_el_icon, {
					key: 2,
					class: (0, vue.normalizeClass)([
						_ctx.nsInput.e("icon"),
						_ctx.nsInput.e("validateIcon"),
						_ctx.nsInput.is("loading", _ctx.validateState === "validating")
					])
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(_ctx.validateIcon)))]),
					_: 1
				}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)
			], 2)
		], 2)]),
		content: (0, vue.withCtx)(() => [(0, vue.createVNode)(_component_el_select_menu, {
			id: _ctx.contentId,
			ref: "menuRef",
			data: _ctx.filteredOptions,
			width: _ctx.popperSize - _ctx.BORDER_HORIZONTAL_WIDTH,
			"hovering-index": _ctx.states.hoveringIndex,
			"scrollbar-always-on": _ctx.scrollbarAlwaysOn,
			"aria-label": _ctx.ariaLabel
		}, (0, vue.createSlots)({
			default: (0, vue.withCtx)((scope) => [(0, vue.renderSlot)(_ctx.$slots, "default", (0, vue.normalizeProps)((0, vue.guardReactiveProps)(scope)))]),
			_: 2
		}, [
			_ctx.$slots.header ? {
				name: "header",
				fn: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)(_ctx.nsSelect.be("dropdown", "header")),
					onClick: _cache[12] || (_cache[12] = (0, vue.withModifiers)(() => {}, ["stop"]))
				}, [(0, vue.renderSlot)(_ctx.$slots, "header")], 2)]),
				key: "0"
			} : void 0,
			_ctx.$slots.loading && _ctx.loading ? {
				name: "loading",
				fn: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(_ctx.nsSelect.be("dropdown", "loading")) }, [(0, vue.renderSlot)(_ctx.$slots, "loading")], 2)]),
				key: "1"
			} : _ctx.loading || _ctx.filteredOptions.length === 0 ? {
				name: "empty",
				fn: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(_ctx.nsSelect.be("dropdown", "empty")) }, [(0, vue.renderSlot)(_ctx.$slots, "empty", {}, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(_ctx.emptyText), 1)])], 2)]),
				key: "2"
			} : void 0,
			_ctx.$slots.footer ? {
				name: "footer",
				fn: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)(_ctx.nsSelect.be("dropdown", "footer")),
					onClick: _cache[13] || (_cache[13] = (0, vue.withModifiers)(() => {}, ["stop"]))
				}, [(0, vue.renderSlot)(_ctx.$slots, "footer")], 2)]),
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
var select_default = /* @__PURE__ */ require__plugin_vue_export_helper.default(require_select_vue_vue_type_script_lang.default, [["render", _sfc_render]]);

//#endregion
exports.default = select_default;
//# sourceMappingURL=select.js.map
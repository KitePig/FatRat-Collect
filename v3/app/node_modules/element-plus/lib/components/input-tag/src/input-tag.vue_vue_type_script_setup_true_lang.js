const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-attrs/index.js');
const require_index$1 = require('../../../hooks/use-calc-input-width/index.js');
const require_index$2 = require('../../icon/index.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_index$3 = require('../../tooltip/index.js');
const require_index$4 = require('../../tag/index.js');
const require_input_tag = require('./input-tag.js');
const require_use_drag_tag = require('./composables/use-drag-tag.js');
const require_use_hovering = require('./composables/use-hovering.js');
const require_use_input_tag = require('./composables/use-input-tag.js');
const require_use_input_tag_dom = require('./composables/use-input-tag-dom.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/input-tag/src/input-tag.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"minlength",
	"maxlength",
	"disabled",
	"readonly",
	"autocomplete",
	"tabindex",
	"placeholder",
	"autofocus",
	"ariaLabel"
];
const _hoisted_2 = ["textContent"];
var input_tag_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElInputTag",
	inheritAttrs: false,
	__name: "input-tag",
	props: require_input_tag.inputTagProps,
	emits: require_input_tag.inputTagEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const attrs = require_index.useAttrs();
		const slots = (0, vue.useSlots)();
		const { form, formItem } = require_use_form_item.useFormItem();
		const { inputId } = require_use_form_item.useFormItemInputId(props, { formItemContext: formItem });
		const needStatusIcon = (0, vue.computed)(() => form?.statusIcon ?? false);
		const validateState = (0, vue.computed)(() => formItem?.validateState || "");
		const validateIcon = (0, vue.computed)(() => {
			return validateState.value && require_icon.ValidateComponentsMap[validateState.value];
		});
		const { inputRef, wrapperRef, tagTooltipRef, isFocused, inputValue, size, tagSize, placeholder, closable, disabled, showTagList, collapseTagList, handleDragged, handlePaste, handleInput, handleKeydown, handleKeyup, handleRemoveTag, handleClear, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd, focus, blur } = require_use_input_tag.useInputTag({
			props,
			emit,
			formItem
		});
		const { hovering, handleMouseEnter, handleMouseLeave } = require_use_hovering.useHovering();
		const { calculatorRef, inputStyle } = require_index$1.useCalcInputWidth();
		const { dropIndicatorRef, showDropIndicator, handleDragStart, handleDragOver, handleDragEnd } = require_use_drag_tag.useDragTag({
			wrapperRef,
			handleDragged,
			afterDragged: focus
		});
		const { ns, nsInput, containerKls, containerStyle, innerKls, showClear, showSuffix, tagStyle, collapseItemRef, innerRef } = require_use_input_tag_dom.useInputTagDom({
			props,
			hovering,
			isFocused,
			inputValue,
			disabled,
			size,
			validateState,
			validateIcon,
			needStatusIcon
		});
		__expose({
			focus,
			blur
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "wrapperRef",
				ref: wrapperRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(containerKls)),
				style: (0, vue.normalizeStyle)((0, vue.unref)(containerStyle)),
				onMouseenter: _cache[9] || (_cache[9] = (...args) => (0, vue.unref)(handleMouseEnter) && (0, vue.unref)(handleMouseEnter)(...args)),
				onMouseleave: _cache[10] || (_cache[10] = (...args) => (0, vue.unref)(handleMouseLeave) && (0, vue.unref)(handleMouseLeave)(...args))
			}, [
				(0, vue.unref)(slots).prefix ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("prefix"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "prefix")], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", {
					ref_key: "innerRef",
					ref: innerRef,
					class: (0, vue.normalizeClass)((0, vue.unref)(innerKls))
				}, [
					((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(showTagList), (item, index) => {
						return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$4.ElTag), {
							key: index,
							size: (0, vue.unref)(tagSize),
							closable: (0, vue.unref)(closable),
							type: __props.tagType,
							effect: __props.tagEffect,
							draggable: (0, vue.unref)(closable) && __props.draggable,
							style: (0, vue.normalizeStyle)((0, vue.unref)(tagStyle)),
							"disable-transitions": "",
							onClose: ($event) => (0, vue.unref)(handleRemoveTag)(index),
							onDragstart: (event) => (0, vue.unref)(handleDragStart)(event, index),
							onDragover: (event) => (0, vue.unref)(handleDragOver)(event, index),
							onDragend: (0, vue.unref)(handleDragEnd),
							onDrop: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["stop"]))
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "tag", {
								value: item,
								index
							}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(item), 1)])]),
							_: 2
						}, 1032, [
							"size",
							"closable",
							"type",
							"effect",
							"draggable",
							"style",
							"onClose",
							"onDragstart",
							"onDragover",
							"onDragend"
						]);
					}), 128)),
					__props.collapseTags && __props.modelValue && __props.modelValue.length > __props.maxCollapseTags ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElTooltip), {
						key: 0,
						ref_key: "tagTooltipRef",
						ref: tagTooltipRef,
						disabled: !__props.collapseTagsTooltip,
						"fallback-placements": [
							"bottom",
							"top",
							"right",
							"left"
						],
						effect: __props.effect,
						placement: "bottom"
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
							ref_key: "collapseItemRef",
							ref: collapseItemRef,
							class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("collapse-tag"))
						}, [(0, vue.createVNode)((0, vue.unref)(require_index$4.ElTag), {
							closable: false,
							size: (0, vue.unref)(tagSize),
							type: __props.tagType,
							effect: __props.tagEffect,
							"disable-transitions": ""
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)(" + " + (0, vue.toDisplayString)(__props.modelValue.length - __props.maxCollapseTags), 1)]),
							_: 1
						}, 8, [
							"size",
							"type",
							"effect"
						])], 2)]),
						content: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("input-tag-list")) }, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(collapseTagList), (item, index) => {
							return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$4.ElTag), {
								key: index,
								size: (0, vue.unref)(tagSize),
								closable: (0, vue.unref)(closable),
								type: __props.tagType,
								effect: __props.tagEffect,
								"disable-transitions": "",
								onClose: ($event) => (0, vue.unref)(handleRemoveTag)(index + __props.maxCollapseTags)
							}, {
								default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "tag", {
									value: item,
									index: index + __props.maxCollapseTags
								}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(item), 1)])]),
								_: 2
							}, 1032, [
								"size",
								"closable",
								"type",
								"effect",
								"onClose"
							]);
						}), 128))], 2)]),
						_: 3
					}, 8, ["disabled", "effect"])) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("input-wrapper")) }, [(0, vue.withDirectives)((0, vue.createElementVNode)("input", (0, vue.mergeProps)({
						id: (0, vue.unref)(inputId),
						ref_key: "inputRef",
						ref: inputRef,
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => (0, vue.isRef)(inputValue) ? inputValue.value = $event : null)
					}, (0, vue.unref)(attrs), {
						type: "text",
						minlength: __props.minlength,
						maxlength: __props.maxlength,
						disabled: (0, vue.unref)(disabled),
						readonly: __props.readonly,
						autocomplete: __props.autocomplete,
						tabindex: __props.tabindex,
						placeholder: (0, vue.unref)(placeholder),
						autofocus: __props.autofocus,
						ariaLabel: __props.ariaLabel,
						class: (0, vue.unref)(ns).e("input"),
						style: (0, vue.unref)(inputStyle),
						onCompositionstart: _cache[2] || (_cache[2] = (...args) => (0, vue.unref)(handleCompositionStart) && (0, vue.unref)(handleCompositionStart)(...args)),
						onCompositionupdate: _cache[3] || (_cache[3] = (...args) => (0, vue.unref)(handleCompositionUpdate) && (0, vue.unref)(handleCompositionUpdate)(...args)),
						onCompositionend: _cache[4] || (_cache[4] = (...args) => (0, vue.unref)(handleCompositionEnd) && (0, vue.unref)(handleCompositionEnd)(...args)),
						onPaste: _cache[5] || (_cache[5] = (...args) => (0, vue.unref)(handlePaste) && (0, vue.unref)(handlePaste)(...args)),
						onInput: _cache[6] || (_cache[6] = (...args) => (0, vue.unref)(handleInput) && (0, vue.unref)(handleInput)(...args)),
						onKeydown: _cache[7] || (_cache[7] = (...args) => (0, vue.unref)(handleKeydown) && (0, vue.unref)(handleKeydown)(...args)),
						onKeyup: _cache[8] || (_cache[8] = (...args) => (0, vue.unref)(handleKeyup) && (0, vue.unref)(handleKeyup)(...args))
					}), null, 16, _hoisted_1), [[vue.vModelText, (0, vue.unref)(inputValue)]]), (0, vue.createElementVNode)("span", {
						ref_key: "calculatorRef",
						ref: calculatorRef,
						"aria-hidden": "true",
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("input-calculator")),
						textContent: (0, vue.toDisplayString)((0, vue.unref)(inputValue))
					}, null, 10, _hoisted_2)], 2),
					(0, vue.withDirectives)((0, vue.createElementVNode)("div", {
						ref_key: "dropIndicatorRef",
						ref: dropIndicatorRef,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("drop-indicator"))
					}, null, 2), [[vue.vShow, (0, vue.unref)(showDropIndicator)]])
				], 2),
				(0, vue.unref)(showSuffix) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("suffix"))
				}, [
					(0, vue.renderSlot)(_ctx.$slots, "suffix"),
					(0, vue.unref)(showClear) ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), {
						key: 0,
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("icon"), (0, vue.unref)(ns).e("clear")]),
						onMousedown: (0, vue.withModifiers)((0, vue.unref)(_vue_shared.NOOP), ["prevent"]),
						onClick: (0, vue.unref)(handleClear)
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.clearIcon)))]),
						_: 1
					}, 8, [
						"class",
						"onMousedown",
						"onClick"
					])) : (0, vue.createCommentVNode)("v-if", true),
					validateState.value && validateIcon.value && needStatusIcon.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), {
						key: 1,
						class: (0, vue.normalizeClass)([
							(0, vue.unref)(nsInput).e("icon"),
							(0, vue.unref)(nsInput).e("validateIcon"),
							(0, vue.unref)(nsInput).is("loading", validateState.value === "validating")
						])
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(validateIcon.value)))]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)
				], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 38);
		};
	}
});

//#endregion
exports.default = input_tag_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=input-tag.vue_vue_type_script_setup_true_lang.js.map
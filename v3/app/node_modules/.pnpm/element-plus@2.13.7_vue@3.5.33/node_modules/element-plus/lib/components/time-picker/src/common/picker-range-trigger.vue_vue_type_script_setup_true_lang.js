const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-attrs/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../../hooks/use-focus-controller/index.js');
const require_use_form_item = require('../../../form/src/hooks/use-form-item.js');
const require_props = require('./props.js');
let vue = require("vue");

//#region ../../packages/components/time-picker/src/common/picker-range-trigger.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"name",
	"placeholder",
	"value",
	"disabled"
];
const _hoisted_2 = [
	"id",
	"name",
	"placeholder",
	"value",
	"disabled"
];
var picker_range_trigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "PickerRangeTrigger",
	inheritAttrs: false,
	__name: "picker-range-trigger",
	props: require_props.timePickerRangeTriggerProps,
	emits: [
		"mouseenter",
		"mouseleave",
		"click",
		"touchstart",
		"focus",
		"blur",
		"startInput",
		"endInput",
		"startChange",
		"endChange"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { formItem } = require_use_form_item.useFormItem();
		const { inputId } = require_use_form_item.useFormItemInputId((0, vue.reactive)({ id: (0, vue.computed)(() => props.id?.[0]) }), { formItemContext: formItem });
		const attrs = require_index.useAttrs();
		const nsDate = require_index$1.useNamespace("date");
		const nsRange = require_index$1.useNamespace("range");
		const inputRef = (0, vue.ref)();
		const endInputRef = (0, vue.ref)();
		const { wrapperRef, isFocused } = require_index$2.useFocusController(inputRef, { disabled: (0, vue.computed)(() => props.disabled) });
		const handleClick = (evt) => {
			emit("click", evt);
		};
		const handleMouseEnter = (evt) => {
			emit("mouseenter", evt);
		};
		const handleMouseLeave = (evt) => {
			emit("mouseleave", evt);
		};
		const handleTouchStart = (evt) => {
			emit("touchstart", evt);
		};
		const handleStartInput = (evt) => {
			emit("startInput", evt);
		};
		const handleEndInput = (evt) => {
			emit("endInput", evt);
		};
		const handleStartChange = (evt) => {
			emit("startChange", evt);
		};
		const handleEndChange = (evt) => {
			emit("endChange", evt);
		};
		const focus = () => {
			inputRef.value?.focus();
		};
		const blur = () => {
			inputRef.value?.blur();
			endInputRef.value?.blur();
		};
		__expose({
			focus,
			blur
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "wrapperRef",
				ref: wrapperRef,
				class: (0, vue.normalizeClass)([(0, vue.unref)(nsDate).is("active", (0, vue.unref)(isFocused)), _ctx.$attrs.class]),
				style: (0, vue.normalizeStyle)(_ctx.$attrs.style),
				onClick: handleClick,
				onMouseenter: handleMouseEnter,
				onMouseleave: handleMouseLeave,
				onTouchstartPassive: handleTouchStart
			}, [
				(0, vue.renderSlot)(_ctx.$slots, "prefix"),
				(0, vue.createElementVNode)("input", (0, vue.mergeProps)((0, vue.unref)(attrs), {
					id: (0, vue.unref)(inputId),
					ref_key: "inputRef",
					ref: inputRef,
					name: _ctx.name && _ctx.name[0],
					placeholder: _ctx.startPlaceholder,
					value: _ctx.modelValue && _ctx.modelValue[0],
					class: (0, vue.unref)(nsRange).b("input"),
					disabled: _ctx.disabled,
					onInput: handleStartInput,
					onChange: handleStartChange
				}), null, 16, _hoisted_1),
				(0, vue.renderSlot)(_ctx.$slots, "range-separator"),
				(0, vue.createElementVNode)("input", (0, vue.mergeProps)((0, vue.unref)(attrs), {
					id: _ctx.id && _ctx.id[1],
					ref_key: "endInputRef",
					ref: endInputRef,
					name: _ctx.name && _ctx.name[1],
					placeholder: _ctx.endPlaceholder,
					value: _ctx.modelValue && _ctx.modelValue[1],
					class: (0, vue.unref)(nsRange).b("input"),
					disabled: _ctx.disabled,
					onInput: handleEndInput,
					onChange: handleEndChange
				}), null, 16, _hoisted_2),
				(0, vue.renderSlot)(_ctx.$slots, "suffix")
			], 38);
		};
	}
});

//#endregion
exports.default = picker_range_trigger_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=picker-range-trigger.vue_vue_type_script_setup_true_lang.js.map
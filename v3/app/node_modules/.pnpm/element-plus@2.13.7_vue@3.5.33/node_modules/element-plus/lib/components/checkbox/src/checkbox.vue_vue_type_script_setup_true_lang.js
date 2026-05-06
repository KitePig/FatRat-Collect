const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_checkbox = require('./checkbox.js');
const require_use_checkbox = require('./composables/use-checkbox.js');
let vue = require("vue");

//#region ../../packages/components/checkbox/src/checkbox.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"indeterminate",
	"name",
	"tabindex",
	"disabled"
];
var checkbox_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCheckbox",
	__name: "checkbox",
	props: require_checkbox.checkboxProps,
	emits: require_checkbox.checkboxEmits,
	setup(__props) {
		const props = __props;
		const { inputId, isLabeledByFormItem, isChecked, isDisabled, isFocused, checkboxSize, hasOwnLabel, model, actualValue, handleChange, onClickRoot } = require_use_checkbox.useCheckbox(props, (0, vue.useSlots)());
		const inputBindings = (0, vue.computed)(() => {
			if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) return {
				"true-value": props.trueValue ?? props.trueLabel ?? true,
				"false-value": props.falseValue ?? props.falseLabel ?? false
			};
			return { value: actualValue.value };
		});
		const ns = require_index.useNamespace("checkbox");
		const compKls = (0, vue.computed)(() => {
			return [
				ns.b(),
				ns.m(checkboxSize.value),
				ns.is("disabled", isDisabled.value),
				ns.is("bordered", props.border),
				ns.is("checked", isChecked.value)
			];
		});
		const spanKls = (0, vue.computed)(() => {
			return [
				ns.e("input"),
				ns.is("disabled", isDisabled.value),
				ns.is("checked", isChecked.value),
				ns.is("indeterminate", props.indeterminate),
				ns.is("focus", isFocused.value)
			];
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(!(0, vue.unref)(hasOwnLabel) && (0, vue.unref)(isLabeledByFormItem) ? "span" : "label"), {
				for: !(0, vue.unref)(hasOwnLabel) && (0, vue.unref)(isLabeledByFormItem) ? null : (0, vue.unref)(inputId),
				class: (0, vue.normalizeClass)(compKls.value),
				"aria-controls": __props.indeterminate ? __props.ariaControls : null,
				"aria-checked": __props.indeterminate ? "mixed" : void 0,
				"aria-label": __props.ariaLabel,
				onClick: (0, vue.unref)(onClickRoot)
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)(spanKls.value) }, [(0, vue.withDirectives)((0, vue.createElementVNode)("input", (0, vue.mergeProps)({
					id: (0, vue.unref)(inputId),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.isRef)(model) ? model.value = $event : null),
					class: (0, vue.unref)(ns).e("original"),
					type: "checkbox",
					indeterminate: __props.indeterminate,
					name: __props.name,
					tabindex: __props.tabindex,
					disabled: (0, vue.unref)(isDisabled)
				}, inputBindings.value, {
					onChange: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handleChange) && (0, vue.unref)(handleChange)(...args)),
					onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
					onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
					onClick: _cache[4] || (_cache[4] = (0, vue.withModifiers)(() => {}, ["stop"]))
				}), null, 16, _hoisted_1), [[vue.vModelCheckbox, (0, vue.unref)(model)]]), (0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("inner")) }, null, 2)], 2), (0, vue.unref)(hasOwnLabel) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("label"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "default"), !_ctx.$slots.default ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.label), 1)], 64)) : (0, vue.createCommentVNode)("v-if", true)], 2)) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 3
			}, 8, [
				"for",
				"class",
				"aria-controls",
				"aria-checked",
				"aria-label",
				"onClick"
			]);
		};
	}
});

//#endregion
exports.default = checkbox_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=checkbox.vue_vue_type_script_setup_true_lang.js.map
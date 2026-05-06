import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { checkboxEmits, checkboxProps } from "./checkbox.mjs";
import { useCheckbox } from "./composables/use-checkbox.mjs";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, defineComponent, isRef, mergeProps, normalizeClass, openBlock, renderSlot, resolveDynamicComponent, toDisplayString, unref, useSlots, vModelCheckbox, withCtx, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/checkbox/src/checkbox.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"indeterminate",
	"name",
	"tabindex",
	"disabled"
];
var checkbox_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCheckbox",
	__name: "checkbox",
	props: checkboxProps,
	emits: checkboxEmits,
	setup(__props) {
		const props = __props;
		const { inputId, isLabeledByFormItem, isChecked, isDisabled, isFocused, checkboxSize, hasOwnLabel, model, actualValue, handleChange, onClickRoot } = useCheckbox(props, useSlots());
		const inputBindings = computed(() => {
			if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) return {
				"true-value": props.trueValue ?? props.trueLabel ?? true,
				"false-value": props.falseValue ?? props.falseLabel ?? false
			};
			return { value: actualValue.value };
		});
		const ns = useNamespace("checkbox");
		const compKls = computed(() => {
			return [
				ns.b(),
				ns.m(checkboxSize.value),
				ns.is("disabled", isDisabled.value),
				ns.is("bordered", props.border),
				ns.is("checked", isChecked.value)
			];
		});
		const spanKls = computed(() => {
			return [
				ns.e("input"),
				ns.is("disabled", isDisabled.value),
				ns.is("checked", isChecked.value),
				ns.is("indeterminate", props.indeterminate),
				ns.is("focus", isFocused.value)
			];
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(!unref(hasOwnLabel) && unref(isLabeledByFormItem) ? "span" : "label"), {
				for: !unref(hasOwnLabel) && unref(isLabeledByFormItem) ? null : unref(inputId),
				class: normalizeClass(compKls.value),
				"aria-controls": __props.indeterminate ? __props.ariaControls : null,
				"aria-checked": __props.indeterminate ? "mixed" : void 0,
				"aria-label": __props.ariaLabel,
				onClick: unref(onClickRoot)
			}, {
				default: withCtx(() => [createElementVNode("span", { class: normalizeClass(spanKls.value) }, [withDirectives(createElementVNode("input", mergeProps({
					id: unref(inputId),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
					class: unref(ns).e("original"),
					type: "checkbox",
					indeterminate: __props.indeterminate,
					name: __props.name,
					tabindex: __props.tabindex,
					disabled: unref(isDisabled)
				}, inputBindings.value, {
					onChange: _cache[1] || (_cache[1] = (...args) => unref(handleChange) && unref(handleChange)(...args)),
					onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
					onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
					onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
				}), null, 16, _hoisted_1), [[vModelCheckbox, unref(model)]]), createElementVNode("span", { class: normalizeClass(unref(ns).e("inner")) }, null, 2)], 2), unref(hasOwnLabel) ? (openBlock(), createElementBlock("span", {
					key: 0,
					class: normalizeClass(unref(ns).e("label"))
				}, [renderSlot(_ctx.$slots, "default"), !_ctx.$slots.default ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(__props.label), 1)], 64)) : createCommentVNode("v-if", true)], 2)) : createCommentVNode("v-if", true)]),
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
export { checkbox_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=checkbox.vue_vue_type_script_setup_true_lang.mjs.map
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useRadio } from "./use-radio.mjs";
import { radioButtonProps } from "./radio-button.mjs";
import { computed, createElementBlock, createElementVNode, createTextVNode, defineComponent, isRef, normalizeClass, normalizeStyle, openBlock, renderSlot, toDisplayString, unref, vModelRadio, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/radio/src/radio-button.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"value",
	"name",
	"disabled"
];
var radio_button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElRadioButton",
	__name: "radio-button",
	props: radioButtonProps,
	setup(__props) {
		const props = __props;
		const ns = useNamespace("radio");
		const { radioRef, focus, size, disabled, modelValue, radioGroup, actualValue } = useRadio(props);
		const activeStyle = computed(() => {
			return {
				backgroundColor: radioGroup?.fill || "",
				borderColor: radioGroup?.fill || "",
				boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : "",
				color: radioGroup?.textColor || ""
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("label", { class: normalizeClass([
				unref(ns).b("button"),
				unref(ns).is("active", unref(modelValue) === unref(actualValue)),
				unref(ns).is("disabled", unref(disabled)),
				unref(ns).is("focus", unref(focus)),
				unref(ns).bm("button", unref(size))
			]) }, [withDirectives(createElementVNode("input", {
				ref_key: "radioRef",
				ref: radioRef,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
				class: normalizeClass(unref(ns).be("button", "original-radio")),
				value: unref(actualValue),
				type: "radio",
				name: __props.name || unref(radioGroup)?.name,
				disabled: unref(disabled),
				onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
				onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
				onClick: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"]))
			}, null, 42, _hoisted_1), [[vModelRadio, unref(modelValue)]]), createElementVNode("span", {
				class: normalizeClass(unref(ns).be("button", "inner")),
				style: normalizeStyle(unref(modelValue) === unref(actualValue) ? activeStyle.value : {}),
				onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
			}, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.label), 1)])], 38)], 2);
		};
	}
});

//#endregion
export { radio_button_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=radio-button.vue_vue_type_script_setup_true_lang.mjs.map
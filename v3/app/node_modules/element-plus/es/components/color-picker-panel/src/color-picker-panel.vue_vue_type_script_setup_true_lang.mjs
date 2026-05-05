import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem } from "../../form/src/hooks/use-form-item.mjs";
import { ElInput } from "../../input/index.mjs";
import { ROOT_COMMON_COLOR_INJECTION_KEY, colorPickerPanelContextKey, colorPickerPanelEmits, colorPickerPanelProps } from "./color-picker-panel.mjs";
import alpha_slider_default from "./components/alpha-slider.mjs";
import hue_slider_default from "./components/hue-slider.mjs";
import predefine_default from "./components/predefine.mjs";
import sv_panel_default from "./components/sv-panel.mjs";
import { useCommonColor } from "./composables/use-common-color.mjs";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, inject, nextTick, normalizeClass, normalizeStyle, onMounted, openBlock, provide, ref, renderSlot, unref, watch } from "vue";

//#region ../../packages/components/color-picker-panel/src/color-picker-panel.vue?vue&type=script&setup=true&lang.ts
var color_picker_panel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElColorPickerPanel",
	__name: "color-picker-panel",
	props: colorPickerPanelProps,
	emits: colorPickerPanelEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("color-picker-panel");
		const { formItem } = useFormItem();
		const disabled = useFormDisabled();
		const hueRef = ref();
		const svRef = ref();
		const alphaRef = ref();
		const inputRef = ref();
		const customInput = ref("");
		const { color } = inject(ROOT_COMMON_COLOR_INJECTION_KEY, () => useCommonColor(props, emit), true);
		function handleConfirm() {
			color.fromString(customInput.value);
			if (color.value !== customInput.value) customInput.value = color.value;
		}
		function handleFocusout() {
			if (props.validateEvent) formItem?.validate?.("blur").catch((err) => debugWarn(err));
		}
		function update() {
			hueRef.value?.update();
			svRef.value?.update();
			alphaRef.value?.update();
		}
		onMounted(() => {
			if (props.modelValue) customInput.value = color.value;
			nextTick(update);
		});
		watch(() => props.modelValue, (newVal) => {
			if (newVal !== color.value) newVal ? color.fromString(newVal) : color.clear();
		});
		watch(() => color.value, (val) => {
			emit(UPDATE_MODEL_EVENT, val);
			customInput.value = val;
			if (props.validateEvent) formItem?.validate("change").catch((err) => debugWarn(err));
		});
		provide(colorPickerPanelContextKey, { currentColor: computed(() => color.value) });
		__expose({
			color,
			inputRef,
			update
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass([
					unref(ns).b(),
					unref(ns).is("disabled", unref(disabled)),
					unref(ns).is("border", __props.border)
				]),
				onFocusout: handleFocusout
			}, [
				createElementVNode("div", { class: normalizeClass(unref(ns).e("wrapper")) }, [createVNode(hue_slider_default, {
					ref_key: "hueRef",
					ref: hueRef,
					color: unref(color),
					vertical: "",
					disabled: unref(disabled),
					class: normalizeClass(["hue-slider", __props.hueSliderClass]),
					style: normalizeStyle(__props.hueSliderStyle)
				}, null, 8, [
					"color",
					"disabled",
					"class",
					"style"
				]), createVNode(sv_panel_default, {
					ref_key: "svRef",
					ref: svRef,
					color: unref(color),
					disabled: unref(disabled)
				}, null, 8, ["color", "disabled"])], 2),
				__props.showAlpha ? (openBlock(), createBlock(alpha_slider_default, {
					key: 0,
					ref_key: "alphaRef",
					ref: alphaRef,
					color: unref(color),
					disabled: unref(disabled)
				}, null, 8, ["color", "disabled"])) : createCommentVNode("v-if", true),
				__props.predefine ? (openBlock(), createBlock(predefine_default, {
					key: 1,
					ref: "predefine",
					"enable-alpha": __props.showAlpha,
					color: unref(color),
					colors: __props.predefine,
					disabled: unref(disabled)
				}, null, 8, [
					"enable-alpha",
					"color",
					"colors",
					"disabled"
				])) : createCommentVNode("v-if", true),
				createElementVNode("div", { class: normalizeClass(unref(ns).e("footer")) }, [createVNode(unref(ElInput), {
					ref_key: "inputRef",
					ref: inputRef,
					modelValue: customInput.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => customInput.value = $event),
					"validate-event": false,
					size: "small",
					disabled: unref(disabled),
					onChange: handleConfirm
				}, null, 8, ["modelValue", "disabled"]), renderSlot(_ctx.$slots, "footer")], 2)
			], 34);
		};
	}
});

//#endregion
export { color_picker_panel_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=color-picker-panel.vue_vue_type_script_setup_true_lang.mjs.map
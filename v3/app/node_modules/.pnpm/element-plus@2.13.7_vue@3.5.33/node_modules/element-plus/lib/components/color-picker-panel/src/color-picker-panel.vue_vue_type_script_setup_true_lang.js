const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_index$1 = require('../../input/index.js');
const require_color_picker_panel = require('./color-picker-panel.js');
const require_alpha_slider = require('./components/alpha-slider.js');
const require_hue_slider = require('./components/hue-slider.js');
const require_predefine = require('./components/predefine.js');
const require_sv_panel = require('./components/sv-panel.js');
const require_use_common_color = require('./composables/use-common-color.js');
let vue = require("vue");

//#region ../../packages/components/color-picker-panel/src/color-picker-panel.vue?vue&type=script&setup=true&lang.ts
var color_picker_panel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElColorPickerPanel",
	__name: "color-picker-panel",
	props: require_color_picker_panel.colorPickerPanelProps,
	emits: require_color_picker_panel.colorPickerPanelEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("color-picker-panel");
		const { formItem } = require_use_form_item.useFormItem();
		const disabled = require_use_form_common_props.useFormDisabled();
		const hueRef = (0, vue.ref)();
		const svRef = (0, vue.ref)();
		const alphaRef = (0, vue.ref)();
		const inputRef = (0, vue.ref)();
		const customInput = (0, vue.ref)("");
		const { color } = (0, vue.inject)(require_color_picker_panel.ROOT_COMMON_COLOR_INJECTION_KEY, () => require_use_common_color.useCommonColor(props, emit), true);
		function handleConfirm() {
			color.fromString(customInput.value);
			if (color.value !== customInput.value) customInput.value = color.value;
		}
		function handleFocusout() {
			if (props.validateEvent) formItem?.validate?.("blur").catch((err) => require_error.debugWarn(err));
		}
		function update() {
			hueRef.value?.update();
			svRef.value?.update();
			alphaRef.value?.update();
		}
		(0, vue.onMounted)(() => {
			if (props.modelValue) customInput.value = color.value;
			(0, vue.nextTick)(update);
		});
		(0, vue.watch)(() => props.modelValue, (newVal) => {
			if (newVal !== color.value) newVal ? color.fromString(newVal) : color.clear();
		});
		(0, vue.watch)(() => color.value, (val) => {
			emit(require_event.UPDATE_MODEL_EVENT, val);
			customInput.value = val;
			if (props.validateEvent) formItem?.validate("change").catch((err) => require_error.debugWarn(err));
		});
		(0, vue.provide)(require_color_picker_panel.colorPickerPanelContextKey, { currentColor: (0, vue.computed)(() => color.value) });
		__expose({
			color,
			inputRef,
			update
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([
					(0, vue.unref)(ns).b(),
					(0, vue.unref)(ns).is("disabled", (0, vue.unref)(disabled)),
					(0, vue.unref)(ns).is("border", __props.border)
				]),
				onFocusout: handleFocusout
			}, [
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("wrapper")) }, [(0, vue.createVNode)(require_hue_slider.default, {
					ref_key: "hueRef",
					ref: hueRef,
					color: (0, vue.unref)(color),
					vertical: "",
					disabled: (0, vue.unref)(disabled),
					class: (0, vue.normalizeClass)(["hue-slider", __props.hueSliderClass]),
					style: (0, vue.normalizeStyle)(__props.hueSliderStyle)
				}, null, 8, [
					"color",
					"disabled",
					"class",
					"style"
				]), (0, vue.createVNode)(require_sv_panel.default, {
					ref_key: "svRef",
					ref: svRef,
					color: (0, vue.unref)(color),
					disabled: (0, vue.unref)(disabled)
				}, null, 8, ["color", "disabled"])], 2),
				__props.showAlpha ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_alpha_slider.default, {
					key: 0,
					ref_key: "alphaRef",
					ref: alphaRef,
					color: (0, vue.unref)(color),
					disabled: (0, vue.unref)(disabled)
				}, null, 8, ["color", "disabled"])) : (0, vue.createCommentVNode)("v-if", true),
				__props.predefine ? ((0, vue.openBlock)(), (0, vue.createBlock)(require_predefine.default, {
					key: 1,
					ref: "predefine",
					"enable-alpha": __props.showAlpha,
					color: (0, vue.unref)(color),
					colors: __props.predefine,
					disabled: (0, vue.unref)(disabled)
				}, null, 8, [
					"enable-alpha",
					"color",
					"colors",
					"disabled"
				])) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("footer")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$1.ElInput), {
					ref_key: "inputRef",
					ref: inputRef,
					modelValue: customInput.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => customInput.value = $event),
					"validate-event": false,
					size: "small",
					disabled: (0, vue.unref)(disabled),
					onChange: handleConfirm
				}, null, 8, ["modelValue", "disabled"]), (0, vue.renderSlot)(_ctx.$slots, "footer")], 2)
			], 34);
		};
	}
});

//#endregion
exports.default = color_picker_panel_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=color-picker-panel.vue_vue_type_script_setup_true_lang.js.map
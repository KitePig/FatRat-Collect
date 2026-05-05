const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_constants = require('./constants.js');
const require_checkbox = require('./checkbox2.js');
const require_checkbox_button = require('./checkbox-button.js');
const require_checkbox_group = require('./checkbox-group.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/checkbox/src/checkbox-group.vue?vue&type=script&setup=true&lang.ts
var checkbox_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCheckboxGroup",
	__name: "checkbox-group",
	props: require_checkbox_group.checkboxGroupProps,
	emits: require_checkbox_group.checkboxGroupEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("checkbox");
		const checkboxDisabled = require_use_form_common_props.useFormDisabled();
		const { formItem } = require_use_form_item.useFormItem();
		const { inputId: groupId, isLabeledByFormItem } = require_use_form_item.useFormItemInputId(props, { formItemContext: formItem });
		const changeEvent = async (value) => {
			emit(require_event.UPDATE_MODEL_EVENT, value);
			await (0, vue.nextTick)();
			emit(require_event.CHANGE_EVENT, value);
		};
		const modelValue = (0, vue.computed)({
			get() {
				return props.modelValue;
			},
			set(val) {
				changeEvent(val);
			}
		});
		const aliasProps = (0, vue.computed)(() => ({
			...require_checkbox_group.checkboxDefaultProps,
			...props.props
		}));
		const getOptionProps = (option) => {
			const { label, value, disabled } = aliasProps.value;
			const base = {
				label: option[label],
				value: option[value],
				disabled: option[disabled]
			};
			return {
				...(0, lodash_unified.omit)(option, [
					label,
					value,
					disabled
				]),
				...base
			};
		};
		const optionComponent = (0, vue.computed)(() => props.type === "button" ? require_checkbox_button.default : require_checkbox.default);
		(0, vue.provide)(require_constants.checkboxGroupContextKey, {
			...(0, lodash_unified.pick)((0, vue.toRefs)(props), [
				"size",
				"min",
				"max",
				"validateEvent",
				"fill",
				"textColor"
			]),
			disabled: checkboxDisabled,
			modelValue,
			changeEvent
		});
		(0, vue.watch)(() => props.modelValue, (newVal, oldValue) => {
			if (props.validateEvent && !(0, lodash_unified.isEqual)(newVal, oldValue)) formItem?.validate("change").catch((err) => require_error.debugWarn(err));
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.tag), {
				id: (0, vue.unref)(groupId),
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b("group")),
				role: "group",
				"aria-label": !(0, vue.unref)(isLabeledByFormItem) ? __props.ariaLabel || "checkbox-group" : void 0,
				"aria-labelledby": (0, vue.unref)(isLabeledByFormItem) ? (0, vue.unref)(formItem)?.labelId : void 0
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.options, (item, index) => {
					return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(optionComponent.value), (0, vue.mergeProps)({ key: index }, { ref_for: true }, getOptionProps(item)), null, 16);
				}), 128))])]),
				_: 3
			}, 8, [
				"id",
				"class",
				"aria-label",
				"aria-labelledby"
			]);
		};
	}
});

//#endregion
exports.default = checkbox_group_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=checkbox-group.vue_vue_type_script_setup_true_lang.js.map
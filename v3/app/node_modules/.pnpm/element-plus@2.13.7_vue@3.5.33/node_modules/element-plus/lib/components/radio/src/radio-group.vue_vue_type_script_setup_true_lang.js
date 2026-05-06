const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-id/index.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_constants = require('./constants.js');
const require_radio = require('./radio2.js');
const require_radio_button = require('./radio-button2.js');
const require_radio_group = require('./radio-group.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/radio/src/radio-group.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-label",
	"aria-labelledby"
];
var radio_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElRadioGroup",
	__name: "radio-group",
	props: require_radio_group.radioGroupProps,
	emits: require_radio_group.radioGroupEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("radio");
		const radioId = require_index$1.useId();
		const radioGroupRef = (0, vue.ref)();
		const { formItem } = require_use_form_item.useFormItem();
		const { inputId: groupId, isLabeledByFormItem } = require_use_form_item.useFormItemInputId(props, { formItemContext: formItem });
		const changeEvent = (value) => {
			emit(require_event.UPDATE_MODEL_EVENT, value);
			(0, vue.nextTick)(() => emit(require_event.CHANGE_EVENT, value));
		};
		(0, vue.onMounted)(() => {
			const radios = radioGroupRef.value.querySelectorAll("[type=radio]");
			const firstLabel = radios[0];
			if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) firstLabel.tabIndex = 0;
		});
		const name = (0, vue.computed)(() => {
			return props.name || radioId.value;
		});
		const aliasProps = (0, vue.computed)(() => ({
			...require_radio_group.radioDefaultProps,
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
		const optionComponent = (0, vue.computed)(() => props.type === "button" ? require_radio_button.default : require_radio.default);
		(0, vue.provide)(require_constants.radioGroupKey, (0, vue.reactive)({
			...(0, vue.toRefs)(props),
			changeEvent,
			name
		}));
		(0, vue.watch)(() => props.modelValue, (newVal, oldValue) => {
			if (props.validateEvent && !(0, lodash_unified.isEqual)(newVal, oldValue)) formItem?.validate("change").catch((err) => require_error.debugWarn(err));
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				id: (0, vue.unref)(groupId),
				ref_key: "radioGroupRef",
				ref: radioGroupRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b("group")),
				role: "radiogroup",
				"aria-label": !(0, vue.unref)(isLabeledByFormItem) ? __props.ariaLabel || "radio-group" : void 0,
				"aria-labelledby": (0, vue.unref)(isLabeledByFormItem) ? (0, vue.unref)(formItem).labelId : void 0
			}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.options, (item, index) => {
				return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(optionComponent.value), (0, vue.mergeProps)({ key: index }, { ref_for: true }, getOptionProps(item)), null, 16);
			}), 128))])], 10, _hoisted_1);
		};
	}
});

//#endregion
exports.default = radio_group_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=radio-group.vue_vue_type_script_setup_true_lang.js.map
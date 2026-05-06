Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-deprecated/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_use_global_config = require('../../config-provider/src/hooks/use-global-config.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/button/src/use-button.ts
const useButton = (props, emit) => {
	require_index.useDeprecated({
		from: "type.text",
		replacement: "link",
		version: "3.0.0",
		scope: "props",
		ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
	}, (0, vue.computed)(() => props.type === "text"));
	const buttonGroupContext = (0, vue.inject)(require_constants.buttonGroupContextKey, void 0);
	const globalConfig = require_use_global_config.useGlobalConfig("button");
	const { form } = require_use_form_item.useFormItem();
	const _size = require_use_form_common_props.useFormSize((0, vue.computed)(() => buttonGroupContext?.size));
	const _disabled = require_use_form_common_props.useFormDisabled();
	const _ref = (0, vue.ref)();
	const slots = (0, vue.useSlots)();
	const _type = (0, vue.computed)(() => props.type || buttonGroupContext?.type || globalConfig.value?.type || "");
	const autoInsertSpace = (0, vue.computed)(() => props.autoInsertSpace ?? globalConfig.value?.autoInsertSpace ?? false);
	const _plain = (0, vue.computed)(() => props.plain ?? globalConfig.value?.plain ?? false);
	const _round = (0, vue.computed)(() => props.round ?? globalConfig.value?.round ?? false);
	const _text = (0, vue.computed)(() => props.text ?? globalConfig.value?.text ?? false);
	const _dashed = (0, vue.computed)(() => props.dashed ?? globalConfig.value?.dashed ?? false);
	const _props = (0, vue.computed)(() => {
		if (props.tag === "button") return {
			ariaDisabled: _disabled.value || props.loading,
			disabled: _disabled.value || props.loading,
			autofocus: props.autofocus,
			type: props.nativeType
		};
		return {};
	});
	const shouldAddSpace = (0, vue.computed)(() => {
		const defaultSlot = slots.default?.();
		if (autoInsertSpace.value && defaultSlot?.length === 1) {
			const slot = defaultSlot[0];
			if (slot?.type === vue.Text) {
				const text = slot.children;
				return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
			}
		}
		return false;
	});
	const handleClick = (evt) => {
		if (_disabled.value || props.loading) {
			evt.stopPropagation();
			return;
		}
		if (props.nativeType === "reset") form?.resetFields();
		emit("click", evt);
	};
	return {
		_disabled,
		_size,
		_type,
		_ref,
		_props,
		_plain,
		_round,
		_text,
		_dashed,
		shouldAddSpace,
		handleClick
	};
};

//#endregion
exports.useButton = useButton;
//# sourceMappingURL=use-button.js.map
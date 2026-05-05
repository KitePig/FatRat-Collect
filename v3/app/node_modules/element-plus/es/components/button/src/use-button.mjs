import { useDeprecated } from "../../../hooks/use-deprecated/index.mjs";
import { useFormDisabled, useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem } from "../../form/src/hooks/use-form-item.mjs";
import { useGlobalConfig } from "../../config-provider/src/hooks/use-global-config.mjs";
import { buttonGroupContextKey } from "./constants.mjs";
import { Text, computed, inject, ref, useSlots } from "vue";

//#region ../../packages/components/button/src/use-button.ts
const useButton = (props, emit) => {
	useDeprecated({
		from: "type.text",
		replacement: "link",
		version: "3.0.0",
		scope: "props",
		ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
	}, computed(() => props.type === "text"));
	const buttonGroupContext = inject(buttonGroupContextKey, void 0);
	const globalConfig = useGlobalConfig("button");
	const { form } = useFormItem();
	const _size = useFormSize(computed(() => buttonGroupContext?.size));
	const _disabled = useFormDisabled();
	const _ref = ref();
	const slots = useSlots();
	const _type = computed(() => props.type || buttonGroupContext?.type || globalConfig.value?.type || "");
	const autoInsertSpace = computed(() => props.autoInsertSpace ?? globalConfig.value?.autoInsertSpace ?? false);
	const _plain = computed(() => props.plain ?? globalConfig.value?.plain ?? false);
	const _round = computed(() => props.round ?? globalConfig.value?.round ?? false);
	const _text = computed(() => props.text ?? globalConfig.value?.text ?? false);
	const _dashed = computed(() => props.dashed ?? globalConfig.value?.dashed ?? false);
	const _props = computed(() => {
		if (props.tag === "button") return {
			ariaDisabled: _disabled.value || props.loading,
			disabled: _disabled.value || props.loading,
			autofocus: props.autofocus,
			type: props.nativeType
		};
		return {};
	});
	const shouldAddSpace = computed(() => {
		const defaultSlot = slots.default?.();
		if (autoInsertSpace.value && defaultSlot?.length === 1) {
			const slot = defaultSlot[0];
			if (slot?.type === Text) {
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
export { useButton };
//# sourceMappingURL=use-button.mjs.map
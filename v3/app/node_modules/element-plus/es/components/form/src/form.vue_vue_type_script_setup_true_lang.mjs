import { isArray, isFunction } from "../../../utils/types.mjs";
import { getProp } from "../../../utils/objects.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { ensureArray } from "../../../utils/arrays.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { formEmits, formProps } from "./form.mjs";
import { formContextKey } from "./constants.mjs";
import { useFormSize } from "./hooks/use-form-common-props.mjs";
import { filterFields, useFormLabelWidth } from "./utils.mjs";
import { cloneDeep } from "lodash-unified";
import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, provide, reactive, ref, renderSlot, toRefs, watch } from "vue";

//#region ../../packages/components/form/src/form.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElForm";
var form_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "form",
	props: formProps,
	emits: formEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const formRef = ref();
		const fields = reactive([]);
		const initialValues = /* @__PURE__ */ new Map();
		const formSize = useFormSize();
		const ns = useNamespace("form");
		const formClasses = computed(() => {
			const { labelPosition, inline } = props;
			return [
				ns.b(),
				ns.m(formSize.value || "default"),
				{
					[ns.m(`label-${labelPosition}`)]: labelPosition,
					[ns.m("inline")]: inline
				}
			];
		});
		const getField = (prop) => {
			return filterFields(fields, [prop])[0];
		};
		const addField = (field) => {
			if (!fields.includes(field)) fields.push(field);
			if (field.propString) if (initialValues.has(field.propString)) field.setInitialValue(initialValues.get(field.propString));
			else initialValues.set(field.propString, cloneDeep(field.fieldValue));
		};
		const removeField = (field, oldPropString) => {
			if (oldPropString) {
				initialValues.delete(oldPropString);
				return;
			}
			const idx = fields.indexOf(field);
			if (idx > -1) {
				fields.splice(idx, 1);
				if (field.propString) initialValues.set(field.propString, cloneDeep(field.getInitialValue()));
			}
		};
		const setInitialValues = (initModel) => {
			if (!props.model) {
				debugWarn(COMPONENT_NAME, "model is required for setInitialValues to work.");
				return;
			}
			if (!initModel) {
				debugWarn(COMPONENT_NAME, "initModel is required for setInitialValues to work.");
				return;
			}
			for (const key of initialValues.keys()) initialValues.set(key, cloneDeep(getProp(initModel, key).value));
			fields.forEach((field) => {
				if (field.prop) field.setInitialValue(getProp(initModel, field.prop).value);
			});
		};
		const resetFields = (properties = []) => {
			if (!props.model) {
				debugWarn(COMPONENT_NAME, "model is required for resetFields to work.");
				return;
			}
			filterFields(fields, properties).forEach((field) => field.resetField());
			const activePropStrings = new Set(fields.map((f) => f.propString).filter(Boolean));
			const propsToCheck = properties.length > 0 ? ensureArray(properties).map((p) => isArray(p) ? p.join(".") : p) : [...initialValues.keys()];
			for (const propString of propsToCheck) if (!activePropStrings.has(propString) && initialValues.has(propString)) getProp(props.model, propString).value = cloneDeep(initialValues.get(propString));
		};
		const clearValidate = (props = []) => {
			filterFields(fields, props).forEach((field) => field.clearValidate());
		};
		const isValidatable = computed(() => {
			const hasModel = !!props.model;
			if (!hasModel) debugWarn(COMPONENT_NAME, "model is required for validate to work.");
			return hasModel;
		});
		const obtainValidateFields = (props) => {
			if (fields.length === 0) return [];
			const filteredFields = filterFields(fields, props);
			if (!filteredFields.length) {
				debugWarn(COMPONENT_NAME, "please pass correct props!");
				return [];
			}
			return filteredFields;
		};
		const validate = async (callback) => validateField(void 0, callback);
		const doValidateField = async (props = []) => {
			if (!isValidatable.value) return false;
			const fields = obtainValidateFields(props);
			if (fields.length === 0) return true;
			let validationErrors = {};
			for (const field of fields) try {
				await field.validate("");
				if (field.validateState === "error" && !field.error) field.resetField();
			} catch (fields) {
				validationErrors = {
					...validationErrors,
					...fields
				};
			}
			if (Object.keys(validationErrors).length === 0) return true;
			return Promise.reject(validationErrors);
		};
		const validateField = async (modelProps = [], callback) => {
			let result = false;
			const shouldThrow = !isFunction(callback);
			try {
				result = await doValidateField(modelProps);
				if (result === true) await callback?.(result);
				return result;
			} catch (e) {
				if (e instanceof Error) throw e;
				const invalidFields = e;
				if (props.scrollToError) {
					if (formRef.value) formRef.value.querySelector(`.${ns.b()}-item.is-error`)?.scrollIntoView(props.scrollIntoViewOptions);
				}
				!result && await callback?.(false, invalidFields);
				return shouldThrow && Promise.reject(invalidFields);
			}
		};
		const scrollToField = (prop) => {
			const field = getField(prop);
			if (field) field.$el?.scrollIntoView(props.scrollIntoViewOptions);
		};
		watch(() => props.rules, () => {
			if (props.validateOnRuleChange) validate().catch((err) => debugWarn(err));
		}, {
			deep: true,
			flush: "post"
		});
		provide(formContextKey, reactive({
			...toRefs(props),
			emit,
			resetFields,
			clearValidate,
			validateField,
			getField,
			addField,
			removeField,
			setInitialValues,
			...useFormLabelWidth()
		}));
		__expose({
			validate,
			validateField,
			resetFields,
			clearValidate,
			scrollToField,
			getField,
			fields,
			setInitialValues
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("form", {
				ref_key: "formRef",
				ref: formRef,
				class: normalizeClass(formClasses.value)
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
export { form_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=form.vue_vue_type_script_setup_true_lang.mjs.map
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_objects = require('../../../utils/objects.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_form = require('./form.js');
const require_constants = require('./constants.js');
const require_use_form_common_props = require('./hooks/use-form-common-props.js');
const require_utils = require('./utils.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/form/src/form.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElForm";
var form_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "form",
	props: require_form.formProps,
	emits: require_form.formEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const formRef = (0, vue.ref)();
		const fields = (0, vue.reactive)([]);
		const initialValues = /* @__PURE__ */ new Map();
		const formSize = require_use_form_common_props.useFormSize();
		const ns = require_index.useNamespace("form");
		const formClasses = (0, vue.computed)(() => {
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
			return require_utils.filterFields(fields, [prop])[0];
		};
		const addField = (field) => {
			if (!fields.includes(field)) fields.push(field);
			if (field.propString) if (initialValues.has(field.propString)) field.setInitialValue(initialValues.get(field.propString));
			else initialValues.set(field.propString, (0, lodash_unified.cloneDeep)(field.fieldValue));
		};
		const removeField = (field, oldPropString) => {
			if (oldPropString) {
				initialValues.delete(oldPropString);
				return;
			}
			const idx = fields.indexOf(field);
			if (idx > -1) {
				fields.splice(idx, 1);
				if (field.propString) initialValues.set(field.propString, (0, lodash_unified.cloneDeep)(field.getInitialValue()));
			}
		};
		const setInitialValues = (initModel) => {
			if (!props.model) {
				require_error.debugWarn(COMPONENT_NAME, "model is required for setInitialValues to work.");
				return;
			}
			if (!initModel) {
				require_error.debugWarn(COMPONENT_NAME, "initModel is required for setInitialValues to work.");
				return;
			}
			for (const key of initialValues.keys()) initialValues.set(key, (0, lodash_unified.cloneDeep)(require_objects.getProp(initModel, key).value));
			fields.forEach((field) => {
				if (field.prop) field.setInitialValue(require_objects.getProp(initModel, field.prop).value);
			});
		};
		const resetFields = (properties = []) => {
			if (!props.model) {
				require_error.debugWarn(COMPONENT_NAME, "model is required for resetFields to work.");
				return;
			}
			require_utils.filterFields(fields, properties).forEach((field) => field.resetField());
			const activePropStrings = new Set(fields.map((f) => f.propString).filter(Boolean));
			const propsToCheck = properties.length > 0 ? (0, lodash_unified.castArray)(properties).map((p) => (0, _vue_shared.isArray)(p) ? p.join(".") : p) : [...initialValues.keys()];
			for (const propString of propsToCheck) if (!activePropStrings.has(propString) && initialValues.has(propString)) require_objects.getProp(props.model, propString).value = (0, lodash_unified.cloneDeep)(initialValues.get(propString));
		};
		const clearValidate = (props = []) => {
			require_utils.filterFields(fields, props).forEach((field) => field.clearValidate());
		};
		const isValidatable = (0, vue.computed)(() => {
			const hasModel = !!props.model;
			if (!hasModel) require_error.debugWarn(COMPONENT_NAME, "model is required for validate to work.");
			return hasModel;
		});
		const obtainValidateFields = (props) => {
			if (fields.length === 0) return [];
			const filteredFields = require_utils.filterFields(fields, props);
			if (!filteredFields.length) {
				require_error.debugWarn(COMPONENT_NAME, "please pass correct props!");
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
			const shouldThrow = !(0, _vue_shared.isFunction)(callback);
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
		(0, vue.watch)(() => props.rules, () => {
			if (props.validateOnRuleChange) validate().catch((err) => require_error.debugWarn(err));
		}, {
			deep: true,
			flush: "post"
		});
		(0, vue.provide)(require_constants.formContextKey, (0, vue.reactive)({
			...(0, vue.toRefs)(props),
			emit,
			resetFields,
			clearValidate,
			validateField,
			getField,
			addField,
			removeField,
			setInitialValues,
			...require_utils.useFormLabelWidth()
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("form", {
				ref_key: "formRef",
				ref: formRef,
				class: (0, vue.normalizeClass)(formClasses.value)
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
exports.default = form_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=form.vue_vue_type_script_setup_true_lang.js.map
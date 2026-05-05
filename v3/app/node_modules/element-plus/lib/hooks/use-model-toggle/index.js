Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_types = require('../../utils/types.js');
const require_runtime$1 = require('../../utils/vue/props/runtime.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/hooks/use-model-toggle/index.ts
const _prop = require_runtime$1.buildProp({
	type: require_runtime$1.definePropType(Boolean),
	default: null
});
const _event = require_runtime$1.buildProp({ type: require_runtime$1.definePropType(Function) });
const createModelToggleComposable = (name) => {
	const updateEventKey = `update:${name}`;
	const updateEventKeyRaw = `onUpdate:${name}`;
	const useModelToggleEmits = [updateEventKey];
	const useModelToggleProps = {
		[name]: _prop,
		[updateEventKeyRaw]: _event
	};
	const useModelToggle = ({ indicator, toggleReason, shouldHideWhenRouteChanges, shouldProceed, onShow, onHide }) => {
		const instance = (0, vue.getCurrentInstance)();
		const { emit } = instance;
		const props = instance.props;
		const hasUpdateHandler = (0, vue.computed)(() => (0, _vue_shared.isFunction)(props[updateEventKeyRaw]));
		const isModelBindingAbsent = (0, vue.computed)(() => props[name] === null);
		const doShow = (event) => {
			if (indicator.value === true) return;
			indicator.value = true;
			if (toggleReason) toggleReason.value = event;
			if ((0, _vue_shared.isFunction)(onShow)) onShow(event);
		};
		const doHide = (event) => {
			if (indicator.value === false) return;
			indicator.value = false;
			if (toggleReason) toggleReason.value = event;
			if ((0, _vue_shared.isFunction)(onHide)) onHide(event);
		};
		const show = (event) => {
			if (props.disabled === true || (0, _vue_shared.isFunction)(shouldProceed) && !shouldProceed()) return;
			const shouldEmit = hasUpdateHandler.value && _vueuse_core.isClient;
			if (shouldEmit) emit(updateEventKey, true);
			if (isModelBindingAbsent.value || !shouldEmit) doShow(event);
		};
		const hide = (event) => {
			if (props.disabled === true || !_vueuse_core.isClient) return;
			const shouldEmit = hasUpdateHandler.value && _vueuse_core.isClient;
			if (shouldEmit) emit(updateEventKey, false);
			if (isModelBindingAbsent.value || !shouldEmit) doHide(event);
		};
		const onChange = (val) => {
			if (!require_types.isBoolean(val)) return;
			if (props.disabled && val) {
				if (hasUpdateHandler.value) emit(updateEventKey, false);
			} else if (indicator.value !== val) if (val) doShow();
			else doHide();
		};
		const toggle = () => {
			if (indicator.value) hide();
			else show();
		};
		(0, vue.watch)(() => props[name], onChange);
		if (shouldHideWhenRouteChanges && instance.appContext.config.globalProperties.$route !== void 0) (0, vue.watch)(() => ({ ...instance.proxy.$route }), () => {
			if (shouldHideWhenRouteChanges.value && indicator.value) hide();
		});
		(0, vue.onMounted)(() => {
			onChange(props[name]);
		});
		return {
			hide,
			show,
			toggle,
			hasUpdateHandler
		};
	};
	return {
		useModelToggle,
		useModelToggleProps,
		useModelToggleEmits
	};
};
const { useModelToggle, useModelToggleProps, useModelToggleEmits } = createModelToggleComposable("modelValue");

//#endregion
exports.createModelToggleComposable = createModelToggleComposable;
exports.useModelToggle = useModelToggle;
exports.useModelToggleEmits = useModelToggleEmits;
exports.useModelToggleProps = useModelToggleProps;
//# sourceMappingURL=index.js.map
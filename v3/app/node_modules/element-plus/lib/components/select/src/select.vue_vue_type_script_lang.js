const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_vnode = require('../../../utils/vue/vnode.js');
const require_index = require('../../../directives/click-outside/index.js');
const require_index$1 = require('../../../hooks/use-calc-input-width/index.js');
const require_index$2 = require('../../icon/index.js');
const require_index$3 = require('../../tooltip/index.js');
const require_index$4 = require('../../scrollbar/index.js');
const require_index$5 = require('../../tag/index.js');
const require_useProps = require('../../select-v2/src/useProps.js');
const require_token = require('./token.js');
const require_option = require('./option2.js');
const require_select_dropdown = require('./select-dropdown.js');
const require_useSelect = require('./useSelect.js');
const require_options = require('./options.js');
const require_select = require('./select.js');
const require_option_group = require('./option-group.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/select/src/select.vue?vue&type=script&lang.ts
const COMPONENT_NAME = "ElSelect";
const warnHandlerMap = /* @__PURE__ */ new WeakMap();
const createSelectWarnHandler = (appContext) => {
	return (...args) => {
		const message = args[0];
		if (!message || message.includes("Slot \"default\" invoked outside of the render function") && args[2]?.includes("ElTreeSelect")) return;
		const original = warnHandlerMap.get(appContext)?.originalWarnHandler;
		if (original) {
			original(...args);
			return;
		}
		console.warn(...args);
	};
};
const getWarnHandlerRecord = (appContext) => {
	let record = warnHandlerMap.get(appContext);
	if (!record) {
		record = {
			originalWarnHandler: appContext.config.warnHandler,
			handler: createSelectWarnHandler(appContext),
			count: 0
		};
		warnHandlerMap.set(appContext, record);
	}
	return record;
};
var select_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	componentName: COMPONENT_NAME,
	components: {
		ElSelectMenu: require_select_dropdown.default,
		ElOption: require_option.default,
		ElOptions: require_options.default,
		ElOptionGroup: require_option_group.default,
		ElTag: require_index$5.ElTag,
		ElScrollbar: require_index$4.ElScrollbar,
		ElTooltip: require_index$3.ElTooltip,
		ElIcon: require_index$2.ElIcon
	},
	directives: { ClickOutside: require_index.default },
	props: require_select.selectProps,
	emits: [
		require_event.UPDATE_MODEL_EVENT,
		require_event.CHANGE_EVENT,
		"remove-tag",
		"clear",
		"visible-change",
		"focus",
		"blur",
		"popup-scroll"
	],
	setup(props, { emit, slots }) {
		const instance = (0, vue.getCurrentInstance)();
		const warnRecord = getWarnHandlerRecord(instance.appContext);
		warnRecord.count += 1;
		instance.appContext.config.warnHandler = warnRecord.handler;
		const modelValue = (0, vue.computed)(() => {
			const { modelValue: rawModelValue, multiple } = props;
			const fallback = multiple ? [] : void 0;
			if ((0, _vue_shared.isArray)(rawModelValue)) return multiple ? rawModelValue : fallback;
			return multiple ? fallback : rawModelValue;
		});
		const _props = (0, vue.reactive)({
			...(0, vue.toRefs)(props),
			modelValue
		});
		const API = require_useSelect.useSelect(_props, emit);
		const { calculatorRef, inputStyle } = require_index$1.useCalcInputWidth();
		const { getLabel, getValue, getOptions, getDisabled } = require_useProps.useProps(props);
		const getOptionProps = (option) => ({
			label: getLabel(option),
			value: getValue(option),
			disabled: getDisabled(option)
		});
		const flatTreeSelectData = (data) => {
			return data.reduce((acc, item) => {
				acc.push(item);
				if (item.children && item.children.length > 0) acc.push(...flatTreeSelectData(item.children));
				return acc;
			}, []);
		};
		const manuallyRenderSlots = (vnodes) => {
			require_vnode.flattedChildren(vnodes || []).forEach((item) => {
				if ((0, _vue_shared.isObject)(item) && (item.type.name === "ElOption" || item.type.name === "ElTree")) {
					const _name = item.type.name;
					if (_name === "ElTree") flatTreeSelectData(item.props?.data || []).forEach((treeItem) => {
						treeItem.currentLabel = treeItem.label ?? ((0, _vue_shared.isObject)(treeItem.value) ? "" : treeItem.value);
						API.onOptionCreate(treeItem);
					});
					else if (_name === "ElOption") {
						const obj = { ...item.props };
						obj.currentLabel = obj.label ?? ((0, _vue_shared.isObject)(obj.value) ? "" : obj.value);
						API.onOptionCreate(obj);
					}
				}
			});
		};
		(0, vue.watch)(() => [props.persistent || API.expanded.value || !slots.default ? void 0 : slots.default?.(), modelValue.value], () => {
			if (props.persistent || API.expanded.value) return;
			if (!slots.default) return;
			API.states.options.clear();
			manuallyRenderSlots(slots.default?.());
		}, { immediate: true });
		(0, vue.provide)(require_token.selectKey, (0, vue.reactive)({
			props: _props,
			states: API.states,
			selectRef: API.selectRef,
			optionsArray: API.optionsArray,
			setSelected: API.setSelected,
			handleOptionSelect: API.handleOptionSelect,
			onOptionCreate: API.onOptionCreate,
			onOptionDestroy: API.onOptionDestroy
		}));
		const selectedLabel = (0, vue.computed)(() => {
			if (!props.multiple) return API.states.selectedLabel;
			return API.states.selected.map((i) => i.currentLabel);
		});
		(0, vue.onBeforeUnmount)(() => {
			const record = warnHandlerMap.get(instance.appContext);
			if (!record) return;
			record.count -= 1;
			if (record.count <= 0) {
				instance.appContext.config.warnHandler = record.originalWarnHandler;
				warnHandlerMap.delete(instance.appContext);
			}
		});
		return {
			...API,
			modelValue,
			selectedLabel,
			calculatorRef,
			inputStyle,
			getLabel,
			getValue,
			getOptions,
			getDisabled,
			getOptionProps
		};
	}
});

//#endregion
exports.default = select_vue_vue_type_script_lang_default;
//# sourceMappingURL=select.vue_vue_type_script_lang.js.map
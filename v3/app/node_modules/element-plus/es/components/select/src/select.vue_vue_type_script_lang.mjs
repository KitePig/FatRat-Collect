import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isArray, isObject } from "../../../utils/types.mjs";
import { flattedChildren } from "../../../utils/vue/vnode.mjs";
import ClickOutside from "../../../directives/click-outside/index.mjs";
import { useCalcInputWidth } from "../../../hooks/use-calc-input-width/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { ElScrollbar } from "../../scrollbar/index.mjs";
import { ElTag } from "../../tag/index.mjs";
import { useProps } from "../../select-v2/src/useProps.mjs";
import { selectKey } from "./token.mjs";
import option_default from "./option2.mjs";
import select_dropdown_default from "./select-dropdown.mjs";
import { useSelect } from "./useSelect.mjs";
import options_default from "./options.mjs";
import { selectProps } from "./select.mjs";
import option_group_default from "./option-group.mjs";
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, provide, reactive, toRefs, watch } from "vue";

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
var select_vue_vue_type_script_lang_default = defineComponent({
	name: COMPONENT_NAME,
	componentName: COMPONENT_NAME,
	components: {
		ElSelectMenu: select_dropdown_default,
		ElOption: option_default,
		ElOptions: options_default,
		ElOptionGroup: option_group_default,
		ElTag,
		ElScrollbar,
		ElTooltip,
		ElIcon
	},
	directives: { ClickOutside },
	props: selectProps,
	emits: [
		UPDATE_MODEL_EVENT,
		CHANGE_EVENT,
		"remove-tag",
		"clear",
		"visible-change",
		"focus",
		"blur",
		"popup-scroll"
	],
	setup(props, { emit, slots }) {
		const instance = getCurrentInstance();
		const warnRecord = getWarnHandlerRecord(instance.appContext);
		warnRecord.count += 1;
		instance.appContext.config.warnHandler = warnRecord.handler;
		const modelValue = computed(() => {
			const { modelValue: rawModelValue, multiple } = props;
			const fallback = multiple ? [] : void 0;
			if (isArray(rawModelValue)) return multiple ? rawModelValue : fallback;
			return multiple ? fallback : rawModelValue;
		});
		const _props = reactive({
			...toRefs(props),
			modelValue
		});
		const API = useSelect(_props, emit);
		const { calculatorRef, inputStyle } = useCalcInputWidth();
		const { getLabel, getValue, getOptions, getDisabled } = useProps(props);
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
			flattedChildren(vnodes || []).forEach((item) => {
				if (isObject(item) && (item.type.name === "ElOption" || item.type.name === "ElTree")) {
					const _name = item.type.name;
					if (_name === "ElTree") flatTreeSelectData(item.props?.data || []).forEach((treeItem) => {
						treeItem.currentLabel = treeItem.label ?? (isObject(treeItem.value) ? "" : treeItem.value);
						API.onOptionCreate(treeItem);
					});
					else if (_name === "ElOption") {
						const obj = { ...item.props };
						obj.currentLabel = obj.label ?? (isObject(obj.value) ? "" : obj.value);
						API.onOptionCreate(obj);
					}
				}
			});
		};
		watch(() => [props.persistent || API.expanded.value || !slots.default ? void 0 : slots.default?.(), modelValue.value], () => {
			if (props.persistent || API.expanded.value) return;
			if (!slots.default) return;
			API.states.options.clear();
			manuallyRenderSlots(slots.default?.());
		}, { immediate: true });
		provide(selectKey, reactive({
			props: _props,
			states: API.states,
			selectRef: API.selectRef,
			optionsArray: API.optionsArray,
			setSelected: API.setSelected,
			handleOptionSelect: API.handleOptionSelect,
			onOptionCreate: API.onOptionCreate,
			onOptionDestroy: API.onOptionDestroy
		}));
		const selectedLabel = computed(() => {
			if (!props.multiple) return API.states.selectedLabel;
			return API.states.selected.map((i) => i.currentLabel);
		});
		onBeforeUnmount(() => {
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
export { select_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=select.vue_vue_type_script_lang.mjs.map
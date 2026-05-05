import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { computed } from "vue";

//#region ../../packages/components/cascader-panel/src/config.ts
const CommonProps = buildProps({
	modelValue: { type: definePropType([
		Number,
		String,
		Array,
		Object
	]) },
	options: {
		type: definePropType(Array),
		default: () => []
	},
	props: {
		type: definePropType(Object),
		default: () => ({})
	}
});
const DefaultProps = {
	expandTrigger: "click",
	multiple: false,
	checkStrictly: false,
	emitPath: true,
	lazy: false,
	lazyLoad: NOOP,
	value: "value",
	label: "label",
	children: "children",
	leaf: "leaf",
	disabled: "disabled",
	hoverThreshold: 500,
	checkOnClickNode: false,
	checkOnClickLeaf: true,
	showPrefix: true
};
/**
* @deprecated Removed after 3.0.0, Use `CascaderPanelProps` instead.
*/
const cascaderPanelProps = buildProps({
	...CommonProps,
	border: {
		type: Boolean,
		default: true
	},
	renderLabel: { type: Function }
});
const emitChangeFn = (value) => true;
const cascaderPanelEmits = {
	[UPDATE_MODEL_EVENT]: emitChangeFn,
	[CHANGE_EVENT]: emitChangeFn,
	close: () => true,
	"expand-change": (value) => value
};
const useCascaderConfig = (props) => {
	return computed(() => ({
		...DefaultProps,
		...props.props
	}));
};

//#endregion
export { CommonProps, DefaultProps, cascaderPanelEmits, cascaderPanelProps, useCascaderConfig };
//# sourceMappingURL=config.mjs.map
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/cascader-panel/src/config.ts
const CommonProps = require_runtime$1.buildProps({
	modelValue: { type: require_runtime$1.definePropType([
		Number,
		String,
		Array,
		Object
	]) },
	options: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	}
});
const DefaultProps = {
	expandTrigger: "click",
	multiple: false,
	checkStrictly: false,
	emitPath: true,
	lazy: false,
	lazyLoad: _vue_shared.NOOP,
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
const cascaderPanelProps = require_runtime$1.buildProps({
	...CommonProps,
	border: {
		type: Boolean,
		default: true
	},
	renderLabel: { type: Function }
});
const emitChangeFn = (value) => true;
const cascaderPanelEmits = {
	[require_event.UPDATE_MODEL_EVENT]: emitChangeFn,
	[require_event.CHANGE_EVENT]: emitChangeFn,
	close: () => true,
	"expand-change": (value) => value
};
const useCascaderConfig = (props) => {
	return (0, vue.computed)(() => ({
		...DefaultProps,
		...props.props
	}));
};

//#endregion
exports.CommonProps = CommonProps;
exports.DefaultProps = DefaultProps;
exports.cascaderPanelEmits = cascaderPanelEmits;
exports.cascaderPanelProps = cascaderPanelProps;
exports.useCascaderConfig = useCascaderConfig;
//# sourceMappingURL=config.js.map
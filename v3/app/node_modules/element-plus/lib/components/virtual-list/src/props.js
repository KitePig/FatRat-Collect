Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');
const require_defaults = require('./defaults.js');

//#region ../../packages/components/virtual-list/src/props.ts
const itemSize = require_runtime.buildProp({
	type: require_runtime.definePropType([Number, Function]),
	required: true
});
const estimatedItemSize = require_runtime.buildProp({ type: Number });
const cache = require_runtime.buildProp({
	type: Number,
	default: 2
});
const direction = require_runtime.buildProp({
	type: String,
	values: ["ltr", "rtl"],
	default: "ltr"
});
const initScrollOffset = require_runtime.buildProp({
	type: Number,
	default: 0
});
const total = require_runtime.buildProp({
	type: Number,
	required: true
});
const layout = require_runtime.buildProp({
	type: String,
	values: ["horizontal", "vertical"],
	default: require_defaults.VERTICAL
});
const virtualizedProps = require_runtime.buildProps({
	className: {
		type: String,
		default: ""
	},
	containerElement: {
		type: require_runtime.definePropType([String, Object]),
		default: "div"
	},
	data: {
		type: require_runtime.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	direction,
	height: {
		type: [String, Number],
		required: true
	},
	innerElement: {
		type: [String, Object],
		default: "div"
	},
	innerProps: {
		type: require_runtime.definePropType(Object),
		default: () => ({})
	},
	style: { type: require_runtime.definePropType([
		Object,
		String,
		Array
	]) },
	useIsScrolling: Boolean,
	width: {
		type: [Number, String],
		required: false
	},
	perfMode: {
		type: Boolean,
		default: true
	},
	scrollbarAlwaysOn: Boolean
});
const virtualizedListProps = require_runtime.buildProps({
	cache,
	estimatedItemSize,
	layout,
	initScrollOffset,
	total,
	itemSize,
	...virtualizedProps
});
const scrollbarSize = {
	type: Number,
	default: 6
};
const startGap = {
	type: Number,
	default: 0
};
const endGap = {
	type: Number,
	default: 2
};
const virtualizedGridProps = require_runtime.buildProps({
	columnCache: cache,
	columnWidth: itemSize,
	estimatedColumnWidth: estimatedItemSize,
	estimatedRowHeight: estimatedItemSize,
	initScrollLeft: initScrollOffset,
	initScrollTop: initScrollOffset,
	itemKey: {
		type: require_runtime.definePropType(Function),
		default: ({ columnIndex, rowIndex }) => `${rowIndex}:${columnIndex}`
	},
	rowCache: cache,
	rowHeight: itemSize,
	totalColumn: total,
	totalRow: total,
	hScrollbarSize: scrollbarSize,
	vScrollbarSize: scrollbarSize,
	scrollbarStartGap: startGap,
	scrollbarEndGap: endGap,
	role: String,
	...virtualizedProps
});
const virtualizedScrollbarProps = require_runtime.buildProps({
	alwaysOn: Boolean,
	class: String,
	layout,
	total,
	ratio: {
		type: Number,
		required: true
	},
	clientSize: {
		type: Number,
		required: true
	},
	scrollFrom: {
		type: Number,
		required: true
	},
	scrollbarSize,
	startGap,
	endGap,
	visible: Boolean
});

//#endregion
exports.virtualizedGridProps = virtualizedGridProps;
exports.virtualizedListProps = virtualizedListProps;
exports.virtualizedProps = virtualizedProps;
exports.virtualizedScrollbarProps = virtualizedScrollbarProps;
//# sourceMappingURL=props.js.map
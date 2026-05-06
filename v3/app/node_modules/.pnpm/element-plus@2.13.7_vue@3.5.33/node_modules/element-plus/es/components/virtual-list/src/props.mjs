import { buildProp, buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../utils/typescript.mjs";
import { VERTICAL } from "./defaults.mjs";

//#region ../../packages/components/virtual-list/src/props.ts
const itemSize = buildProp({
	type: definePropType([Number, Function]),
	required: true
});
const estimatedItemSize = buildProp({ type: Number });
const cache = buildProp({
	type: Number,
	default: 2
});
const direction = buildProp({
	type: String,
	values: ["ltr", "rtl"],
	default: "ltr"
});
const initScrollOffset = buildProp({
	type: Number,
	default: 0
});
const total = buildProp({
	type: Number,
	required: true
});
const layout = buildProp({
	type: String,
	values: ["horizontal", "vertical"],
	default: VERTICAL
});
const virtualizedProps = buildProps({
	className: {
		type: String,
		default: ""
	},
	containerElement: {
		type: definePropType([String, Object]),
		default: "div"
	},
	data: {
		type: definePropType(Array),
		default: () => mutable([])
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
		type: definePropType(Object),
		default: () => ({})
	},
	style: { type: definePropType([
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
const virtualizedListProps = buildProps({
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
const virtualizedGridProps = buildProps({
	columnCache: cache,
	columnWidth: itemSize,
	estimatedColumnWidth: estimatedItemSize,
	estimatedRowHeight: estimatedItemSize,
	initScrollLeft: initScrollOffset,
	initScrollTop: initScrollOffset,
	itemKey: {
		type: definePropType(Function),
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
const virtualizedScrollbarProps = buildProps({
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
export { virtualizedGridProps, virtualizedListProps, virtualizedProps, virtualizedScrollbarProps };
//# sourceMappingURL=props.mjs.map
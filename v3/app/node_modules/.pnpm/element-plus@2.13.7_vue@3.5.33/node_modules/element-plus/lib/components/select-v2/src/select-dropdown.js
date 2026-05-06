const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_useProps = require('./useProps.js');
const require_fixed_size_list = require('../../virtual-list/src/components/fixed-size-list.js');
const require_dynamic_size_list = require('../../virtual-list/src/components/dynamic-size-list.js');
const require_group_item = require('./group-item.js');
const require_token = require('./token.js');
const require_option_item = require('./option-item.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/components/select-v2/src/select-dropdown.tsx
const props = {
	loading: Boolean,
	data: {
		type: Array,
		required: true
	},
	hoveringIndex: Number,
	width: Number,
	id: String,
	ariaLabel: String
};
var select_dropdown_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSelectDropdown",
	props,
	setup(props, { slots, expose }) {
		const select = (0, vue.inject)(require_token.selectV2InjectionKey);
		const ns = require_index.useNamespace("select");
		const { getLabel, getValue, getDisabled } = require_useProps.useProps(select.props);
		const cachedHeights = (0, vue.ref)([]);
		const listRef = (0, vue.ref)();
		const size = (0, vue.computed)(() => props.data.length);
		(0, vue.watch)(() => size.value, () => {
			select.tooltipRef.value?.updatePopper?.();
		});
		const isSized = (0, vue.computed)(() => require_types.isUndefined(select.props.estimatedOptionHeight));
		const listProps = (0, vue.computed)(() => {
			if (isSized.value) return { itemSize: select.props.itemHeight };
			return {
				estimatedSize: select.props.estimatedOptionHeight,
				itemSize: (idx) => cachedHeights.value[idx]
			};
		});
		const contains = (arr = [], target) => {
			const { props: { valueKey } } = select;
			if (!(0, _vue_shared.isObject)(target)) return arr.includes(target);
			return arr && arr.some((item) => {
				return (0, vue.toRaw)((0, lodash_unified.get)(item, valueKey)) === (0, lodash_unified.get)(target, valueKey);
			});
		};
		const isEqual = (selected, target) => {
			if (!(0, _vue_shared.isObject)(target)) return selected === target;
			else {
				const { valueKey } = select.props;
				return (0, lodash_unified.get)(selected, valueKey) === (0, lodash_unified.get)(target, valueKey);
			}
		};
		const isItemSelected = (modelValue, target) => {
			if (select.props.multiple) return contains(modelValue, getValue(target));
			return isEqual(modelValue, getValue(target));
		};
		const isItemDisabled = (modelValue, selected) => {
			const { disabled, multiple, multipleLimit } = select.props;
			return disabled || !selected && (multiple ? multipleLimit > 0 && modelValue.length >= multipleLimit : false);
		};
		const isItemHovering = (target) => props.hoveringIndex === target;
		const scrollToItem = (index) => {
			const list = listRef.value;
			if (list) list.scrollToItem(index);
		};
		const resetScrollTop = () => {
			const list = listRef.value;
			if (list) list.resetScrollTop();
		};
		expose({
			listRef,
			isSized,
			isItemDisabled,
			isItemHovering,
			isItemSelected,
			scrollToItem,
			resetScrollTop
		});
		const Item = (itemProps) => {
			const { index, data, style } = itemProps;
			const sized = (0, vue.unref)(isSized);
			const { itemSize, estimatedSize } = (0, vue.unref)(listProps);
			const { modelValue } = select.props;
			const { onSelect, onHover } = select;
			const item = data[index];
			if (item.type === "Group") return (0, vue.createVNode)(require_group_item.default, {
				"item": item,
				"style": style,
				"height": sized ? itemSize : estimatedSize
			}, null);
			const isSelected = isItemSelected(modelValue, item);
			const isDisabled = isItemDisabled(modelValue, isSelected);
			const isHovering = isItemHovering(index);
			return (0, vue.createVNode)(require_option_item.default, (0, vue.mergeProps)(itemProps, {
				"selected": isSelected,
				"disabled": getDisabled(item) || isDisabled,
				"created": !!item.created,
				"hovering": isHovering,
				"item": item,
				"onSelect": onSelect,
				"onHover": onHover
			}), { default: (props) => slots.default?.(props) || (0, vue.createVNode)("span", null, [getLabel(item)]) });
		};
		const { onKeyboardNavigate, onKeyboardSelect } = select;
		const onForward = () => {
			onKeyboardNavigate("forward");
		};
		const onBackward = () => {
			onKeyboardNavigate("backward");
		};
		const onEscOrTab = () => {};
		const onKeydown = (e) => {
			const code = require_event.getEventCode(e);
			const { tab, esc, down, up, enter, numpadEnter } = require_aria.EVENT_CODE;
			if ([
				esc,
				down,
				up,
				enter,
				numpadEnter
			].includes(code)) {
				e.preventDefault();
				e.stopPropagation();
			}
			switch (code) {
				case tab:
				case esc:
					onEscOrTab();
					break;
				case down:
					onForward();
					break;
				case up:
					onBackward();
					break;
				case enter:
				case numpadEnter:
					onKeyboardSelect();
					break;
			}
		};
		return () => {
			const { data, width } = props;
			const { height, multiple, scrollbarAlwaysOn } = select.props;
			const isScrollbarAlwaysOn = (0, vue.computed)(() => {
				return _vueuse_core.isIOS ? true : scrollbarAlwaysOn;
			});
			const List = (0, vue.unref)(isSized) ? require_fixed_size_list.default : require_dynamic_size_list.default;
			return (0, vue.createVNode)("div", {
				"class": [ns.b("dropdown"), ns.is("multiple", multiple)],
				"style": { width: `${width}px` }
			}, [
				slots.header?.(),
				slots.loading?.() || slots.empty?.() || (0, vue.createVNode)(List, (0, vue.mergeProps)({ "ref": listRef }, (0, vue.unref)(listProps), {
					"className": ns.be("dropdown", "list"),
					"scrollbarAlwaysOn": isScrollbarAlwaysOn.value,
					"data": data,
					"height": height,
					"width": width,
					"total": data.length,
					"innerElement": "ul",
					"innerProps": {
						id: props.id,
						role: "listbox",
						"aria-label": props.ariaLabel,
						"aria-orientation": "vertical"
					},
					"onKeydown": onKeydown
				}), { default: (props) => (0, vue.createVNode)(Item, props, null) }),
				slots.footer?.()
			]);
		};
	}
});

//#endregion
exports.default = select_dropdown_default;
//# sourceMappingURL=select-dropdown.js.map
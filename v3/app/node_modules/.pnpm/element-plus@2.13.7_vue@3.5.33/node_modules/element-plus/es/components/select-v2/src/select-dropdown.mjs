import { EVENT_CODE } from "../../../constants/aria.mjs";
import { isIOS } from "../../../utils/browser.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isObject, isUndefined as isUndefined$1 } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useProps } from "./useProps.mjs";
import FixedSizeList from "../../virtual-list/src/components/fixed-size-list.mjs";
import DynamicSizeList from "../../virtual-list/src/components/dynamic-size-list.mjs";
import group_item_default from "./group-item.mjs";
import { selectV2InjectionKey } from "./token.mjs";
import option_item_default from "./option-item.mjs";
import { get } from "lodash-unified";
import { computed, createVNode, defineComponent, inject, mergeProps, ref, toRaw, unref, watch } from "vue";

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
var select_dropdown_default = /* @__PURE__ */ defineComponent({
	name: "ElSelectDropdown",
	props,
	setup(props, { slots, expose }) {
		const select = inject(selectV2InjectionKey);
		const ns = useNamespace("select");
		const { getLabel, getValue, getDisabled } = useProps(select.props);
		const cachedHeights = ref([]);
		const listRef = ref();
		const size = computed(() => props.data.length);
		watch(() => size.value, () => {
			select.tooltipRef.value?.updatePopper?.();
		});
		const isSized = computed(() => isUndefined$1(select.props.estimatedOptionHeight));
		const listProps = computed(() => {
			if (isSized.value) return { itemSize: select.props.itemHeight };
			return {
				estimatedSize: select.props.estimatedOptionHeight,
				itemSize: (idx) => cachedHeights.value[idx]
			};
		});
		const contains = (arr = [], target) => {
			const { props: { valueKey } } = select;
			if (!isObject(target)) return arr.includes(target);
			return arr && arr.some((item) => {
				return toRaw(get(item, valueKey)) === get(target, valueKey);
			});
		};
		const isEqual = (selected, target) => {
			if (!isObject(target)) return selected === target;
			else {
				const { valueKey } = select.props;
				return get(selected, valueKey) === get(target, valueKey);
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
			const sized = unref(isSized);
			const { itemSize, estimatedSize } = unref(listProps);
			const { modelValue } = select.props;
			const { onSelect, onHover } = select;
			const item = data[index];
			if (item.type === "Group") return createVNode(group_item_default, {
				"item": item,
				"style": style,
				"height": sized ? itemSize : estimatedSize
			}, null);
			const isSelected = isItemSelected(modelValue, item);
			const isDisabled = isItemDisabled(modelValue, isSelected);
			const isHovering = isItemHovering(index);
			return createVNode(option_item_default, mergeProps(itemProps, {
				"selected": isSelected,
				"disabled": getDisabled(item) || isDisabled,
				"created": !!item.created,
				"hovering": isHovering,
				"item": item,
				"onSelect": onSelect,
				"onHover": onHover
			}), { default: (props) => slots.default?.(props) || createVNode("span", null, [getLabel(item)]) });
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
			const code = getEventCode(e);
			const { tab, esc, down, up, enter, numpadEnter } = EVENT_CODE;
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
			const isScrollbarAlwaysOn = computed(() => {
				return isIOS ? true : scrollbarAlwaysOn;
			});
			const List = unref(isSized) ? FixedSizeList : DynamicSizeList;
			return createVNode("div", {
				"class": [ns.b("dropdown"), ns.is("multiple", multiple)],
				"style": { width: `${width}px` }
			}, [
				slots.header?.(),
				slots.loading?.() || slots.empty?.() || createVNode(List, mergeProps({ "ref": listRef }, unref(listProps), {
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
				}), { default: (props) => createVNode(Item, props, null) }),
				slots.footer?.()
			]);
		};
	}
});

//#endregion
export { select_dropdown_default as default };
//# sourceMappingURL=select-dropdown.mjs.map
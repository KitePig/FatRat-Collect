import { EVENT_CODE } from "../../../constants/aria.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isPropAbsent } from "../../../utils/types.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { ElScrollbar } from "../../scrollbar/index.mjs";
import { ElCheckbox, ElCheckboxGroup } from "../../checkbox/index.mjs";
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import { computed, defineComponent, getCurrentInstance, ref } from "vue";

//#region ../../packages/components/table/src/filter-panel.vue?vue&type=script&lang.ts
var filter_panel_vue_vue_type_script_lang_default = defineComponent({
	name: "ElTableFilterPanel",
	components: {
		ElCheckbox,
		ElCheckboxGroup,
		ElScrollbar,
		ElTooltip,
		ElIcon,
		ArrowDown,
		ArrowUp
	},
	props: {
		placement: {
			type: String,
			default: "bottom-start"
		},
		store: { type: Object },
		column: { type: Object },
		upDataColumn: { type: Function },
		appendTo: useTooltipContentProps.appendTo
	},
	setup(props) {
		const instance = getCurrentInstance();
		const { t } = useLocale();
		const ns = useNamespace("table-filter");
		const parent = instance?.parent;
		if (props.column && !parent.filterPanels.value[props.column.id]) parent.filterPanels.value[props.column.id] = instance;
		const tooltipRef = ref(null);
		const rootRef = ref(null);
		const checkedIndex = ref(0);
		const filters = computed(() => {
			return props.column && props.column.filters;
		});
		const filterClassName = computed(() => {
			if (props.column && props.column.filterClassName) return `${ns.b()} ${props.column.filterClassName}`;
			return ns.b();
		});
		const filterValue = computed({
			get: () => (props.column?.filteredValue || [])[0],
			set: (value) => {
				if (filteredValue.value) if (!isPropAbsent(value)) filteredValue.value.splice(0, 1, value);
				else filteredValue.value.splice(0, 1);
			}
		});
		const filteredValue = computed({
			get() {
				if (props.column) return props.column.filteredValue || [];
				return [];
			},
			set(value) {
				if (props.column) props.upDataColumn?.("filteredValue", value);
			}
		});
		const multiple = computed(() => {
			if (props.column) return props.column.filterMultiple;
			return true;
		});
		const isActive = (filter) => {
			return filter.value === filterValue.value;
		};
		const hidden = () => {
			tooltipRef.value?.onClose();
		};
		const handleConfirm = () => {
			confirmFilter(filteredValue.value);
			hidden();
		};
		const handleReset = () => {
			filteredValue.value = [];
			confirmFilter(filteredValue.value);
			hidden();
		};
		const handleSelect = (_filterValue, index) => {
			filterValue.value = _filterValue;
			checkedIndex.value = index;
			if (!isPropAbsent(_filterValue)) confirmFilter(filteredValue.value);
			else confirmFilter([]);
			hidden();
		};
		const confirmFilter = (filteredValue) => {
			props.store?.commit("filterChange", {
				column: props.column,
				values: filteredValue
			});
			props.store?.updateAllSelected();
		};
		const handleShowTooltip = () => {
			rootRef.value?.focus();
			!multiple.value && initCheckedIndex();
			if (props.column) props.upDataColumn?.("filterOpened", true);
		};
		const handleHideTooltip = () => {
			if (props.column) props.upDataColumn?.("filterOpened", false);
		};
		const initCheckedIndex = () => {
			if (isPropAbsent(filterValue)) {
				checkedIndex.value = 0;
				return;
			}
			const idx = (filters.value || []).findIndex((item) => {
				return item.value === filterValue.value;
			});
			checkedIndex.value = idx >= 0 ? idx + 1 : 0;
		};
		const handleKeydown = (event) => {
			const code = getEventCode(event);
			const len = (filters.value ? filters.value.length : 0) + 1;
			let index = checkedIndex.value;
			let isPreventDefault = true;
			switch (code) {
				case EVENT_CODE.down:
				case EVENT_CODE.right:
					index = (index + 1) % len;
					break;
				case EVENT_CODE.up:
				case EVENT_CODE.left:
					index = (index - 1 + len) % len;
					break;
				case EVENT_CODE.tab:
					hidden();
					isPreventDefault = false;
					break;
				case EVENT_CODE.enter:
				case EVENT_CODE.space:
					if (index === 0) handleSelect(null, 0);
					else {
						const item = (filters.value || [])[index - 1];
						item.value && handleSelect(item.value, index);
					}
					break;
				default:
					isPreventDefault = false;
					break;
			}
			isPreventDefault && event.preventDefault();
			checkedIndex.value = index;
			rootRef.value?.querySelector(`.${ns.e("list-item")}:nth-child(${index + 1})`)?.focus();
		};
		return {
			multiple,
			filterClassName,
			filteredValue,
			filterValue,
			filters,
			handleConfirm,
			handleReset,
			handleSelect,
			isPropAbsent,
			isActive,
			t,
			ns,
			tooltipRef,
			rootRef,
			checkedIndex,
			handleShowTooltip,
			handleHideTooltip,
			handleKeydown
		};
	}
});

//#endregion
export { filter_panel_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=filter-panel.vue_vue_type_script_lang.mjs.map
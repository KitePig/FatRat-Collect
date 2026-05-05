const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../icon/index.js');
const require_content = require('../../tooltip/src/content.js');
const require_index$3 = require('../../tooltip/index.js');
const require_index$4 = require('../../scrollbar/index.js');
const require_index$5 = require('../../checkbox/index.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/table/src/filter-panel.vue?vue&type=script&lang.ts
var filter_panel_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElTableFilterPanel",
	components: {
		ElCheckbox: require_index$5.ElCheckbox,
		ElCheckboxGroup: require_index$5.ElCheckboxGroup,
		ElScrollbar: require_index$4.ElScrollbar,
		ElTooltip: require_index$3.ElTooltip,
		ElIcon: require_index$2.ElIcon,
		ArrowDown: _element_plus_icons_vue.ArrowDown,
		ArrowUp: _element_plus_icons_vue.ArrowUp
	},
	props: {
		placement: {
			type: String,
			default: "bottom-start"
		},
		store: { type: Object },
		column: { type: Object },
		upDataColumn: { type: Function },
		appendTo: require_content.useTooltipContentProps.appendTo
	},
	setup(props) {
		const instance = (0, vue.getCurrentInstance)();
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("table-filter");
		const parent = instance?.parent;
		if (props.column && !parent.filterPanels.value[props.column.id]) parent.filterPanels.value[props.column.id] = instance;
		const tooltipRef = (0, vue.ref)(null);
		const rootRef = (0, vue.ref)(null);
		const checkedIndex = (0, vue.ref)(0);
		const filters = (0, vue.computed)(() => {
			return props.column && props.column.filters;
		});
		const filterClassName = (0, vue.computed)(() => {
			if (props.column && props.column.filterClassName) return `${ns.b()} ${props.column.filterClassName}`;
			return ns.b();
		});
		const filterValue = (0, vue.computed)({
			get: () => (props.column?.filteredValue || [])[0],
			set: (value) => {
				if (filteredValue.value) if (!require_types.isPropAbsent(value)) filteredValue.value.splice(0, 1, value);
				else filteredValue.value.splice(0, 1);
			}
		});
		const filteredValue = (0, vue.computed)({
			get() {
				if (props.column) return props.column.filteredValue || [];
				return [];
			},
			set(value) {
				if (props.column) props.upDataColumn?.("filteredValue", value);
			}
		});
		const multiple = (0, vue.computed)(() => {
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
			if (!require_types.isPropAbsent(_filterValue)) confirmFilter(filteredValue.value);
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
			if (require_types.isPropAbsent(filterValue)) {
				checkedIndex.value = 0;
				return;
			}
			const idx = (filters.value || []).findIndex((item) => {
				return item.value === filterValue.value;
			});
			checkedIndex.value = idx >= 0 ? idx + 1 : 0;
		};
		const handleKeydown = (event) => {
			const code = require_event.getEventCode(event);
			const len = (filters.value ? filters.value.length : 0) + 1;
			let index = checkedIndex.value;
			let isPreventDefault = true;
			switch (code) {
				case require_aria.EVENT_CODE.down:
				case require_aria.EVENT_CODE.right:
					index = (index + 1) % len;
					break;
				case require_aria.EVENT_CODE.up:
				case require_aria.EVENT_CODE.left:
					index = (index - 1 + len) % len;
					break;
				case require_aria.EVENT_CODE.tab:
					hidden();
					isPreventDefault = false;
					break;
				case require_aria.EVENT_CODE.enter:
				case require_aria.EVENT_CODE.space:
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
			isPropAbsent: require_types.isPropAbsent,
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
exports.default = filter_panel_vue_vue_type_script_lang_default;
//# sourceMappingURL=filter-panel.vue_vue_type_script_lang.js.map
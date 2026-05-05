Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_use_global_config = require('../../../config-provider/src/hooks/use-global-config.js');
const require_util = require('../util.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table/src/table-column/watcher-helper.ts
function getAllAliases(props, aliases) {
	return props.reduce((prev, cur) => {
		prev[cur] = cur;
		return prev;
	}, aliases);
}
function useWatcher(owner, props_) {
	const instance = (0, vue.getCurrentInstance)();
	const registerComplexWatchers = () => {
		const props = ["fixed"];
		const aliases = {
			realWidth: "width",
			realMinWidth: "minWidth"
		};
		const allAliases = getAllAliases(props, aliases);
		Object.keys(allAliases).forEach((key) => {
			const columnKey = aliases[key];
			if ((0, _vue_shared.hasOwn)(props_, columnKey)) (0, vue.watch)(() => props_[columnKey], (newVal) => {
				let value = newVal;
				if (columnKey === "width" && key === "realWidth") value = require_util.parseWidth(newVal);
				if (columnKey === "minWidth" && key === "realMinWidth") value = require_util.parseMinWidth(newVal);
				instance.columnConfig.value[columnKey] = value;
				instance.columnConfig.value[key] = value;
				const updateColumns = columnKey === "fixed";
				owner.value.store.scheduleLayout(updateColumns);
			});
		});
	};
	const registerNormalWatchers = () => {
		const props = [
			"label",
			"filters",
			"filterMultiple",
			"filteredValue",
			"sortable",
			"index",
			"formatter",
			"className",
			"labelClassName",
			"filterClassName",
			"showOverflowTooltip",
			"tooltipFormatter",
			"resizable"
		];
		const parentProps = ["showOverflowTooltip"];
		const aliases = {
			property: "prop",
			align: "realAlign",
			headerAlign: "realHeaderAlign"
		};
		const allAliases = getAllAliases(props, aliases);
		Object.keys(allAliases).forEach((key) => {
			const columnKey = aliases[key];
			if ((0, _vue_shared.hasOwn)(props_, columnKey)) (0, vue.watch)(() => props_[columnKey], (newVal) => {
				instance.columnConfig.value[key] = newVal;
				if (key === "filters" || key === "filterMethod") instance.columnConfig.value["filterable"] = !!(instance.columnConfig.value["filters"] || instance.columnConfig.value["filterMethod"]);
			});
		});
		parentProps.forEach((key) => {
			if ((0, _vue_shared.hasOwn)(owner.value.props, key)) (0, vue.watch)(() => owner.value.props[key], (newVal) => {
				if (instance.columnConfig.value.type === "selection") return;
				if (!require_types.isUndefined(props_[key])) return;
				instance.columnConfig.value[key] = newVal;
			});
		});
		const globalConfig = require_use_global_config.useGlobalConfig("table");
		if (globalConfig.value && (0, _vue_shared.hasOwn)(globalConfig.value, "showOverflowTooltip")) (0, vue.watch)(() => globalConfig.value?.showOverflowTooltip, (newVal) => {
			if (instance.columnConfig.value.type === "selection") return;
			if (!require_types.isUndefined(props_.showOverflowTooltip) || !require_types.isUndefined(owner.value.props.showOverflowTooltip)) return;
			instance.columnConfig.value.showOverflowTooltip = newVal;
		});
	};
	return {
		registerComplexWatchers,
		registerNormalWatchers
	};
}

//#endregion
exports.default = useWatcher;
//# sourceMappingURL=watcher-helper.js.map
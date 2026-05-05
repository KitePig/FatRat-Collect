import { isUndefined } from "../../../../utils/types.mjs";
import { hasOwn } from "../../../../utils/objects.mjs";
import { useGlobalConfig } from "../../../config-provider/src/hooks/use-global-config.mjs";
import { parseMinWidth, parseWidth } from "../util.mjs";
import { getCurrentInstance, watch } from "vue";

//#region ../../packages/components/table/src/table-column/watcher-helper.ts
function getAllAliases(props, aliases) {
	return props.reduce((prev, cur) => {
		prev[cur] = cur;
		return prev;
	}, aliases);
}
function useWatcher(owner, props_) {
	const instance = getCurrentInstance();
	const registerComplexWatchers = () => {
		const props = ["fixed"];
		const aliases = {
			realWidth: "width",
			realMinWidth: "minWidth"
		};
		const allAliases = getAllAliases(props, aliases);
		Object.keys(allAliases).forEach((key) => {
			const columnKey = aliases[key];
			if (hasOwn(props_, columnKey)) watch(() => props_[columnKey], (newVal) => {
				let value = newVal;
				if (columnKey === "width" && key === "realWidth") value = parseWidth(newVal);
				if (columnKey === "minWidth" && key === "realMinWidth") value = parseMinWidth(newVal);
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
			if (hasOwn(props_, columnKey)) watch(() => props_[columnKey], (newVal) => {
				instance.columnConfig.value[key] = newVal;
				if (key === "filters" || key === "filterMethod") instance.columnConfig.value["filterable"] = !!(instance.columnConfig.value["filters"] || instance.columnConfig.value["filterMethod"]);
			});
		});
		parentProps.forEach((key) => {
			if (hasOwn(owner.value.props, key)) watch(() => owner.value.props[key], (newVal) => {
				if (instance.columnConfig.value.type === "selection") return;
				if (!isUndefined(props_[key])) return;
				instance.columnConfig.value[key] = newVal;
			});
		});
		const globalConfig = useGlobalConfig("table");
		if (globalConfig.value && hasOwn(globalConfig.value, "showOverflowTooltip")) watch(() => globalConfig.value?.showOverflowTooltip, (newVal) => {
			if (instance.columnConfig.value.type === "selection") return;
			if (!isUndefined(props_.showOverflowTooltip) || !isUndefined(owner.value.props.showOverflowTooltip)) return;
			instance.columnConfig.value.showOverflowTooltip = newVal;
		});
	};
	return {
		registerComplexWatchers,
		registerNormalWatchers
	};
}

//#endregion
export { useWatcher as default };
//# sourceMappingURL=watcher-helper.mjs.map
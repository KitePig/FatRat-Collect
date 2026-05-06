Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/table/src/layout-observer.ts
function useLayoutObserver(root) {
	const instance = (0, vue.getCurrentInstance)();
	(0, vue.onBeforeMount)(() => {
		tableLayout.value.addObserver(instance);
	});
	(0, vue.onMounted)(() => {
		onColumnsChange(tableLayout.value);
		onScrollableChange(tableLayout.value);
	});
	(0, vue.onUpdated)(() => {
		onColumnsChange(tableLayout.value);
		onScrollableChange(tableLayout.value);
	});
	(0, vue.onUnmounted)(() => {
		tableLayout.value.removeObserver(instance);
	});
	const tableLayout = (0, vue.computed)(() => {
		const layout = root.layout;
		if (!layout) throw new Error("Can not find table layout.");
		return layout;
	});
	const onColumnsChange = (layout) => {
		const cols = root.vnode.el?.querySelectorAll("colgroup > col") || [];
		if (!cols.length) return;
		const flattenColumns = layout.getFlattenColumns();
		const columnsMap = {};
		flattenColumns.forEach((column) => {
			columnsMap[column.id] = column;
		});
		for (let i = 0, j = cols.length; i < j; i++) {
			const col = cols[i];
			const column = columnsMap[col.getAttribute("name")];
			if (column) col.setAttribute("width", column.realWidth || column.width);
		}
	};
	const onScrollableChange = (layout) => {
		const cols = root.vnode.el?.querySelectorAll("colgroup > col[name=gutter]") || [];
		for (let i = 0, j = cols.length; i < j; i++) cols[i].setAttribute("width", layout.scrollY.value ? layout.gutterWidth : "0");
		const ths = root.vnode.el?.querySelectorAll("th.gutter") || [];
		for (let i = 0, j = ths.length; i < j; i++) {
			const th = ths[i];
			th.style.width = layout.scrollY.value ? `${layout.gutterWidth}px` : "0";
			th.style.display = layout.scrollY.value ? "" : "none";
		}
	};
	return {
		tableLayout: tableLayout.value,
		onColumnsChange,
		onScrollableChange
	};
}

//#endregion
exports.default = useLayoutObserver;
//# sourceMappingURL=layout-observer.js.map
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_raf = require('../../../../utils/raf.js');
const require_style = require('../../../../utils/dom/style.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_util = require('../util.js');
const require_layout_observer = require('../layout-observer.js');
const require_tokens = require('../tokens.js');
const require_render_helper = require('./render-helper.js');
const require_defaults = require('./defaults.js');
let vue = require("vue");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/components/table/src/table-body/index.ts
var table_body_default = (0, vue.defineComponent)({
	name: "ElTableBody",
	props: require_defaults.default,
	setup(props) {
		const instance = (0, vue.getCurrentInstance)();
		const parent = (0, vue.inject)(require_tokens.TABLE_INJECTION_KEY);
		const ns = require_index.useNamespace("table");
		const { wrappedRowRender, tooltipContent, tooltipTrigger } = require_render_helper.default(props);
		const { onColumnsChange, onScrollableChange } = require_layout_observer.default(parent);
		const hoveredCellList = [];
		(0, vue.watch)(props.store?.states.hoverRow, (newVal, oldVal) => {
			const el = instance?.vnode.el;
			const rows = Array.from(el?.children || []).filter((e) => e?.classList.contains(`${ns.e("row")}`));
			let rowNum = newVal;
			const childNodes = rows[rowNum]?.childNodes;
			if (childNodes?.length) {
				let control = 0;
				Array.from(childNodes).reduce((acc, item, index) => {
					if (childNodes[index]?.colSpan > 1) control = childNodes[index]?.colSpan;
					if (item.nodeName !== "TD" && control === 0) acc.push(index);
					control > 0 && control--;
					return acc;
				}, []).forEach((rowIndex) => {
					rowNum = newVal;
					while (rowNum > 0) {
						const preChildNodes = rows[rowNum - 1]?.childNodes;
						if (preChildNodes[rowIndex] && preChildNodes[rowIndex].nodeName === "TD" && preChildNodes[rowIndex].rowSpan > 1) {
							require_style.addClass(preChildNodes[rowIndex], "hover-cell");
							hoveredCellList.push(preChildNodes[rowIndex]);
							break;
						}
						rowNum--;
					}
				});
			} else {
				hoveredCellList.forEach((item) => require_style.removeClass(item, "hover-cell"));
				hoveredCellList.length = 0;
			}
			if (!props.store?.states.isComplex.value || !_vueuse_core.isClient) return;
			require_raf.rAF(() => {
				const oldRow = rows[oldVal];
				const newRow = rows[newVal];
				if (oldRow && !oldRow.classList.contains("hover-fixed-row")) require_style.removeClass(oldRow, "hover-row");
				if (newRow) require_style.addClass(newRow, "hover-row");
			});
		});
		(0, vue.onUnmounted)(() => {
			require_util.removePopper?.();
		});
		return {
			ns,
			onColumnsChange,
			onScrollableChange,
			wrappedRowRender,
			tooltipContent,
			tooltipTrigger
		};
	},
	render() {
		const { wrappedRowRender, store } = this;
		return (0, vue.h)("tbody", { tabIndex: -1 }, [(store?.states.data.value || []).reduce((acc, row) => {
			return acc.concat(wrappedRowRender(row, acc.length));
		}, [])]);
	}
});

//#endregion
exports.default = table_body_default;
//# sourceMappingURL=index.js.map
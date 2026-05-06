import { isClient } from "../../../../utils/browser.mjs";
import { rAF } from "../../../../utils/raf.mjs";
import { addClass, removeClass } from "../../../../utils/dom/style.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { removePopper } from "../util.mjs";
import useLayoutObserver from "../layout-observer.mjs";
import { TABLE_INJECTION_KEY } from "../tokens.mjs";
import useRender from "./render-helper.mjs";
import defaultProps from "./defaults.mjs";
import { defineComponent, getCurrentInstance, h, inject, onUnmounted, watch } from "vue";

//#region ../../packages/components/table/src/table-body/index.ts
var table_body_default = defineComponent({
	name: "ElTableBody",
	props: defaultProps,
	setup(props) {
		const instance = getCurrentInstance();
		const parent = inject(TABLE_INJECTION_KEY);
		const ns = useNamespace("table");
		const { wrappedRowRender, tooltipContent, tooltipTrigger } = useRender(props);
		const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent);
		const hoveredCellList = [];
		watch(props.store?.states.hoverRow, (newVal, oldVal) => {
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
							addClass(preChildNodes[rowIndex], "hover-cell");
							hoveredCellList.push(preChildNodes[rowIndex]);
							break;
						}
						rowNum--;
					}
				});
			} else {
				hoveredCellList.forEach((item) => removeClass(item, "hover-cell"));
				hoveredCellList.length = 0;
			}
			if (!props.store?.states.isComplex.value || !isClient) return;
			rAF(() => {
				const oldRow = rows[oldVal];
				const newRow = rows[newVal];
				if (oldRow && !oldRow.classList.contains("hover-fixed-row")) removeClass(oldRow, "hover-row");
				if (newRow) addClass(newRow, "hover-row");
			});
		});
		onUnmounted(() => {
			removePopper?.();
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
		return h("tbody", { tabIndex: -1 }, [(store?.states.data.value || []).reduce((acc, row) => {
			return acc.concat(wrappedRowRender(row, acc.length));
		}, [])]);
	}
});

//#endregion
export { table_body_default as default };
//# sourceMappingURL=index.mjs.map
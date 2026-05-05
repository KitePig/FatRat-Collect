import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { ROOT_PICKER_INJECTION_KEY } from "../constants.mjs";
import { basicCellProps } from "../props/basic-cell.mjs";
import { createVNode, defineComponent, inject, renderSlot } from "vue";

//#region ../../packages/components/date-picker-panel/src/date-picker-com/basic-cell-render.tsx
var basic_cell_render_default = /* @__PURE__ */ defineComponent({
	name: "ElDatePickerCell",
	props: basicCellProps,
	setup(props) {
		const ns = useNamespace("date-table-cell");
		const { slots } = inject(ROOT_PICKER_INJECTION_KEY);
		return () => {
			const { cell } = props;
			return renderSlot(slots, "default", { ...cell }, () => [createVNode("div", { "class": ns.b() }, [createVNode("span", { "class": ns.e("text") }, [cell?.renderText ?? cell?.text])])]);
		};
	}
});

//#endregion
export { basic_cell_render_default as default };
//# sourceMappingURL=basic-cell-render.mjs.map
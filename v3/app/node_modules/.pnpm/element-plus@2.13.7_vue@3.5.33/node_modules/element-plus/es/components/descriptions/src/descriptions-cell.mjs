import { addUnit } from "../../../utils/dom/style.mjs";
import { getNormalizedProps } from "../../../utils/vue/vnode.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { descriptionsKey } from "./token.mjs";
import { isNil } from "lodash-unified";
import { defineComponent, h, inject, withDirectives } from "vue";

//#region ../../packages/components/descriptions/src/descriptions-cell.ts
var descriptions_cell_default = defineComponent({
	name: "ElDescriptionsCell",
	props: {
		cell: { type: Object },
		tag: {
			type: String,
			default: "td"
		},
		type: { type: String }
	},
	setup() {
		return { descriptions: inject(descriptionsKey, {}) };
	},
	render() {
		const item = getNormalizedProps(this.cell);
		const directives = (this.cell?.dirs || []).map((dire) => {
			const { dir, arg, modifiers, value } = dire;
			return [
				dir,
				value,
				arg,
				modifiers
			];
		});
		const { border, direction } = this.descriptions;
		const isVertical = direction === "vertical";
		const renderLabel = () => this.cell?.children?.label?.() || item.label;
		const renderContent = () => this.cell?.children?.default?.();
		const span = item.span;
		const rowspan = item.rowspan;
		const align = item.align ? `is-${item.align}` : "";
		const labelAlign = item.labelAlign ? `is-${item.labelAlign}` : align;
		const className = item.className;
		const labelClassName = item.labelClassName;
		const style = {
			width: addUnit(this.type === "label" ? item.labelWidth ?? this.descriptions.labelWidth ?? item.width : item.width),
			minWidth: addUnit(item.minWidth)
		};
		const ns = useNamespace("descriptions");
		switch (this.type) {
			case "label": return withDirectives(h(this.tag, {
				style,
				class: [
					ns.e("cell"),
					ns.e("label"),
					ns.is("bordered-label", border),
					ns.is("vertical-label", isVertical),
					labelAlign,
					labelClassName
				],
				colSpan: isVertical ? span : 1,
				rowspan: isVertical ? 1 : rowspan
			}, renderLabel()), directives);
			case "content": return withDirectives(h(this.tag, {
				style,
				class: [
					ns.e("cell"),
					ns.e("content"),
					ns.is("bordered-content", border),
					ns.is("vertical-content", isVertical),
					align,
					className
				],
				colSpan: isVertical ? span : span * 2 - 1,
				rowspan: isVertical ? rowspan * 2 - 1 : rowspan
			}, renderContent()), directives);
			default: {
				const label = renderLabel();
				const labelStyle = {};
				const width = addUnit(item.labelWidth ?? this.descriptions.labelWidth);
				if (width) {
					labelStyle.width = width;
					labelStyle.display = "inline-block";
				}
				return withDirectives(h("td", {
					style,
					class: [ns.e("cell"), align],
					colSpan: span,
					rowspan
				}, [!isNil(label) ? h("span", {
					style: labelStyle,
					class: [ns.e("label"), labelClassName]
				}, label) : void 0, h("span", { class: [ns.e("content"), className] }, renderContent())]), directives);
			}
		}
	}
});

//#endregion
export { descriptions_cell_default as default };
//# sourceMappingURL=descriptions-cell.mjs.map
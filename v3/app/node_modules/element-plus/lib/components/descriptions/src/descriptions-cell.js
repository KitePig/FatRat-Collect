Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../utils/dom/style.js');
const require_vnode = require('../../../utils/vue/vnode.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_token = require('./token.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/descriptions/src/descriptions-cell.ts
var descriptions_cell_default = (0, vue.defineComponent)({
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
		return { descriptions: (0, vue.inject)(require_token.descriptionsKey, {}) };
	},
	render() {
		const item = require_vnode.getNormalizedProps(this.cell);
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
			width: require_style.addUnit(this.type === "label" ? item.labelWidth ?? this.descriptions.labelWidth ?? item.width : item.width),
			minWidth: require_style.addUnit(item.minWidth)
		};
		const ns = require_index.useNamespace("descriptions");
		switch (this.type) {
			case "label": return (0, vue.withDirectives)((0, vue.h)(this.tag, {
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
			case "content": return (0, vue.withDirectives)((0, vue.h)(this.tag, {
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
				const width = require_style.addUnit(item.labelWidth ?? this.descriptions.labelWidth);
				if (width) {
					labelStyle.width = width;
					labelStyle.display = "inline-block";
				}
				return (0, vue.withDirectives)((0, vue.h)("td", {
					style,
					class: [ns.e("cell"), align],
					colSpan: span,
					rowspan
				}, [!(0, lodash_unified.isNil)(label) ? (0, vue.h)("span", {
					style: labelStyle,
					class: [ns.e("label"), labelClassName]
				}, label) : void 0, (0, vue.h)("span", { class: [ns.e("content"), className] }, renderContent())]), directives);
			}
		}
	}
});

//#endregion
exports.default = descriptions_cell_default;
//# sourceMappingURL=descriptions-cell.js.map
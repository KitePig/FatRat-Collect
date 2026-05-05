Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_layout_observer = require('../layout-observer.js');
const require_tokens = require('../tokens.js');
const require_style_helper = require('./style-helper.js');
let vue = require("vue");

//#region ../../packages/components/table/src/table-footer/index.ts
var table_footer_default = (0, vue.defineComponent)({
	name: "ElTableFooter",
	props: {
		fixed: {
			type: String,
			default: ""
		},
		store: {
			required: true,
			type: Object
		},
		summaryMethod: Function,
		sumText: String,
		border: Boolean,
		defaultSort: {
			type: Object,
			default: () => {
				return {
					prop: "",
					order: ""
				};
			}
		}
	},
	setup(props) {
		const parent = (0, vue.inject)(require_tokens.TABLE_INJECTION_KEY);
		const ns = require_index.useNamespace("table");
		const { getCellClasses, getCellStyles, columns } = require_style_helper.default(props);
		const { onScrollableChange, onColumnsChange } = require_layout_observer.default(parent);
		return {
			ns,
			onScrollableChange,
			onColumnsChange,
			getCellClasses,
			getCellStyles,
			columns
		};
	},
	render() {
		const { columns, getCellStyles, getCellClasses, summaryMethod, sumText } = this;
		const data = this.store.states.data.value;
		let sums = [];
		if (summaryMethod) sums = summaryMethod({
			columns,
			data
		});
		else columns.forEach((column, index) => {
			if (index === 0) {
				sums[index] = sumText;
				return;
			}
			const values = data.map((item) => Number(item[column.property]));
			const precisions = [];
			let notNumber = true;
			values.forEach((value) => {
				if (!Number.isNaN(+value)) {
					notNumber = false;
					const decimal = `${value}`.split(".")[1];
					precisions.push(decimal ? decimal.length : 0);
				}
			});
			const precision = Math.max.apply(null, precisions);
			if (!notNumber) sums[index] = values.reduce((prev, curr) => {
				const value = Number(curr);
				if (!Number.isNaN(+value)) return Number.parseFloat((prev + curr).toFixed(Math.min(precision, 20)));
				else return prev;
			}, 0);
			else sums[index] = "";
		});
		return (0, vue.h)((0, vue.h)("tfoot", [(0, vue.h)("tr", {}, [...columns.map((column, cellIndex) => (0, vue.h)("td", {
			key: cellIndex,
			colspan: column.colSpan,
			rowspan: column.rowSpan,
			class: getCellClasses(columns, cellIndex),
			style: getCellStyles(column, cellIndex)
		}, [(0, vue.h)("div", { class: ["cell", column.labelClassName] }, [sums[cellIndex]])]))])]));
	}
});

//#endregion
exports.default = table_footer_default;
//# sourceMappingURL=index.js.map
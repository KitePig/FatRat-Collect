Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_tokens = require('../tokens.js');
let vue = require("vue");

//#region ../../packages/components/table/src/table-footer/mapState-helper.ts
function useMapState() {
	const store = (0, vue.inject)(require_tokens.TABLE_INJECTION_KEY)?.store;
	return {
		leftFixedLeafCount: (0, vue.computed)(() => {
			return store?.states.fixedLeafColumnsLength.value ?? 0;
		}),
		rightFixedLeafCount: (0, vue.computed)(() => {
			return store?.states.rightFixedColumns.value.length ?? 0;
		}),
		columnsCount: (0, vue.computed)(() => {
			return store?.states.columns.value.length ?? 0;
		}),
		leftFixedCount: (0, vue.computed)(() => {
			return store?.states.fixedColumns.value.length ?? 0;
		}),
		rightFixedCount: (0, vue.computed)(() => {
			return store?.states.rightFixedColumns.value.length ?? 0;
		}),
		columns: (0, vue.computed)(() => store?.states.columns.value ?? [])
	};
}

//#endregion
exports.default = useMapState;
//# sourceMappingURL=mapState-helper.js.map
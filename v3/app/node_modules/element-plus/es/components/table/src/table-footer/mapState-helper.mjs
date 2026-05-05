import { TABLE_INJECTION_KEY } from "../tokens.mjs";
import { computed, inject } from "vue";

//#region ../../packages/components/table/src/table-footer/mapState-helper.ts
function useMapState() {
	const store = inject(TABLE_INJECTION_KEY)?.store;
	return {
		leftFixedLeafCount: computed(() => {
			return store?.states.fixedLeafColumnsLength.value ?? 0;
		}),
		rightFixedLeafCount: computed(() => {
			return store?.states.rightFixedColumns.value.length ?? 0;
		}),
		columnsCount: computed(() => {
			return store?.states.columns.value.length ?? 0;
		}),
		leftFixedCount: computed(() => {
			return store?.states.fixedColumns.value.length ?? 0;
		}),
		rightFixedCount: computed(() => {
			return store?.states.rightFixedColumns.value.length ?? 0;
		}),
		columns: computed(() => store?.states.columns.value ?? [])
	};
}

//#endregion
export { useMapState as default };
//# sourceMappingURL=mapState-helper.mjs.map
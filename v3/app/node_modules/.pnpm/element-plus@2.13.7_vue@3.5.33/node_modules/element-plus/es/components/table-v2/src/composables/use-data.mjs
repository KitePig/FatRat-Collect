import { isArray } from "../../../../utils/types.mjs";
import { computed, ref, unref, watch } from "vue";

//#region ../../packages/components/table-v2/src/composables/use-data.ts
const useData = (props, { expandedRowKeys, lastRenderedRowIndex, resetAfterIndex }) => {
	const depthMap = ref({});
	const flattenedData = computed(() => {
		const depths = {};
		const { data, rowKey } = props;
		const _expandedRowKeys = unref(expandedRowKeys);
		if (!_expandedRowKeys || !_expandedRowKeys.length) return data;
		const array = [];
		const keysSet = /* @__PURE__ */ new Set();
		_expandedRowKeys.forEach((x) => keysSet.add(x));
		let copy = data.slice();
		copy.forEach((x) => depths[x[rowKey]] = 0);
		while (copy.length > 0) {
			const item = copy.shift();
			array.push(item);
			if (keysSet.has(item[rowKey]) && isArray(item.children) && item.children.length > 0) {
				copy = [...item.children, ...copy];
				item.children.forEach((child) => depths[child[rowKey]] = depths[item[rowKey]] + 1);
			}
		}
		depthMap.value = depths;
		return array;
	});
	const data = computed(() => {
		const { data, expandColumnKey } = props;
		return expandColumnKey ? unref(flattenedData) : data;
	});
	watch(data, (val, prev) => {
		if (val !== prev) {
			lastRenderedRowIndex.value = -1;
			resetAfterIndex(0, true);
		}
	});
	return {
		data,
		depthMap
	};
};

//#endregion
export { useData };
//# sourceMappingURL=use-data.mjs.map
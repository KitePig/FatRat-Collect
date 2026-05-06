Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table-v2/src/composables/use-data.ts
const useData = (props, { expandedRowKeys, lastRenderedRowIndex, resetAfterIndex }) => {
	const depthMap = (0, vue.ref)({});
	const flattenedData = (0, vue.computed)(() => {
		const depths = {};
		const { data, rowKey } = props;
		const _expandedRowKeys = (0, vue.unref)(expandedRowKeys);
		if (!_expandedRowKeys || !_expandedRowKeys.length) return data;
		const array = [];
		const keysSet = /* @__PURE__ */ new Set();
		_expandedRowKeys.forEach((x) => keysSet.add(x));
		let copy = data.slice();
		copy.forEach((x) => depths[x[rowKey]] = 0);
		while (copy.length > 0) {
			const item = copy.shift();
			array.push(item);
			if (keysSet.has(item[rowKey]) && (0, _vue_shared.isArray)(item.children) && item.children.length > 0) {
				copy = [...item.children, ...copy];
				item.children.forEach((child) => depths[child[rowKey]] = depths[item[rowKey]] + 1);
			}
		}
		depthMap.value = depths;
		return array;
	});
	const data = (0, vue.computed)(() => {
		const { data, expandColumnKey } = props;
		return expandColumnKey ? (0, vue.unref)(flattenedData) : data;
	});
	(0, vue.watch)(data, (val, prev) => {
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
exports.useData = useData;
//# sourceMappingURL=use-data.js.map
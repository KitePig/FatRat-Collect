Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/tree-select/src/utils.ts
function isValidValue(val) {
	return val || val === 0;
}
function isValidArray(val) {
	return (0, _vue_shared.isArray)(val) && val.length;
}
function toValidArray(val) {
	return (0, _vue_shared.isArray)(val) ? val : isValidValue(val) ? [val] : [];
}
function treeFind(treeData, findCallback, getChildren, resultCallback, parent) {
	for (let i = 0; i < treeData.length; i++) {
		const data = treeData[i];
		if (findCallback(data, i, treeData, parent)) return resultCallback ? resultCallback(data, i, treeData, parent) : data;
		else {
			const children = getChildren(data);
			if (isValidArray(children)) {
				const find = treeFind(children, findCallback, getChildren, resultCallback, data);
				if (find) return find;
			}
		}
	}
}
function treeEach(treeData, callback, getChildren, parent) {
	for (let i = 0; i < treeData.length; i++) {
		const data = treeData[i];
		callback(data, i, treeData, parent);
		const children = getChildren(data);
		if (isValidArray(children)) treeEach(children, callback, getChildren, data);
	}
}

//#endregion
exports.isValidArray = isValidArray;
exports.isValidValue = isValidValue;
exports.toValidArray = toValidArray;
exports.treeEach = treeEach;
exports.treeFind = treeFind;
//# sourceMappingURL=utils.js.map
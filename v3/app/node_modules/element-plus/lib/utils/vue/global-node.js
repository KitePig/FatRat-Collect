Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/utils/vue/global-node.ts
const globalNodes = [];
let target = !_vueuse_core.isClient ? void 0 : document.body;
function createGlobalNode(id) {
	const el = document.createElement("div");
	if (id !== void 0) el.setAttribute("id", id);
	if (target) {
		target.appendChild(el);
		globalNodes.push(el);
	}
	return el;
}
function removeGlobalNode(el) {
	globalNodes.splice(globalNodes.indexOf(el), 1);
	el.remove();
}
function changeGlobalNodesTarget(el) {
	if (el === target) return;
	target = el;
	globalNodes.forEach((el) => {
		if (target && !el.contains(target)) target.appendChild(el);
	});
}

//#endregion
exports.changeGlobalNodesTarget = changeGlobalNodesTarget;
exports.createGlobalNode = createGlobalNode;
exports.removeGlobalNode = removeGlobalNode;
//# sourceMappingURL=global-node.js.map
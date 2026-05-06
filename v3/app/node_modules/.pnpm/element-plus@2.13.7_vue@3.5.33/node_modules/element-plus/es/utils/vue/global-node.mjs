import { isClient } from "../browser.mjs";

//#region ../../packages/utils/vue/global-node.ts
const globalNodes = [];
let target = !isClient ? void 0 : document.body;
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
export { changeGlobalNodesTarget, createGlobalNode, removeGlobalNode };
//# sourceMappingURL=global-node.mjs.map
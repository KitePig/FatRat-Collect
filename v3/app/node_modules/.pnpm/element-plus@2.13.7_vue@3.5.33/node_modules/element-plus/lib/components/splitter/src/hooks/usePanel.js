Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/splitter/src/hooks/usePanel.ts
function getCollapsible(collapsible) {
	if (collapsible && (0, _vue_shared.isObject)(collapsible)) return collapsible;
	return {
		start: !!collapsible,
		end: !!collapsible
	};
}
function isCollapsible(panel, size, nextPanel, nextSize) {
	if (panel?.collapsible.end && size > 0) return true;
	if (nextPanel?.collapsible.start && nextSize === 0 && size > 0) return true;
	return false;
}

//#endregion
exports.getCollapsible = getCollapsible;
exports.isCollapsible = isCollapsible;
//# sourceMappingURL=usePanel.js.map
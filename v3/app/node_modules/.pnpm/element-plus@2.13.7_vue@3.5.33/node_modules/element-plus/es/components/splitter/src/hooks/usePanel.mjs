import { isObject } from "../../../../utils/types.mjs";

//#region ../../packages/components/splitter/src/hooks/usePanel.ts
function getCollapsible(collapsible) {
	if (collapsible && isObject(collapsible)) return collapsible;
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
export { getCollapsible, isCollapsible };
//# sourceMappingURL=usePanel.mjs.map
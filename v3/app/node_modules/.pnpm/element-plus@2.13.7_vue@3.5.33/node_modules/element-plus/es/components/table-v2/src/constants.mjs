//#region ../../packages/components/table-v2/src/constants.ts
let SortOrder = /* @__PURE__ */ function(SortOrder) {
	SortOrder["ASC"] = "asc";
	SortOrder["DESC"] = "desc";
	return SortOrder;
}({});
let Alignment = /* @__PURE__ */ function(Alignment) {
	Alignment["LEFT"] = "left";
	Alignment["CENTER"] = "center";
	Alignment["RIGHT"] = "right";
	return Alignment;
}({});
let FixedDir = /* @__PURE__ */ function(FixedDir) {
	FixedDir["LEFT"] = "left";
	FixedDir["RIGHT"] = "right";
	return FixedDir;
}({});
const oppositeOrderMap = {
	[SortOrder.ASC]: SortOrder.DESC,
	[SortOrder.DESC]: SortOrder.ASC
};
const sortOrders = [SortOrder.ASC, SortOrder.DESC];

//#endregion
export { Alignment, FixedDir, SortOrder, oppositeOrderMap, sortOrders };
//# sourceMappingURL=constants.mjs.map
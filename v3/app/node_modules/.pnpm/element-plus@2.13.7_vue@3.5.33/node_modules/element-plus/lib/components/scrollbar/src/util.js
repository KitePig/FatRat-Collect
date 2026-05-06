Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

//#region ../../packages/components/scrollbar/src/util.ts
const GAP = 4;
const BAR_MAP = {
	vertical: {
		offset: "offsetHeight",
		scroll: "scrollTop",
		scrollSize: "scrollHeight",
		size: "height",
		key: "vertical",
		axis: "Y",
		client: "clientY",
		direction: "top"
	},
	horizontal: {
		offset: "offsetWidth",
		scroll: "scrollLeft",
		scrollSize: "scrollWidth",
		size: "width",
		key: "horizontal",
		axis: "X",
		client: "clientX",
		direction: "left"
	}
};
const renderThumbStyle = ({ move, size, bar }) => ({
	[bar.size]: size,
	transform: `translate${bar.axis}(${move}%)`
});

//#endregion
exports.BAR_MAP = BAR_MAP;
exports.GAP = GAP;
exports.renderThumbStyle = renderThumbStyle;
//# sourceMappingURL=util.js.map
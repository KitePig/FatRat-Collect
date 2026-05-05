Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../../utils/error.js');
const require_defaults = require('../defaults.js');
const require_utils = require('../utils.js');
const require_build_list = require('../builders/build-list.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/virtual-list/src/components/fixed-size-list.ts
const FixedSizeList = require_build_list.default({
	name: "ElFixedSizeList",
	getItemOffset: ({ itemSize }, index) => index * itemSize,
	getItemSize: ({ itemSize }) => itemSize,
	getEstimatedTotalSize: ({ total, itemSize }) => itemSize * total,
	getOffset: ({ height, total, itemSize, layout, width }, index, alignment, scrollOffset) => {
		const size = require_utils.isHorizontal(layout) ? width : height;
		if (process.env.NODE_ENV !== "production" && (0, _vue_shared.isString)(size)) require_error.throwError("[ElVirtualList]", `
        You should set
          width/height
        to number when your layout is
          horizontal/vertical
      `);
		const lastItemOffset = Math.max(0, total * itemSize - size);
		const maxOffset = Math.min(lastItemOffset, index * itemSize);
		const minOffset = Math.max(0, (index + 1) * itemSize - size);
		if (alignment === require_defaults.SMART_ALIGNMENT) if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) alignment = require_defaults.AUTO_ALIGNMENT;
		else alignment = require_defaults.CENTERED_ALIGNMENT;
		switch (alignment) {
			case require_defaults.START_ALIGNMENT: return maxOffset;
			case require_defaults.END_ALIGNMENT: return minOffset;
			case require_defaults.CENTERED_ALIGNMENT: {
				const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
				if (middleOffset < Math.ceil(size / 2)) return 0;
				else if (middleOffset > lastItemOffset + Math.floor(size / 2)) return lastItemOffset;
				else return middleOffset;
			}
			case require_defaults.AUTO_ALIGNMENT:
			default: if (scrollOffset >= minOffset && scrollOffset <= maxOffset) return scrollOffset;
			else if (scrollOffset < minOffset) return minOffset;
			else return maxOffset;
		}
	},
	getStartIndexForOffset: ({ total, itemSize }, offset) => Math.max(0, Math.min(total - 1, Math.floor(offset / itemSize))),
	getStopIndexForStartIndex: ({ height, total, itemSize, layout, width }, startIndex, scrollOffset) => {
		const offset = startIndex * itemSize;
		const size = require_utils.isHorizontal(layout) ? width : height;
		const numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize);
		return Math.max(0, Math.min(total - 1, startIndex + numVisibleItems - 1));
	},
	initCache() {},
	clearCache: true,
	validateProps() {}
});

//#endregion
exports.default = FixedSizeList;
//# sourceMappingURL=fixed-size-list.js.map
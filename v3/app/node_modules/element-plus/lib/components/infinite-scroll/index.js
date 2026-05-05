Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_index = require('./src/index.js');

//#region ../../packages/components/infinite-scroll/index.ts
const _InfiniteScroll = require_index.default;
_InfiniteScroll.install = (app) => {
	app.directive("InfiniteScroll", _InfiniteScroll);
};
const ElInfiniteScroll = _InfiniteScroll;

//#endregion
exports.ElInfiniteScroll = ElInfiniteScroll;
exports.default = _InfiniteScroll;
//# sourceMappingURL=index.js.map
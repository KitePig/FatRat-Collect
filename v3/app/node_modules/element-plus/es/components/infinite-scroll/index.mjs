import InfiniteScroll from "./src/index.mjs";

//#region ../../packages/components/infinite-scroll/index.ts
const _InfiniteScroll = InfiniteScroll;
_InfiniteScroll.install = (app) => {
	app.directive("InfiniteScroll", _InfiniteScroll);
};
const ElInfiniteScroll = _InfiniteScroll;

//#endregion
export { ElInfiniteScroll, _InfiniteScroll as default };
//# sourceMappingURL=index.mjs.map
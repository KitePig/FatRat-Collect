Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/table/src/table/key-render-helper.ts
function useKeyRender(table) {
	let observer;
	const initWatchDom = () => {
		const columnsWrapper = table.vnode.el.querySelector(".hidden-columns");
		const config = {
			childList: true,
			subtree: true
		};
		const updateOrderFns = table.store.states.updateOrderFns;
		observer = new MutationObserver(() => {
			updateOrderFns.forEach((fn) => fn());
		});
		observer.observe(columnsWrapper, config);
	};
	(0, vue.onMounted)(() => {
		initWatchDom();
	});
	(0, vue.onUnmounted)(() => {
		observer?.disconnect();
	});
}

//#endregion
exports.default = useKeyRender;
//# sourceMappingURL=key-render-helper.js.map
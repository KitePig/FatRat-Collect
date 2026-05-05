import { onMounted, onUnmounted } from "vue";

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
	onMounted(() => {
		initWatchDom();
	});
	onUnmounted(() => {
		observer?.disconnect();
	});
}

//#endregion
export { useKeyRender as default };
//# sourceMappingURL=key-render-helper.mjs.map
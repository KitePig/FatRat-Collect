import { isClient } from "../../utils/browser.mjs";
import { createGlobalNode, removeGlobalNode } from "../../utils/vue/global-node.mjs";
import { NOOP } from "../../utils/functions.mjs";
import { Teleport, h, onUnmounted, ref } from "vue";

//#region ../../packages/hooks/use-teleport/index.ts
const useTeleport = (contentRenderer, appendToBody) => {
	const isTeleportVisible = ref(false);
	if (!isClient) return {
		isTeleportVisible,
		showTeleport: NOOP,
		hideTeleport: NOOP,
		renderTeleport: NOOP
	};
	let $el = null;
	const showTeleport = () => {
		isTeleportVisible.value = true;
		if ($el !== null) return;
		$el = createGlobalNode();
	};
	const hideTeleport = () => {
		isTeleportVisible.value = false;
		if ($el !== null) {
			removeGlobalNode($el);
			$el = null;
		}
	};
	const renderTeleport = () => {
		return appendToBody.value !== true ? contentRenderer() : isTeleportVisible.value ? [h(Teleport, { to: $el }, contentRenderer())] : void 0;
	};
	onUnmounted(hideTeleport);
	return {
		isTeleportVisible,
		showTeleport,
		hideTeleport,
		renderTeleport
	};
};

//#endregion
export { useTeleport };
//# sourceMappingURL=index.mjs.map
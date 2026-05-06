Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_global_node = require('../../utils/vue/global-node.js');
let vue = require("vue");
let _vueuse_core = require("@vueuse/core");
let _vue_shared = require("@vue/shared");

//#region ../../packages/hooks/use-teleport/index.ts
const useTeleport = (contentRenderer, appendToBody) => {
	const isTeleportVisible = (0, vue.ref)(false);
	if (!_vueuse_core.isClient) return {
		isTeleportVisible,
		showTeleport: _vue_shared.NOOP,
		hideTeleport: _vue_shared.NOOP,
		renderTeleport: _vue_shared.NOOP
	};
	let $el = null;
	const showTeleport = () => {
		isTeleportVisible.value = true;
		if ($el !== null) return;
		$el = require_global_node.createGlobalNode();
	};
	const hideTeleport = () => {
		isTeleportVisible.value = false;
		if ($el !== null) {
			require_global_node.removeGlobalNode($el);
			$el = null;
		}
	};
	const renderTeleport = () => {
		return appendToBody.value !== true ? contentRenderer() : isTeleportVisible.value ? [(0, vue.h)(vue.Teleport, { to: $el }, contentRenderer())] : void 0;
	};
	(0, vue.onUnmounted)(hideTeleport);
	return {
		isTeleportVisible,
		showTeleport,
		hideTeleport,
		renderTeleport
	};
};

//#endregion
exports.useTeleport = useTeleport;
//# sourceMappingURL=index.js.map
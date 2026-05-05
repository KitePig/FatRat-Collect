Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/splitter/src/hooks/useContainer.ts
function useContainer(layout) {
	const containerEl = (0, vue.ref)();
	const { width, height } = (0, _vueuse_core.useElementSize)(containerEl);
	return {
		containerEl,
		containerSize: (0, vue.computed)(() => {
			return layout.value === "horizontal" ? width.value : height.value;
		})
	};
}

//#endregion
exports.useContainer = useContainer;
//# sourceMappingURL=useContainer.js.map
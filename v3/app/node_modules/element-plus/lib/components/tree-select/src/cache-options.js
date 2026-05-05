Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_token = require('../../select/src/token.js');
let vue = require("vue");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/components/tree-select/src/cache-options.ts
var cache_options_default = (0, vue.defineComponent)({
	props: { data: {
		type: Array,
		default: () => []
	} },
	setup(props) {
		const select = (0, vue.inject)(require_token.selectKey);
		(0, vue.watch)(() => props.data, () => {
			props.data.forEach((item) => {
				if (!select.states.cachedOptions.has(item.value)) select.states.cachedOptions.set(item.value, item);
			});
			const inputs = select.selectRef?.querySelectorAll("input") || [];
			if (_vueuse_core.isClient && !Array.from(inputs).includes(document.activeElement)) select.setSelected();
		}, {
			flush: "post",
			immediate: true
		});
		return () => void 0;
	}
});

//#endregion
exports.default = cache_options_default;
//# sourceMappingURL=cache-options.js.map
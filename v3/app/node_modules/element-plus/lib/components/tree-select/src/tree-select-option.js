Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../select/index.js');
let vue = require("vue");

//#region ../../packages/components/tree-select/src/tree-select-option.ts
const component = (0, vue.defineComponent)({
	extends: require_index.ElOption,
	setup(props, ctx) {
		const result = require_index.ElOption.setup(props, ctx);
		delete result.selectOptionClick;
		const vm = (0, vue.getCurrentInstance)().proxy;
		(0, vue.nextTick)(() => {
			if (!result.select.states.cachedOptions.get(vm.value)) result.select.onOptionCreate(vm);
		});
		(0, vue.watch)(() => ctx.attrs.visible, (val) => {
			(0, vue.nextTick)(() => {
				result.states.visible = val;
			});
		}, { immediate: true });
		return result;
	},
	methods: { selectOptionClick() {
		this.$el.parentElement.click();
	} }
});

//#endregion
exports.default = component;
//# sourceMappingURL=tree-select-option.js.map
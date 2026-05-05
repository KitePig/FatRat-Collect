import { ElOption } from "../../select/index.mjs";
import { defineComponent, getCurrentInstance, nextTick, watch } from "vue";

//#region ../../packages/components/tree-select/src/tree-select-option.ts
const component = defineComponent({
	extends: ElOption,
	setup(props, ctx) {
		const result = ElOption.setup(props, ctx);
		delete result.selectOptionClick;
		const vm = getCurrentInstance().proxy;
		nextTick(() => {
			if (!result.select.states.cachedOptions.get(vm.value)) result.select.onOptionCreate(vm);
		});
		watch(() => ctx.attrs.visible, (val) => {
			nextTick(() => {
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
export { component as default };
//# sourceMappingURL=tree-select-option.mjs.map
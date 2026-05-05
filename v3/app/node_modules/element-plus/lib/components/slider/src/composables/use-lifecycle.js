Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/slider/src/composables/use-lifecycle.ts
const useLifecycle = (props, initData, resetSize) => {
	const sliderWrapper = (0, vue.ref)();
	(0, vue.onMounted)(async () => {
		if (props.range) {
			if ((0, _vue_shared.isArray)(props.modelValue)) {
				initData.firstValue = Math.max(props.min, props.modelValue[0]);
				initData.secondValue = Math.min(props.max, props.modelValue[1]);
			} else {
				initData.firstValue = props.min;
				initData.secondValue = props.max;
			}
			initData.oldValue = [initData.firstValue, initData.secondValue];
		} else {
			if (!require_types.isNumber(props.modelValue) || Number.isNaN(props.modelValue)) initData.firstValue = props.min;
			else initData.firstValue = Math.min(props.max, Math.max(props.min, props.modelValue));
			initData.oldValue = initData.firstValue;
		}
		(0, _vueuse_core.useEventListener)(window, "resize", resetSize);
		await (0, vue.nextTick)();
		resetSize();
	});
	return { sliderWrapper };
};

//#endregion
exports.useLifecycle = useLifecycle;
//# sourceMappingURL=use-lifecycle.js.map
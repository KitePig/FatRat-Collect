Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_types = require('../../utils/types.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/hooks/use-throttle-render/index.ts
const useThrottleRender = (loading, throttle = 0) => {
	if (throttle === 0) return loading;
	const throttled = (0, vue.ref)((0, _vue_shared.isObject)(throttle) && Boolean(throttle.initVal));
	let timeoutHandle = null;
	const dispatchThrottling = (timer) => {
		if (require_types.isUndefined(timer)) {
			throttled.value = loading.value;
			return;
		}
		if (timeoutHandle) clearTimeout(timeoutHandle);
		timeoutHandle = setTimeout(() => {
			throttled.value = loading.value;
		}, timer);
	};
	const dispatcher = (type) => {
		if (type === "leading") if (require_types.isNumber(throttle)) dispatchThrottling(throttle);
		else dispatchThrottling(throttle.leading);
		else if ((0, _vue_shared.isObject)(throttle)) dispatchThrottling(throttle.trailing);
		else throttled.value = false;
	};
	(0, vue.onMounted)(() => dispatcher("leading"));
	(0, vue.watch)(() => loading.value, (val) => {
		dispatcher(val ? "leading" : "trailing");
	});
	return throttled;
};

//#endregion
exports.useThrottleRender = useThrottleRender;
//# sourceMappingURL=index.js.map
import { isNumber, isObject, isUndefined } from "../../utils/types.mjs";
import { onMounted, ref, watch } from "vue";

//#region ../../packages/hooks/use-throttle-render/index.ts
const useThrottleRender = (loading, throttle = 0) => {
	if (throttle === 0) return loading;
	const throttled = ref(isObject(throttle) && Boolean(throttle.initVal));
	let timeoutHandle = null;
	const dispatchThrottling = (timer) => {
		if (isUndefined(timer)) {
			throttled.value = loading.value;
			return;
		}
		if (timeoutHandle) clearTimeout(timeoutHandle);
		timeoutHandle = setTimeout(() => {
			throttled.value = loading.value;
		}, timer);
	};
	const dispatcher = (type) => {
		if (type === "leading") if (isNumber(throttle)) dispatchThrottling(throttle);
		else dispatchThrottling(throttle.leading);
		else if (isObject(throttle)) dispatchThrottling(throttle.trailing);
		else throttled.value = false;
	};
	onMounted(() => dispatcher("leading"));
	watch(() => loading.value, (val) => {
		dispatcher(val ? "leading" : "trailing");
	});
	return throttled;
};

//#endregion
export { useThrottleRender };
//# sourceMappingURL=index.mjs.map
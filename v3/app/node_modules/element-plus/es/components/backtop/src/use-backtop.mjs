import { throwError } from "../../../utils/error.mjs";
import { useEventListener, useThrottleFn } from "@vueuse/core";
import { onMounted, ref, shallowRef } from "vue";

//#region ../../packages/components/backtop/src/use-backtop.ts
const useBackTop = (props, emit, componentName) => {
	const el = shallowRef();
	const container = shallowRef();
	const visible = ref(false);
	const handleScroll = () => {
		if (el.value) visible.value = el.value.scrollTop >= props.visibilityHeight;
	};
	const handleClick = (event) => {
		el.value?.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		emit("click", event);
	};
	useEventListener(container, "scroll", useThrottleFn(handleScroll, 300, true));
	onMounted(() => {
		container.value = document;
		el.value = document.documentElement;
		if (props.target) {
			el.value = document.querySelector(props.target) ?? void 0;
			if (!el.value) throwError(componentName, `target does not exist: ${props.target}`);
			container.value = el.value;
		}
		handleScroll();
	});
	return {
		visible,
		handleClick
	};
};

//#endregion
export { useBackTop };
//# sourceMappingURL=use-backtop.mjs.map
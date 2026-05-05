import { useResizeObserver } from "@vueuse/core";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

//#region ../../packages/components/table-v2/src/composables/use-auto-resize.ts
const useAutoResize = (props) => {
	const sizer = ref();
	const width$ = ref(0);
	const height$ = ref(0);
	let resizerStopper;
	onMounted(() => {
		resizerStopper = useResizeObserver(sizer, ([entry]) => {
			const { width, height } = entry.contentRect;
			const { paddingLeft, paddingRight, paddingTop, paddingBottom } = getComputedStyle(entry.target);
			const left = Number.parseInt(paddingLeft) || 0;
			const right = Number.parseInt(paddingRight) || 0;
			const top = Number.parseInt(paddingTop) || 0;
			const bottom = Number.parseInt(paddingBottom) || 0;
			width$.value = width - left - right;
			height$.value = height - top - bottom;
		}).stop;
	});
	onBeforeUnmount(() => {
		resizerStopper?.();
	});
	watch([width$, height$], ([width, height]) => {
		props.onResize?.({
			width,
			height
		});
	});
	return {
		sizer,
		width: width$,
		height: height$
	};
};

//#endregion
export { useAutoResize };
//# sourceMappingURL=use-auto-resize.mjs.map
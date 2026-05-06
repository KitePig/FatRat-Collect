Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/table-v2/src/composables/use-auto-resize.ts
const useAutoResize = (props) => {
	const sizer = (0, vue.ref)();
	const width$ = (0, vue.ref)(0);
	const height$ = (0, vue.ref)(0);
	let resizerStopper;
	(0, vue.onMounted)(() => {
		resizerStopper = (0, _vueuse_core.useResizeObserver)(sizer, ([entry]) => {
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
	(0, vue.onBeforeUnmount)(() => {
		resizerStopper?.();
	});
	(0, vue.watch)([width$, height$], ([width, height]) => {
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
exports.useAutoResize = useAutoResize;
//# sourceMappingURL=use-auto-resize.js.map
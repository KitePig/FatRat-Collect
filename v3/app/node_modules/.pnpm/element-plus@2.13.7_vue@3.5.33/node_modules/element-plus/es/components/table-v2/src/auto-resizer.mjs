import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/table-v2/src/auto-resizer.ts
const autoResizerProps = buildProps({
	disableWidth: Boolean,
	disableHeight: Boolean,
	onResize: { type: definePropType(Function) }
});

//#endregion
export { autoResizerProps };
//# sourceMappingURL=auto-resizer.mjs.map
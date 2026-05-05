import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";
import { timePanelSharedProps } from "./shared.mjs";

//#region ../../packages/components/time-picker/src/props/panel-time-picker.ts
const panelTimePickerProps = buildProps({
	...timePanelSharedProps,
	datetimeRole: String,
	parsedValue: { type: definePropType(Object) }
});

//#endregion
export { panelTimePickerProps };
//# sourceMappingURL=panel-time-picker.mjs.map
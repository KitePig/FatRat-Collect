import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";
import { panelSharedProps } from "./shared.mjs";

//#region ../../packages/components/date-picker-panel/src/props/panel-date-pick.ts
const panelDatePickProps = buildProps({
	...panelSharedProps,
	parsedValue: { type: definePropType([Object, Array]) },
	visible: {
		type: Boolean,
		default: true
	},
	format: {
		type: String,
		default: ""
	}
});

//#endregion
export { panelDatePickProps };
//# sourceMappingURL=panel-date-pick.mjs.map
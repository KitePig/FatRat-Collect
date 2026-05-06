import { keysOf } from "../../../utils/objects.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { TypeComponentsMap } from "../../../utils/vue/icon.mjs";

//#region ../../packages/components/alert/src/alert.ts
const alertEffects = ["light", "dark"];
/**
* @deprecated Removed after 3.0.0, Use `AlertProps` instead.
*/
const alertProps = buildProps({
	title: {
		type: String,
		default: ""
	},
	description: {
		type: String,
		default: ""
	},
	type: {
		type: String,
		values: keysOf(TypeComponentsMap),
		default: "info"
	},
	closable: {
		type: Boolean,
		default: true
	},
	closeText: {
		type: String,
		default: ""
	},
	showIcon: Boolean,
	center: Boolean,
	effect: {
		type: String,
		values: alertEffects,
		default: "light"
	}
});
const alertEmits = { close: (evt) => evt instanceof MouseEvent };

//#endregion
export { alertEffects, alertEmits, alertProps };
//# sourceMappingURL=alert.mjs.map
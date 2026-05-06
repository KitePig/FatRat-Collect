Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_objects = require('../../../utils/objects.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');

//#region ../../packages/components/alert/src/alert.ts
const alertEffects = ["light", "dark"];
/**
* @deprecated Removed after 3.0.0, Use `AlertProps` instead.
*/
const alertProps = require_runtime.buildProps({
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
		values: require_objects.keysOf(require_icon.TypeComponentsMap),
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
exports.alertEffects = alertEffects;
exports.alertEmits = alertEmits;
exports.alertProps = alertProps;
//# sourceMappingURL=alert.js.map
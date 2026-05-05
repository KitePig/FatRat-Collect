Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('./props/runtime.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");

//#region ../../packages/utils/vue/icon.ts
const iconPropType = require_runtime$1.definePropType([
	String,
	Object,
	Function
]);
const CloseComponents = { Close: _element_plus_icons_vue.Close };
const TypeComponents = {
	Close: _element_plus_icons_vue.Close,
	SuccessFilled: _element_plus_icons_vue.SuccessFilled,
	InfoFilled: _element_plus_icons_vue.InfoFilled,
	WarningFilled: _element_plus_icons_vue.WarningFilled,
	CircleCloseFilled: _element_plus_icons_vue.CircleCloseFilled
};
const TypeComponentsMap = {
	primary: _element_plus_icons_vue.InfoFilled,
	success: _element_plus_icons_vue.SuccessFilled,
	warning: _element_plus_icons_vue.WarningFilled,
	error: _element_plus_icons_vue.CircleCloseFilled,
	info: _element_plus_icons_vue.InfoFilled
};
const ValidateComponentsMap = {
	validating: _element_plus_icons_vue.Loading,
	success: _element_plus_icons_vue.CircleCheck,
	error: _element_plus_icons_vue.CircleClose
};

//#endregion
exports.CloseComponents = CloseComponents;
exports.TypeComponents = TypeComponents;
exports.TypeComponentsMap = TypeComponentsMap;
exports.ValidateComponentsMap = ValidateComponentsMap;
exports.iconPropType = iconPropType;
//# sourceMappingURL=icon.js.map
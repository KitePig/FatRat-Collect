Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");

//#region ../../packages/components/collapse/src/collapse-item.ts
/**
* @deprecated Removed after 3.0.0, Use `CollapseItemProps` instead.
*/
const collapseItemProps = require_runtime$1.buildProps({
	title: {
		type: String,
		default: ""
	},
	name: {
		type: require_runtime$1.definePropType([String, Number]),
		default: void 0
	},
	icon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.ArrowRight
	},
	disabled: Boolean
});

//#endregion
exports.collapseItemProps = collapseItemProps;
//# sourceMappingURL=collapse-item.js.map
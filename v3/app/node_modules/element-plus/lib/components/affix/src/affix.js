Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_teleport = require('../../teleport/src/teleport.js');

//#region ../../packages/components/affix/src/affix.ts
/**
* @deprecated Removed after 3.0.0, Use `AffixProps` instead.
*/
const affixProps = require_runtime.buildProps({
	zIndex: {
		type: require_runtime.definePropType([Number, String]),
		default: 100
	},
	target: {
		type: String,
		default: ""
	},
	offset: {
		type: Number,
		default: 0
	},
	position: {
		type: String,
		values: ["top", "bottom"],
		default: "top"
	},
	teleported: Boolean,
	appendTo: {
		type: require_teleport.teleportProps.to.type,
		default: "body"
	}
});
const affixEmits = {
	scroll: ({ scrollTop, fixed }) => require_types.isNumber(scrollTop) && require_types.isBoolean(fixed),
	[require_event.CHANGE_EVENT]: (fixed) => require_types.isBoolean(fixed)
};

//#endregion
exports.affixEmits = affixEmits;
exports.affixProps = affixProps;
//# sourceMappingURL=affix.js.map
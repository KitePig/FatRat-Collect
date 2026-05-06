Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/anchor/src/anchor.ts
/**
* @deprecated Removed after 3.0.0, Use `AnchorProps` instead.
*/
const anchorProps = require_runtime$1.buildProps({
	container: { type: require_runtime$1.definePropType([String, Object]) },
	offset: {
		type: Number,
		default: 0
	},
	bound: {
		type: Number,
		default: 15
	},
	duration: {
		type: Number,
		default: 300
	},
	marker: {
		type: Boolean,
		default: true
	},
	type: {
		type: require_runtime$1.definePropType(String),
		default: "default"
	},
	direction: {
		type: require_runtime$1.definePropType(String),
		default: "vertical"
	},
	selectScrollTop: Boolean
});
const anchorEmits = {
	change: (href) => (0, _vue_shared.isString)(href),
	click: (e, href) => e instanceof MouseEvent && ((0, _vue_shared.isString)(href) || require_types.isUndefined(href))
};

//#endregion
exports.anchorEmits = anchorEmits;
exports.anchorProps = anchorProps;
//# sourceMappingURL=anchor.js.map
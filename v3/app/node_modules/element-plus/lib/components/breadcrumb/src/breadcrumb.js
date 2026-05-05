Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');

//#region ../../packages/components/breadcrumb/src/breadcrumb.ts
/**
* @deprecated Removed after 3.0.0, Use `BreadcrumbProps` instead.
*/
const breadcrumbProps = require_runtime.buildProps({
	separator: {
		type: String,
		default: "/"
	},
	separatorIcon: { type: require_icon.iconPropType }
});

//#endregion
exports.breadcrumbProps = breadcrumbProps;
//# sourceMappingURL=breadcrumb.js.map
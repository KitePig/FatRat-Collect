Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');

//#region ../../packages/components/tabs/src/tab-bar.ts
/**
* @deprecated Removed after 3.0.0, Use `TabBarProps` instead.
*/
const tabBarProps = require_runtime.buildProps({
	tabs: {
		type: require_runtime.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	tabRefs: {
		type: require_runtime.definePropType(Object),
		default: () => require_typescript.mutable({})
	}
});

//#endregion
exports.tabBarProps = tabBarProps;
//# sourceMappingURL=tab-bar.js.map
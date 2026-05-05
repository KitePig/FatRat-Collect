Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-size/index.js');
const require_index$1 = require('../../../hooks/use-empty-values/index.js');

//#region ../../packages/components/config-provider/src/config-provider-props.ts
const configProviderProps = require_runtime.buildProps({
	a11y: {
		type: Boolean,
		default: true
	},
	locale: { type: require_runtime.definePropType(Object) },
	size: require_index.useSizeProp,
	button: { type: require_runtime.definePropType(Object) },
	card: { type: require_runtime.definePropType(Object) },
	dialog: { type: require_runtime.definePropType(Object) },
	link: { type: require_runtime.definePropType(Object) },
	experimentalFeatures: { type: require_runtime.definePropType(Object) },
	keyboardNavigation: {
		type: Boolean,
		default: true
	},
	message: { type: require_runtime.definePropType(Object) },
	zIndex: Number,
	namespace: {
		type: String,
		default: "el"
	},
	table: { type: require_runtime.definePropType(Object) },
	...require_index$1.useEmptyValuesProps
});

//#endregion
exports.configProviderProps = configProviderProps;
//# sourceMappingURL=config-provider-props.js.map
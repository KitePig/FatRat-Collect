import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useEmptyValuesProps } from "../../../hooks/use-empty-values/index.mjs";

//#region ../../packages/components/config-provider/src/config-provider-props.ts
const configProviderProps = buildProps({
	a11y: {
		type: Boolean,
		default: true
	},
	locale: { type: definePropType(Object) },
	size: useSizeProp,
	button: { type: definePropType(Object) },
	card: { type: definePropType(Object) },
	dialog: { type: definePropType(Object) },
	link: { type: definePropType(Object) },
	experimentalFeatures: { type: definePropType(Object) },
	keyboardNavigation: {
		type: Boolean,
		default: true
	},
	message: { type: definePropType(Object) },
	zIndex: Number,
	namespace: {
		type: String,
		default: "el"
	},
	table: { type: definePropType(Object) },
	...useEmptyValuesProps
});

//#endregion
export { configProviderProps };
//# sourceMappingURL=config-provider-props.mjs.map
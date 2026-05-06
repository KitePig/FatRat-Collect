import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../utils/typescript.mjs";

//#region ../../packages/components/tabs/src/tab-bar.ts
/**
* @deprecated Removed after 3.0.0, Use `TabBarProps` instead.
*/
const tabBarProps = buildProps({
	tabs: {
		type: definePropType(Array),
		default: () => mutable([])
	},
	tabRefs: {
		type: definePropType(Object),
		default: () => mutable({})
	}
});

//#endregion
export { tabBarProps };
//# sourceMappingURL=tab-bar.mjs.map
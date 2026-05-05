import { isArray, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/menu/src/menu-item.ts
/**
* @deprecated Removed after 3.0.0, Use `MenuItemProps` instead.
*/
const menuItemProps = buildProps({
	index: {
		type: definePropType([String, null]),
		default: null
	},
	route: { type: definePropType([String, Object]) },
	disabled: Boolean
});
const menuItemEmits = { click: (item) => isString(item.index) && isArray(item.indexPath) };

//#endregion
export { menuItemEmits, menuItemProps };
//# sourceMappingURL=menu-item.mjs.map
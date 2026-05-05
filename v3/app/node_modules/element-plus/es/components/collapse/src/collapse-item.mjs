import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { ArrowRight } from "@element-plus/icons-vue";

//#region ../../packages/components/collapse/src/collapse-item.ts
/**
* @deprecated Removed after 3.0.0, Use `CollapseItemProps` instead.
*/
const collapseItemProps = buildProps({
	title: {
		type: String,
		default: ""
	},
	name: {
		type: definePropType([String, Number]),
		default: void 0
	},
	icon: {
		type: iconPropType,
		default: ArrowRight
	},
	disabled: Boolean
});

//#endregion
export { collapseItemProps };
//# sourceMappingURL=collapse-item.mjs.map
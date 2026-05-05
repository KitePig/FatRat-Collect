import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { Back } from "@element-plus/icons-vue";

//#region ../../packages/components/page-header/src/page-header.ts
/**
* @deprecated Removed after 3.0.0, Use `PageHeaderProps` instead.
*/
const pageHeaderProps = buildProps({
	icon: {
		type: iconPropType,
		default: () => Back
	},
	title: String,
	content: {
		type: String,
		default: ""
	}
});
const pageHeaderEmits = { back: () => true };

//#endregion
export { pageHeaderEmits, pageHeaderProps };
//# sourceMappingURL=page-header.mjs.map
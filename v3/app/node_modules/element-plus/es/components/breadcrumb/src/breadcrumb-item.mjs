import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/breadcrumb/src/breadcrumb-item.ts
/**
* @deprecated Removed after 3.0.0, Use `BreadcrumbItemProps` instead.
*/
const breadcrumbItemProps = buildProps({
	to: {
		type: definePropType([String, Object]),
		default: ""
	},
	replace: Boolean
});

//#endregion
export { breadcrumbItemProps };
//# sourceMappingURL=breadcrumb-item.mjs.map
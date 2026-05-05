import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import useMenuColor from "./use-menu-color.mjs";
import { computed } from "vue";

//#region ../../packages/components/menu/src/use-menu-css-var.ts
const useMenuCssVar = (props, level) => {
	const ns = useNamespace("menu");
	return computed(() => ns.cssVarBlock({
		"text-color": props.textColor || "",
		"hover-text-color": props.textColor || "",
		"bg-color": props.backgroundColor || "",
		"hover-bg-color": useMenuColor(props).value || "",
		"active-color": props.activeTextColor || "",
		level: `${level}`
	}));
};

//#endregion
export { useMenuCssVar };
//# sourceMappingURL=use-menu-css-var.mjs.map
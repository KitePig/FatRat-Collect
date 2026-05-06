Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_menu_color = require('./use-menu-color.js');
let vue = require("vue");

//#region ../../packages/components/menu/src/use-menu-css-var.ts
const useMenuCssVar = (props, level) => {
	const ns = require_index.useNamespace("menu");
	return (0, vue.computed)(() => ns.cssVarBlock({
		"text-color": props.textColor || "",
		"hover-text-color": props.textColor || "",
		"bg-color": props.backgroundColor || "",
		"hover-bg-color": require_use_menu_color.default(props).value || "",
		"active-color": props.activeTextColor || "",
		level: `${level}`
	}));
};

//#endregion
exports.useMenuCssVar = useMenuCssVar;
//# sourceMappingURL=use-menu-css-var.js.map
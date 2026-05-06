Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
let vue = require("vue");
let _ctrl_tinycolor = require("@ctrl/tinycolor");

//#region ../../packages/components/button/src/button-custom.ts
function darken(color, amount = 20) {
	return color.mix("#141414", amount).toString();
}
function useButtonCustomStyle(props) {
	const _disabled = require_use_form_common_props.useFormDisabled();
	const ns = require_index.useNamespace("button");
	return (0, vue.computed)(() => {
		let styles = {};
		let buttonColor = props.color;
		if (buttonColor) {
			const match = buttonColor.match(/var\((.*?)\)/);
			if (match) buttonColor = window.getComputedStyle(window.document.documentElement).getPropertyValue(match[1]);
			const color = new _ctrl_tinycolor.TinyColor(buttonColor);
			const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
			if (props.plain) {
				styles = ns.cssVarBlock({
					"bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
					"text-color": buttonColor,
					"border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
					"hover-text-color": `var(${ns.cssVarName("color-white")})`,
					"hover-bg-color": buttonColor,
					"hover-border-color": buttonColor,
					"active-bg-color": activeBgColor,
					"active-text-color": `var(${ns.cssVarName("color-white")})`,
					"active-border-color": activeBgColor
				});
				if (_disabled.value) {
					styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
					styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
					styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
				}
			} else if (props.link || props.text) {
				const hoverColor = props.dark ? darken(color, 30) : color.tint(30).toString();
				styles = ns.cssVarBlock({
					"text-color": buttonColor,
					"hover-text-color": hoverColor,
					"active-text-color": activeBgColor
				});
				if (props.link) {
					styles[ns.cssVarBlockName("hover-link-text-color")] = hoverColor;
					styles[ns.cssVarBlockName("active-color")] = activeBgColor;
				}
				if (_disabled.value) {
					const disabledColor = props.dark ? darken(color, 50) : color.tint(50).toString();
					styles[ns.cssVarBlockName("disabled-bg-color")] = "transparent";
					styles[ns.cssVarBlockName("disabled-text-color")] = disabledColor;
					styles[ns.cssVarBlockName("disabled-border-color")] = "transparent";
				}
			} else {
				const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
				const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
				styles = ns.cssVarBlock({
					"bg-color": buttonColor,
					"text-color": textColor,
					"border-color": buttonColor,
					"hover-bg-color": hoverBgColor,
					"hover-text-color": textColor,
					"hover-border-color": hoverBgColor,
					"active-bg-color": activeBgColor,
					"active-border-color": activeBgColor
				});
				if (_disabled.value) {
					const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
					styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
					styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
					styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
				}
			}
		}
		return styles;
	});
}

//#endregion
exports.darken = darken;
exports.useButtonCustomStyle = useButtonCustomStyle;
//# sourceMappingURL=button-custom.js.map